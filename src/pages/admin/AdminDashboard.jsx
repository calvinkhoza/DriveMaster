import { Link } from 'react-router-dom';
import {
  Users, Shield, Activity, Bell, AlertTriangle,
  CheckCircle, XCircle, TrendingUp, Server,
  ChevronRight, ArrowUpRight, Eye, Lock,
} from 'lucide-react';
import {
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer,
} from 'recharts';
import { students } from '../../data/mockData';

const uptimeData = [
  { time: '00:00', uptime: 100 },
  { time: '03:00', uptime: 100 },
  { time: '06:00', uptime: 98.2 },
  { time: '09:00', uptime: 100 },
  { time: '12:00', uptime: 100 },
  { time: '15:00', uptime: 99.1 },
  { time: '18:00', uptime: 100 },
  { time: '21:00', uptime: 100 },
  { time: 'Now',   uptime: 100 },
];

const systemServices = [
  { name: 'Web Application',   status: 'operational', latency: '42ms' },
  { name: 'Payment Gateway',   status: 'operational', latency: '180ms' },
  { name: 'Video CDN',         status: 'operational', latency: '28ms' },
  { name: 'AI Tutor API',      status: 'operational', latency: '320ms' },
  { name: 'Database',          status: 'operational', latency: '12ms' },
  { name: 'Email Service',     status: 'degraded',    latency: '850ms' },
];

const recentTickets = [
  { id: 'TKT-041', user: 'Sipho M.',    type: 'Password Reset',  time: '5m ago',  priority: 'medium' },
  { id: 'TKT-040', user: 'Lethiwe K.',  type: 'Account Locked',  time: '22m ago', priority: 'high' },
  { id: 'TKT-039', user: 'Ntokozo S.',  type: 'Payment Issue',   time: '1h ago',  priority: 'high' },
  { id: 'TKT-038', user: 'Zanele D.',   type: 'Login Help',      time: '2h ago',  priority: 'low' },
];

const priorityColors = {
  high:   'bg-red-500/20 text-red-400',
  medium: 'bg-yellow-500/20 text-yellow-400',
  low:    'bg-green-500/20 text-green-400',
};

export default function AdminDashboard() {
  const activeUsers   = students.filter(s => s.status === 'active').length;
  const inactiveUsers = students.filter(s => s.status === 'inactive').length;

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-white">Admin Overview</h1>
          <p className="text-gray-400 mt-1">System health, users, and support tickets</p>
        </div>
        <Link to="/admin/broadcast" className="btn-primary text-sm py-2 px-4">
          <Bell size={14} /> Broadcast Message
        </Link>
      </div>

      {/* System status banner */}
      <div className="flex items-center gap-3 p-4 bg-green-500/10 border border-green-500/20 rounded-2xl">
        <CheckCircle size={18} className="text-green-400 flex-shrink-0" />
        <div className="flex-1">
          <p className="text-sm font-semibold text-green-300">All systems operational</p>
          <p className="text-xs text-gray-400">Last checked: just now · 99.8% uptime this month</p>
        </div>
        <Link to="/admin/monitoring" className="text-xs text-primary-400 hover:text-primary-300 flex items-center gap-1 flex-shrink-0">
          View monitor <ChevronRight size={11} />
        </Link>
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Users',    value: students.length, sub: '+5 this week',       icon: Users,         color: 'text-blue-400',   bg: 'bg-blue-500/10',   up: true },
          { label: 'Active Users',   value: activeUsers,     sub: `${inactiveUsers} inactive`, icon: Activity, color: 'text-green-400', bg: 'bg-green-500/10',  up: false },
          { label: 'Open Tickets',   value: 4,               sub: '2 high priority',    icon: AlertTriangle, color: 'text-yellow-400', bg: 'bg-yellow-500/10', up: false },
          { label: 'System Uptime',  value: '99.8%',         sub: 'Last 30 days',       icon: Server,        color: 'text-purple-400', bg: 'bg-purple-500/10', up: true },
        ].map(({ label, value, sub, icon: Icon, color, bg, up }) => (
          <div key={label} className="card flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <p className="text-xs font-medium text-gray-400">{label}</p>
              <div className={`w-8 h-8 ${bg} rounded-lg flex items-center justify-center`}>
                <Icon size={15} className={color} />
              </div>
            </div>
            <p className="text-3xl font-black text-white">{value}</p>
            <p className={`text-xs flex items-center gap-1 ${up ? 'text-green-400' : 'text-gray-500'}`}>
              {up && <ArrowUpRight size={12} />}{sub}
            </p>
          </div>
        ))}
      </div>

      {/* Charts row */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Uptime chart */}
        <div className="lg:col-span-2 card">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="font-bold text-white">System Uptime — Today</h3>
              <p className="text-xs text-gray-400 mt-0.5">Real-time availability</p>
            </div>
            <span className="badge bg-green-500/20 text-green-400">Live</span>
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <AreaChart data={uptimeData}>
              <defs>
                <linearGradient id="upGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="#10b981" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="time" tick={{ fill: '#6b7280', fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis domain={[95, 100]} tick={{ fill: '#6b7280', fontSize: 10 }} axisLine={false} tickLine={false}
                tickFormatter={v => `${v}%`} />
              <Tooltip contentStyle={{ background: '#1e293b', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 10, color: '#fff' }}
                formatter={v => [`${v}%`, 'Uptime']} />
              <Area type="monotone" dataKey="uptime" stroke="#10b981" strokeWidth={2.5}
                fill="url(#upGrad)" dot={false} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Services status */}
        <div className="card">
          <h3 className="font-bold text-white mb-4">Services</h3>
          <div className="space-y-2.5">
            {systemServices.map(s => (
              <div key={s.name} className="flex items-center gap-2.5 py-1.5 border-b border-white/5 last:border-0">
                <div className={`w-2 h-2 rounded-full flex-shrink-0 ${s.status === 'operational' ? 'bg-green-400' : 'bg-yellow-400 animate-pulse'}`} />
                <span className="flex-1 text-sm text-gray-300 truncate">{s.name}</span>
                <span className="text-[11px] text-gray-500 font-mono">{s.latency}</span>
                {s.status !== 'operational' && (
                  <span className="badge bg-yellow-500/20 text-yellow-400 text-[9px]">⚠</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Support tickets + recent users */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Tickets */}
        <div className="card">
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-bold text-white">Support Tickets</h3>
            <Link to="/admin/security" className="text-xs text-primary-400 hover:text-primary-300 flex items-center gap-1">
              View all <ChevronRight size={12} />
            </Link>
          </div>
          <div className="space-y-3">
            {recentTickets.map(t => (
              <div key={t.id} className="flex items-center gap-3 p-3 bg-white/5 rounded-xl border border-white/10 hover:border-white/20 transition-colors cursor-pointer">
                <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  {t.type === 'Account Locked' ? <Lock size={14} className="text-red-400" /> : <Shield size={14} className="text-blue-400" />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white truncate">{t.user} — {t.type}</p>
                  <p className="text-xs text-gray-500">{t.id} · {t.time}</p>
                </div>
                <span className={`badge text-[10px] flex-shrink-0 ${priorityColors[t.priority]}`}>{t.priority}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent users */}
        <div className="card">
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-bold text-white">Recent Users</h3>
            <Link to="/admin/users" className="text-xs text-primary-400 hover:text-primary-300 flex items-center gap-1">
              Manage all <ChevronRight size={12} />
            </Link>
          </div>
          <div className="space-y-3">
            {students.slice(0, 5).map(s => (
              <div key={s.id} className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-600 to-accent-500 flex items-center justify-center text-xs font-bold text-white flex-shrink-0">
                  {s.name[0]}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white truncate">{s.name}</p>
                  <p className="text-xs text-gray-500 truncate">{s.email}</p>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <span className="badge bg-purple-500/20 text-purple-300 text-[10px]">{s.plan}</span>
                  <div className={`w-2 h-2 rounded-full ${s.status === 'active' ? 'bg-green-400' : 'bg-gray-600'}`} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
