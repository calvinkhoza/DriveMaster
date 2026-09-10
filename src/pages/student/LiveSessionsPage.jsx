import { useState } from 'react';
import {
  Calendar, Clock, Users, Video, Bell, Play,
  ChevronLeft, ChevronRight, ExternalLink,
} from 'lucide-react';
import { liveSessions } from '../../data/mockData';

const MONTH_DAYS = 30;
const START_DOW  = 1; // September 2026 starts on Tuesday (0=Sun)
const SESSION_DATES = liveSessions.map(s => parseInt(s.date.split('-')[2]));

const typeColors = {
  'exam-prep':  'bg-blue-500/20 text-blue-300',
  'q-and-a':    'bg-green-500/20 text-green-300',
  'mock-exam':  'bg-red-500/20 text-red-300',
  'masterclass':'bg-purple-500/20 text-purple-300',
};

const statusColors = {
  upcoming:  { dot: 'bg-blue-400',  badge: 'bg-blue-500/20 text-blue-300' },
  live:      { dot: 'bg-red-400',   badge: 'bg-red-500/20 text-red-400 animate-pulse' },
  completed: { dot: 'bg-gray-500',  badge: 'bg-gray-700 text-gray-400' },
};

export default function LiveSessionsPage() {
  const [activeDay, setActiveDay] = useState(9); // today

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const days = Array.from({ length: MONTH_DAYS }, (_, i) => i + 1);
  const blanks = Array.from({ length: START_DOW }, (_, i) => i);

  const daySession = liveSessions.find(s => parseInt(s.date.split('-')[2]) === activeDay);
  const allUpcoming = liveSessions.filter(s => s.status !== 'completed');

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="section-title">Live Sessions</h1>
        <p className="section-subtitle">Join interactive classes and exam prep sessions</p>
      </div>

      {/* Live now banner */}
      {liveSessions.find(s => s.status === 'live') && (
        <div className="flex items-center justify-between p-4 bg-red-500/10 border border-red-500/30 rounded-2xl">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 bg-red-400 rounded-full animate-pulse" />
            <div>
              <p className="font-semibold text-white text-sm">{liveSessions.find(s => s.status === 'live')?.title}</p>
              <p className="text-xs text-gray-400 mt-0.5">
                {liveSessions.find(s => s.status === 'live')?.attendees} students joined
              </p>
            </div>
          </div>
          <button className="btn-primary text-sm py-2 px-4 gap-2">
            <Video size={14} /> Join Live
          </button>
        </div>
      )}

      <div className="grid lg:grid-cols-3 gap-6">
        {/* ── Calendar ── */}
        <div className="lg:col-span-2 card">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-white text-lg">September 2026</h3>
            <div className="flex gap-1">
              <button className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors">
                <ChevronLeft size={16} />
              </button>
              <button className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors">
                <ChevronRight size={16} />
              </button>
            </div>
          </div>

          {/* Day names */}
          <div className="grid grid-cols-7 mb-2">
            {dayNames.map(d => (
              <div key={d} className="text-center text-xs font-medium text-gray-500 py-1">{d}</div>
            ))}
          </div>

          {/* Calendar grid */}
          <div className="grid grid-cols-7 gap-1">
            {blanks.map(i => <div key={`b${i}`} />)}
            {days.map(day => {
              const hasSession = SESSION_DATES.includes(day);
              const session    = liveSessions.find(s => parseInt(s.date.split('-')[2]) === day);
              const isToday    = day === 9;
              const isActive   = day === activeDay;
              return (
                <button
                  key={day}
                  onClick={() => setActiveDay(day)}
                  className={`relative aspect-square flex flex-col items-center justify-center rounded-xl text-sm transition-all ${
                    isActive   ? 'bg-primary-600 text-white font-bold'
                    : isToday  ? 'bg-white/10 text-white font-semibold'
                    : 'hover:bg-white/5 text-gray-400'
                  }`}
                >
                  {day}
                  {hasSession && (
                    <div className={`absolute bottom-1 w-1.5 h-1.5 rounded-full ${
                      session?.status === 'live' ? 'bg-red-400' : 'bg-primary-400'
                    }`} />
                  )}
                </button>
              );
            })}
          </div>

          {/* Legend */}
          <div className="flex gap-4 mt-4 pt-4 border-t border-white/10">
            {[
              { color: 'bg-red-400',     label: 'Live now' },
              { color: 'bg-primary-400', label: 'Scheduled session' },
              { color: 'bg-white/10',    label: 'Today' },
            ].map(({ color, label }) => (
              <div key={label} className="flex items-center gap-1.5">
                <div className={`w-2 h-2 rounded-full ${color}`} />
                <span className="text-xs text-gray-500">{label}</span>
              </div>
            ))}
          </div>

          {/* Selected day detail */}
          {daySession ? (
            <div className="mt-5 p-4 bg-white/5 border border-white/10 rounded-xl">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold text-white">{daySession.title}</p>
                  <div className="flex items-center gap-3 mt-2 text-xs text-gray-400">
                    <span className="flex items-center gap-1"><Clock size={11} />{daySession.time} · {daySession.duration}</span>
                    <span className="flex items-center gap-1"><Users size={11} />{daySession.attendees} enrolled</span>
                  </div>
                </div>
                <span className={`badge text-xs ${typeColors[daySession.type]}`}>
                  {daySession.type.replace('-', ' ')}
                </span>
              </div>
              <div className="flex gap-2 mt-3">
                {daySession.status === 'live' ? (
                  <button className="btn-primary text-xs py-2 px-3 gap-1.5"><Video size={12} />Join Now</button>
                ) : daySession.status === 'upcoming' ? (
                  <button className="btn-secondary text-xs py-2 px-3 gap-1.5"><Bell size={12} />Set Reminder</button>
                ) : (
                  <button className="btn-secondary text-xs py-2 px-3 gap-1.5"><Play size={12} />Watch Replay</button>
                )}
              </div>
            </div>
          ) : (
            <p className="mt-5 text-sm text-gray-500 text-center py-3">No sessions on this day</p>
          )}
        </div>

        {/* ── Upcoming list ── */}
        <div className="space-y-4">
          <h3 className="font-bold text-white">Upcoming Sessions</h3>
          {allUpcoming.map(session => (
            <div key={session.id} className="card hover:border-white/20 transition-colors">
              <div className="flex items-start justify-between gap-2 mb-3">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-white leading-tight mb-1">{session.title}</p>
                  <span className={`badge text-[10px] ${typeColors[session.type]}`}>
                    {session.type.replace('-', ' ')}
                  </span>
                </div>
                <div className={`flex items-center gap-1 badge ${statusColors[session.status].badge}`}>
                  <div className={`w-1.5 h-1.5 rounded-full ${statusColors[session.status].dot}`} />
                  {session.status === 'live' ? 'LIVE' : session.status}
                </div>
              </div>

              <div className="space-y-1.5 text-xs text-gray-400 mb-4">
                <div className="flex items-center gap-1.5">
                  <Calendar size={11} /> {session.date}
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock size={11} /> {session.time} · {session.duration}
                </div>
                <div className="flex items-center gap-1.5">
                  <Users size={11} /> {session.attendees} students enrolled
                </div>
              </div>

              <div className="flex gap-2">
                {session.status === 'live' ? (
                  <button className="btn-primary text-xs py-2 flex-1 justify-center gap-1.5">
                    <Video size={12} />Join Live
                  </button>
                ) : (
                  <>
                    <button className="btn-secondary text-xs py-2 flex-1 justify-center gap-1.5">
                      <Bell size={12} />Remind Me
                    </button>
                    <button className="btn-secondary text-xs py-2 px-3">
                      <ExternalLink size={12} />
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Past sessions */}
      <div>
        <h3 className="font-bold text-white mb-4">Past Session Replays</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {liveSessions.filter(s => s.status === 'completed').map(s => (
            <div key={s.id} className="card-hover">
              <div className="aspect-video bg-dark-700 rounded-xl mb-3 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary-900/50 to-dark-800" />
                <div className="relative w-12 h-12 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors cursor-pointer">
                  <Play size={20} className="text-white ml-0.5" />
                </div>
              </div>
              <p className="text-sm font-semibold text-white mb-1">{s.title}</p>
              <p className="text-xs text-gray-400">{s.date} · {s.duration}</p>
              <p className="text-xs text-gray-500 mt-1">{s.attendees} attendees</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
