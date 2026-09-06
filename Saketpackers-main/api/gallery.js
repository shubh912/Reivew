import supabase from './db-client.js';
import { requireAdmin, setCors } from './_auth.js';

const ALLOWED_CATEGORIES = ['Packing', 'Loading', 'Vehicles', 'House Shifting', 'Office Shifting', 'Transportation'];

const clean = (value, max = 200) =>
  String(value ?? '')
    .replace(/<[^>]*>/g, '')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, max);

export default async function handler(req, res) {
  if (setCors(req, res)) return;

  try {
    if (req.method === 'GET') {
      const { data, error } = await supabase.from('gallery_items').select('*').order('id', { ascending: true }).limit(200);
      if (error) throw error;
      return res.status(200).json(data);
    }

    if (req.method === 'POST') {
      const user = await requireAdmin(req, res);
      if (!user) return;
      const title = clean(req.body?.title, 120);
      const category = ALLOWED_CATEGORIES.includes(req.body?.category) ? req.body.category : 'Packing';
      const image_url = clean(req.body?.image_url, 500);
      const alt = clean(req.body?.alt, 200);
      if (!title || !image_url || !alt) {
        return res.status(400).json({ error: 'Title, image URL and alt text are required.' });
      }
      const { data, error } = await supabase
        .from('gallery_items')
        .insert({ title, category, image_url, alt })
        .select()
        .single();
      if (error) throw error;
      return res.status(201).json(data);
    }

    if (req.method === 'DELETE') {
      const user = await requireAdmin(req, res);
      if (!user) return;
      const id = Number(req.body?.id ?? req.query?.id);
      if (!Number.isInteger(id)) return res.status(400).json({ error: 'Invalid id' });
      const { error } = await supabase.from('gallery_items').delete().eq('id', id);
      if (error) throw error;
      return res.status(200).json({ ok: true });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    console.error('gallery API error:', err);
    return res.status(500).json({ error: 'Server error' });
  }
}
