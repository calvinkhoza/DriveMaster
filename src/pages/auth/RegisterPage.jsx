import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Eye, EyeOff, BookOpen, ArrowRight, Loader2,
  CheckCircle, CreditCard, Shield,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

const plans = [
  { id: 'basic',    name: 'Basic',   price: 'R 149/mo', desc: 'Videos & notes',               color: 'border-gray-600' },
  { id: 'pro',      name: 'Pro',     price: 'R 299/mo', desc: 'Full platform access',          color: 'border-primary-500', badge: 'Popular' },
  { id: 'premium',  name: 'Premium', price: 'R 499/mo', desc: 'Pro + 1-on-1 mentoring',       color: 'border-accent-500' },
];

const steps = ['Account', 'Plan', 'Payment'];

export default function RegisterPage() {
  const { login } = useApp();
  const navigate  = useNavigate();

  const [step, setStep]   = useState(0);
  const [loading, setLoading] = useState(false);
  const [showPw, setShowPw]   = useState(false);
  const [form, setForm] = useState({
    name: '', email: '', phone: '', password: '', confirm: '',
    plan: 'pro',
    cardName: '', cardNumber: '', expiry: '', cvv: '',
  });
  const [errors, setErrors] = useState({});

  const handle = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const validateStep0 = () => {
    const e = {};
    if (!form.name.trim())        e.name     = 'Full name is required';
    if (!form.email.includes('@')) e.email    = 'Valid email required';
    if (form.phone.length < 9)    e.phone    = 'Valid phone number required';
    if (form.password.length < 8) e.password = 'Password must be at least 8 characters';
    if (form.password !== form.confirm) e.confirm = 'Passwords do not match';
    return e;
  };

  const next = () => {
    if (step === 0) {
      const e = validateStep0();
      if (Object.keys(e).length) { setErrors(e); return; }
    }
    setStep(s => s + 1);
  };

  const submit = async (e) => {
    e.preventDefault();
    const cardErrors = {};
    if (!form.cardName.trim())       cardErrors.cardName   = 'Name on card is required';
    if (form.cardNumber.length < 16) cardErrors.cardNumber = 'Valid card number required';
    if (!form.expiry)                cardErrors.expiry     = 'Expiry required';
    if (form.cvv.length < 3)         cardErrors.cvv        = 'CVV required';
    if (Object.keys(cardErrors).length) { setErrors(cardErrors); return; }

    setLoading(true);
    await new Promise(r => setTimeout(r, 1400));

    login({
      name: form.name, email: form.email, role: 'student',
      plan: form.plan, phone: form.phone,
    });
    navigate('/student');
  };

  const field = (name, label, type = 'text', placeholder = '', extra = {}) => (
    <div>
      <label className="block text-sm font-medium text-gray-300 mb-1.5">{label}</label>
      <input
        type={type} name={name} value={form[name]} onChange={handle}
        placeholder={placeholder} className="input" {...extra}
      />
      {errors[name] && <p className="text-xs text-red-400 mt-1">{errors[name]}</p>}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-950 flex">
      {/* Left panel */}
      <div className="hidden lg:flex lg:w-5/12 bg-gradient-to-br from-dark-800 to-gray-950 p-12 flex-col justify-between relative overflow-hidden border-r border-white/5">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-20 -left-20 w-72 h-72 bg-accent-500/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-primary-500/10 rounded-full blur-3xl" />
        </div>

        <Link to="/" className="relative flex items-center gap-2.5">
          <div className="w-9 h-9 bg-primary-600 rounded-xl flex items-center justify-center">
            <BookOpen size={18} className="text-white" />
          </div>
          <div>
            <span className="font-bold text-white">K53 DriveMaster</span>
            <span className="block text-xs text-primary-400">Academy</span>
          </div>
        </Link>

        <div className="relative space-y-5">
          <h2 className="text-3xl font-black text-white leading-tight">
            Join 12 000+ students<br />
            <span className="text-accent-400">already passing</span> their K53.
          </h2>

          {[
            'HD video lessons for every module',
            '1 000+ practice questions with explanations',
            'Unlimited mock exams — no cap',
            'Live sessions with a qualified instructor',
            '24/7 AI tutor on standby',
            'Digital certificate on completion',
          ].map(f => (
            <div key={f} className="flex items-center gap-2.5">
              <CheckCircle size={15} className="text-green-400 flex-shrink-0" />
              <span className="text-sm text-gray-300">{f}</span>
            </div>
          ))}
        </div>

        <div className="relative flex items-center gap-2 text-xs text-gray-600">
          <Shield size={13} />
          <span>Payments secured by PayFast — PCI DSS compliant. POPIA compliant.</span>
        </div>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex items-center justify-center p-6 overflow-y-auto">
        <div className="w-full max-w-lg py-8">
          {/* Mobile logo */}
          <Link to="/" className="flex lg:hidden items-center gap-2.5 mb-8">
            <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
              <BookOpen size={16} className="text-white" />
            </div>
            <span className="font-bold text-white">K53 DriveMaster Academy</span>
          </Link>

          {/* Stepper */}
          <div className="flex items-center gap-0 mb-8">
            {steps.map((s, i) => (
              <div key={s} className="flex items-center flex-1 last:flex-none">
                <div className="flex items-center gap-2">
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                    i < step ? 'bg-green-500 text-white'
                    : i === step ? 'bg-primary-600 text-white'
                    : 'bg-white/10 text-gray-500'
                  }`}>
                    {i < step ? <CheckCircle size={14} /> : i + 1}
                  </div>
                  <span className={`text-sm font-medium ${i === step ? 'text-white' : 'text-gray-500'}`}>{s}</span>
                </div>
                {i < steps.length - 1 && <div className={`flex-1 h-px mx-3 ${i < step ? 'bg-green-500/50' : 'bg-white/10'}`} />}
              </div>
            ))}
          </div>

          {/* ── Step 0: Account ── */}
          {step === 0 && (
            <div className="animate-fade-in">
              <h1 className="text-2xl font-black text-white mb-1">Create your account</h1>
              <p className="text-gray-400 text-sm mb-6">
                Already have one?{' '}
                <Link to="/login" className="text-primary-400 hover:text-primary-300 font-medium">Sign in</Link>
              </p>

              <div className="space-y-4">
                {field('name', 'Full Name', 'text', 'Amahle Ndlovu')}
                {field('email', 'Email Address', 'email', 'you@email.com')}
                {field('phone', 'Phone Number', 'tel', '072 000 0000')}

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1.5">Password</label>
                  <div className="relative">
                    <input
                      type={showPw ? 'text' : 'password'} name="password"
                      value={form.password} onChange={handle}
                      placeholder="Minimum 8 characters" className="input pr-11"
                    />
                    <button type="button" onClick={() => setShowPw(!showPw)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300">
                      {showPw ? <EyeOff size={17} /> : <Eye size={17} />}
                    </button>
                  </div>
                  {errors.password && <p className="text-xs text-red-400 mt-1">{errors.password}</p>}
                </div>

                {field('confirm', 'Confirm Password', 'password', 'Re-enter password')}

                <div className="flex items-start gap-2.5 pt-1">
                  <input type="checkbox" id="terms" className="w-4 h-4 mt-0.5 accent-primary-500" required />
                  <label htmlFor="terms" className="text-sm text-gray-400">
                    I agree to the{' '}
                    <a href="#" className="text-primary-400 hover:underline">Terms of Service</a>
                    {' '}and{' '}
                    <a href="#" className="text-primary-400 hover:underline">Privacy Policy (POPIA)</a>
                  </label>
                </div>

                <button onClick={next} className="btn-primary w-full justify-center py-3 mt-2">
                  Continue <ArrowRight size={16} />
                </button>
              </div>
            </div>
          )}

          {/* ── Step 1: Plan ── */}
          {step === 1 && (
            <div className="animate-fade-in">
              <h1 className="text-2xl font-black text-white mb-1">Choose your plan</h1>
              <p className="text-gray-400 text-sm mb-6">All plans include a 7-day free trial. Cancel anytime.</p>

              <div className="space-y-3 mb-6">
                {plans.map(p => (
                  <label
                    key={p.id}
                    className={`flex items-center gap-4 p-4 border-2 rounded-2xl cursor-pointer transition-all ${
                      form.plan === p.id ? `${p.color} bg-white/5` : 'border-white/10 hover:border-white/20'
                    }`}
                  >
                    <input
                      type="radio" name="plan" value={p.id}
                      checked={form.plan === p.id} onChange={handle}
                      className="accent-primary-500"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-white">{p.name}</span>
                        {p.badge && (
                          <span className="badge bg-primary-500/20 text-primary-400 text-[10px]">{p.badge}</span>
                        )}
                      </div>
                      <p className="text-xs text-gray-400 mt-0.5">{p.desc}</p>
                    </div>
                    <span className="font-bold text-white text-sm">{p.price}</span>
                  </label>
                ))}
              </div>

              <div className="flex gap-3">
                <button onClick={() => setStep(0)} className="btn-secondary flex-1 justify-center py-3">
                  Back
                </button>
                <button onClick={next} className="btn-primary flex-1 justify-center py-3">
                  Continue <ArrowRight size={16} />
                </button>
              </div>
            </div>
          )}

          {/* ── Step 2: Payment ── */}
          {step === 2 && (
            <div className="animate-fade-in">
              <h1 className="text-2xl font-black text-white mb-1">Payment Details</h1>
              <p className="text-gray-400 text-sm mb-6">
                Secured by PayFast. Card details are never stored on our servers.
              </p>

              <div className="flex items-center gap-2 p-3 bg-green-500/10 border border-green-500/20 rounded-xl mb-5">
                <Shield size={15} className="text-green-400 flex-shrink-0" />
                <span className="text-xs text-green-300">256-bit SSL encryption · PCI DSS Level 1 compliant</span>
              </div>

              <form onSubmit={submit} className="space-y-4">
                {field('cardName', 'Name on Card', 'text', 'AMAHLE NDLOVU')}

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1.5">Card Number</label>
                  <div className="relative">
                    <input
                      type="text" name="cardNumber" value={form.cardNumber}
                      onChange={(e) => handle({ target: { name: 'cardNumber', value: e.target.value.replace(/\D/g,'').slice(0,16) } })}
                      placeholder="0000 0000 0000 0000" className="input pl-11"
                    />
                    <CreditCard size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500" />
                  </div>
                  {errors.cardNumber && <p className="text-xs text-red-400 mt-1">{errors.cardNumber}</p>}
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1.5">Expiry Date</label>
                    <input type="month" name="expiry" value={form.expiry} onChange={handle} className="input" />
                    {errors.expiry && <p className="text-xs text-red-400 mt-1">{errors.expiry}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1.5">CVV</label>
                    <input
                      type="text" name="cvv"
                      value={form.cvv}
                      onChange={(e) => handle({ target: { name: 'cvv', value: e.target.value.replace(/\D/g,'').slice(0,4) } })}
                      placeholder="123" className="input"
                    />
                    {errors.cvv && <p className="text-xs text-red-400 mt-1">{errors.cvv}</p>}
                  </div>
                </div>

                {/* Order summary */}
                <div className="bg-white/5 border border-white/10 rounded-xl p-4 space-y-2">
                  <p className="text-sm font-semibold text-white mb-2">Order Summary</p>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">{plans.find(p => p.id === form.plan)?.name} Plan</span>
                    <span className="text-white">{plans.find(p => p.id === form.plan)?.price}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">7-day free trial</span>
                    <span className="text-green-400">- R 0</span>
                  </div>
                  <div className="border-t border-white/10 pt-2 flex justify-between text-sm font-semibold">
                    <span className="text-white">Due today</span>
                    <span className="text-white">R 0.00</span>
                  </div>
                </div>

                <div className="flex gap-3 pt-1">
                  <button type="button" onClick={() => setStep(1)} className="btn-secondary flex-1 justify-center py-3">
                    Back
                  </button>
                  <button type="submit" disabled={loading} className="btn-primary flex-1 justify-center py-3 disabled:opacity-60">
                    {loading && <Loader2 size={16} className="animate-spin" />}
                    {loading ? 'Processing…' : 'Activate Account'}
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
