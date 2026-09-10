import {
  Server, Wifi, Database, CheckCircle,
  AlertTriangle, Activity, Clock, Zap,
} from 'lucide-react';
import {
  AreaChart, Area, XAxis, YAxis, Tooltip,
  ResponsiveContainer, BarChart, Bar,
} from 'recharts';

const cpuData = Array.from({ length: 24 }, (_, i) => ({
  hour: `${i}:00`,
  cpu: Math.floor(20 + Math.random() * 40),
  mem: Math.floor(45 + Math.random() * 25),
}));

const errorData = [
  { day: 'Mon', errors: 2 },
  { day: 'Tue', errors: 0 },
  { day: 'Wed', errors: 5 },
  { day: 'Thu', errors: 1 },
  { day: 'Fri', errors: 3 },
  { day: 'Sat', errors: 0 },
  { day: 'Sun', errors: 1 },
];

const logs = [
  { time: '09:14:32', level: 'INFO',  msg: 'User amahle@email.com logged in successfully' },
  { time: '09:10:05', level: 'WARN',  msg: 'Email service latency above threshold (850ms)' },
  { time: '08:55:21', level: 'INFO',  msg: 'Scheduled backup completed — 2.3 GB stored' },
  { time: '08:42:17', level: 'ERROR', msg: 'Payment webhook retry #3 — transaction TXN-005' },
  { time: '08:30:00', level: 'INFO',  msg: 'Daily cron: 6 inactive accounts flagged for review' },
  { time: '07:15:44', level: 'INFO',  msg: 'CDN cache purged — video assets refreshed' },
  { time: '06:02:11', level: 'WARN',  msg: 'Uptime check: brief 98.2% dip (network fluctuation)' },
];

const levelColors = {
  INFO:  'text-blue-400 bg-blue-500/10',
  WARN:  'text-yellow-400 bg-yellow-500/10',
  ERROR: 'text-red-400 bg-red-500/10',
};

const services = [
  { name: 'Web App',          status: 'operational', uptime: '99.98%', icon: Wifi,     latency: '42ms' },
  { name: 'Database',         status: 'operational', uptime: '99.99%', icon: Database, latency: '12ms' },
  { name: 'Payment API',      status: 'operational', uptime: '99.90%', icon: Zap,      latency: '180ms' },
  { name: 'Email Service',    status: 'degraded',    uptime: '97.20%', icon: Activity, latency: '850ms' },
  { name: 'AI Tutor API',     status: 'operational', uptime: '99.80%', icon: Server,   latency: '320ms' },
  { name: 'Video CDN',        status: 'operational', uptime: '99.95%', icon: Server,   latency: '28ms' },
];

export default function SystemMonitoring() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="section-title">System Monitoring</h1>
        <p className="section-subtitle">Real-time platform health, uptime, and application logs</p>
      </div>

      {/* Services grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {services.map(({ name, status, uptime, icon: Icon, latency }) => (
          <div key={name} className={`card border ${status === 'operational' ? 'border-green-500/20' : 'border-yellow-500/30'}`}>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${status === 'operational' ? 'bg-green-500/10' : 'bg-yellow-500/10'}`}>
                  <Icon size={15} className={status === 'operational' ? 'text-green-400' : 'text-yellow-400'} />
                </div>
                <span className="text-sm font-semibold text-white">{name}</span>
              </div>
              <div className={`w-2.5 h-2.5 rounded-full ${status === 'operational' ? 'bg-green-400' : 'bg-yellow-400 animate-pulse'}`} />
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-gray-500">Uptime: <strong className="text-gray-300">{uptime}</strong></span>
              <span className="text-gray-500">Latency: <strong className="text-gray-300">{latency}</strong></span>
            </div>
            {status === 'degraded' && (
              <div className="mt-2 flex items-center gap-1.5 text-xs text-yellow-400">
                <AlertTriangle size={11} /> Performance degraded — monitoring
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="card">
          <h3 className="font-bold text-white mb-5 flex items-center gap-2">
            <Activity size={15} className="text-blue-400" /> CPU & Memory (24h)
          </h3>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={cpuData}>
              <defs>
                <linearGradient id="cpuGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="#3b82f6" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="memGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="#8b5cf6" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="hour" tick={{ fill: '#6b7280', fontSize: 10 }} axisLine={false} tickLine={false}
                interval={5} />
              <YAxis tick={{ fill: '#6b7280', fontSize: 10 }} axisLine={false} tickLine={false}
                tickFormatter={v => `${v}%`} />
              <Tooltip contentStyle={{ background: '#1e293b', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 10, color: '#fff' }}
                formatter={(v, name) => [`${v}%`, name === 'cpu' ? 'CPU' : 'Memory']} />
              <Area type="monotone" dataKey="cpu" stroke="#3b82f6" strokeWidth={2} fill="url(#cpuGrad)" dot={false} />
              <Area type="monotone" dataKey="mem" stroke="#8b5cf6" strokeWidth={2} fill="url(#memGrad)" dot={false} />
            </AreaChart>
          </ResponsiveContainer>
          <div className="flex gap-4 mt-2">
            <span className="flex items-center gap-1.5 text-xs text-gray-500"><span className="w-3 h-0.5 bg-blue-400 rounded" /> CPU</span>
            <span className="flex items-center gap-1.5 text-xs text-gray-500"><span className="w-3 h-0.5 bg-purple-400 rounded" /> Memory</span>
          </div>
        </div>

        <div className="card">
          <h3 className="font-bold text-white mb-5 flex items-center gap-2">
            <AlertTriangle size={15} className="text-yellow-400" /> Error Count (7 days)
          </h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={errorData} barSize={28}>
              <XAxis dataKey="day" tick={{ fill: '#6b7280', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#6b7280', fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: '#1e293b', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 10, color: '#fff' }}
                formatter={v => [v, 'Errors']} />
              <Bar dataKey="errors" fill="#ef4444" fillOpacity={0.6} radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Application logs */}
      <div className="card">
        <div className="flex items-center justify-between mb-5">
          <h3 className="font-bold text-white flex items-center gap-2">
            <Clock size={15} className="text-gray-400" /> Application Logs
          </h3>
          <div className="flex gap-2">
            {['ALL', 'ERROR', 'WARN', 'INFO'].map(l => (
              <button key={l} className={`px-2.5 py-1 text-[10px] font-bold rounded-lg transition-colors ${
                l === 'ALL' ? 'bg-white/10 text-white' : 'bg-white/5 text-gray-500 hover:bg-white/10 hover:text-white'
              }`}>{l}</button>
            ))}
          </div>
        </div>
        <div className="space-y-2 font-mono text-xs max-h-64 overflow-y-auto">
          {logs.map((log, i) => (
            <div key={i} className="flex items-start gap-3 p-2.5 rounded-lg hover:bg-white/5 transition-colors">
              <span className="text-gray-600 flex-shrink-0">{log.time}</span>
              <span className={`px-2 py-0.5 rounded text-[10px] font-bold flex-shrink-0 ${levelColors[log.level]}`}>
                {log.level}
              </span>
              <span className="text-gray-300 leading-relaxed">{log.msg}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
