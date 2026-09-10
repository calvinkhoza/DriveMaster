import { useState } from 'react';
import {
  Timer, CheckCircle, XCircle, ChevronRight, ChevronLeft,
  RotateCcw, Trophy, AlertCircle, FileQuestion,
} from 'lucide-react';
import { questions } from '../../data/mockData';

const TOTAL_TIME = 30 * 60; // 30 minutes in seconds

function formatTime(s) {
  const m = Math.floor(s / 60).toString().padStart(2, '0');
  const sec = (s % 60).toString().padStart(2, '0');
  return `${m}:${sec}`;
}

export default function MockExamPage() {
  const [mode, setMode]             = useState('home'); // home | exam | review
  const [current, setCurrent]       = useState(0);
  const [answers, setAnswers]       = useState({});
  const [flagged, setFlagged]       = useState(new Set());
  const [submitted, setSubmitted]   = useState(false);
  const [timeLeft, setTimeLeft]     = useState(TOTAL_TIME);
  const [timerActive, setTimerActive] = useState(false);
  const [timerRef, setTimerRef]     = useState(null);

  const startExam = () => {
    setMode('exam');
    setCurrent(0);
    setAnswers({});
    setFlagged(new Set());
    setSubmitted(false);
    setTimeLeft(TOTAL_TIME);
    const ref = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) { clearInterval(ref); handleSubmit(); return 0; }
        return t - 1;
      });
    }, 1000);
    setTimerRef(ref);
    setTimerActive(true);
  };

  const handleAnswer = (idx) => {
    if (submitted) return;
    setAnswers(prev => ({ ...prev, [current]: idx }));
  };

  const toggleFlag = () => {
    setFlagged(prev => {
      const next = new Set(prev);
      next.has(current) ? next.delete(current) : next.add(current);
      return next;
    });
  };

  const handleSubmit = () => {
    if (timerRef) clearInterval(timerRef);
    setTimerActive(false);
    setSubmitted(true);
    setMode('review');
  };

  const score = submitted
    ? Math.round((questions.filter((q, i) => answers[i] === q.correct).length / questions.length) * 100)
    : 0;

  const passed = score >= 75;

  /* ─── Home ─────────────────────────────────────────────────────────── */
  if (mode === 'home') {
    return (
      <div className="space-y-6 animate-fade-in max-w-3xl">
        <div>
          <h1 className="section-title">Mock Exams</h1>
          <p className="section-subtitle">Simulate the official K53 computer-based test</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: 'Attempts', value: '7', icon: RotateCcw, color: 'text-blue-400', bg: 'bg-blue-500/10' },
            { label: 'Best Score', value: '82%', icon: Trophy, color: 'text-yellow-400', bg: 'bg-yellow-500/10' },
            { label: 'Pass Rate', value: '71%', icon: CheckCircle, color: 'text-green-400', bg: 'bg-green-500/10' },
          ].map(({ label, value, icon: Icon, color, bg }) => (
            <div key={label} className="card text-center">
              <div className={`w-10 h-10 ${bg} rounded-xl flex items-center justify-center mx-auto mb-2`}>
                <Icon size={18} className={color} />
              </div>
              <p className="text-2xl font-black text-white">{value}</p>
              <p className="text-xs text-gray-400 mt-0.5">{label}</p>
            </div>
          ))}
        </div>

        {/* Exam info */}
        <div className="card">
          <h3 className="font-bold text-white mb-4 flex items-center gap-2">
            <FileQuestion size={18} className="text-primary-400" />
            K53 Theory Mock Exam
          </h3>
          <div className="grid sm:grid-cols-2 gap-4 mb-6">
            {[
              ['Questions', `${questions.length} questions`],
              ['Time Limit', '30 minutes'],
              ['Pass Mark', '75% (6/8 correct)'],
              ['Attempts', 'Unlimited'],
            ].map(([k, v]) => (
              <div key={k} className="flex items-center justify-between py-2 border-b border-white/5">
                <span className="text-sm text-gray-400">{k}</span>
                <span className="text-sm font-medium text-white">{v}</span>
              </div>
            ))}
          </div>
          <button onClick={startExam} className="btn-primary w-full justify-center py-3">
            Start Exam <ChevronRight size={16} />
          </button>
        </div>

        {/* Topic breakdown */}
        <div className="card">
          <h3 className="font-bold text-white mb-4">Topic Breakdown</h3>
          {[
            { topic: 'Road Signs',        questions: 30, mastery: 82, color: 'bg-blue-500' },
            { topic: 'Rules of the Road', questions: 28, mastery: 68, color: 'bg-purple-500' },
            { topic: 'Vehicle Controls',  questions: 22, mastery: 55, color: 'bg-orange-500' },
            { topic: 'Emergency Procedures', questions: 20, mastery: 40, color: 'bg-red-500' },
          ].map(({ topic, questions: q, mastery, color }) => (
            <div key={topic} className="mb-4">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-sm text-gray-300 font-medium">{topic}</span>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-500">{q} questions</span>
                  <span className={`text-sm font-bold ${mastery >= 75 ? 'text-green-400' : mastery >= 50 ? 'text-yellow-400' : 'text-red-400'}`}>
                    {mastery}%
                  </span>
                </div>
              </div>
              <div className="progress-bar">
                <div className={`progress-fill ${color}`} style={{ width: `${mastery}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  /* ─── Review results ────────────────────────────────────────────────── */
  if (mode === 'review') {
    return (
      <div className="space-y-6 animate-fade-in max-w-3xl">
        {/* Score card */}
        <div className={`card border-2 text-center py-8 ${passed ? 'border-green-500/40 bg-green-500/5' : 'border-red-500/40 bg-red-500/5'}`}>
          <div className={`w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-4 ${passed ? 'bg-green-500/20' : 'bg-red-500/20'}`}>
            {passed
              ? <Trophy size={36} className="text-yellow-400" />
              : <XCircle size={36} className="text-red-400" />
            }
          </div>
          <h2 className="text-5xl font-black text-white mb-2">{score}%</h2>
          <p className={`text-lg font-bold mb-2 ${passed ? 'text-green-400' : 'text-red-400'}`}>
            {passed ? '🎉 Passed!' : '😕 Not Passed'}
          </p>
          <p className="text-gray-400 text-sm">
            {questions.filter((q, i) => answers[i] === q.correct).length} of {questions.length} correct · Pass mark: 75%
          </p>
          <div className="flex gap-3 justify-center mt-6">
            <button onClick={() => setMode('home')} className="btn-secondary">
              <RotateCcw size={15} /> Try Again
            </button>
          </div>
        </div>

        {/* Question review */}
        <div className="card">
          <h3 className="font-bold text-white mb-5">Detailed Review</h3>
          <div className="space-y-5">
            {questions.map((q, qi) => {
              const userAns  = answers[qi];
              const correct  = q.correct;
              const isRight  = userAns === correct;
              return (
                <div key={q.id} className={`p-4 rounded-xl border ${isRight ? 'border-green-500/20 bg-green-500/5' : 'border-red-500/20 bg-red-500/5'}`}>
                  <div className="flex items-start gap-2 mb-3">
                    {isRight
                      ? <CheckCircle size={16} className="text-green-400 flex-shrink-0 mt-0.5" />
                      : <XCircle size={16} className="text-red-400 flex-shrink-0 mt-0.5" />
                    }
                    <p className="text-sm font-medium text-white">{qi + 1}. {q.question}</p>
                  </div>
                  <div className="space-y-1.5 mb-3">
                    {q.options.map((opt, oi) => (
                      <div
                        key={oi}
                        className={`px-3 py-2 rounded-lg text-sm flex items-center gap-2 ${
                          oi === correct ? 'bg-green-500/15 text-green-300 font-medium'
                          : oi === userAns && !isRight ? 'bg-red-500/15 text-red-300'
                          : 'text-gray-400'
                        }`}
                      >
                        {oi === correct && <CheckCircle size={12} className="text-green-400 flex-shrink-0" />}
                        {oi === userAns && !isRight && <XCircle size={12} className="text-red-400 flex-shrink-0" />}
                        {opt}
                      </div>
                    ))}
                  </div>
                  <div className="flex items-start gap-2 p-3 bg-blue-500/10 rounded-lg">
                    <AlertCircle size={13} className="text-blue-400 flex-shrink-0 mt-0.5" />
                    <p className="text-xs text-blue-200 leading-relaxed">{q.explanation}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  /* ─── Exam ──────────────────────────────────────────────────────────── */
  const q = questions[current];
  const answered = answers[current] !== undefined;
  const danger = timeLeft < 300;

  return (
    <div className="max-w-2xl mx-auto animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="text-xs text-gray-400 font-medium">Question {current + 1} of {questions.length}</p>
          <div className="flex gap-1 mt-1.5">
            {questions.map((_, i) => (
              <div
                key={i}
                className={`h-1.5 rounded-full transition-colors ${
                  i === current ? 'w-6 bg-primary-500'
                  : answers[i] !== undefined ? 'w-3 bg-green-500'
                  : 'w-3 bg-white/10'
                }`}
              />
            ))}
          </div>
        </div>
        <div className={`flex items-center gap-2 px-4 py-2 rounded-xl border font-mono font-bold ${
          danger ? 'bg-red-500/10 border-red-500/30 text-red-400' : 'bg-white/5 border-white/10 text-white'
        }`}>
          <Timer size={15} />
          {formatTime(timeLeft)}
        </div>
      </div>

      {/* Question card */}
      <div className="card mb-5">
        <div className="flex items-start gap-2 mb-1">
          <span className="badge bg-primary-500/20 text-primary-400 text-[10px]">{q.topic}</span>
          {flagged.has(current) && <span className="badge bg-yellow-500/20 text-yellow-400 text-[10px]">Flagged</span>}
        </div>
        <h2 className="text-lg font-semibold text-white mt-3 mb-6 leading-relaxed">{q.question}</h2>

        <div className="space-y-3">
          {q.options.map((opt, i) => (
            <button
              key={i}
              onClick={() => handleAnswer(i)}
              className={`w-full text-left px-4 py-3.5 rounded-xl border transition-all text-sm font-medium ${
                answers[current] === i
                  ? 'border-primary-500 bg-primary-600/20 text-white'
                  : 'border-white/10 bg-white/5 text-gray-300 hover:border-white/30 hover:bg-white/10'
              }`}
            >
              <span className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold mr-3 ${
                answers[current] === i ? 'bg-primary-600 text-white' : 'bg-white/10 text-gray-400'
              }`}>
                {String.fromCharCode(65 + i)}
              </span>
              {opt}
            </button>
          ))}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between gap-3">
        <button
          onClick={() => setCurrent(c => Math.max(0, c - 1))}
          disabled={current === 0}
          className="btn-secondary disabled:opacity-30"
        >
          <ChevronLeft size={16} /> Previous
        </button>

        <button
          onClick={toggleFlag}
          className={`btn-secondary text-sm ${flagged.has(current) ? 'border-yellow-500/40 text-yellow-400' : ''}`}
        >
          {flagged.has(current) ? '🚩 Flagged' : '🏳 Flag'}
        </button>

        {current < questions.length - 1 ? (
          <button onClick={() => setCurrent(c => c + 1)} className="btn-primary">
            Next <ChevronRight size={16} />
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            className="btn-accent"
          >
            Submit Exam
          </button>
        )}
      </div>

      {/* Question grid */}
      <div className="card mt-6">
        <p className="text-xs text-gray-400 font-medium mb-3">Question overview — click to navigate</p>
        <div className="grid grid-cols-8 gap-1.5">
          {questions.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`h-8 w-full rounded-lg text-xs font-bold transition-colors ${
                i === current        ? 'bg-primary-600 text-white'
                : flagged.has(i)     ? 'bg-yellow-500/30 text-yellow-300'
                : answers[i] !== undefined ? 'bg-green-600/30 text-green-300'
                : 'bg-white/5 text-gray-500 hover:bg-white/10'
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
        <div className="flex gap-4 mt-3 flex-wrap">
          {[
            { color: 'bg-primary-600', label: 'Current' },
            { color: 'bg-green-600/30', label: 'Answered' },
            { color: 'bg-yellow-500/30', label: 'Flagged' },
            { color: 'bg-white/5', label: 'Unanswered' },
          ].map(({ color, label }) => (
            <div key={label} className="flex items-center gap-1.5">
              <div className={`w-3 h-3 rounded ${color}`} />
              <span className="text-[10px] text-gray-500">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
