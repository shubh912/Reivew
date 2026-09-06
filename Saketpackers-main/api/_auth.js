import { createClient } from '@supabase/supabase-js';

/**
 * Verifies the Bearer token belongs to an authorised admin account.
 * Returns the user object on success, or sends the error response and returns null.
 */
export async function requireAdmin(req, res) {
  const token = (req.headers.authorization || '').replace('Bearer ', '').trim();
  if (!token) {
    res.status(401).json({ error: 'Unauthorized — login required' });
    return null;
  }

  try {
    const client = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      { global: { headers: { Authorization: `Bearer ${token}` } } },
    );
    const {
      data: { user },
      error,
    } = await client.auth.getUser(token);

    if (error || !user) {
      res.status(401).json({ error: 'Invalid or expired session' });
      return null;
    }

    const allowed = (process.env.ADMIN_EMAILS || 'admin@saketpackers.in')
      .split(',')
      .map((s) => s.trim().toLowerCase());

    if (!user.email || !allowed.includes(user.email.toLowerCase())) {
      res.status(403).json({ error: 'This account is not authorised for admin access' });
      return null;
    }

    return user;
  } catch (err) {
    res.status(500).json({ error: 'Auth check failed' });
    return null;
  }
}

export function setCors(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') {
    res.status(204).end();
    return true;
  }
  return false;
}
