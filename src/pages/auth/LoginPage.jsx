import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, BookOpen, ArrowRight, Loader2 } from 'lucide-react';
import { useApp } from '../../context/AppContext';

/* Demo accounts — role is set by email prefix */
const DEMO_ACCOUNTS = [
  { email: 'student@demo.com',    password: 'demo1234', role: 'student',    name: 'Amahle Ndlovu' },
  { email: 'instructor@demo.com', password: 'demo1234', role: 'instructor', name: 'Themba Dlamini' },
  { email: 'admin@demo.com',      password: 'demo1234', role: 'admin',      name: 'Admin User' },
];

export default function LoginPage() {
  const { login } = useApp();
  const navigate = useNavigate();

  const [form, setForm]       = useState({ email: '', password: '' });
  const [showPw, setShowPw]   = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState('');

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    await new Promise(r => setTimeout(r, 900)); // simulate network

    const match = DEMO_ACCOUNTS.find(
      a => a.email === form.email && a.password === form.password
    );

    if (!match) {
      setError('Incorrect email or password. Try a demo account below.');
      setLoading(false);
      return;
    }

    login({ name: match.name, email: match.email, role: match.role, plan: 'Pro' });
    navigate(`/${match.role}`);
  };

  const quickLogin = (acc) => {
    setForm({ email: acc.email, password: acc.password });
    setError('');
  };

  return (
    <div className="min-h-screen bg-gray-950 flex">
      {/* Left panel */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-gradient-to-br from-primary-900 via-dark-800 to-gray-950 p-12 flex-col justify-between overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-32 -right-32 w-80 h-80 bg-primary-500/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-accent-500/10 rounded-full blur-3xl" />
        </div>

        <Link to="/" className="relative flex items-center gap-2.5">
          <div className="w-9 h-9 bg-primary-600 rounded-xl flex items-center justify-center shadow-lg">
            <BookOpen size={18} className="text-white" />
          </div>
          <div>
            <span className="font-bold text-white">K53 DriveMaster</span>
            <span className="block text-xs text-primary-400">Academy</span>
          </div>
        </Link>

        <div className="relative">
          <h2 className="text-4xl font-black text-white leading-tight mb-4">
            Welcome back.<br />
            <span className="text-primary-400">Keep studying.</span>
          </h2>
          <p className="text-gray-400 leading-relaxed mb-8">
            Your progress, mock exams, and live sessions are waiting. Jump back in where you left off.
          </p>

          {/* Stat cards */}
          <div className="grid grid-cols-2 gap-3">
            {[
              { value: '94%', label: 'Pass rate' },
              { value: '12K+', label: 'Students' },
              { value: '1 000+', label: 'Questions' },
              { value: '24/7', label: 'AI Support' },
            ].map(s => (
              <div key={s.label} className="bg-white/5 border border-white/10 rounded-xl p-3">
                <p className="text-2xl font-black text-white">{s.value}</p>
                <p className="text-xs text-gray-400">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        <p className="relative text-xs text-gray-600">
          © 2026 K53 DriveMaster Academy. Secure login protected by SSL.
        </p>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <Link to="/" className="flex lg:hidden items-center gap-2.5 mb-8">
            <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
              <BookOpen size={16} className="text-white" />
            </div>
            <span className="font-bold text-white">K53 DriveMaster Academy</span>
          </Link>

          <h1 className="text-3xl font-black text-white mb-1">Sign In</h1>
          <p className="text-gray-400 mb-8">
            New to DriveMaster?{' '}
            <Link to="/register" className="text-primary-400 hover:text-primary-300 font-medium">
              Create an account
            </Link>
          </p>

          {/* Error */}
          {error && (
            <div className="mb-5 p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-sm text-red-400">
              {error}
            </div>
          )}

          <form onSubmit={submit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">Email address</label>
              <input
                type="email" name="email" required
                value={form.email} onChange={handle}
                placeholder="you@email.com"
                className="input"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-sm font-medium text-gray-300">Password</label>
                <button type="button" className="text-xs text-primary-400 hover:text-primary-300">
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <input
                  type={showPw ? 'text' : 'password'} name="password" required
                  value={form.password} onChange={handle}
                  placeholder="••••••••"
                  className="input pr-11"
                />
                <button
                  type="button" onClick={() => setShowPw(!showPw)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
                >
                  {showPw ? <EyeOff size={17} /> : <Eye size={17} />}
                </button>
              </div>
            </div>

            <button type="submit" disabled={loading} className="btn-primary w-full justify-center py-3 mt-2 disabled:opacity-60">
              {loading ? <Loader2 size={18} className="animate-spin" /> : null}
              {loading ? 'Signing in…' : 'Sign In'}
              {!loading && <ArrowRight size={16} />}
            </button>
          </form>

          {/* Demo accounts */}
          <div className="mt-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex-1 h-px bg-white/10" />
              <span className="text-xs text-gray-600 font-medium">Quick demo login</span>
              <div className="flex-1 h-px bg-white/10" />
            </div>
            <div className="grid grid-cols-3 gap-2">
              {DEMO_ACCOUNTS.map(acc => (
                <button
                  key={acc.role}
                  onClick={() => quickLogin(acc)}
                  className="p-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-xs font-medium transition-colors text-center"
                >
                  <span className={`block mb-0.5 ${
                    acc.role === 'student' ? 'text-blue-400'
                    : acc.role === 'instructor' ? 'text-purple-400'
                    : 'text-red-400'
                  }`}>
                    {acc.role.charAt(0).toUpperCase() + acc.role.slice(1)}
                  </span>
                  <span className="text-gray-500 text-[10px] leading-tight block">Click to fill</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
