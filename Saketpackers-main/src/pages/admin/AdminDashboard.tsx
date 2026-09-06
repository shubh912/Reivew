import { useCallback, useEffect, useMemo, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import {
  LogOut,
  Loader2,
  RefreshCw,
  Phone,
  Trash2,
  ChevronDown,
  Inbox,
  ImagePlus,
  Settings2,
  ClipboardList,
  CalendarDays,
  MapPin,
  AlertTriangle,
  CheckCircle2,
} from 'lucide-react';
import Seo from '../../components/Seo';
import { useAuth } from '../../contexts/AuthContext';
import { BUSINESS } from '../../lib/constants';
import { WhatsAppGlyph } from '../../components/ContactButtons';

const STATUSES = ['new', 'contacted', 'confirmed', 'completed', 'cancelled'] as const;
type Status = (typeof STATUSES)[number];

const STATUS_STYLES: Record<Status, string> = {
  new: 'bg-brand-50 text-brand-700 border-brand-200',
  contacted: 'bg-gold-100 text-gold-700 border-gold-200',
  confirmed: 'bg-navy-50 text-navy-700 border-navy-200',
  completed: 'bg-leaf-50 text-leaf-700 border-leaf-100',
  cancelled: 'bg-gray-100 text-gray-500 border-gray-200',
};

interface Enquiry {
  id: number;
  name: string;
  mobile: string;
  pickup_location: string;
  destination: string;
  moving_date: string | null;
  property_type: string;
  services: string[];
  details: string | null;
  status: Status;
  created_at: string;
}

interface GalleryRow {
  id: number;
  title: string;
  category: string;
  image_url: string;
  alt: string;
}

const GALLERY_CATEGORIES = ['Packing', 'Loading', 'Vehicles', 'House Shifting', 'Office Shifting', 'Transportation'];

function formatDate(iso: string | null) {
  if (!iso) return '—';
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
}

/* ─────────────── Enquiries tab ─────────────── */

function EnquiriesTab({ token }: { token: string }) {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState<'all' | Status>('all');
  const [search, setSearch] = useState('');
  const [expanded, setExpanded] = useState<number | null>(null);
  const [busyId, setBusyId] = useState<number | null>(null);
  const [notice, setNotice] = useState('');

  const load = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/enquiries', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to load enquiries');
      setEnquiries(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load enquiries');
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    load();
  }, [load]);

  const updateStatus = async (id: number, status: Status) => {
    setBusyId(id);
    setNotice('');
    try {
      const res = await fetch('/api/enquiries', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ id, status }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Update failed');
      setEnquiries((list) => list.map((e) => (e.id === id ? { ...e, status } : e)));
      setNotice(`Enquiry #${id} marked as ${status}.`);
    } catch (err) {
      setNotice(err instanceof Error ? err.message : 'Update failed');
    } finally {
      setBusyId(null);
    }
  };

  const remove = async (id: number) => {
    if (!window.confirm(`Delete enquiry #${id} permanently?`)) return;
    setBusyId(id);
    try {
      const res = await fetch('/api/enquiries', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ id }),
      });
      if (!res.ok) throw new Error('Delete failed');
      setEnquiries((list) => list.filter((e) => e.id !== id));
    } catch (err) {
      setNotice(err instanceof Error ? err.message : 'Delete failed');
    } finally {
      setBusyId(null);
    }
  };

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return enquiries.filter((e) => {
      if (filter !== 'all' && e.status !== filter) return false;
      if (!q) return true;
      return (
        e.name.toLowerCase().includes(q) ||
        e.mobile.includes(q) ||
        e.pickup_location.toLowerCase().includes(q) ||
        e.destination.toLowerCase().includes(q)
      );
    });
  }, [enquiries, filter, search]);

  const stats = useMemo(() => {
    const today = new Date().toDateString();
    return {
      total: enquiries.length,
      fresh: enquiries.filter((e) => e.status === 'new').length,
      confirmed: enquiries.filter((e) => e.status === 'confirmed').length,
      today: enquiries.filter((e) => new Date(e.created_at).toDateString() === today).length,
    };
  }, [enquiries]);

  return (
    <div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          { label: 'Total enquiries', value: stats.total },
          { label: 'New / unread', value: stats.fresh },
          { label: 'Confirmed moves', value: stats.confirmed },
          { label: 'Received today', value: stats.today },
        ].map((s) => (
          <div key={s.label} className="rounded-2xl border border-navy-100 bg-white p-4 shadow-sm">
            <p className="font-display text-3xl font-bold text-navy-800">{s.value}</p>
            <p className="mt-0.5 text-xs font-semibold uppercase tracking-wider text-navy-500">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="no-scrollbar flex gap-2 overflow-x-auto pb-1" role="tablist" aria-label="Filter by status">
          {(['all', ...STATUSES] as const).map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setFilter(s)}
              className={`min-h-[40px] shrink-0 rounded-full border px-4 py-1.5 text-sm font-semibold capitalize transition-colors ${
                filter === s ? 'border-navy-700 bg-navy-700 text-gold-300' : 'border-navy-200 bg-white text-navy-600'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search name, mobile, route…"
            aria-label="Search enquiries"
            className="min-h-[44px] w-full rounded-xl border border-navy-200 px-4 text-sm focus:border-brand-500 focus:outline-none sm:w-64"
          />
          <button
            type="button"
            onClick={load}
            aria-label="Refresh enquiries"
            className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-navy-200 bg-white text-navy-600 transition-colors hover:bg-navy-50"
          >
            <RefreshCw className={`h-5 w-5 ${loading ? 'animate-spin' : ''}`} aria-hidden="true" />
          </button>
        </div>
      </div>

      {notice && (
        <p className="mt-4 flex items-center gap-1.5 rounded-xl bg-navy-50 px-4 py-2.5 text-sm font-medium text-navy-700">
          <CheckCircle2 className="h-4 w-4 text-leaf-600" aria-hidden="true" />
          {notice}
        </p>
      )}
      {error && (
        <p role="alert" className="mt-4 flex items-center gap-1.5 rounded-xl bg-brand-50 px-4 py-2.5 text-sm font-medium text-brand-700">
          <AlertTriangle className="h-4 w-4" aria-hidden="true" />
          {error}
        </p>
      )}

      {loading ? (
        <div className="mt-6 space-y-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-20 animate-pulse rounded-2xl bg-navy-100" />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="mt-6 flex flex-col items-center rounded-2xl border border-dashed border-navy-200 bg-white p-12 text-center">
          <Inbox className="h-10 w-10 text-navy-300" aria-hidden="true" />
          <p className="mt-3 text-sm font-medium text-navy-500">
            {enquiries.length === 0
              ? 'No enquiries yet. New quote requests from the website will appear here.'
              : 'No enquiries match this filter.'}
          </p>
        </div>
      ) : (
        <ul className="mt-6 space-y-3">
          {filtered.map((e) => {
            const isOpen = expanded === e.id;
            return (
              <li key={e.id} className="overflow-hidden rounded-2xl border border-navy-100 bg-white shadow-sm">
                <button
                  type="button"
                  onClick={() => setExpanded(isOpen ? null : e.id)}
                  aria-expanded={isOpen}
                  className="flex w-full flex-wrap items-center gap-x-4 gap-y-2 px-4 py-4 text-left hover:bg-navy-50 sm:px-5"
                >
                  <span className={`rounded-full border px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider ${STATUS_STYLES[e.status] ?? STATUS_STYLES.new}`}>
                    {e.status}
                  </span>
                  <span className="min-w-[140px] flex-1">
                    <span className="block font-semibold text-navy-800">
                      #{e.id} · {e.name}
                    </span>
                    <span className="block text-xs text-navy-500">
                      {e.pickup_location} → {e.destination}
                    </span>
                  </span>
                  <span className="text-xs font-medium text-navy-400">
                    {formatDate(e.created_at)}
                  </span>
                  <ChevronDown className={`h-4 w-4 text-navy-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} aria-hidden="true" />
                </button>
                {isOpen && (
                  <div className="border-t border-navy-100 bg-navy-50/50 px-4 py-5 sm:px-5">
                    <dl className="grid gap-x-6 gap-y-3 text-sm sm:grid-cols-2 lg:grid-cols-3">
                      <div>
                        <dt className="text-xs font-bold uppercase tracking-wider text-navy-400">Mobile</dt>
                        <dd className="mt-0.5 font-semibold text-navy-800">{e.mobile}</dd>
                      </div>
                      <div>
                        <dt className="text-xs font-bold uppercase tracking-wider text-navy-400">Property type</dt>
                        <dd className="mt-0.5 font-semibold text-navy-800">{e.property_type}</dd>
                      </div>
                      <div>
                        <dt className="text-xs font-bold uppercase tracking-wider text-navy-400">Moving date</dt>
                        <dd className="mt-0.5 flex items-center gap-1 font-semibold text-navy-800">
                          <CalendarDays className="h-3.5 w-3.5 text-navy-400" aria-hidden="true" />
                          {formatDate(e.moving_date)}
                        </dd>
                      </div>
                      <div>
                        <dt className="text-xs font-bold uppercase tracking-wider text-navy-400">Pickup</dt>
                        <dd className="mt-0.5 flex items-center gap-1 font-medium text-navy-700">
                          <MapPin className="h-3.5 w-3.5 text-brand-500" aria-hidden="true" />
                          {e.pickup_location}
                        </dd>
                      </div>
                      <div>
                        <dt className="text-xs font-bold uppercase tracking-wider text-navy-400">Destination</dt>
                        <dd className="mt-0.5 flex items-center gap-1 font-medium text-navy-700">
                          <MapPin className="h-3.5 w-3.5 text-leaf-600" aria-hidden="true" />
                          {e.destination}
                        </dd>
                      </div>
                      <div>
                        <dt className="text-xs font-bold uppercase tracking-wider text-navy-400">Services</dt>
                        <dd className="mt-1 flex flex-wrap gap-1.5">
                          {(Array.isArray(e.services) ? e.services : []).map((s) => (
                            <span key={s} className="rounded-full bg-navy-100 px-2.5 py-0.5 text-[11px] font-semibold text-navy-700">
                              {s}
                            </span>
                          ))}
                        </dd>
                      </div>
                      {e.details && (
                        <div className="sm:col-span-2 lg:col-span-3">
                          <dt className="text-xs font-bold uppercase tracking-wider text-navy-400">Additional details</dt>
                          <dd className="mt-0.5 whitespace-pre-line font-medium leading-relaxed text-navy-700">{e.details}</dd>
                        </div>
                      )}
                    </dl>
                    <div className="mt-5 flex flex-wrap items-center gap-2.5">
                      <a
                        href={`tel:+91${e.mobile.replace(/\D/g, '').slice(-10)}`}
                        className="inline-flex min-h-[44px] items-center gap-1.5 rounded-lg bg-brand-600 px-4 py-2 text-sm font-bold text-white hover:bg-brand-700"
                      >
                        <Phone className="h-4 w-4" aria-hidden="true" />
                        Call customer
                      </a>
                      <a
                        href={`https://wa.me/91${e.mobile.replace(/\D/g, '').slice(-10)}?text=${encodeURIComponent(
                          `Hello ${e.name}, this is Saket Packers and Movers Ayodhya regarding your moving enquiry (#${e.id}).`,
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex min-h-[44px] items-center gap-1.5 rounded-lg bg-leaf-600 px-4 py-2 text-sm font-bold text-white hover:bg-leaf-700"
                      >
                        <WhatsAppGlyph className="h-4 w-4" />
                        WhatsApp customer
                      </a>
                      <label className="inline-flex items-center gap-2 text-sm font-semibold text-navy-600">
                        Status
                        <select
                          value={e.status}
                          disabled={busyId === e.id}
                          onChange={(ev) => updateStatus(e.id, ev.target.value as Status)}
                          className="min-h-[44px] rounded-lg border border-navy-200 bg-white px-3 py-2 text-sm font-semibold capitalize text-navy-800"
                          aria-label="Update enquiry status"
                        >
                          {STATUSES.map((s) => (
                            <option key={s} value={s} className="capitalize">
                              {s}
                            </option>
                          ))}
                        </select>
                      </label>
                      <button
                        type="button"
                        onClick={() => remove(e.id)}
                        disabled={busyId === e.id}
                        className="inline-flex min-h-[44px] items-center gap-1.5 rounded-lg border border-brand-200 px-4 py-2 text-sm font-bold text-brand-600 hover:bg-brand-50 disabled:opacity-50"
                      >
                        <Trash2 className="h-4 w-4" aria-hidden="true" />
                        Delete
                      </button>
                    </div>
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

/* ─────────────── Gallery tab ─────────────── */

function GalleryTab({ token }: { token: string }) {
  const [items, setItems] = useState<GalleryRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState(GALLERY_CATEGORIES[0]);
  const [alt, setAlt] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState('');

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/gallery');
      if (res.ok) setItems(await res.json());
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const upload = async () => {
    setMessage('');
    if (!file || !title.trim() || !alt.trim()) {
      setMessage('Please choose an image and fill title and alt text.');
      return;
    }
    if (file.size > 4 * 1024 * 1024) {
      setMessage('Image is too large. Please use an image under 4 MB.');
      return;
    }
    setBusy(true);
    try {
      const base64 = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(String(reader.result).split(',')[1]);
        reader.onerror = () => reject(new Error('Could not read file'));
        reader.readAsDataURL(file);
      });
      const up = await fetch('/api/upload', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ fileName: file.name, fileBase64: base64, contentType: file.type }),
      });
      const upData = await up.json();
      if (!up.ok) throw new Error(upData.error || 'Upload failed');
      const add = await fetch('/api/gallery', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ title: title.trim(), category, image_url: upData.url, alt: alt.trim() }),
      });
      const addData = await add.json();
      if (!add.ok) throw new Error(addData.error || 'Could not save gallery item');
      setMessage('Photo added to the gallery.');
      setTitle('');
      setAlt('');
      setFile(null);
      await load();
    } catch (err) {
      setMessage(err instanceof Error ? err.message : 'Upload failed');
    } finally {
      setBusy(false);
    }
  };

  const remove = async (id: number) => {
    if (!window.confirm('Remove this photo from the gallery?')) return;
    const res = await fetch('/api/gallery', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ id }),
    });
    if (res.ok) setItems((list) => list.filter((i) => i.id !== id));
  };

  return (
    <div className="grid gap-8 lg:grid-cols-[360px_1fr]">
      <div className="h-fit rounded-2xl border border-navy-100 bg-white p-6 shadow-sm">
        <h2 className="font-display text-xl font-bold text-navy-800">Add Gallery Photo</h2>
        <p className="mt-1 text-xs leading-relaxed text-navy-500">
          Upload genuine work photos here — they appear instantly on the public Gallery page. Use clear,
          descriptive alt text for SEO.
        </p>
        <label className="mt-4 block text-sm font-semibold text-navy-700">
          Photo
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files?.[0] ?? null)}
            className="mt-1.5 block w-full rounded-xl border border-dashed border-navy-300 p-3 text-sm file:mr-3 file:rounded-lg file:border-0 file:bg-navy-700 file:px-3 file:py-2 file:text-xs file:font-bold file:text-white"
          />
        </label>
        <label className="mt-3 block text-sm font-semibold text-navy-700">
          Title
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Household cartons being loaded"
            className="mt-1.5 w-full rounded-xl border border-navy-200 px-4 py-2.5 text-sm focus:border-brand-500 focus:outline-none"
          />
        </label>
        <label className="mt-3 block text-sm font-semibold text-navy-700">
          Category
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="mt-1.5 w-full rounded-xl border border-navy-200 px-4 py-2.5 text-sm focus:border-brand-500 focus:outline-none"
          >
            {GALLERY_CATEGORIES.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </label>
        <label className="mt-3 block text-sm font-semibold text-navy-700">
          Alt text (describes the photo)
          <input
            type="text"
            value={alt}
            onChange={(e) => setAlt(e.target.value)}
            placeholder="e.g. Movers loading packed boxes into a truck in Ayodhya"
            className="mt-1.5 w-full rounded-xl border border-navy-200 px-4 py-2.5 text-sm focus:border-brand-500 focus:outline-none"
          />
        </label>
        <button
          type="button"
          onClick={upload}
          disabled={busy}
          className="mt-5 inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-xl bg-brand-600 px-5 py-3 font-bold text-white hover:bg-brand-700 disabled:opacity-60"
        >
          {busy ? <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" /> : <ImagePlus className="h-5 w-5" aria-hidden="true" />}
          {busy ? 'Uploading…' : 'Upload & Publish'}
        </button>
        {message && <p className="mt-3 text-sm font-medium text-navy-600">{message}</p>}
      </div>

      <div>
        {loading ? (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="aspect-[4/3] animate-pulse rounded-2xl bg-navy-100" />
            ))}
          </div>
        ) : items.length === 0 ? (
          <p className="rounded-2xl border border-dashed border-navy-200 p-10 text-center text-sm text-navy-500">
            Gallery is empty. Upload your first work photo.
          </p>
        ) : (
          <ul className="grid grid-cols-2 gap-4 md:grid-cols-3">
            {items.map((item) => (
              <li key={item.id} className="overflow-hidden rounded-2xl border border-navy-100 bg-white shadow-sm">
                <img src={item.image_url} alt={item.alt} loading="lazy" decoding="async" className="aspect-[4/3] w-full object-cover" />
                <div className="p-3">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-brand-600">{item.category}</p>
                  <p className="truncate text-sm font-semibold text-navy-800">{item.title}</p>
                  <button
                    type="button"
                    onClick={() => remove(item.id)}
                    className="mt-2 inline-flex items-center gap-1 text-xs font-bold text-brand-600 hover:text-brand-700"
                  >
                    <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

/* ─────────────── Settings tab ─────────────── */

function SettingsTab({ token }: { token: string }) {
  const [workingHours, setWorkingHours] = useState('');
  const [announcement, setAnnouncement] = useState('');
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('/api/settings')
      .then((r) => (r.ok ? r.json() : {}))
      .then((data: Record<string, string>) => {
        setWorkingHours(data?.working_hours ?? '');
        setAnnouncement(data?.announcement ?? '');
      })
      .catch(() => undefined);
  }, []);

  const save = async () => {
    setSaving(true);
    setMessage('');
    try {
      for (const [key, value] of [
        ['working_hours', workingHours],
        ['announcement', announcement],
      ] as const) {
        const res = await fetch('/api/settings', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
          body: JSON.stringify({ key, value }),
        });
        if (!res.ok) throw new Error('Could not save settings');
      }
      setMessage('Settings saved. Changes are live on the Contact page.');
    } catch (err) {
      setMessage(err instanceof Error ? err.message : 'Save failed');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-xl rounded-2xl border border-navy-100 bg-white p-6 shadow-sm">
      <h2 className="font-display text-xl font-bold text-navy-800">Business Settings</h2>
      <p className="mt-1 text-xs leading-relaxed text-navy-500">
        These values are shown publicly. Keep them factual — they must match your real Google Business
        Profile information.
      </p>
      <label className="mt-4 block text-sm font-semibold text-navy-700">
        Working hours line (shown on Contact page)
        <textarea
          rows={2}
          value={workingHours}
          onChange={(e) => setWorkingHours(e.target.value)}
          placeholder="e.g. Open daily, 8:00 AM – 9:00 PM"
          className="mt-1.5 w-full rounded-xl border border-navy-200 px-4 py-2.5 text-sm focus:border-brand-500 focus:outline-none"
        />
      </label>
      <label className="mt-4 block text-sm font-semibold text-navy-700">
        Announcement (shown on Contact page, optional)
        <textarea
          rows={2}
          value={announcement}
          onChange={(e) => setAnnouncement(e.target.value)}
          placeholder="Leave empty to hide"
          className="mt-1.5 w-full rounded-xl border border-navy-200 px-4 py-2.5 text-sm focus:border-brand-500 focus:outline-none"
        />
      </label>
      <button
        type="button"
        onClick={save}
        disabled={saving}
        className="mt-5 inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl bg-navy-700 px-6 py-3 font-bold text-white hover:bg-navy-800 disabled:opacity-60"
      >
        {saving ? <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" /> : <Settings2 className="h-5 w-5" aria-hidden="true" />}
        Save Settings
      </button>
      {message && <p className="mt-3 text-sm font-medium text-navy-600">{message}</p>}
    </div>
  );
}

/* ─────────────── Dashboard shell ─────────────── */

export default function AdminDashboard() {
  const { user, session, loading } = useAuth();
  const navigate = useNavigate();
  const [tab, setTab] = useState<'enquiries' | 'gallery' | 'settings'>('enquiries');

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-navy-50">
        <Loader2 className="h-8 w-8 animate-spin text-navy-700" aria-label="Loading" />
      </main>
    );
  }

  if (!user || !session) return <Navigate to="/admin" replace />;

  const signOut = async () => {
    navigate('/admin', { replace: true });
  };

  const tabs = [
    { key: 'enquiries' as const, label: 'Enquiries', icon: ClipboardList },
    { key: 'gallery' as const, label: 'Gallery', icon: ImagePlus },
    { key: 'settings' as const, label: 'Settings', icon: Settings2 },
  ];

  return (
    <>
      <Seo
        title="Admin Dashboard | Saket Packers and Movers Ayodhya"
        description="Admin dashboard for Saket Packers and Movers Ayodhya."
        path="/admin/dashboard"
        noindex
      />
      <main className="min-h-screen bg-navy-50">
        <div className="border-b border-navy-100 bg-white">
          <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-4 sm:px-6">
            <div className="flex items-center gap-3">
              <img
                src={BUSINESS.logo}
                alt=""
                width={44}
                height={44}
                className="h-11 w-11 rounded-full object-contain"
              />
              <div>
                <h1 className="font-display text-xl font-bold leading-tight text-navy-800">
                  Admin Dashboard
                </h1>
                <p className="text-xs font-medium text-navy-500">{BUSINESS.name}</p>
              </div>
            </div>
            <button
              type="button"
              onClick={signOut}
              className="inline-flex min-h-[44px] items-center gap-2 rounded-xl border border-navy-200 px-4 py-2 text-sm font-bold text-navy-700 hover:bg-navy-50"
            >
              <LogOut className="h-4 w-4" aria-hidden="true" />
              Sign Out
            </button>
          </div>
          <div className="mx-auto flex max-w-7xl gap-1 overflow-x-auto px-4 sm:px-6" role="tablist" aria-label="Admin sections">
            {tabs.map((t) => (
              <button
                key={t.key}
                type="button"
                role="tab"
                aria-selected={tab === t.key}
                onClick={() => setTab(t.key)}
                className={`flex min-h-[48px] items-center gap-2 border-b-2 px-4 text-sm font-bold transition-colors ${
                  tab === t.key
                    ? 'border-brand-600 text-brand-600'
                    : 'border-transparent text-navy-500 hover:text-navy-800'
                }`}
              >
                <t.icon className="h-4 w-4" aria-hidden="true" />
                {t.label}
              </button>
            ))}
          </div>
        </div>
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
          {tab === 'enquiries' && <EnquiriesTab token={session.access_token} />}
          {tab === 'gallery' && <GalleryTab token={session.access_token} />}
          {tab === 'settings' && <SettingsTab token={session.access_token} />}
        </div>
      </main>
    </>
  );
}
