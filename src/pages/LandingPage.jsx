import { Link } from 'react-router-dom';
import {
  PlayCircle, BookOpen, FileQuestion, Calendar, MessageSquare,
  BarChart2, Star, CheckCircle, ArrowRight, Zap, Shield,
  Award, Users, TrendingUp, ChevronRight,
} from 'lucide-react';
import Footer from '../components/shared/Footer';
import driverImg from '../assets/image.png';

/* ─── Data ─────────────────────────────────────────────────────────────── */
const features = [
  { icon: PlayCircle,    color: 'text-blue-400',    bg: 'bg-blue-500/10',    title: 'HD Video Lessons',     desc: 'Structured modules covering Road Signs, Rules of the Road, and Vehicle Controls with adaptive streaming.' },
  { icon: FileQuestion,  color: 'text-violet-400',  bg: 'bg-violet-500/10',  title: '1 000+ Question Bank', desc: 'K53 exam-style questions with detailed explanations and instant feedback on every attempt.' },
  { icon: Calendar,      color: 'text-emerald-400', bg: 'bg-emerald-500/10', title: 'Live Sessions',        desc: 'Interactive live classes with real-time chat, Q&A, and polls — replays always available.' },
  { icon: MessageSquare, color: 'text-orange-400',  bg: 'bg-orange-500/10',  title: '24/7 AI Tutor',        desc: 'Ask anything K53-related anytime. Instant answers grounded in the official curriculum.' },
  { icon: BarChart2,     color: 'text-cyan-400',    bg: 'bg-cyan-500/10',    title: 'Progress Tracking',    desc: 'Visual dashboards showing study time, score trends, and mastery per topic module.' },
  { icon: Zap,           color: 'text-yellow-400',  bg: 'bg-yellow-500/10',  title: 'Gamification',         desc: 'Earn points, unlock badges, and climb the leaderboard. Daily streaks keep you consistent.' },
  { icon: Award,         color: 'text-teal-400',    bg: 'bg-teal-500/10',    title: 'Digital Certificate',  desc: 'Earn a personalised K53 completion certificate once you meet all final criteria.' },
];

const plans = [
  {
    name: 'Basic', price: 'R 149', period: '/month',
    desc: 'Everything you need to get started.',
    color: 'border-white/10', badge: null,
    features: ['All pre-recorded video lessons', 'Downloadable study notes', 'Basic question bank (300 questions)', 'Email support'],
    cta: 'Start Basic', ctaClass: 'btn-secondary w-full justify-center',
  },
  {
    name: 'Pro', price: 'R 299', period: '/month',
    desc: 'The full K53 preparation experience.',
    color: 'border-blue-500', badge: 'Most Popular',
    features: ['Everything in Basic', 'Full 1 000+ question bank', 'Graded topic quizzes', 'Unlimited mock exams + reports', 'Live session access & replays', '24/7 AI Tutor', 'Progress analytics dashboard'],
    cta: 'Start Pro', ctaClass: 'btn-primary w-full justify-center',
  },
  {
    name: 'Premium', price: 'R 499', period: '/month',
    desc: 'For those who want every edge.',
    color: 'border-orange-500/50', badge: 'Best Value',
    features: ['Everything in Pro', 'Monthly 1-on-1 mentoring session', 'Priority support', 'Early access to new content', 'Digital completion certificate', 'NaTIS booking assistant'],
    cta: 'Start Premium', ctaClass: 'btn-accent w-full justify-center',
  },
];

const testimonials = [
  { name: 'Amahle Ndlovu', role: 'Passed first attempt ✅', avatar: 'A', color: 'from-blue-600 to-cyan-500',   stars: 5, text: 'The mock exams are spot-on. After two weeks on the Pro plan I walked into my test confident and passed with 92%. Best investment I made.' },
  { name: 'Sipho Mokoena',  role: 'Student, Johannesburg',   avatar: 'S', color: 'from-violet-600 to-pink-500', stars: 5, text: 'The AI tutor answered my questions at midnight when I was cramming. The road signs module alone is worth it — so much clearer than any textbook.' },
  { name: 'Keabetswe Tau',  role: 'Passed, Pretoria',        avatar: 'K', color: 'from-orange-500 to-red-500',  stars: 5, text: 'Live sessions feel like a real class. Themba explains brilliantly. I went from 58% to 94% in my mock exams over three weeks.' },
];

const stats = [
  { value: '12 000+', label: 'Students Enrolled',   icon: Users },
  { value: '94%',     label: 'First-Time Pass Rate', icon: TrendingUp },
  { value: '1 000+',  label: 'Practice Questions',   icon: FileQuestion },
  { value: '4.9 / 5', label: 'Average Rating',       icon: Star },
];

/* ─── Component ─────────────────────────────────────────────────────────── */
export default function LandingPage() {

  return (
    <div className="min-h-screen bg-[#07101f] overflow-x-hidden">

      {/* ════════════════════════════════════════════════
          HERO — driver.png full-bleed background
      ════════════════════════════════════════════════ */}
      <section className="relative min-h-screen flex items-center justify-center px-6 pt-16 overflow-hidden">

        {/* ── 1. Background image ── */}
        <div className="absolute inset-0">
          <img
            src={driverImg}
            alt=""
            aria-hidden="true"
            className="w-full h-full object-cover object-center"
          />
        </div>

        {/* ── 2. Layered overlays (darkens image, keeps text crisp) ──
              Layer A – overall deep navy tint
              Layer B – radial vignette: edges darker, center slightly lighter
              Layer C – bottom fade into page background
        ── */}
        <div className="absolute inset-0 bg-[#07101f]/70" />
        <div className="absolute inset-0 bg-radial-[ellipse_80%_60%_at_50%_40%] from-transparent via-[#07101f]/20 to-[#07101f]/80" />
        {/* Subtle blue tint to unify palette */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-950/40 via-transparent to-transparent" />
        {/* Bottom edge fades into the sections below */}
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-gray-950 to-transparent" />
        {/* Top edge – fade from navbar */}
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-gray-950/60 to-transparent" />

        {/* ── 3. Content ── */}
        <div className="relative z-10 max-w-4xl mx-auto text-center">

          {/* Pill badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-600/25 border border-blue-400/40 backdrop-blur-sm rounded-full text-blue-300 text-sm font-semibold mb-8 shadow-lg shadow-blue-950/30">
            <Zap size={13} className="text-blue-400" />
            South Africa's #1 K53 Learning Platform
          </div>

          <h1 className="text-5xl sm:text-6xl md:text-7xl font-black text-white leading-[1.06] mb-6 drop-shadow-2xl">
            Pass Your{' '}
            <span className="relative inline-block">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-cyan-200 to-orange-300">
                K53 Learner's
              </span>
              {/* gradient underline accent */}
              <span className="absolute -bottom-1 left-0 w-full h-[3px] bg-gradient-to-r from-blue-400 to-orange-400 rounded-full opacity-70" />
            </span>
            <br />Licence — First Try.
          </h1>

          <p className="text-xl text-slate-300 max-w-2xl mx-auto mb-10 leading-relaxed drop-shadow-lg">
            Professional HD video courses, 1 000+ practice questions,
            live sessions, and a 24/7 AI tutor — everything you need in one platform.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Link to="/register" className="btn-primary text-base px-8 py-3.5 shadow-2xl shadow-blue-950/60">
              Start Learning <ArrowRight size={18} />
            </Link>
          </div>

          {/* Stats + info badges — all 6 in one uniform grid row */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 max-w-5xl mx-auto">

            {/* Stat cards × 4 */}
            {stats.map(({ value, label, icon: Icon }) => (
              <div
                key={label}
                className="bg-white/[0.08] hover:bg-white/[0.13] border border-white/[0.15] backdrop-blur-md rounded-2xl p-4 transition-all duration-200 shadow-lg text-center"
              >
                <Icon size={14} className="text-blue-300 mb-2 mx-auto" />
                <p className="text-xl font-bold text-white drop-shadow leading-tight">{value}</p>
                <p className="text-[10px] text-slate-300 mt-0.5 leading-tight">{label}</p>
              </div>
            ))}

            {/* Badge: Latest mock score */}
            <div className="bg-white/[0.08] hover:bg-white/[0.13] border border-white/[0.15] backdrop-blur-md rounded-2xl p-4 transition-all duration-200 shadow-lg text-center">
              <TrendingUp size={14} className="text-emerald-300 mb-2 mx-auto" />
              <p className="text-xl font-bold text-white leading-tight">82%</p>
              <p className="text-[10px] text-slate-300 mt-0.5 leading-tight">Latest Mock Score</p>
              <div className="mt-2 h-1 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full w-[82%] bg-gradient-to-r from-blue-400 to-cyan-300 rounded-full" />
              </div>
              <p className="text-[9px] text-emerald-400 mt-1 font-semibold">↑ +12% this week</p>
            </div>

            {/* Badge: LIVE NOW */}
            <div className="bg-white/[0.08] hover:bg-white/[0.13] border border-red-400/30 backdrop-blur-md rounded-2xl p-4 transition-all duration-200 shadow-lg text-center">
              <div className="flex items-center justify-center gap-1.5 mb-2">
                <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse flex-shrink-0" />
                <span className="text-[10px] font-bold text-red-400 tracking-wide">LIVE NOW</span>
              </div>
              <p className="text-[11px] font-bold text-white leading-tight">Mock Exam Practice</p>
              <p className="text-[10px] text-slate-300 mt-1 leading-tight">210 students joined</p>
            </div>

          </div>{/* end 6-col grid */}

        </div>{/* end content z-10 wrapper */}

      </section>

      {/* ════════════════════════════════════════════════
          FEATURES
      ════════════════════════════════════════════════ */}
      <section id="features" className="py-24 px-6 bg-[#0d1b2e]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-500/15 border border-blue-500/25 text-blue-400 text-xs font-semibold rounded-full mb-3">
              Platform Features
            </span>
            <h2 className="text-4xl font-bold text-white mb-3">Everything to Ace Your K53 Test</h2>
            <p className="text-gray-400 max-w-xl mx-auto">
              Built specifically around the South African K53 curriculum, with tools designed for how students actually learn.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {features.map(({ icon: Icon, color, bg, title, desc }) => (
              <div key={title} className="bg-[#0f2035] border border-white/[0.07] hover:border-blue-500/40 hover:shadow-xl hover:shadow-blue-950/40 rounded-2xl p-5 group transition-all duration-300 cursor-pointer">
                <div className={`w-11 h-11 ${bg} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <Icon size={20} className={color} />
                </div>
                <h3 className="font-semibold text-white mb-2">{title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════
          HOW IT WORKS
      ════════════════════════════════════════════════ */}
      <section className="py-24 px-6 bg-[#07101f]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-orange-500/15 border border-orange-500/25 text-orange-400 text-xs font-semibold rounded-full mb-3">
              Your Journey
            </span>
            <h2 className="text-4xl font-bold text-white mb-3">From Sign-Up to Passing in 3 Steps</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: '01', icon: Shield,   title: 'Choose Your Plan',    desc: 'Pick Basic, Pro, or Premium. Secure ZAR payment via PayFast — account activates instantly.' },
              { step: '02', icon: BookOpen, title: 'Study at Your Pace',  desc: 'Watch HD lessons, take graded quizzes, practice 1 000+ questions, join live classes — any device.' },
              { step: '03', icon: Award,    title: 'Pass With Confidence',desc: 'Take unlimited mock exams until your score is consistently above 85%, then walk in ready.' },
            ].map(({ step, icon: Icon, title, desc }) => (
              <div key={step} className="relative text-center group">
                <div className="w-16 h-16 mx-auto bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl flex items-center justify-center mb-5 shadow-xl shadow-blue-950/60 group-hover:scale-105 transition-transform">
                  <Icon size={28} className="text-white" />
                </div>
                <div className="absolute top-0 right-4 text-7xl font-black text-white/[0.04] leading-none select-none">{step}</div>
                <h3 className="text-lg font-bold text-white mb-2">{title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════
          PRICING
      ════════════════════════════════════════════════ */}
      <section id="pricing" className="py-24 px-6 bg-[#0d1b2e]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-500/15 border border-emerald-500/25 text-emerald-400 text-xs font-semibold rounded-full mb-3">
              Pricing
            </span>
            <h2 className="text-4xl font-bold text-white mb-3">Simple, Transparent Pricing</h2>
            <p className="text-gray-400">All plans billed in ZAR. Cancel anytime. No hidden fees.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 items-start">
            {plans.map(plan => (
              <div
                key={plan.name}
                className={`relative bg-[#0f2035] rounded-2xl border-2 ${plan.color} p-6 flex flex-col transition-all duration-300 ${
                  plan.badge === 'Most Popular'
                    ? 'shadow-2xl shadow-blue-950/50 scale-[1.03]'
                    : 'hover:border-white/20'
                }`}
              >
                {plan.badge && (
                  <div className={`absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap ${
                    plan.badge === 'Most Popular' ? 'bg-blue-600 text-white' : 'bg-orange-500 text-white'
                  }`}>
                    {plan.badge}
                  </div>
                )}
                <div className="mb-5">
                  <h3 className="text-lg font-bold text-white mb-1">{plan.name}</h3>
                  <p className="text-sm text-gray-400 mb-4">{plan.desc}</p>
                  <div className="flex items-end gap-1">
                    <span className="text-4xl font-black text-white">{plan.price}</span>
                    <span className="text-gray-400 mb-1 text-sm">{plan.period}</span>
                  </div>
                </div>
                <ul className="space-y-2.5 flex-1 mb-6">
                  {plan.features.map(f => (
                    <li key={f} className="flex items-start gap-2 text-sm text-gray-300">
                      <CheckCircle size={14} className="text-emerald-400 flex-shrink-0 mt-0.5" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link to="/register" className={plan.ctaClass}>
                  {plan.cta} <ChevronRight size={16} />
                </Link>
              </div>
            ))}
          </div>
          <p className="text-center text-sm text-gray-600 mt-7">
            💡 Annual plans save up to 30% — available at checkout. Lifetime access also available for early adopters.
          </p>
        </div>
      </section>

      {/* ════════════════════════════════════════════════
          TESTIMONIALS
      ════════════════════════════════════════════════ */}
      <section id="about" className="py-24 px-6 bg-[#07101f]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-yellow-500/15 border border-yellow-500/25 text-yellow-400 text-xs font-semibold rounded-full mb-3">
              Student Reviews
            </span>
            <h2 className="text-4xl font-bold text-white mb-3">Thousands of Success Stories</h2>
            <p className="text-gray-400">South Africans from all provinces passing their K53 with DriveMaster.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map(({ name, role, avatar, color, stars, text }) => (
              <div key={name} className="bg-[#0f2035] border border-white/[0.07] hover:border-blue-500/20 hover:shadow-lg hover:shadow-blue-950/30 rounded-2xl p-6 flex flex-col gap-4 transition-all">
                <div className="flex gap-0.5">
                  {Array.from({ length: stars }).map((_, i) => (
                    <Star key={i} size={14} className="fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-300 text-sm leading-relaxed flex-1">"{text}"</p>
                <div className="flex items-center gap-3">
                  <div className={`w-9 h-9 rounded-full bg-gradient-to-br ${color} flex items-center justify-center text-sm font-bold text-white flex-shrink-0`}>
                    {avatar}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">{name}</p>
                    <p className="text-xs text-gray-500">{role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════
          CTA BANNER
      ════════════════════════════════════════════════ */}
      <section className="py-24 px-6 bg-[#0d1b2e]">
        <div className="max-w-3xl mx-auto">
          <div className="relative bg-gradient-to-br from-blue-700 via-blue-800 to-blue-900 rounded-3xl py-16 px-8 text-center overflow-hidden shadow-2xl shadow-blue-950/60">
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-orange-500/8 rounded-full blur-3xl pointer-events-none" />
            <div className="relative">
              <h2 className="text-4xl font-black text-white mb-4 leading-tight">
                Ready to Get Your<br />Learner's Licence?
              </h2>
              <p className="text-gray-400 mb-8 text-lg max-w-xl mx-auto">
                Join 12 000+ South Africans already studying with K53 DriveMaster Academy.
              </p>
              <Link to="/register" className="btn-primary text-base px-8 py-3.5 mx-auto">
              Start Your Journey <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
