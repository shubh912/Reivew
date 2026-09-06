import supabase from './db-client.js';
import { requireAdmin, setCors } from './_auth.js';

const ALLOWED_KEYS = ['working_hours', 'announcement'];

export default async function handler(req, res) {
  if (setCors(req, res)) return;

  try {
    if (req.method === 'GET') {
      const { data, error } = await supabase.from('site_settings').select('key, value');
      if (error) throw error;
      const map = {};
      (data || []).forEach((row) => {
        if (ALLOWED_KEYS.includes(row.key)) map[row.key] = row.value;
      });
      return res.status(200).json(map);
    }

    if (req.method === 'PUT') {
      const user = await requireAdmin(req, res);
      if (!user) return;
      const key = String(req.body?.key || '');
      const value = String(req.body?.value ?? '')
        .replace(/<[^>]*>/g, '')
        .trim()
        .slice(0, 300);
      if (!ALLOWED_KEYS.includes(key)) return res.status(400).json({ error: 'Unknown setting key' });
      const { data, error } = await supabase
        .from('site_settings')
        .upsert({ key, value, updated_at: new Date().toISOString() }, { onConflict: 'key' })
        .select()
        .single();
      if (error) throw error;
      return res.status(200).json(data);
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    console.error('settings API error:', err);
    return res.status(500).json({ error: 'Server error' });
  }
}
