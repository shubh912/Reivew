import { useEffect, useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Loader2, AlertTriangle } from 'lucide-react';
import Seo from '../../components/Seo';
import { useAuth } from '../../contexts/AuthContext';
import { BUSINESS } from '../../lib/constants';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && user) navigate('/admin/dashboard', { replace: true });
  }, [user, loading, navigate]);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    await Promise.resolve();
    setSubmitting(false);
    setError('Admin sign-in is currently unavailable.');
  };

  return (
    <>
      <Seo
        title="Admin Login | Saket Packers and Movers Ayodhya"
        description="Secure admin access for Saket Packers and Movers Ayodhya."
        path="/admin"
        noindex
      />
      <main className="board-stripes flex min-h-screen items-center justify-center bg-navy-950 px-4 py-12">
        <div className="w-full max-w-md">
          <div className="text-center">
            <img
              src={BUSINESS.logo}
              alt="Saket Packers and Movers Ayodhya logo"
              width={72}
              height={72}
              className="mx-auto h-[72px] w-[72px] rounded-full bg-white object-contain p-1"
            />
            <h1 className="mt-4 font-display text-2xl font-bold text-white">Admin Dashboard</h1>
            <p className="mt-1 text-sm text-navy-300">{BUSINESS.name}</p>
          </div>
          <form
            onSubmit={onSubmit}
            className="mt-8 rounded-2xl border border-navy-800 bg-navy-900/80 p-6 shadow-2xl backdrop-blur sm:p-8"
          >
            <label htmlFor="admin-email" className="mb-1.5 block text-sm font-semibold text-navy-100">
              Email
            </label>
            <input
              id="admin-email"
              type="email"
              required
              autoComplete="username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border border-navy-700 bg-navy-950 px-4 py-3 text-white placeholder:text-navy-500 focus:border-gold-400 focus:outline-none"
              placeholder="admin email"
            />
            <label htmlFor="admin-password" className="mb-1.5 mt-4 block text-sm font-semibold text-navy-100">
              Password
            </label>
            <input
              id="admin-password"
              type="password"
              required
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl border border-navy-700 bg-navy-950 px-4 py-3 text-white placeholder:text-navy-500 focus:border-gold-400 focus:outline-none"
              placeholder="••••••••"
            />
            {error && (
              <p role="alert" className="mt-3 flex items-center gap-1.5 rounded-lg bg-brand-600/15 px-3 py-2 text-sm font-medium text-brand-100">
                <AlertTriangle className="h-4 w-4" aria-hidden="true" />
                {error}
              </p>
            )}
            <button
              type="submit"
              disabled={submitting || loading}
              className="mt-6 inline-flex min-h-[52px] w-full items-center justify-center gap-2 rounded-xl bg-gold-400 px-5 py-3 font-bold text-navy-900 transition-colors hover:bg-gold-300 disabled:opacity-60"
            >
              {submitting ? (
                <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" />
              ) : (
                <Lock className="h-5 w-5" aria-hidden="true" />
              )}
              {submitting ? 'Signing in…' : 'Sign In'}
            </button>
          </form>
          <p className="mt-4 text-center text-xs text-navy-500">
            Authorised access only. Customer enquiry data is protected.
          </p>
        </div>
      </main>
    </>
  );
}
