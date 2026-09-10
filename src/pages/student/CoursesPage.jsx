import { useState } from 'react';
import {
  Search, Filter, PlayCircle, Clock, BookOpen,
  CheckCircle, Lock, ChevronRight, Download,
} from 'lucide-react';
import { courses } from '../../data/mockData';

const filters = ['All', 'Core Module', 'Safety', 'Pro', 'Code 8'];

const lessons = [
  { id: 1, title: 'Introduction to Road Signs', duration: '12:34', watched: true },
  { id: 2, title: 'Regulatory Signs — Part 1', duration: '18:22', watched: true },
  { id: 3, title: 'Regulatory Signs — Part 2', duration: '15:10', watched: true },
  { id: 4, title: 'Warning Signs Deep Dive', duration: '21:05', watched: false, active: true },
  { id: 5, title: 'Guidance & Information Signs', duration: '14:48', watched: false },
  { id: 6, title: 'Road Markings Explained', duration: '16:30', watched: false },
  { id: 7, title: 'Quiz: Road Signs', duration: '—', watched: false, isQuiz: true },
];

export default function CoursesPage() {
  const [search, setSearch]       = useState('');
  const [activeFilter, setFilter] = useState('All');
  const [selected, setSelected]   = useState(courses[0]);
  const [playing, setPlaying]     = useState(false);

  const filtered = courses.filter(c => {
    const matchSearch = c.title.toLowerCase().includes(search.toLowerCase());
    const matchFilter = activeFilter === 'All' || c.tag === activeFilter;
    return matchSearch && matchFilter;
  });

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="section-title">My Courses</h1>
        <p className="section-subtitle">All K53 learning modules in one place</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* ── Course list ── */}
        <div className="lg:col-span-1 space-y-4">
          {/* Search & filter */}
          <div className="relative">
            <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500" />
            <input
              value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Search courses…" className="input pl-10 text-sm"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {filters.map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3 py-1 text-xs font-medium rounded-lg transition-colors ${
                  activeFilter === f
                    ? 'bg-primary-600 text-white'
                    : 'bg-white/5 text-gray-400 hover:bg-white/10'
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          {/* Course cards */}
          <div className="space-y-3 max-h-[calc(100vh-280px)] overflow-y-auto pr-1">
            {filtered.map(course => (
              <button
                key={course.id}
                onClick={() => setSelected(course)}
                className={`w-full text-left p-3.5 rounded-xl border transition-all ${
                  selected?.id === course.id
                    ? 'border-primary-500/50 bg-primary-600/10'
                    : 'border-white/10 bg-white/5 hover:border-white/20'
                }`}
              >
                <div className="flex gap-3">
                  <div className="relative flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden bg-dark-700">
                    <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover" />
                    {course.progress === 100 && (
                      <div className="absolute inset-0 bg-green-500/30 flex items-center justify-center">
                        <CheckCircle size={18} className="text-green-400" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className={`badge text-[10px] mb-1 ${course.tagColor}`}>{course.tag}</span>
                    <p className="text-sm font-semibold text-white truncate">{course.title}</p>
                    <p className="text-[11px] text-gray-500 mt-0.5">{course.lessons} lessons · {course.duration}</p>
                    <div className="mt-2 progress-bar">
                      <div className="progress-fill bg-primary-500" style={{ width: `${course.progress}%` }} />
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* ── Video player + lessons ── */}
        <div className="lg:col-span-2 space-y-5">
          {selected ? (
            <>
              {/* Video player */}
              <div className="relative aspect-video bg-black rounded-2xl overflow-hidden group">
                <img src={selected.thumbnail} alt={selected.title} className="w-full h-full object-cover opacity-60" />
                <div className="absolute inset-0 flex items-center justify-center">
                  {!playing ? (
                    <button
                      onClick={() => setPlaying(true)}
                      className="w-20 h-20 bg-primary-600/90 hover:bg-primary-500 rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-all"
                    >
                      <PlayCircle size={40} className="text-white ml-1" />
                    </button>
                  ) : (
                    <div className="text-white text-center">
                      <div className="w-16 h-16 border-4 border-primary-400 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
                      <p className="text-sm font-medium">Playing lesson…</p>
                    </div>
                  )}
                </div>
                {/* Overlay info */}
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                  <p className="text-white font-semibold">{selected.title}</p>
                  <p className="text-gray-300 text-xs">Lesson 4 of {selected.lessons} · {selected.duration} total</p>
                </div>
              </div>

              {/* Course info */}
              <div className="card">
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div>
                    <h2 className="text-lg font-bold text-white">{selected.title}</h2>
                    <p className="text-sm text-gray-400 mt-1">{selected.description}</p>
                  </div>
                  <button className="btn-secondary text-xs py-2 px-3 flex-shrink-0 gap-1.5">
                    <Download size={13} /> Notes
                  </button>
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-400">
                  <span className="flex items-center gap-1.5"><BookOpen size={14} />{selected.lessons} lessons</span>
                  <span className="flex items-center gap-1.5"><Clock size={14} />{selected.duration}</span>
                  <span className={`badge ${selected.tagColor}`}>{selected.tag}</span>
                </div>
                <div className="mt-4">
                  <div className="flex items-center justify-between text-sm mb-1.5">
                    <span className="text-gray-400">Progress</span>
                    <span className="text-white font-semibold">{selected.progress}%</span>
                  </div>
                  <div className="progress-bar h-2.5">
                    <div className="progress-fill bg-primary-500" style={{ width: `${selected.progress}%` }} />
                  </div>
                </div>
              </div>

              {/* Lesson list */}
              <div className="card">
                <h3 className="font-bold text-white mb-4">Lessons</h3>
                <div className="space-y-2">
                  {lessons.map(lesson => (
                    <div
                      key={lesson.id}
                      className={`flex items-center gap-3 p-3 rounded-xl transition-colors cursor-pointer ${
                        lesson.active
                          ? 'bg-primary-600/15 border border-primary-500/30'
                          : lesson.watched
                          ? 'hover:bg-white/5'
                          : 'hover:bg-white/5 opacity-70'
                      }`}
                    >
                      <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 ${
                        lesson.watched ? 'bg-green-500/20' : lesson.active ? 'bg-primary-500/20' : 'bg-white/5'
                      }`}>
                        {lesson.watched ? (
                          <CheckCircle size={14} className="text-green-400" />
                        ) : lesson.isQuiz ? (
                          <Filter size={12} className="text-purple-400" />
                        ) : lesson.active ? (
                          <PlayCircle size={14} className="text-primary-400" />
                        ) : (
                          <Lock size={12} className="text-gray-600" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className={`text-sm font-medium truncate ${
                          lesson.active ? 'text-primary-300' : lesson.watched ? 'text-gray-300' : 'text-gray-500'
                        }`}>
                          {lesson.title}
                        </p>
                      </div>
                      <span className="text-xs text-gray-600 flex-shrink-0">{lesson.duration}</span>
                      {lesson.active && <ChevronRight size={14} className="text-primary-400 flex-shrink-0" />}
                    </div>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <div className="card flex items-center justify-center h-64 text-gray-500">
              Select a course to start learning
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
