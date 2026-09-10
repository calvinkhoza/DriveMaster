import { useState } from 'react';
import { Bell, Send, Users, CheckCircle, Mail, Smartphone } from 'lucide-react';

const segments = [
  { id: 'all',      label: 'All Users',        count: 94,  icon: Users },
  { id: 'basic',    label: 'Basic Plan',       count: 32,  icon: Users },
  { id: 'pro',      label: 'Pro Plan',         count: 40,  icon: Users },
  { id: 'premium',  label: 'Premium Plan',     count: 17,  icon: Users },
  { id: 'inactive', label: 'Inactive (30d+)',  count: 11,  icon: Users },
];

const pastBroadcasts = [
  { title: 'New live session added — Exam Prep tonight!', segment: 'All Users',   sent: '2026-09-07', reads: 78 },
  { title: 'Your account is expiring in 3 days',          segment: 'Basic Plan',  sent: '2026-09-05', reads: 24 },
  { title: 'Platform maintenance — Saturday 02:00',       segment: 'All Users',   sent: '2026-09-01', reads: 91 },
];

export default function BroadcastPage() {
  const [segment, setSegment] = useState('all');
  const [channels, setChannels] = useState({ inApp: true, email: true, sms: false });
  const [form, setForm] = useState({ subject: '', message: '' });
  const [sent, setSent] = useState(false);

  const toggle = key => setChannels(prev => ({ ...prev, [key]: !prev[key] }));
  const handle = e => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = e => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 3000);
    setForm({ subject: '', message: '' });
  };

  const recipientCount = segments.find(s => s.id === segment)?.count || 0;

  return (
    <div className="space-y-6 animate-fade-in max-w-3xl">
      <div>
        <h1 className="section-title">Broadcast Notifications</h1>
        <p className="section-subtitle">Send announcements to all users or targeted segments</p>
      </div>

      {sent && (
        <div className="flex items-center gap-3 p-4 bg-green-500/10 border border-green-500/30 rounded-2xl animate-slide-up">
          <CheckCircle size={18} className="text-green-400" />
          <p className="text-sm text-green-300 font-medium">
            Message sent to {recipientCount} {segment === 'all' ? 'users' : 'users in this segment'}!
          </p>
        </div>
      )}

      <form onSubmit={submit} className="space-y-5">
        {/* Audience segment */}
        <div className="card">
          <h3 className="font-bold text-white mb-4 flex items-center gap-2">
            <Users size={15} className="text-primary-400" /> Select Audience
          </h3>
          <div className="grid sm:grid-cols-2 gap-2">
            {segments.map(s => (
              <label
                key={s.id}
                className={`flex items-center justify-between p-3 border-2 rounded-xl cursor-pointer transition-all ${
                  segment === s.id ? 'border-primary-500 bg-primary-600/10' : 'border-white/10 hover:border-white/20'
                }`}
              >
                <div className="flex items-center gap-2">
                  <input type="radio" name="segment" value={s.id}
                    checked={segment === s.id} onChange={() => setSegment(s.id)}
                    className="accent-primary-500" />
                  <span className="text-sm font-medium text-white">{s.label}</span>
                </div>
                <span className="text-xs font-bold text-primary-400">{s.count}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Channels */}
        <div className="card">
          <h3 className="font-bold text-white mb-4 flex items-center gap-2">
            <Bell size={15} className="text-orange-400" /> Delivery Channels
          </h3>
          <div className="flex gap-4 flex-wrap">
            {[
              { key: 'inApp', icon: Bell,        label: 'In-App Push' },
              { key: 'email', icon: Mail,        label: 'Email' },
              { key: 'sms',   icon: Smartphone,  label: 'SMS' },
            ].map(({ key, icon: Icon, label }) => (
              <label key={key} className={`flex items-center gap-2 px-4 py-2.5 border rounded-xl cursor-pointer transition-all ${
                channels[key] ? 'border-primary-500 bg-primary-600/10 text-white' : 'border-white/10 text-gray-500 hover:border-white/20'
              }`}>
                <input type="checkbox" checked={channels[key]} onChange={() => toggle(key)} className="accent-primary-500" />
                <Icon size={14} />
                <span className="text-sm font-medium">{label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Message */}
        <div className="card">
          <h3 className="font-bold text-white mb-4">Message</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">Subject</label>
              <input name="subject" value={form.subject} onChange={handle} required
                placeholder="e.g. New live session tonight — don't miss it!" className="input" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">Message Body</label>
              <textarea name="message" value={form.message} onChange={handle} required
                placeholder="Write your announcement here…"
                rows={5} className="input resize-none" />
            </div>
          </div>
        </div>

        {/* Summary & send */}
        <div className="flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-2xl">
          <div>
            <p className="text-sm font-semibold text-white">
              Sending to <span className="text-primary-400">{recipientCount} recipients</span>
            </p>
            <p className="text-xs text-gray-500 mt-0.5">
              Via: {Object.entries(channels).filter(([,v]) => v).map(([k]) => k).join(', ') || 'no channels selected'}
            </p>
          </div>
          <button type="submit" className="btn-primary gap-2">
            <Send size={15} /> Send Broadcast
          </button>
        </div>
      </form>

      {/* Past broadcasts */}
      <div>
        <h3 className="font-bold text-white mb-4">Previous Broadcasts</h3>
        <div className="space-y-3">
          {pastBroadcasts.map((b, i) => (
            <div key={i} className="card flex items-center gap-4">
              <div className="w-9 h-9 bg-primary-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                <Bell size={16} className="text-primary-400" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">{b.title}</p>
                <p className="text-xs text-gray-500 mt-0.5">{b.segment} · {b.sent}</p>
              </div>
              <div className="text-right flex-shrink-0">
                <p className="text-sm font-bold text-white">{b.reads}%</p>
                <p className="text-xs text-gray-500">read rate</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
