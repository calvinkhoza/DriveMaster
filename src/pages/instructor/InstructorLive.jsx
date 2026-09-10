import { useState } from 'react';
import {
  Plus, Calendar, Clock, Users, Video, Edit2,
  Trash2, ExternalLink, Bell, CheckCircle,
} from 'lucide-react';
import { liveSessions } from '../../data/mockData';

const typeColors = {
  'exam-prep':  'bg-blue-500/20 text-blue-300',
  'q-and-a':    'bg-green-500/20 text-green-300',
  'mock-exam':  'bg-red-500/20 text-red-300',
  'masterclass':'bg-purple-500/20 text-purple-300',
};

export default function InstructorLive() {
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    title: '', date: '', time: '', duration: '60', type: 'exam-prep',
  });

  const handle = e => setForm({ ...form, [e.target.name]: e.target.value });

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="section-title">Live Session Manager</h1>
          <p className="section-subtitle">Schedule, manage, and broadcast live classes</p>
        </div>
        <button onClick={() => setShowForm(!showForm)} className="btn-primary text-sm py-2 px-4">
          <Plus size={15} /> Schedule Session
        </button>
      </div>

      {/* New session form */}
      {showForm && (
        <div className="card border-primary-500/30 animate-slide-up">
          <h3 className="font-bold text-white mb-5">New Live Session</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-300 mb-1.5">Session Title</label>
              <input name="title" value={form.title} onChange={handle}
                placeholder="e.g. Road Signs Exam Prep" className="input" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">Date</label>
              <input type="date" name="date" value={form.date} onChange={handle} className="input" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">Time</label>
              <input type="time" name="time" value={form.time} onChange={handle} className="input" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">Duration (minutes)</label>
              <input type="number" name="duration" value={form.duration} onChange={handle} className="input" min="15" max="180" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">Session Type</label>
              <select name="type" value={form.type} onChange={handle} className="input">
                <option value="exam-prep">Exam Prep</option>
                <option value="q-and-a">Q&A Session</option>
                <option value="mock-exam">Mock Exam</option>
                <option value="masterclass">Masterclass</option>
              </select>
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-300 mb-1.5">
                Platform
              </label>
              <div className="grid grid-cols-3 gap-3">
                {['Zoom', 'Google Meet', 'YouTube Live'].map(p => (
                  <label key={p} className="flex items-center gap-2 p-3 bg-white/5 border border-white/10 rounded-xl cursor-pointer hover:border-white/20">
                    <input type="radio" name="platform" value={p} defaultChecked={p === 'Zoom'} className="accent-primary-500" />
                    <span className="text-sm text-gray-300">{p}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
          <div className="flex gap-3 mt-5">
            <button className="btn-primary flex-1 justify-center">
              <CheckCircle size={15} /> Create Session
            </button>
            <button onClick={() => setShowForm(false)} className="btn-secondary flex-1 justify-center">
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Sessions grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {liveSessions.map(s => (
          <div key={s.id} className="card hover:border-white/20 transition-colors group">
            <div className="flex items-start justify-between gap-2 mb-4">
              <span className={`badge text-[10px] ${typeColors[s.type]}`}>{s.type.replace('-', ' ')}</span>
              <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors">
                  <Edit2 size={12} />
                </button>
                <button className="p-1.5 rounded-lg bg-white/5 hover:bg-red-500/10 text-gray-400 hover:text-red-400 transition-colors">
                  <Trash2 size={12} />
                </button>
              </div>
            </div>

            <h3 className="font-semibold text-white mb-3 leading-tight">{s.title}</h3>

            <div className="space-y-1.5 text-xs text-gray-400 mb-4">
              <div className="flex items-center gap-1.5"><Calendar size={11} />{s.date}</div>
              <div className="flex items-center gap-1.5"><Clock size={11} />{s.time} · {s.duration}</div>
              <div className="flex items-center gap-1.5"><Users size={11} />{s.attendees} enrolled</div>
            </div>

            <div className="flex gap-2">
              {s.status === 'live' ? (
                <button className="btn-primary text-xs py-2 flex-1 justify-center gap-1.5">
                  <Video size={12} /> Start Now
                </button>
              ) : s.status === 'upcoming' ? (
                <>
                  <button className="btn-secondary text-xs py-2 flex-1 justify-center gap-1.5">
                    <ExternalLink size={12} /> Copy Link
                  </button>
                  <button className="btn-secondary text-xs py-2 px-3">
                    <Bell size={12} />
                  </button>
                </>
              ) : (
                <button className="btn-secondary text-xs py-2 flex-1 justify-center gap-1.5 opacity-60" disabled>
                  Completed
                </button>
              )}
            </div>

            {s.status === 'live' && (
              <div className="mt-3 flex items-center gap-1.5 text-xs text-red-400 animate-pulse">
                <div className="w-1.5 h-1.5 bg-red-400 rounded-full" /> Session is live now
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
