import { useState, useEffect, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { GraduationCap, Bot, Code, Image as ImageIcon, Music, ArrowRight, ShieldCheck, CheckCircle2, Building, Bitcoin, AlertCircle } from 'lucide-react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';

export default function Register() {
  const [searchParams] = useSearchParams();
  const [isLogin, setIsLogin] = useState(searchParams.get('mode') === 'login');
  
  const [step, setStep] = useState(1);
  const [interest, setInterest] = useState('ai_basics');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [classGrade, setClassGrade] = useState('');
  const [phone, setPhone] = useState('');
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    setIsLogin(searchParams.get('mode') === 'login');
  }, [searchParams]);

  useEffect(() => {
    if (user && step === 1) {
      navigate('/dashboard');
    }
  }, [user, navigate, step]);

  const handleAuth = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (isLogin) {
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email,
          password
        });
        
        if (signInError) throw signInError;
        navigate('/dashboard');
      } else {
        const { data, error: signUpError } = await supabase.auth.signUp({
          email,
          password,
        });

        if (signUpError) throw signUpError;

        if (data.user) {
          // Attempt to create profile, ignore if table doesn't exist yet
          try {
            await supabase.from('profiles').insert({
              id: data.user.id,
              full_name: fullName,
              class_grade: classGrade,
              phone: phone,
              sector_interest: interest
            });
          } catch (profileError) {
            console.warn(profileError);
          }
        }
        
        navigate('/dashboard');
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred during authentication');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-[1280px] mx-auto px-4 md:px-12 py-12 w-full flex-grow flex flex-col relative min-h-[800px]">
      
      <div className="relative w-full max-w-4xl mx-auto flex-grow flex">
        <AnimatePresence mode="wait">
          <motion.section
            key="auth"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
            className="w-full flex flex-col gap-8"
          >
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
              <div className="md:col-span-7 glass-card p-8 rounded-2xl flex flex-col gap-6">
                <div className="flex flex-col gap-1">
                  <h2 className="text-2xl font-bold text-primary tracking-tight">
                    {isLogin ? 'Welcome Back' : 'Student Details'}
                  </h2>
                  <p className="text-on-surface-variant text-base">
                    {isLogin ? 'Log in to continue your AI journey.' : 'Join the next generation of AI architects.'}
                  </p>
                </div>

                {error && (
                  <div className="flex items-center gap-2 p-4 rounded-xl bg-error/10 text-error border border-error/20 text-sm">
                    <AlertCircle size={18} />
                    {error}
                  </div>
                )}
                
                <form className="flex flex-col gap-5" onSubmit={handleAuth}>
                  {!isLogin && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-mono text-outline uppercase tracking-widest ml-1">Full Name</label>
                        <input type="text" value={fullName} onChange={e => setFullName(e.target.value)} placeholder="John Doe" className="bg-surface-container-lowest border border-white/10 rounded-xl p-3 text-on-surface focus:border-primary focus:ring-1 focus:ring-primary/20 outline-none transition-all" required />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-mono text-outline uppercase tracking-widest ml-1">Class</label>
                        <select 
                          value={classGrade} 
                          onChange={e => setClassGrade(e.target.value)} 
                          className="bg-surface-container-lowest border border-white/10 rounded-xl p-3 text-on-surface focus:border-primary focus:ring-1 focus:ring-primary/20 outline-none transition-all cursor-pointer" 
                          required
                        >
                          <option value="" disabled className="text-on-surface-variant">Select Class</option>
                          {Array.from({ length: 12 }, (_, i) => i + 1).map(num => (
                            <option key={num} value={`Class ${num}`} className="text-on-surface bg-slate-900">
                              Class {num}
                            </option>
                          ))}
                          <option value="Working Professional" className="text-on-surface bg-slate-900">Working Professional</option>
                        </select>
                      </div>
                    </div>
                  )}
                  
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-mono text-outline uppercase tracking-widest ml-1">Email Address</label>
                    <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="john@example.com" className="bg-surface-container-lowest border border-white/10 rounded-xl p-3 text-on-surface focus:border-primary focus:ring-1 focus:ring-primary/20 outline-none transition-all" required />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-mono text-outline uppercase tracking-widest ml-1">Password</label>
                    <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" className="bg-surface-container-lowest border border-white/10 rounded-xl p-3 text-on-surface focus:border-primary focus:ring-1 focus:ring-primary/20 outline-none transition-all" required minLength={6} />
                  </div>
                  
                  {!isLogin && (
                    <>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-mono text-outline uppercase tracking-widest ml-1">Phone Number</label>
                        <div className="flex bg-surface-container-lowest border border-white/10 rounded-xl overflow-hidden focus-within:border-primary focus-within:ring-1 focus-within:ring-primary/20 transition-all">
                          <span className="p-3 text-on-surface-variant bg-white/5 border-r border-white/10 font-mono">+91</span>
                          <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} placeholder="00000 00000" className="flex-1 bg-transparent p-3 text-on-surface outline-none" />
                        </div>
                      </div>
                      
                      <div className="flex flex-col gap-1.5 mt-4">
                        <label className="text-xs font-mono text-outline uppercase tracking-widest ml-1">Sector of Interest</label>
                        <select 
                          value={interest} 
                          onChange={e => setInterest(e.target.value)} 
                          className="bg-surface-container-lowest border border-white/10 rounded-xl p-3 text-on-surface focus:border-primary focus:ring-1 focus:ring-primary/20 outline-none transition-all cursor-pointer"
                          required
                        >
                          <option value="" disabled className="text-on-surface-variant">Select Sector of Interest</option>
                          <option value="ai_basics" className="text-on-surface bg-slate-900">AI Basics</option>
                          <option value="ai_agents" className="text-on-surface bg-slate-900">AI Agents</option>
                          <option value="web_dev" className="text-on-surface bg-slate-900">Website Dev</option>
                          <option value="image_video_gen" className="text-on-surface bg-slate-900">Image and Video Generation</option>
                        </select>
                      </div>
                    </>
                  )}
                  
                  <button type="submit" disabled={loading} className="mt-4 gradient-btn-primary w-full py-4 rounded-xl text-lg font-bold text-on-primary-container flex items-center justify-center gap-2 group shadow-lg">
                    {loading ? (
                       <span className="flex items-center gap-2">
                         <div className="w-5 h-5 rounded-full border-2 border-on-primary-container border-t-transparent animate-spin"></div>
                         Processing...
                       </span>
                    ) : (
                      <>
                        Complete Registration
                        <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
                      </>
                    )}
                  </button>
                </form>
              </div>

              <div className="md:col-span-5 flex flex-col gap-6">
                <div className="glass-card rounded-2xl overflow-hidden relative group h-[240px]">
                  <div 
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDhoBLnEyjAoDJci1EbmsBSL27b9MJWZbNzrsfkFyUlc0tqa3YRieogXRsQdB-FnCaaCKvmUkTXVLTT3Yx5x0gLFe4JnwSwSm9jSAXWFuou3APhFA0a9Bl7Rjrf_0CEnOWCFwuMlp-Zi6vS9lnu4dmBEznHQf7nMXaUFEX8ez5n_jcLrNL5BFbapXQKkmxM36RZnwk6tu6C5CUPQ3VQBMn-NDV17JrBFbk7AsOdK5lbcgdJOobxOwlY6Tmvf2wL5PlDXEwDERJnMUy6")' }}
                  ></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/40 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <p className="text-2xl font-bold text-white tracking-tight">Unlock Full Potential</p>
                    <p className="text-on-surface-variant text-sm mt-1">Join 50k+ students worldwide.</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 p-5 rounded-xl border border-white/5 bg-surface-container-lowest/50">
                  <ShieldCheck className="text-tertiary flex-shrink-0" size={32} />
                  <div className="flex flex-col">
                    <span className="font-bold text-sm text-on-surface">Secure Authentication</span>
                    <span className="text-[11px] text-outline mt-0.5">Powered by enterprise-grade security.</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.section>
        </AnimatePresence>
      </div>
    </div>
  );
}
