import { useState } from 'react';
import {
  Plus, Upload, Edit2, Trash2, Eye, MoreVertical,
  Video, FileText, GripVertical, CheckCircle,
} from 'lucide-react';
import { courses } from '../../data/mockData';

export default function ContentManager() {
  const [selected, setSelected] = useState(courses[0]);
  const [showUpload, setShowUpload] = useState(false);
  const [drag, setDrag] = useState(false);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="section-title">Content Manager</h1>
          <p className="section-subtitle">Upload, organise, and manage all course material</p>
        </div>
        <button onClick={() => setShowUpload(true)} className="btn-primary text-sm py-2 px-4">
          <Plus size={15} /> New Course
        </button>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Course list */}
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wide px-1">Courses ({courses.length})</h3>
          {courses.map(c => (
            <button
              key={c.id}
              onClick={() => setSelected(c)}
              className={`w-full text-left p-3.5 rounded-xl border transition-all ${
                selected?.id === c.id
                  ? 'border-primary-500/50 bg-primary-600/10'
                  : 'border-white/10 bg-white/5 hover:border-white/20'
              }`}
            >
              <div className="flex gap-3 items-center">
                <div className="w-12 h-12 rounded-lg overflow-hidden bg-dark-700 flex-shrink-0">
                  <img src={c.thumbnail} alt={c.title} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-white truncate">{c.title}</p>
                  <p className="text-xs text-gray-500">{c.lessons} lessons · {c.duration}</p>
                </div>
                <span className="badge bg-green-500/20 text-green-400 text-[10px] flex-shrink-0">Live</span>
              </div>
            </button>
          ))}
        </div>

        {/* Course editor */}
        <div className="lg:col-span-2 space-y-5">
          {selected && (
            <>
              {/* Course header */}
              <div className="card">
                <div className="flex gap-4 items-start">
                  <div className="w-24 h-16 rounded-xl overflow-hidden bg-dark-700 flex-shrink-0">
                    <img src={selected.thumbnail} alt={selected.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h2 className="font-bold text-white">{selected.title}</h2>
                        <p className="text-xs text-gray-400 mt-0.5">{selected.description}</p>
                      </div>
                      <div className="flex gap-2 flex-shrink-0">
                        <button className="btn-secondary text-xs py-1.5 px-3"><Edit2 size={12} /> Edit</button>
                        <button className="btn-secondary text-xs py-1.5 px-3"><Eye size={12} /> Preview</button>
                      </div>
                    </div>
                    <div className="flex gap-3 mt-3">
                      <span className={`badge text-[10px] ${selected.tagColor}`}>{selected.tag}</span>
                      <span className="text-xs text-gray-500">{selected.lessons} lessons · {selected.duration}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Upload zone */}
              <div
                onDragOver={e => { e.preventDefault(); setDrag(true); }}
                onDragLeave={() => setDrag(false)}
                onDrop={e => { e.preventDefault(); setDrag(false); }}
                className={`border-2 border-dashed rounded-2xl p-8 text-center transition-all ${
                  drag ? 'border-primary-500 bg-primary-600/10' : 'border-white/20 hover:border-white/40'
                }`}
              >
                <Upload size={28} className="mx-auto text-gray-500 mb-3" />
                <p className="text-sm font-medium text-gray-300 mb-1">Drag & drop video files here</p>
                <p className="text-xs text-gray-500 mb-4">MP4, MOV, AVI up to 4 GB</p>
                <button className="btn-primary text-sm py-2 px-5">
                  <Upload size={14} /> Choose File
                </button>
              </div>

              {/* Lessons list */}
              <div className="card">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-white">Lessons</h3>
                  <button className="btn-secondary text-xs py-1.5 px-3">
                    <Plus size={12} /> Add Lesson
                  </button>
                </div>
                <div className="space-y-2">
                  {[
                    { title: 'Introduction to Road Signs', dur: '12:34', pub: true },
                    { title: 'Regulatory Signs — Part 1',  dur: '18:22', pub: true },
                    { title: 'Regulatory Signs — Part 2',  dur: '15:10', pub: true },
                    { title: 'Warning Signs Deep Dive',    dur: '21:05', pub: true },
                    { title: 'Guidance & Information Signs',dur:'14:48', pub: false },
                    { title: 'Road Markings Explained',    dur: '16:30', pub: false },
                    { title: 'Module Quiz',                dur: '—',     pub: false, isQuiz: true },
                  ].map((lesson, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 bg-white/5 rounded-xl border border-white/10 group hover:border-white/20 transition-colors">
                      <GripVertical size={14} className="text-gray-600 cursor-grab flex-shrink-0" />
                      <div className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 ${
                        lesson.isQuiz ? 'bg-purple-500/20' : 'bg-primary-500/20'
                      }`}>
                        {lesson.isQuiz ? <FileText size={13} className="text-purple-400" /> : <Video size={13} className="text-primary-400" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-white truncate">{lesson.title}</p>
                        <p className="text-xs text-gray-500">{lesson.dur}</p>
                      </div>
                      <span className={`badge text-[10px] flex-shrink-0 ${
                        lesson.pub ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'
                      }`}>
                        {lesson.pub ? <><CheckCircle size={9} /> Published</> : 'Draft'}
                      </span>
                      <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
                        <button className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors">
                          <Edit2 size={12} />
                        </button>
                        <button className="p-1.5 rounded-lg bg-white/5 hover:bg-red-500/10 text-gray-400 hover:text-red-400 transition-colors">
                          <Trash2 size={12} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
