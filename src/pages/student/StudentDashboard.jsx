import { Link } from 'react-router-dom';
import {
  PlayCircle, FileQuestion, Calendar, MessageSquare,
  TrendingUp, Clock, Award, Zap, ChevronRight, Star,
  BookOpen, Target, Flame,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { courses, liveSessions } from '../../data/mockData';
import {
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer,
} from 'recharts';

const scoreData = [
  { day: 'Mon', score: 54 },
  { day: 'Tue', score: 61 },
  { day: 'Wed', score: 58 },
  { day: 'Thu', score: 70 },
  { day: 'Fri', score: 74 },
  { day: 'Sat', score: 82 },
  { day: 'Sun', score: 79 },
];

const quickLinks = [
  { to: '/student/courses',  icon: PlayCircle,    label: 'Continue Course',   color: 'from-blue-600 to-blue-800',    shadow: 'shadow-blue-900/40' },
  { to: '/student/exam',     icon: FileQuestion,  label: 'Mock Exam',          color: 'from-purple-600 to-purple-800', shadow: 'shadow-purple-900/40' },
  { to: '/student/live',     icon: Calendar,      label: 'Live Sessions',      color: 'from-green-600 to-green-800',   shadow: 'shadow-green-900/40' },
  { to: '/student/ai',       icon: MessageSquare, label: 'Ask AI Tutor',       color: 'from-orange-600 to-orange-800', shadow: 'shadow-orange-900/40' },
];

const achievements = [
  { icon: Flame,   label: '7-Day Streak',    earned: true,  color: 'text-orange-400' },
  { icon: Star,    label: 'First Mock Exam', earned: true,  color: 'text-yellow-400' },
  { icon: Target,  label: '80% Score',       earned: true,  color: 'text-green-400' },
  { icon: Award,   label: 'Road Signs Pro',  earned: false, color: 'text-gray-600' },
  { icon: BookOpen,label: 'Course Complete', earned: false, color: 'text-gray-600' },
  { icon: Zap,     label: 'Speed Runner',    earned: false, color: 'text-gray-600' },
];

export default function StudentDashboard() {
  const { user } = useApp();
  const inProgress = courses.filter(c => c.progress > 0 && c.progress < 100);
  const upcoming   = liveSessions.filter(s => s.status === 'upcoming' || s.status === 'live').slice(0, 2);

  return (
    <div className="space-y-8 animate-fade-in">

      {/* ── Welcome ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-white">
            Good day, {user?.name?.split(' ')[0]} 👋
          </h1>
          <p className="text-gray-400 mt-1">You're on a <span className="text-orange-400 font-semibold">7-day streak</span> — keep it going!</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-4 py-2 bg-orange-500/10 border border-orange-500/20 rounded-xl">
            <Flame size={16} className="text-orange-400" />
            <span className="text-sm font-semibold text-orange-300">7 day streak</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-yellow-500/10 border border-yellow-500/20 rounded-xl">
            <Zap size={16} className="text-yellow-400" />
            <span className="text-sm font-semibold text-yellow-300">1 240 pts</span>
          </div>
        </div>
      </div>

      {/* ── Stat cards ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Overall Progress', value: '42%',     sub: 'Across all modules', icon: TrendingUp, color: 'text-blue-400',   bg: 'bg-blue-500/10',    bar: 42,  barColor: 'bg-blue-500' },
          { label: 'Study Time',       value: '14.5 hrs', sub: 'This week',          icon: Clock,      color: 'text-purple-400', bg: 'bg-purple-500/10',  bar: null, barColor: '' },
          { label: 'Best Mock Score',  value: '82%',      sub: 'Rules of the Road',  icon: Target,     color: 'text-green-400',  bg: 'bg-green-500/10',   bar: 82,  barColor: 'bg-green-500' },
          { label: 'Courses Started',  value: '3 / 6',    sub: 'Modules in progress',icon: BookOpen,   color: 'text-orange-400', bg: 'bg-orange-500/10',  bar: null, barColor: '' },
        ].map(({ label, value, sub, icon: Icon, color, bg, bar, barColor }) => (
          <div key={label} className="card flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <p className="text-xs font-medium text-gray-400">{label}</p>
              <div className={`w-8 h-8 ${bg} rounded-lg flex items-center justify-center`}>
                <Icon size={15} className={color} />
              </div>
            </div>
            <p className="text-2xl font-black text-white">{value}</p>
            <p className="text-xs text-gray-500">{sub}</p>
            {bar !== null && (
              <div className="progress-bar">
                <div className={`progress-fill ${barColor}`} style={{ width: `${bar}%` }} />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* ── Quick links ── */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {quickLinks.map(({ to, icon: Icon, label, color, shadow }) => (
          <Link
            key={to} to={to}
            className={`group flex flex-col items-center justify-center gap-3 p-5 bg-gradient-to-br ${color} rounded-2xl shadow-xl ${shadow} hover:scale-105 active:scale-95 transition-all duration-200`}
          >
            <div className="w-12 h-12 bg-white/15 rounded-xl flex items-center justify-center group-hover:bg-white/25 transition-colors">
              <Icon size={22} className="text-white" />
            </div>
            <span className="text-sm font-semibold text-white">{label}</span>
          </Link>
        ))}
      </div>

      {/* ── Main grid: chart + sessions ── */}
      <div className="grid lg:grid-cols-5 gap-6">
        {/* Score trend */}
        <div className="lg:col-span-3 card">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="font-bold text-white">Mock Exam Score Trend</h3>
              <p className="text-xs text-gray-400 mt-0.5">Last 7 days</p>
            </div>
            <span className="badge bg-green-500/20 text-green-400">↑ +12% this week</span>
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <AreaChart data={scoreData}>
              <defs>
                <linearGradient id="scoreGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="#3b82f6" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="day" tick={{ fill: '#6b7280', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis domain={[40, 100]} tick={{ fill: '#6b7280', fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{ background: '#1e293b', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12, color: '#fff' }}
                formatter={(v) => [`${v}%`, 'Score']}
              />
              <Area type="monotone" dataKey="score" stroke="#3b82f6" strokeWidth={2.5} fill="url(#scoreGrad)" dot={{ fill: '#3b82f6', strokeWidth: 0, r: 4 }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Upcoming sessions */}
        <div className="lg:col-span-2 card">
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-bold text-white">Upcoming Sessions</h3>
            <Link to="/student/live" className="text-xs text-primary-400 hover:text-primary-300 flex items-center gap-1">
              View all <ChevronRight size={12} />
            </Link>
          </div>
          <div className="space-y-3">
            {upcoming.map(s => (
              <div key={s.id} className="p-3.5 bg-white/5 rounded-xl border border-white/10 hover:border-primary-500/30 transition-colors">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="text-sm font-semibold text-white leading-tight">{s.title}</p>
                    <p className="text-xs text-gray-400 mt-1">{s.date} · {s.time}</p>
                    <p className="text-xs text-gray-500">{s.duration} · {s.attendees} enrolled</p>
                  </div>
                  {s.status === 'live' ? (
                    <span className="badge bg-red-500/20 text-red-400 animate-pulse-slow flex-shrink-0">
                      <span className="w-1.5 h-1.5 bg-red-400 rounded-full" />
                      LIVE
                    </span>
                  ) : (
                    <span className="badge bg-blue-500/20 text-blue-300 flex-shrink-0">Soon</span>
                  )}
                </div>
                <Link to="/student/live" className="mt-3 flex items-center gap-1 text-xs text-primary-400 hover:text-primary-300 font-medium">
                  {s.status === 'live' ? 'Join now' : 'Set reminder'} <ChevronRight size={11} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Continue learning ── */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="section-title">Continue Learning</h2>
            <p className="section-subtitle">Pick up where you left off</p>
          </div>
          <Link to="/student/courses" className="text-sm text-primary-400 hover:text-primary-300 flex items-center gap-1 font-medium">
            All courses <ChevronRight size={14} />
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {inProgress.map(course => (
            <Link key={course.id} to="/student/courses" className="card-hover group">
              <div className="relative overflow-hidden rounded-xl mb-4 aspect-video bg-dark-700">
                <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-2 left-3 right-3 flex items-center justify-between">
                  <span className={`badge text-[10px] ${course.tagColor}`}>{course.tag}</span>
                  <span className="text-xs text-white/80 font-medium">{course.progress}%</span>
                </div>
              </div>
              <h3 className="font-semibold text-white mb-1 group-hover:text-primary-400 transition-colors">{course.title}</h3>
              <p className="text-xs text-gray-400 mb-3 line-clamp-2">{course.description}</p>
              <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                <span className="flex items-center gap-1"><BookOpen size={11} />{course.lessons} lessons</span>
                <span className="flex items-center gap-1"><Clock size={11} />{course.duration}</span>
              </div>
              <div className="progress-bar">
                <div className="progress-fill bg-primary-500" style={{ width: `${course.progress}%` }} />
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* ── Achievements ── */}
      <div>
        <h2 className="section-title">Achievements</h2>
        <p className="section-subtitle">Earn badges by completing milestones</p>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-4">
          {achievements.map(({ icon: Icon, label, earned, color }) => (
            <div key={label} className={`card text-center py-5 flex flex-col items-center gap-2 ${earned ? 'border-white/20' : 'opacity-40'}`}>
              <div className={`w-12 h-12 rounded-full ${earned ? 'bg-white/10' : 'bg-white/5'} flex items-center justify-center`}>
                <Icon size={22} className={earned ? color : 'text-gray-600'} />
              </div>
              <p className="text-[11px] font-medium text-gray-300 leading-tight">{label}</p>
              {earned && <span className="badge bg-green-500/20 text-green-400 text-[9px]">Earned</span>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
