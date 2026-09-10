import { Link } from 'react-router-dom';
import {
  Users, DollarSign, PlayCircle, TrendingUp, Eye,
  ChevronRight, Plus, Star, BarChart2, Calendar,
  ArrowUpRight, Video,
} from 'lucide-react';
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis,
  Tooltip, ResponsiveContainer, Cell,
} from 'recharts';
import { revenueData, planBreakdown, courses, liveSessions, students } from '../../data/mockData';

const PLAN_COLORS = { Basic: '#3b82f6', Pro: '#8b5cf6', Premium: '#f97316', Lifetime: '#10b981' };

export default function InstructorDashboard() {
  const totalRevenue = revenueData.reduce((a, b) => a + b.revenue, 0);
  const totalStudents = revenueData[revenueData.length - 1].students;

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-white">Instructor Dashboard</h1>
          <p className="text-gray-400 mt-1">Welcome back, Themba — here's your platform overview</p>
        </div>
        <div className="flex gap-3">
          <Link to="/instructor/content" className="btn-secondary text-sm py-2 px-4">
            <Video size={14} /> Manage Content
          </Link>
          <Link to="/instructor/live" className="btn-primary text-sm py-2 px-4">
            <Plus size={14} /> New Session
          </Link>
        </div>
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            label: 'Total Revenue',    value: `R ${(totalRevenue / 1000).toFixed(1)}k`,
            sub: '+16% vs last month', icon: DollarSign,
            color: 'text-green-400',   bg: 'bg-green-500/10', trend: true,
          },
          {
            label: 'Active Students',  value: totalStudents,
            sub: '81 this month',      icon: Users,
            color: 'text-blue-400',    bg: 'bg-blue-500/10',  trend: true,
          },
          {
            label: 'Total Courses',    value: courses.length,
            sub: `${courses.reduce((a, b) => a + b.lessons, 0)} lessons`,
            icon: PlayCircle,
            color: 'text-purple-400',  bg: 'bg-purple-500/10', trend: false,
          },
          {
            label: 'Avg. Rating',      value: '4.9',
            sub: 'From 340 reviews',   icon: Star,
            color: 'text-yellow-400',  bg: 'bg-yellow-500/10', trend: false,
          },
        ].map(({ label, value, sub, icon: Icon, color, bg, trend }) => (
          <div key={label} className="card flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <p className="text-xs font-medium text-gray-400">{label}</p>
              <div className={`w-8 h-8 ${bg} rounded-lg flex items-center justify-center`}>
                <Icon size={15} className={color} />
              </div>
            </div>
            <p className="text-3xl font-black text-white">{value}</p>
            <p className={`text-xs flex items-center gap-1 ${trend ? 'text-green-400' : 'text-gray-500'}`}>
              {trend && <ArrowUpRight size={12} />}{sub}
            </p>
          </div>
        ))}
      </div>

      {/* Revenue + Plan breakdown */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Revenue chart */}
        <div className="lg:col-span-2 card">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="font-bold text-white">Revenue Overview</h3>
              <p className="text-xs text-gray-400 mt-0.5">Last 6 months · ZAR</p>
            </div>
            <Link to="/instructor/revenue" className="text-xs text-primary-400 hover:text-primary-300 flex items-center gap-1">
              Full report <ChevronRight size={12} />
            </Link>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={revenueData}>
              <defs>
                <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="#8b5cf6" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="month" tick={{ fill: '#6b7280', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#6b7280', fontSize: 11 }} axisLine={false} tickLine={false}
                tickFormatter={v => `R${(v/1000).toFixed(0)}k`} />
              <Tooltip
                contentStyle={{ background: '#1e293b', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12, color: '#fff' }}
                formatter={v => [`R ${v.toLocaleString()}`, 'Revenue']}
              />
              <Area type="monotone" dataKey="revenue" stroke="#8b5cf6" strokeWidth={2.5}
                fill="url(#revGrad)" dot={{ fill: '#8b5cf6', r: 4, strokeWidth: 0 }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Plan breakdown */}
        <div className="card">
          <h3 className="font-bold text-white mb-5">Students by Plan</h3>
          <ResponsiveContainer width="100%" height={160}>
            <BarChart data={planBreakdown} barSize={32}>
              <XAxis dataKey="name" tick={{ fill: '#6b7280', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#6b7280', fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{ background: '#1e293b', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 10, color: '#fff' }}
                formatter={v => [v, 'Students']}
              />
              <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                {planBreakdown.map((entry) => (
                  <Cell key={entry.name} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          <div className="space-y-2 mt-4">
            {planBreakdown.map(p => (
              <div key={p.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: p.color }} />
                  <span className="text-sm text-gray-300">{p.name}</span>
                </div>
                <span className="text-sm font-semibold text-white">{p.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Students + sessions */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent students */}
        <div className="card">
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-bold text-white">Recent Students</h3>
            <Link to="/instructor/students" className="text-xs text-primary-400 hover:text-primary-300 flex items-center gap-1">
              View all <ChevronRight size={12} />
            </Link>
          </div>
          <div className="space-y-3">
            {students.slice(0, 5).map(s => (
              <div key={s.id} className="flex items-center gap-3 py-2 border-b border-white/5 last:border-0">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-600 to-accent-500 flex items-center justify-center text-xs font-bold text-white flex-shrink-0">
                  {s.name[0]}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white truncate">{s.name}</p>
                  <p className="text-xs text-gray-500">{s.plan} · Joined {s.joined}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-sm font-semibold text-white">{s.progress}%</p>
                  <p className="text-[10px] text-gray-500">progress</p>
                </div>
                <div className={`w-2 h-2 rounded-full flex-shrink-0 ${s.status === 'active' ? 'bg-green-400' : 'bg-gray-600'}`} />
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming sessions */}
        <div className="card">
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-bold text-white">Scheduled Sessions</h3>
            <Link to="/instructor/live" className="text-xs text-primary-400 hover:text-primary-300 flex items-center gap-1">
              Manage <ChevronRight size={12} />
            </Link>
          </div>
          <div className="space-y-3">
            {liveSessions.filter(s => s.status !== 'completed').map(s => (
              <div key={s.id} className="flex items-center gap-3 p-3 bg-white/5 rounded-xl border border-white/10">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                  s.status === 'live' ? 'bg-red-500/20' : 'bg-primary-500/20'
                }`}>
                  <Calendar size={16} className={s.status === 'live' ? 'text-red-400' : 'text-primary-400'} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-white truncate">{s.title}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{s.date} · {s.time} · {s.attendees} enrolled</p>
                </div>
                {s.status === 'live' && (
                  <span className="badge bg-red-500/20 text-red-400 text-[10px] animate-pulse flex-shrink-0">LIVE</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Course performance */}
      <div className="card">
        <div className="flex items-center justify-between mb-5">
          <h3 className="font-bold text-white flex items-center gap-2">
            <BarChart2 size={16} className="text-purple-400" /> Course Performance
          </h3>
          <Link to="/instructor/analytics" className="text-xs text-primary-400 hover:text-primary-300 flex items-center gap-1">
            Analytics <ChevronRight size={12} />
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[500px]">
            <thead>
              <tr className="border-b border-white/10">
                {['Course', 'Students', 'Completion', 'Avg. Score', 'Status'].map(h => (
                  <th key={h} className="text-left text-xs font-medium text-gray-500 pb-3 pr-4">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {courses.map(c => (
                <tr key={c.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="py-3 pr-4">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg overflow-hidden bg-dark-700 flex-shrink-0">
                        <img src={c.thumbnail} alt="" className="w-full h-full object-cover" />
                      </div>
                      <span className="font-medium text-white text-xs truncate max-w-[140px]">{c.title}</span>
                    </div>
                  </td>
                  <td className="py-3 pr-4 text-gray-300 text-xs">{Math.floor(Math.random() * 60) + 20}</td>
                  <td className="py-3 pr-4">
                    <div className="flex items-center gap-2">
                      <div className="w-16 progress-bar">
                        <div className="progress-fill bg-purple-500" style={{ width: `${c.progress || 35}%` }} />
                      </div>
                      <span className="text-xs text-gray-400">{c.progress || 35}%</span>
                    </div>
                  </td>
                  <td className="py-3 pr-4 text-gray-300 text-xs">{Math.floor(Math.random() * 20) + 70}%</td>
                  <td className="py-3">
                    <span className="badge bg-green-500/20 text-green-400 text-[10px]">Published</span>
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
