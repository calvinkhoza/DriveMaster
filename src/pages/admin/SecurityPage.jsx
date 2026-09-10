import { useState } from 'react';
import {
  Shield, Lock, Unlock, Key, AlertTriangle,
  CheckCircle, Eye, EyeOff, Clock, Search,
} from 'lucide-react';

const tickets = [
  { id: 'TKT-041', user: 'Sipho M.',   email: 'sipho@email.com',    type: 'Password Reset', time: '5m ago',  status: 'open',     priority: 'medium' },
  { id: 'TKT-040', user: 'Lethiwe K.', email: 'lethiwe@email.com',  type: 'Account Locked', time: '22m ago', status: 'open',     priority: 'high' },
  { id: 'TKT-039', user: 'Ntokozo S.', email: 'ntokozo@email.com',  type: 'Payment Issue',  time: '1h ago',  status: 'open',     priority: 'high' },
  { id: 'TKT-038', user: 'Zanele D.',  email: 'zanele@email.com',   type: 'Login Help',     time: '2h ago',  status: 'resolved', priority: 'low' },
  { id: 'TKT-037', user: 'Amahle N.', email: 'amahle@email.com',   type: 'Password Reset', time: '5h ago',  status: 'resolved', priority: 'medium' },
];

const auditLog = [
  { action: 'Password reset sent',         user: 'amahle@email.com',    admin: 'Admin',  time: '09:05', type: 'reset' },
  { action: 'Account unlocked',            user: 'zanele@email.com',    admin: 'Admin',  time: '08:55', type: 'unlock' },
  { action: 'Account locked — suspicious login', user: 'lethiwe@email.com', admin: 'System', time: '08:30', type: 'lock' },
  { action: 'MFA enabled for account',    user: 'keabetswe@email.com', admin: 'Admin',  time: 'Yesterday', type: 'mfa' },
];

const priorityColors = {
  high:   'bg-red-500/20 text-red-400',
  medium: 'bg-yellow-500/20 text-yellow-400',
  low:    'bg-green-500/20 text-green-400',
};

export default function SecurityPage() {
  const [search, setSearch]     = useState('');
  const [showPw, setShowPw]     = useState({});
  const [resolved, setResolved] = useState(new Set(['TKT-038', 'TKT-037']));

  const filtered = tickets.filter(t =>
    t.user.toLowerCase().includes(search.toLowerCase()) ||
    t.type.toLowerCase().includes(search.toLowerCase())
  );

  const toggleResolve = id => setResolved(prev => {
    const next = new Set(prev);
    next.has(id) ? next.delete(id) : next.add(id);
    return next;
  });

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="section-title">Account Security & Recovery</h1>
        <p className="section-subtitle">Password resets, account unlocks, and support tickets</p>
      </div>

      {/* Quick actions */}
      <div className="grid sm:grid-cols-3 gap-4">
        {[
          { icon: Key,    color: 'text-blue-400',   bg: 'bg-blue-500/10',   label: 'Reset Password',  sub: 'Send reset link to user' },
          { icon: Unlock, color: 'text-green-400',  bg: 'bg-green-500/10',  label: 'Unlock Account',  sub: 'Re-enable locked accounts' },
          { icon: Shield, color: 'text-purple-400', bg: 'bg-purple-500/10', label: 'Force MFA',       sub: 'Require 2FA on next login' },
        ].map(({ icon: Icon, color, bg, label, sub }) => (
          <button key={label} className="card text-left hover:border-white/20 transition-colors group">
            <div className={`w-10 h-10 ${bg} rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
              <Icon size={18} className={color} />
            </div>
            <p className="font-semibold text-white text-sm">{label}</p>
            <p className="text-xs text-gray-500 mt-0.5">{sub}</p>
          </button>
        ))}
      </div>

      {/* Tickets */}
      <div className="card">
        <div className="flex items-center justify-between mb-5">
          <h3 className="font-bold text-white flex items-center gap-2">
            <AlertTriangle size={15} className="text-yellow-400" /> Support Tickets
          </h3>
          <div className="relative w-52">
            <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
            <input value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Search…" className="input py-2 pl-9 text-xs" />
          </div>
        </div>
        <div className="space-y-3">
          {filtered.map(t => {
            const isResolved = resolved.has(t.id);
            return (
              <div key={t.id} className={`p-4 rounded-xl border transition-colors ${isResolved ? 'border-white/5 opacity-60' : 'border-white/10 bg-white/5'}`}>
                <div className="flex items-start gap-3">
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${
                    t.type === 'Account Locked' ? 'bg-red-500/20' : 'bg-blue-500/20'
                  }`}>
                    {t.type === 'Account Locked' ? <Lock size={15} className="text-red-400" /> : <Key size={15} className="text-blue-400" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-0.5">
                      <p className="text-sm font-semibold text-white">{t.user}</p>
                      <span className="text-xs text-gray-500 font-mono">{t.id}</span>
                      <span className={`badge text-[10px] ${priorityColors[t.priority]}`}>{t.priority}</span>
                    </div>
                    <p className="text-sm text-gray-300">{t.type}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{t.email} · {t.time}</p>
                  </div>
                  <div className="flex gap-2 flex-shrink-0">
                    <button
                      onClick={() => toggleResolve(t.id)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                        isResolved
                          ? 'bg-white/5 text-gray-500 hover:bg-white/10'
                          : 'bg-green-500/20 text-green-400 hover:bg-green-500/30'
                      }`}
                    >
                      <CheckCircle size={12} />
                      {isResolved ? 'Re-open' : 'Resolve'}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Audit log */}
      <div className="card">
        <h3 className="font-bold text-white mb-5 flex items-center gap-2">
          <Clock size={15} className="text-gray-400" /> Security Audit Log
        </h3>
        <div className="space-y-3">
          {auditLog.map((entry, i) => (
            <div key={i} className="flex items-start gap-3 py-2.5 border-b border-white/5 last:border-0">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                entry.type === 'lock'   ? 'bg-red-500/10' :
                entry.type === 'unlock' ? 'bg-green-500/10' :
                entry.type === 'mfa'   ? 'bg-purple-500/10' :
                                         'bg-blue-500/10'
              }`}>
                {entry.type === 'lock'   ? <Lock size={13} className="text-red-400" />     :
                 entry.type === 'unlock' ? <Unlock size={13} className="text-green-400" /> :
                 entry.type === 'mfa'    ? <Shield size={13} className="text-purple-400" /> :
                                           <Key size={13} className="text-blue-400" />
                }
              </div>
              <div className="flex-1">
                <p className="text-sm text-white font-medium">{entry.action}</p>
                <p className="text-xs text-gray-500 mt-0.5">
                  User: <span className="text-gray-400">{entry.user}</span> · By: <span className="text-gray-400">{entry.admin}</span>
                </p>
              </div>
              <span className="text-xs text-gray-600 flex-shrink-0 font-mono">{entry.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
