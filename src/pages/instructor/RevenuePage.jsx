import {
  DollarSign, TrendingUp, Users, CreditCard,
  ArrowUpRight, Download,
} from 'lucide-react';
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis,
  Tooltip, ResponsiveContainer, Cell, PieChart, Pie, Legend,
} from 'recharts';
import { revenueData, planBreakdown } from '../../data/mockData';

const transactions = [
  { id: 'TXN-001', student: 'Keabetswe T.', plan: 'Premium', amount: 499, date: '2026-09-08', status: 'paid' },
  { id: 'TXN-002', student: 'Amahle N.',    plan: 'Pro',     amount: 299, date: '2026-09-07', status: 'paid' },
  { id: 'TXN-003', student: 'Ntokozo S.',   plan: 'Basic',   amount: 149, date: '2026-09-06', status: 'paid' },
  { id: 'TXN-004', student: 'Zanele D.',    plan: 'Premium', amount: 499, date: '2026-09-05', status: 'paid' },
  { id: 'TXN-005', student: 'Sipho M.',     plan: 'Basic',   amount: 149, date: '2026-09-04', status: 'refunded' },
  { id: 'TXN-006', student: 'Lethiwe K.',   plan: 'Pro',     amount: 299, date: '2026-09-03', status: 'paid' },
];

export default function RevenuePage() {
  const thisMonth = revenueData[revenueData.length - 1].revenue;
  const lastMonth = revenueData[revenueData.length - 2].revenue;
  const growth    = (((thisMonth - lastMonth) / lastMonth) * 100).toFixed(1);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="section-title">Revenue</h1>
          <p className="section-subtitle">Financial overview and transaction history</p>
        </div>
        <button className="btn-secondary text-sm py-2 px-4">
          <Download size={14} /> Export CSV
        </button>
      </div>

      {/* KPI */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'This Month',    value: `R ${thisMonth.toLocaleString()}`, sub: `+${growth}% vs last month`, icon: DollarSign, color: 'text-green-400', bg: 'bg-green-500/10', up: true },
          { label: 'Annual Total',  value: `R ${(revenueData.reduce((a,b)=>a+b.revenue,0)/1000).toFixed(0)}k`, sub: 'Apr–Sep 2026', icon: TrendingUp, color: 'text-blue-400', bg: 'bg-blue-500/10', up: true },
          { label: 'Avg per Student', value: 'R 277', sub: 'Blended plan value', icon: CreditCard, color: 'text-purple-400', bg: 'bg-purple-500/10', up: false },
          { label: 'New Students',  value: revenueData[revenueData.length-1].students, sub: 'This month', icon: Users, color: 'text-orange-400', bg: 'bg-orange-500/10', up: true },
        ].map(({ label, value, sub, icon: Icon, color, bg, up }) => (
          <div key={label} className="card flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <p className="text-xs text-gray-400">{label}</p>
              <div className={`w-8 h-8 ${bg} rounded-lg flex items-center justify-center`}>
                <Icon size={15} className={color} />
              </div>
            </div>
            <p className="text-2xl font-black text-white">{value}</p>
            <p className={`text-xs flex items-center gap-1 ${up ? 'text-green-400' : 'text-gray-500'}`}>
              {up && <ArrowUpRight size={12} />}{sub}
            </p>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 card">
          <h3 className="font-bold text-white mb-5">Monthly Revenue (ZAR)</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={revenueData} barSize={36}>
              <XAxis dataKey="month" tick={{ fill: '#6b7280', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#6b7280', fontSize: 11 }} axisLine={false} tickLine={false}
                tickFormatter={v => `R${(v/1000).toFixed(0)}k`} />
              <Tooltip contentStyle={{ background: '#1e293b', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12, color: '#fff' }}
                formatter={v => [`R ${v.toLocaleString()}`, 'Revenue']} />
              <Bar dataKey="revenue" radius={[8, 8, 0, 0]}>
                {revenueData.map((_, i) => (
                  <Cell key={i} fill={i === revenueData.length - 1 ? '#8b5cf6' : '#8b5cf650'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="card">
          <h3 className="font-bold text-white mb-5">Revenue by Plan</h3>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={planBreakdown} cx="50%" cy="50%" innerRadius={55} outerRadius={80}
                dataKey="value" nameKey="name" paddingAngle={3}>
                {planBreakdown.map(entry => <Cell key={entry.name} fill={entry.color} />)}
              </Pie>
              <Tooltip contentStyle={{ background: '#1e293b', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 10, color: '#fff' }}
                formatter={(v, name) => [`${v} students`, name]} />
              <Legend formatter={(v) => <span className="text-xs text-gray-400">{v}</span>} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Transactions */}
      <div className="card p-0 overflow-hidden">
        <div className="px-5 py-4 border-b border-white/10 flex items-center justify-between">
          <h3 className="font-bold text-white">Recent Transactions</h3>
          <span className="text-xs text-gray-500">Showing latest 6</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[560px]">
            <thead>
              <tr className="border-b border-white/10 bg-white/5">
                {['Transaction', 'Student', 'Plan', 'Amount', 'Date', 'Status'].map(h => (
                  <th key={h} className="text-left text-xs font-medium text-gray-500 px-5 py-3">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {transactions.map(t => (
                <tr key={t.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="px-5 py-3 text-xs font-mono text-gray-400">{t.id}</td>
                  <td className="px-5 py-3 font-medium text-white">{t.student}</td>
                  <td className="px-5 py-3">
                    <span className="badge bg-purple-500/20 text-purple-300 text-xs">{t.plan}</span>
                  </td>
                  <td className="px-5 py-3 font-semibold text-green-400">R {t.amount}</td>
                  <td className="px-5 py-3 text-xs text-gray-400">{t.date}</td>
                  <td className="px-5 py-3">
                    <span className={`badge text-xs ${t.status === 'paid' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                      {t.status}
                    </span>
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
