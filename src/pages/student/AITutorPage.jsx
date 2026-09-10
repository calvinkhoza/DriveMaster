import { useEffect } from 'react';
import { Bot, Sparkles, BookOpen, FileQuestion, MessageSquare } from 'lucide-react';
import { useApp } from '../../context/AppContext';

const topics = [
  { icon: '🚦', label: 'Road Signs',        q: 'Explain the difference between regulatory and warning signs' },
  { icon: '⚡', label: 'Speed Limits',       q: 'What are the default speed limits in South Africa?' },
  { icon: '🛑', label: 'Stop vs Yield',      q: 'What is the difference between a Stop sign and a Yield sign?' },
  { icon: '🚗', label: 'Vehicle Controls',   q: 'What does the oil pressure warning light mean?' },
  { icon: '🚨', label: 'Emergency Braking',  q: 'Explain emergency braking on a non-ABS vehicle' },
  { icon: '📋', label: 'Booking the Test',   q: 'How do I book my K53 learner\'s licence test at NaTIS?' },
];

export default function AITutorPage() {
  const { setChatOpen } = useApp();

  useEffect(() => {
    // Auto-open the chatbot when visiting this page
    setChatOpen(true);
    return () => {};
  }, [setChatOpen]);

  return (
    <div className="space-y-8 animate-fade-in max-w-3xl">
      <div>
        <h1 className="section-title flex items-center gap-2">
          <Bot size={24} className="text-primary-400" /> AI Tutor
        </h1>
        <p className="section-subtitle">Ask anything about K53 — available 24/7, instant answers</p>
      </div>

      {/* Hero */}
      <div className="card border-primary-500/20 bg-gradient-to-br from-primary-900/30 to-dark-800 text-center py-10">
        <div className="w-20 h-20 mx-auto bg-primary-600/20 border border-primary-500/30 rounded-full flex items-center justify-center mb-4">
          <Bot size={36} className="text-primary-400" />
        </div>
        <h2 className="text-xl font-bold text-white mb-2">Your personal K53 study companion</h2>
        <p className="text-gray-400 text-sm max-w-md mx-auto mb-6 leading-relaxed">
          Grounded in the official K53 curriculum. Ask about road signs, traffic rules, vehicle controls,
          the booking process, or anything else you're unsure about.
        </p>
        <div className="flex items-center justify-center gap-2 flex-wrap">
          {['Road Signs', 'Traffic Rules', 'Vehicle Controls', 'Test Booking', 'Mock Exam Tips'].map(tag => (
            <span key={tag} className="badge bg-primary-500/20 text-primary-300 text-xs">
              <Sparkles size={9} /> {tag}
            </span>
          ))}
        </div>
        <p className="mt-4 text-xs text-green-400 flex items-center justify-center gap-1.5">
          <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          AI Tutor is online — chat widget is open in the bottom-right corner
        </p>
      </div>

      {/* Quick topics */}
      <div>
        <h2 className="font-bold text-white mb-4 flex items-center gap-2">
          <Sparkles size={15} className="text-primary-400" /> Quick Topic Starters
        </h2>
        <div className="grid sm:grid-cols-2 gap-3">
          {topics.map(({ icon, label, q }) => (
            <button
              key={label}
              onClick={() => setChatOpen(true)}
              className="card-hover text-left flex items-start gap-3"
            >
              <span className="text-2xl flex-shrink-0">{icon}</span>
              <div>
                <p className="text-sm font-semibold text-white mb-0.5">{label}</p>
                <p className="text-xs text-gray-400 line-clamp-2">{q}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Capabilities */}
      <div className="grid sm:grid-cols-3 gap-4">
        {[
          { icon: BookOpen,      color: 'text-blue-400',   bg: 'bg-blue-500/10',   title: 'Course-Grounded', desc: 'All answers are tied to K53 curriculum and official regulations.' },
          { icon: FileQuestion,  color: 'text-purple-400', bg: 'bg-purple-500/10', title: 'Question Help',   desc: 'Paste any exam question and get a full explanation of the correct answer.' },
          { icon: MessageSquare, color: 'text-green-400',  bg: 'bg-green-500/10',  title: '24/7 Available',  desc: 'Study at midnight or during your lunch break — always ready.' },
        ].map(({ icon: Icon, color, bg, title, desc }) => (
          <div key={title} className="card text-center">
            <div className={`w-11 h-11 ${bg} rounded-xl flex items-center justify-center mx-auto mb-3`}>
              <Icon size={20} className={color} />
            </div>
            <p className="font-semibold text-white mb-1">{title}</p>
            <p className="text-xs text-gray-400 leading-relaxed">{desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
