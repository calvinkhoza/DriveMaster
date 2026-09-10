import {
  BarChart2, Clock, Target, Award, TrendingUp,
  BookOpen, Flame, Star,
} from 'lucide-react';
import {
  AreaChart, Area, BarChart, Bar, RadarChart, Radar,
  PolarGrid, PolarAngleAxis, XAxis, YAxis, Tooltip,
  ResponsiveContainer, Cell,
} from 'recharts';
import { courses } from '../../data/mockData';

const scoreHistory = [
  { attempt: '1', score: 48 },
  { attempt: '2', score: 55 },
  { attempt: '3', score: 61 },
  { attempt: '4', score: 67 },
  { attempt: '5', score: 70 },
  { attempt: '6', score: 75 },
  { attempt: '7', score: 82 },
];

const weeklyStudy = [
  { day: 'Mon', minutes: 45 },
  { day: 'Tue', minutes: 72 },
  { day: 'Wed', minutes: 30 },
  { day: 'Thu', minutes: 90 },
  { day: 'Fri', minutes: 60 },
  { day: 'Sat', minutes: 110 },
  { day: 'Sun', minutes: 55 },
];

const radarData = [
  { topic: 'Road Signs',   score: 82 },
  { topic: 'Rules',        score: 68 },
  { topic: 'Vehicle Ctrl', score: 55 },
  { topic: 'Emergency',    score: 40 },
  { topic: 'Exam Prep',    score: 72 },
];

const COLORS = ['#3b82f6', '#8b5cf6', '#f97316', '#ef4444', '#10b981'];

export default function ProgressPage() {
  const totalStudy = weeklyStudy.reduce((a, b) => a + b.minutes, 0);

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="section-title">Progress Centre</h1>
        <p className="section-subtitle">Track your learning journey and identify areas to improve</p>
      </div>

      {/* Stat summary */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Study Time',   value: '14.5h',  sub: 'This week',           icon: Clock,      color: 'text-blue-400',   bg: 'bg-blue-500/10' },
          { label: 'Best Mock Score',    value: '82%',    sub: '7th attempt',         icon: Target,     color: 'text-green-400',  bg: 'bg-green-500/10' },
          { label: 'Current Streak',     value: '7 days', sub: 'Keep it up!',         icon: Flame,      color: 'text-orange-400', bg: 'bg-orange-500/10' },
          { label: 'Points Earned',      value: '1 240',  sub: 'Rank #38 overall',    icon: Star,       color: 'text-yellow-400', bg: 'bg-yellow-500/10' },
        ].map(({ label, value, sub, icon: Icon, color, bg }) => (
          <div key={label} className="card flex items-start gap-3">
            <div className={`w-10 h-10 ${bg} rounded-xl flex items-center justify-center flex-shrink-0`}>
              <Icon size={18} className={color} />
            </div>
            <div>
              <p className="text-xl font-black text-white">{value}</p>
              <p className="text-xs font-medium text-gray-300">{label}</p>
              <p className="text-xs text-gray-500">{sub}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Charts row 1 */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Score trend */}
        <div className="card">
          <div className="flex items-center gap-2 mb-5">
            <TrendingUp size={16} className="text-primary-400" />
            <div>
              <h3 className="font-bold text-white">Mock Exam Score Trend</h3>
              <p className="text-xs text-gray-400">All attempts — aiming for 75%+</p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={scoreHistory}>
              <defs>
                <linearGradient id="grad1" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="attempt" tick={{ fill: '#6b7280', fontSize: 11 }} axisLine={false} tickLine={false} label={{ value: 'Attempt', position: 'insideBottom', offset: -2, fill: '#6b7280', fontSize: 10 }} />
              <YAxis domain={[30, 100]} tick={{ fill: '#6b7280', fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: '#1e293b', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 10, color: '#fff' }} formatter={(v) => [`${v}%`, 'Score']} />
              {/* Pass line */}
              <Area type="monotone" dataKey="score" stroke="#3b82f6" strokeWidth={2.5} fill="url(#grad1)"
                dot={(p) => <circle key={p.key} cx={p.cx} cy={p.cy} r={4} fill={p.value >= 75 ? '#10b981' : '#3b82f6'} />}
              />
            </AreaChart>
          </ResponsiveContainer>
          <p className="text-[11px] text-gray-500 mt-2 text-center">🟢 Green dots = passed (75%+)</p>
        </div>

        {/* Weekly study */}
        <div className="card">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2">
              <Clock size={16} className="text-purple-400" />
              <div>
                <h3 className="font-bold text-white">Weekly Study Time</h3>
                <p className="text-xs text-gray-400">Total: {Math.floor(totalStudy / 60)}h {totalStudy % 60}m this week</p>
              </div>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={weeklyStudy} barSize={28}>
              <XAxis dataKey="day" tick={{ fill: '#6b7280', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#6b7280', fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: '#1e293b', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 10, color: '#fff' }} formatter={(v) => [`${v} min`, 'Study time']} />
              <Bar dataKey="minutes" radius={[6, 6, 0, 0]}>
                {weeklyStudy.map((entry, i) => (
                  <Cell key={i} fill={entry.day === 'Sat' ? '#8b5cf6' : '#3b82f650'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Charts row 2 */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Radar / topic mastery */}
        <div className="card">
          <div className="flex items-center gap-2 mb-5">
            <BarChart2 size={16} className="text-orange-400" />
            <div>
              <h3 className="font-bold text-white">Topic Mastery Radar</h3>
              <p className="text-xs text-gray-400">Scores across all K53 modules</p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <RadarChart data={radarData}>
              <PolarGrid stroke="rgba(255,255,255,0.1)" />
              <PolarAngleAxis dataKey="topic" tick={{ fill: '#9ca3af', fontSize: 11 }} />
              <Radar dataKey="score" stroke="#f97316" fill="#f97316" fillOpacity={0.2} strokeWidth={2} />
              <Tooltip contentStyle={{ background: '#1e293b', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 10, color: '#fff' }} formatter={(v) => [`${v}%`, 'Mastery']} />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        {/* Course progress */}
        <div className="card">
          <div className="flex items-center gap-2 mb-5">
            <BookOpen size={16} className="text-cyan-400" />
            <div>
              <h3 className="font-bold text-white">Course Completion</h3>
              <p className="text-xs text-gray-400">Progress across all 6 modules</p>
            </div>
          </div>
          <div className="space-y-4">
            {courses.map((course, i) => (
              <div key={course.id}>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-sm text-gray-300 font-medium truncate pr-2">{course.title}</span>
                  <span className={`text-sm font-bold flex-shrink-0 ${
                    course.progress === 100 ? 'text-green-400'
                    : course.progress > 0 ? 'text-primary-400'
                    : 'text-gray-600'
                  }`}>{course.progress}%</span>
                </div>
                <div className="progress-bar">
                  <div
                    className="progress-fill"
                    style={{ width: `${course.progress}%`, backgroundColor: COLORS[i % COLORS.length] }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Weak areas */}
      <div className="card border-yellow-500/20 bg-yellow-500/5">
        <div className="flex items-center gap-2 mb-4">
          <Award size={16} className="text-yellow-400" />
          <h3 className="font-bold text-white">Recommended Focus Areas</h3>
        </div>
        <div className="grid sm:grid-cols-2 gap-3">
          {[
            { topic: 'Emergency Procedures', score: 40, tip: 'Review the emergency braking and tyre blowout modules' },
            { topic: 'Vehicle Controls',     score: 55, tip: 'Practice the dashboard instrument questions' },
          ].map(({ topic, score, tip }) => (
            <div key={topic} className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-xl">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold text-yellow-300">{topic}</span>
                <span className="text-sm font-bold text-yellow-400">{score}%</span>
              </div>
              <p className="text-xs text-gray-400 leading-relaxed">{tip}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
