import supabase from './db-client.js';
import { requireAdmin, setCors } from './_auth.js';

const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/avif'];

export default async function handler(req, res) {
  if (setCors(req, res)) return;

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const user = await requireAdmin(req, res);
    if (!user) return;

    const { fileName, fileBase64, contentType } = req.body || {};
    if (!fileName || !fileBase64 || !contentType) {
      return res.status(400).json({ error: 'fileName, fileBase64 and contentType are required' });
    }
    if (!ALLOWED_TYPES.includes(contentType)) {
      return res.status(400).json({ error: 'Only JPG, PNG, WebP or AVIF images are allowed' });
    }
    if (fileBase64.length > 6_000_000) {
      return res.status(413).json({ error: 'Image too large (max ~4 MB)' });
    }

    const safeName = String(fileName)
      .replace(/[^a-zA-Z0-9._-]/g, '-')
      .replace(/-+/g, '-')
      .slice(-60);
    const path = `work/${Date.now()}-${safeName}`;
    const buffer = Buffer.from(fileBase64, 'base64');

    const { error } = await supabase.storage
      .from('gallery')
      .upload(path, buffer, { contentType, upsert: false });
    if (error) throw error;

    const { data: urlData } = supabase.storage.from('gallery').getPublicUrl(path);
    return res.status(200).json({ url: urlData.publicUrl });
  } catch (err) {
    console.error('upload API error:', err);
    return res.status(500).json({ error: 'Upload failed' });
  }
}
