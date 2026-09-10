import { useState } from 'react';
import { Search, Filter, ChevronDown, Mail, Eye } from 'lucide-react';
import { students } from '../../data/mockData';

const planColors = {
  Basic:   'bg-blue-500/20 text-blue-300',
  Pro:     'bg-purple-500/20 text-purple-300',
  Premium: 'bg-orange-500/20 text-orange-300',
};

export default function InstructorStudents() {
  const [search, setSearch] = useState('');
  const [planFilter, setPlanFilter] = useState('All');

  const filtered = students.filter(s => {
    const matchSearch = s.name.toLowerCase().includes(search.toLowerCase()) ||
                        s.email.toLowerCase().includes(search.toLowerCase());
    const matchPlan = planFilter === 'All' || s.plan === planFilter;
    return matchSearch && matchPlan;
  });

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="section-title">Students</h1>
        <p className="section-subtitle">Manage and monitor enrolled students</p>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Students', value: students.length,                            color: 'text-blue-400' },
          { label: 'Active',         value: students.filter(s => s.status === 'active').length, color: 'text-green-400' },
          { label: 'Pro / Premium',  value: students.filter(s => s.plan !== 'Basic').length,   color: 'text-purple-400' },
          { label: 'Avg. Progress',  value: `${Math.round(students.reduce((a,s)=>a+s.progress,0)/students.length)}%`, color: 'text-orange-400' },
        ].map(({ label, value, color }) => (
          <div key={label} className="card">
            <p className="text-xs text-gray-400 mb-1">{label}</p>
            <p className={`text-2xl font-black ${color}`}>{value}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500" />
          <input value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Search students…" className="input pl-10 text-sm" />
        </div>
        <div className="flex gap-2">
          {['All', 'Basic', 'Pro', 'Premium'].map(p => (
            <button
              key={p}
              onClick={() => setPlanFilter(p)}
              className={`px-3 py-2 text-xs font-medium rounded-xl border transition-colors ${
                planFilter === p ? 'bg-primary-600 border-primary-500 text-white' : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10'
              }`}
            >
              {p}
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
                {['Student', 'Plan', 'Progress', 'Best Score', 'Joined', 'Status', ''].map(h => (
                  <th key={h} className="text-left text-xs font-medium text-gray-500 px-5 py-3.5">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map(s => (
                <tr key={s.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-600 to-accent-500 flex items-center justify-center text-xs font-bold text-white flex-shrink-0">
                        {s.name[0]}
                      </div>
                      <div>
                        <p className="font-medium text-white text-sm">{s.name}</p>
                        <p className="text-xs text-gray-500">{s.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3.5">
                    <span className={`badge text-xs ${planColors[s.plan]}`}>{s.plan}</span>
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-2">
                      <div className="w-20 progress-bar">
                        <div className={`progress-fill ${s.progress > 70 ? 'bg-green-500' : s.progress > 40 ? 'bg-primary-500' : 'bg-yellow-500'}`}
                          style={{ width: `${s.progress}%` }} />
                      </div>
                      <span className="text-xs text-gray-400">{s.progress}%</span>
                    </div>
                  </td>
                  <td className="px-5 py-3.5">
                    <span className={`text-sm font-semibold ${s.score >= 75 ? 'text-green-400' : 'text-yellow-400'}`}>
                      {s.score}%
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-xs text-gray-400">{s.joined}</td>
                  <td className="px-5 py-3.5">
                    <span className={`badge text-xs ${s.status === 'active' ? 'bg-green-500/20 text-green-400' : 'bg-gray-700 text-gray-400'}`}>
                      {s.status}
                    </span>
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex gap-1">
                      <button className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors">
                        <Eye size={13} />
                      </button>
                      <button className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors">
                        <Mail size={13} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
