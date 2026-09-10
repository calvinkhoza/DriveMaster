import { useState } from 'react';
import {
  Search, Eye, Lock, Unlock, Mail, UserX,
  Shield, CheckCircle, XCircle, Filter,
} from 'lucide-react';
import { students } from '../../data/mockData';

export default function UserManagement() {
  const [search, setSearch]       = useState('');
  const [statusFilter, setFilter] = useState('All');
  const [locked, setLocked]       = useState(new Set([4])); // Lethiwe pre-locked

  const filtered = students.filter(s => {
    const matchSearch = s.name.toLowerCase().includes(search.toLowerCase()) ||
                        s.email.toLowerCase().includes(search.toLowerCase());
    const matchStatus =
      statusFilter === 'All'      ? true :
      statusFilter === 'Active'   ? s.status === 'active' :
      statusFilter === 'Inactive' ? s.status === 'inactive' :
      statusFilter === 'Locked'   ? locked.has(s.id) : true;
    return matchSearch && matchStatus;
  });

  const toggleLock = (id) => setLocked(prev => {
    const next = new Set(prev);
    next.has(id) ? next.delete(id) : next.add(id);
    return next;
  });

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="section-title">User Management</h1>
        <p className="section-subtitle">Search, view, edit, and manage all student accounts</p>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total',    value: students.length, color: 'text-white' },
          { label: 'Active',   value: students.filter(s => s.status === 'active').length, color: 'text-green-400' },
          { label: 'Inactive', value: students.filter(s => s.status === 'inactive').length, color: 'text-yellow-400' },
          { label: 'Locked',   value: locked.size, color: 'text-red-400' },
        ].map(({ label, value, color }) => (
          <div key={label} className="card text-center py-4">
            <p className={`text-2xl font-black ${color}`}>{value}</p>
            <p className="text-xs text-gray-400 mt-0.5">{label}</p>
          </div>
        ))}
      </div>

      {/* Search & filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500" />
          <input value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Search by name or email…" className="input pl-10 text-sm" />
        </div>
        <div className="flex gap-2">
          {['All', 'Active', 'Inactive', 'Locked'].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-2 text-xs font-medium rounded-xl border transition-colors ${
                statusFilter === f
                  ? 'bg-primary-600 border-primary-500 text-white'
                  : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="card p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[640px]">
            <thead>
              <tr className="border-b border-white/10 bg-white/5">
                {['User', 'Plan', 'Progress', 'Joined', 'Status', 'Actions'].map(h => (
                  <th key={h} className="text-left text-xs font-medium text-gray-500 px-5 py-3.5">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map(s => {
                const isLocked = locked.has(s.id);
                return (
                  <tr key={s.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary-600 to-accent-500 flex items-center justify-center text-sm font-bold text-white">
                            {s.name[0]}
                          </div>
                          {isLocked && (
                            <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
                              <Lock size={8} className="text-white" />
                            </div>
                          )}
                        </div>
                        <div>
                          <p className="font-medium text-white">{s.name}</p>
                          <p className="text-xs text-gray-500">{s.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className={`badge text-xs ${
                        s.plan === 'Premium' ? 'bg-orange-500/20 text-orange-300' :
                        s.plan === 'Pro'     ? 'bg-purple-500/20 text-purple-300' :
                                              'bg-blue-500/20 text-blue-300'
                      }`}>{s.plan}</span>
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-2">
                        <div className="w-16 progress-bar">
                          <div className={`progress-fill ${s.progress > 70 ? 'bg-green-500' : 'bg-primary-500'}`}
                            style={{ width: `${s.progress}%` }} />
                        </div>
                        <span className="text-xs text-gray-400">{s.progress}%</span>
                      </div>
                    </td>
                    <td className="px-5 py-3.5 text-xs text-gray-400">{s.joined}</td>
                    <td className="px-5 py-3.5">
                      {isLocked ? (
                        <span className="badge bg-red-500/20 text-red-400 text-xs"><Lock size={10} /> Locked</span>
                      ) : (
                        <span className={`badge text-xs ${s.status === 'active' ? 'bg-green-500/20 text-green-400' : 'bg-gray-700 text-gray-400'}`}>
                          {s.status === 'active' ? <><CheckCircle size={10} /> Active</> : <><XCircle size={10} /> Inactive</>}
                        </span>
                      )}
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="flex gap-1">
                        <button className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors" title="View">
                          <Eye size={13} />
                        </button>
                        <button className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors" title="Send email">
                          <Mail size={13} />
                        </button>
                        <button
                          onClick={() => toggleLock(s.id)}
                          className={`p-1.5 rounded-lg transition-colors ${isLocked ? 'bg-green-500/10 hover:bg-green-500/20 text-green-400' : 'bg-white/5 hover:bg-red-500/10 text-gray-400 hover:text-red-400'}`}
                          title={isLocked ? 'Unlock account' : 'Lock account'}
                        >
                          {isLocked ? <Unlock size={13} /> : <Lock size={13} />}
                        </button>
                        <button className="p-1.5 rounded-lg bg-white/5 hover:bg-blue-500/10 text-gray-400 hover:text-blue-400 transition-colors" title="Reset password">
                          <Shield size={13} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
