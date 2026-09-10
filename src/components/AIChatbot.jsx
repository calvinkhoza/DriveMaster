import { useState, useRef, useEffect } from 'react';
import {
  MessageSquare, X, Send, Bot, User, Sparkles,
  BookOpen, ChevronRight, Minimize2,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { chatResponses } from '../data/mockData';

const suggestions = [
  'What does a red circular sign mean?',
  'What is the following distance rule?',
  'How do I book my K53 test?',
  'Explain emergency braking',
];

function getResponse(text) {
  const lower = text.toLowerCase();
  for (const item of chatResponses.keywords) {
    if (item.keys.some(k => lower.includes(k))) return item.response;
  }
  return "Great question! That's covered in our **Rules of the Road** module. I'd recommend checking the relevant lesson for a detailed explanation — or try searching the question bank for similar questions. Is there anything else I can help you with?";
}

function TypingIndicator() {
  return (
    <div className="flex items-end gap-2">
      <div className="w-7 h-7 rounded-full bg-primary-600/30 border border-primary-500/30 flex items-center justify-center flex-shrink-0">
        <Bot size={14} className="text-primary-400" />
      </div>
      <div className="bg-dark-700 border border-white/10 rounded-2xl rounded-bl-sm px-4 py-3">
        <div className="flex gap-1.5">
          {[0, 1, 2].map(i => (
            <div
              key={i}
              className="w-2 h-2 bg-primary-400 rounded-full animate-bounce"
              style={{ animationDelay: `${i * 0.15}s` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

/* Markdown-lite: bold and newlines */
function MessageText({ text }) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return (
    <p className="text-sm leading-relaxed whitespace-pre-wrap">
      {parts.map((p, i) =>
        p.startsWith('**') && p.endsWith('**')
          ? <strong key={i} className="text-white font-semibold">{p.slice(2, -2)}</strong>
          : p
      )}
    </p>
  );
}

export default function AIChatbot() {
  const { chatOpen, setChatOpen, user } = useApp();
  const [minimised, setMinimised]       = useState(false);
  const [input, setInput]               = useState('');
  const [typing, setTyping]             = useState(false);
  const [messages, setMessages]         = useState([
    {
      id: 1,
      role: 'bot',
      text: chatResponses.default,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const bottomRef = useRef(null);
  const inputRef  = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, typing]);

  useEffect(() => {
    if (chatOpen && !minimised) inputRef.current?.focus();
  }, [chatOpen, minimised]);

  const send = async (text) => {
    const trimmed = text.trim();
    if (!trimmed) return;
    setInput('');

    const userMsg = {
      id: Date.now(),
      role: 'user',
      text: trimmed,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setMessages(prev => [...prev, userMsg]);
    setTyping(true);

    await new Promise(r => setTimeout(r, 900 + Math.random() * 600));

    const response = getResponse(trimmed);
    setTyping(false);
    setMessages(prev => [
      ...prev,
      {
        id: Date.now() + 1,
        role: 'bot',
        text: response,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
  };

  const handleKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(input); }
  };

  if (!user) return null;

  /* Closed FAB */
  if (!chatOpen) {
    return (
      <button
        onClick={() => setChatOpen(true)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-primary-600 hover:bg-primary-500 rounded-full flex items-center justify-center shadow-2xl shadow-primary-900/50 hover:scale-110 transition-all group"
        aria-label="Open AI Tutor"
      >
        <MessageSquare size={22} className="text-white" />
        <span className="absolute -top-1 -right-1 w-5 h-5 bg-accent-500 rounded-full text-[10px] font-bold text-white flex items-center justify-center">
          AI
        </span>
      </button>
    );
  }

  return (
    <div
      className={`fixed bottom-6 right-6 z-50 w-[360px] bg-dark-900 border border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden transition-all duration-300 ${
        minimised ? 'h-14' : 'h-[520px]'
      }`}
    >
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-primary-900 to-dark-800 border-b border-white/10 flex-shrink-0">
        <div className="w-8 h-8 bg-primary-600/40 border border-primary-500/40 rounded-full flex items-center justify-center">
          <Bot size={16} className="text-primary-300" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-white leading-tight">K53 AI Tutor</p>
          <p className="text-[10px] text-green-400 flex items-center gap-1">
            <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" /> Online · Powered by AI
          </p>
        </div>
        <div className="flex gap-1">
          <button
            onClick={() => setMinimised(!minimised)}
            className="p-1.5 rounded-lg text-gray-500 hover:text-white hover:bg-white/10 transition-colors"
            aria-label={minimised ? 'Expand' : 'Minimise'}
          >
            <Minimize2 size={14} />
          </button>
          <button
            onClick={() => setChatOpen(false)}
            className="p-1.5 rounded-lg text-gray-500 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Close"
          >
            <X size={14} />
          </button>
        </div>
      </div>

      {!minimised && (
        <>
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map(msg => (
              <div key={msg.id} className={`flex items-end gap-2 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 ${
                  msg.role === 'bot'
                    ? 'bg-primary-600/30 border border-primary-500/30'
                    : 'bg-accent-500/30 border border-accent-500/30'
                }`}>
                  {msg.role === 'bot'
                    ? <Bot size={14} className="text-primary-400" />
                    : <User size={14} className="text-accent-400" />
                  }
                </div>
                <div className={`max-w-[78%] ${msg.role === 'user' ? 'items-end' : 'items-start'} flex flex-col gap-1`}>
                  <div className={`px-4 py-2.5 rounded-2xl ${
                    msg.role === 'bot'
                      ? 'bg-dark-700 border border-white/10 rounded-bl-sm text-gray-200'
                      : 'bg-primary-600 rounded-br-sm text-white'
                  }`}>
                    <MessageText text={msg.text} />
                  </div>
                  <span className="text-[10px] text-gray-600 px-1">{msg.time}</span>
                </div>
              </div>
            ))}

            {typing && <TypingIndicator />}
            <div ref={bottomRef} />
          </div>

          {/* Suggestions */}
          {messages.length <= 2 && (
            <div className="px-4 pb-2 flex gap-2 flex-wrap">
              {suggestions.map(s => (
                <button
                  key={s}
                  onClick={() => send(s)}
                  className="text-[11px] px-2.5 py-1 bg-primary-600/20 hover:bg-primary-600/40 border border-primary-500/30 text-primary-300 rounded-lg transition-colors flex items-center gap-1"
                >
                  <Sparkles size={9} /> {s}
                </button>
              ))}
            </div>
          )}

          {/* Resource suggestions */}
          <div className="px-4 pb-2 flex items-center gap-2 overflow-x-auto">
            {[
              { label: 'Road Signs', icon: BookOpen },
              { label: 'Mock Exam', icon: ChevronRight },
            ].map(({ label, icon: Icon }) => (
              <button
                key={label}
                className="flex items-center gap-1.5 text-[11px] px-2.5 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 text-gray-400 rounded-lg whitespace-nowrap transition-colors flex-shrink-0"
              >
                <Icon size={11} /> {label}
              </button>
            ))}
          </div>

          {/* Input */}
          <div className="p-3 border-t border-white/10 flex gap-2">
            <input
              ref={inputRef}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKey}
              placeholder="Ask about K53…"
              className="flex-1 bg-dark-700 border border-white/10 rounded-xl px-3 py-2 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-primary-500 transition-colors"
            />
            <button
              onClick={() => send(input)}
              disabled={!input.trim() || typing}
              className="w-9 h-9 bg-primary-600 hover:bg-primary-500 rounded-xl flex items-center justify-center transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex-shrink-0"
              aria-label="Send"
            >
              <Send size={15} className="text-white" />
            </button>
          </div>
        </>
      )}
    </div>
  );
}
