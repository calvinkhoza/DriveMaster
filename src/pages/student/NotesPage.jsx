import { useState } from 'react';
import { BookOpen, Download, Search, FileText, ExternalLink } from 'lucide-react';

const notes = [
  {
    id: 1,
    title: 'Road Signs Complete Reference',
    module: 'Road Signs & Markings',
    pages: 24,
    size: '2.4 MB',
    type: 'PDF',
    updated: '2026-08-01',
    color: 'from-blue-600 to-cyan-600',
  },
  {
    id: 2,
    title: 'Rules of the Road Summary',
    module: 'Rules of the Road',
    pages: 32,
    size: '3.1 MB',
    type: 'PDF',
    updated: '2026-08-10',
    color: 'from-purple-600 to-pink-600',
  },
  {
    id: 3,
    title: 'Vehicle Dashboard & Controls',
    module: 'Vehicle Controls & Safety',
    pages: 18,
    size: '1.8 MB',
    type: 'PDF',
    updated: '2026-07-22',
    color: 'from-orange-600 to-red-600',
  },
  {
    id: 4,
    title: 'Emergency Procedures Handbook',
    module: 'Emergency Procedures',
    pages: 14,
    size: '1.2 MB',
    type: 'PDF',
    updated: '2026-08-05',
    color: 'from-red-600 to-pink-600',
  },
  {
    id: 5,
    title: 'K53 Quick Revision Cheatsheet',
    module: 'All Modules',
    pages: 8,
    size: '0.8 MB',
    type: 'PDF',
    updated: '2026-09-01',
    color: 'from-green-600 to-teal-600',
  },
  {
    id: 6,
    title: 'Road Markings Visual Guide',
    module: 'Road Signs & Markings',
    pages: 12,
    size: '4.2 MB',
    type: 'PDF',
    updated: '2026-07-30',
    color: 'from-yellow-600 to-orange-600',
  },
];

const topics = [
  {
    id: 'signs',
    title: 'Road Signs Explained',
    icon: '🚦',
    color: 'bg-blue-500/10 border-blue-500/20',
    sections: [
      { heading: 'Regulatory Signs', content: 'Round signs with red borders that must be obeyed. Examples: No Entry, Speed Limits, Stop, Yield.' },
      { heading: 'Warning Signs', content: 'Yellow or orange diamonds alerting drivers to hazards ahead. Examples: Sharp curve, pedestrian crossing, school zone.' },
      { heading: 'Guidance Signs', content: 'Blue or green rectangles providing information about routes, distances, facilities, and directions.' },
    ],
  },
  {
    id: 'rules',
    title: 'Right of Way Rules',
    icon: '🛣️',
    color: 'bg-purple-500/10 border-purple-500/20',
    sections: [
      { heading: 'Uncontrolled Intersections', content: 'The vehicle on the RIGHT has the right of way when two vehicles arrive simultaneously.' },
      { heading: 'Controlled Intersections', content: 'Follow traffic signals. A flashing red = treat as a Stop sign. Flashing amber = proceed with caution.' },
      { heading: 'Emergency Vehicles', content: 'Always yield to emergency vehicles with sirens activated. Pull over to the left and stop.' },
    ],
  },
  {
    id: 'speed',
    title: 'Speed Limits Reference',
    icon: '⚡',
    color: 'bg-orange-500/10 border-orange-500/20',
    sections: [
      { heading: 'Urban Areas', content: '60 km/h — unless otherwise indicated by road signs.' },
      { heading: 'Rural Roads', content: '100 km/h — on open roads outside urban areas.' },
      { heading: 'Freeways', content: '120 km/h — maximum on designated motorways/freeways.' },
    ],
  },
];

export default function NotesPage() {
  const [search, setSearch]       = useState('');
  const [activeTopic, setTopic]   = useState('signs');

  const filtered = notes.filter(n =>
    n.title.toLowerCase().includes(search.toLowerCase()) ||
    n.module.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="section-title">Notes & Study Materials</h1>
        <p className="section-subtitle">Downloadable PDFs and interactive study guides</p>
      </div>

      {/* Interactive notes */}
      <div>
        <h2 className="font-bold text-white mb-4 flex items-center gap-2">
          <BookOpen size={16} className="text-primary-400" /> Interactive Study Notes
        </h2>
        <div className="flex gap-3 mb-5 flex-wrap">
          {topics.map(t => (
            <button
              key={t.id}
              onClick={() => setTopic(t.id)}
              className={`px-4 py-2 text-sm font-medium rounded-xl border transition-colors ${
                activeTopic === t.id
                  ? 'bg-primary-600 border-primary-500 text-white'
                  : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10'
              }`}
            >
              {t.icon} {t.title}
            </button>
          ))}
        </div>

        {topics.filter(t => t.id === activeTopic).map(topic => (
          <div key={topic.id} className={`card border ${topic.color}`}>
            <h3 className="font-bold text-white mb-5 text-lg">{topic.icon} {topic.title}</h3>
            <div className="grid sm:grid-cols-3 gap-4">
              {topic.sections.map(s => (
                <div key={s.heading} className="p-4 bg-white/5 rounded-xl">
                  <h4 className="text-sm font-semibold text-white mb-2">{s.heading}</h4>
                  <p className="text-sm text-gray-400 leading-relaxed">{s.content}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* PDF downloads */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-bold text-white flex items-center gap-2">
            <FileText size={16} className="text-accent-400" /> Downloadable PDFs
          </h2>
          <div className="relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
            <input
              value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Search notes…" className="input pl-9 text-sm py-2 w-56"
            />
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map(note => (
            <div key={note.id} className="card-hover flex flex-col gap-3">
              <div className={`h-24 rounded-xl bg-gradient-to-br ${note.color} flex items-center justify-center`}>
                <FileText size={36} className="text-white/80" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-white mb-1">{note.title}</p>
                <p className="text-xs text-gray-400">{note.module}</p>
              </div>
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span>{note.pages} pages · {note.size}</span>
                <span>Updated {note.updated}</span>
              </div>
              <div className="flex gap-2">
                <button className="btn-primary text-xs py-2 flex-1 justify-center gap-1.5">
                  <Download size={12} /> Download
                </button>
                <button className="btn-secondary text-xs py-2 px-3">
                  <ExternalLink size={12} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
