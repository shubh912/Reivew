import supabase from './db-client.js';
import { requireAdmin, setCors } from './_auth.js';

const ALLOWED_PROPERTY_TYPES = ['1 BHK', '2 BHK', '3 BHK', '4+ BHK', 'Office', 'Other'];
const ALLOWED_SERVICES = ['Packing', 'Loading', 'Transportation', 'Unloading', 'Bike Transportation', 'Complete Shifting'];
const ALLOWED_STATUSES = ['new', 'contacted', 'confirmed', 'completed', 'cancelled'];

/* Simple per-instance rate limiter: max 6 quote submissions / minute / IP */
const hits = new Map();
function isRateLimited(ip) {
  const now = Date.now();
  const windowMs = 60_000;
  const list = (hits.get(ip) || []).filter((t) => now - t < windowMs);
  list.push(now);
  hits.set(ip, list);
  if (hits.size > 500) hits.clear();
  return list.length > 6;
}

const clean = (value, max = 300) =>
  String(value ?? '')
    .replace(/<[^>]*>/g, '')
    .replace(/[\u0000-\u001F\u007F]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, max);

function normaliseMobile(raw) {
  let digits = String(raw ?? '').replace(/\D/g, '');
  if (digits.length === 12 && digits.startsWith('91')) digits = digits.slice(2);
  if (digits.length === 11 && digits.startsWith('0')) digits = digits.slice(1);
  return digits;
}

export default async function handler(req, res) {
  if (setCors(req, res)) return;

  try {
    /* ---------- PUBLIC: submit a quote enquiry ---------- */
    if (req.method === 'POST') {
      const ip = req.headers['x-forwarded-for']?.split(',')[0]?.trim() || req.socket?.remoteAddress || 'unknown';
      if (isRateLimited(ip)) {
        return res.status(429).json({ error: 'Too many requests. Please call or WhatsApp us directly.' });
      }

      const body = req.body || {};

      // Honeypot: silently accept bot submissions without storing anything
      if (body.website) {
        return res.status(200).json({ id: 0 });
      }

      const name = clean(body.name, 60);
      const mobile = normaliseMobile(body.mobile);
      const pickup = clean(body.pickup, 160);
      const destination = clean(body.destination, 160);
      const movingDate = clean(body.movingDate, 20);
      const propertyType = ALLOWED_PROPERTY_TYPES.includes(body.propertyType) ? body.propertyType : 'Other';
      const services = Array.isArray(body.services)
        ? body.services.filter((s) => ALLOWED_SERVICES.includes(s)).slice(0, 6)
        : [];
      const details = clean(body.details, 800);

      if (name.length < 2) return res.status(400).json({ error: 'Please enter your full name.' });
      if (!/^[6-9][0-9]{9}$/.test(mobile))
        return res.status(400).json({ error: 'Enter a valid 10-digit mobile number.' });
      if (pickup.length < 3) return res.status(400).json({ error: 'Enter the pickup location.' });
      if (destination.length < 3) return res.status(400).json({ error: 'Enter the destination.' });
      if (services.length === 0)
        return res.status(400).json({ error: 'Select at least one required service.' });

      let storedDate = null;
      if (movingDate) {
        const parsed = new Date(movingDate);
        if (!Number.isNaN(parsed.getTime())) storedDate = parsed.toISOString().slice(0, 10);
      }

      const { data, error } = await supabase
        .from('enquiries')
        .insert({
          name,
          mobile,
          pickup_location: pickup,
          destination,
          moving_date: storedDate,
          property_type: propertyType,
          services,
          details: details || null,
          status: 'new',
        })
        .select('id')
        .single();

      if (error) throw error;
      return res.status(201).json({ id: data.id });
    }

    /* ---------- ADMIN: list / update / delete ---------- */
    if (req.method === 'GET') {
      const user = await requireAdmin(req, res);
      if (!user) return;
      const status = clean(req.query.status, 20);
      let query = supabase.from('enquiries').select('*').order('created_at', { ascending: false }).limit(500);
      if (status && status !== 'all' && ALLOWED_STATUSES.includes(status)) {
        query = query.eq('status', status);
      }
      const { data, error } = await query;
      if (error) throw error;
      return res.status(200).json(data);
    }

    if (req.method === 'PATCH') {
      const user = await requireAdmin(req, res);
      if (!user) return;
      const id = Number(req.body?.id);
      const status = req.body?.status;
      if (!Number.isInteger(id) || !ALLOWED_STATUSES.includes(status)) {
        return res.status(400).json({ error: 'Invalid id or status' });
      }
      const { data, error } = await supabase
        .from('enquiries')
        .update({ status })
        .eq('id', id)
        .select('id, status')
        .single();
      if (error) throw error;
      return res.status(200).json(data);
    }

    if (req.method === 'DELETE') {
      const user = await requireAdmin(req, res);
      if (!user) return;
      const id = Number(req.body?.id ?? req.query?.id);
      if (!Number.isInteger(id)) return res.status(400).json({ error: 'Invalid id' });
      const { error } = await supabase.from('enquiries').delete().eq('id', id);
      if (error) throw error;
      return res.status(200).json({ ok: true });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    console.error('enquiries API error:', err);
    return res.status(500).json({ error: 'Server error. Please call or WhatsApp us directly.' });
  }
}
