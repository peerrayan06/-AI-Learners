import { useState, useEffect, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { GraduationCap, Bot, Code, Image as ImageIcon, Music, ArrowRight, ShieldCheck, CheckCircle2, Building, Bitcoin, AlertCircle } from 'lucide-react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';

import { SuccessModal } from '../components/ui/SuccessModal';

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
  const [transactionId, setTransactionId] = useState('');
  
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
        if (step === 1) {
          // Phone number validation
          const cleanPhone = phone.replace(/\s+/g, '');
          if (cleanPhone.length !== 10 || !/^\d+$/.test(cleanPhone)) {
            throw new Error('Please enter a valid mobile number (exactly 10 digits)');
          }

          // Check if user already exists with this email or phone
          const { data: existingUser, error: checkError } = await supabase
            .from('profiles')
            .select('email, phone')
            .or(`email.eq.${email},phone.eq.${phone}`)
            .maybeSingle();

          if (checkError) {
            // If table doesn't exist yet, we just ignore the check
            if (checkError.code !== '42P01') {
               throw new Error(`Database error: ${checkError.message}`);
            }
          }

          if (existingUser) {
            if (existingUser.email === email) {
              throw new Error('This email is already registered. Please login or use a different email.');
            }
            if (existingUser.phone === phone) {
              throw new Error('This phone number is already registered. Please enter your own details.');
            }
          }

          setStep(2);
          setLoading(false);
          return;
        }

        if (!transactionId.trim()) {
          throw new Error('Please enter a valid Transaction ID');
        }

        // Check if transaction ID already exists
        const { data: existingTx, error: txCheckError } = await supabase
          .from('profiles')
          .select('transaction_id')
          .eq('transaction_id', transactionId)
          .maybeSingle();

        if (txCheckError) {
          if (txCheckError.code !== '42P01') {
            throw new Error(`Database error: ${txCheckError.message}`);
          }
        }

        if (existingTx) {
          throw new Error('This Transaction ID has already been used. Please enter your own transaction details.');
        }

        const { data, error: signUpError } = await supabase.auth.signUp({
          email,
          password,
        });

        if (signUpError) throw signUpError;

        if (data.user) {
          const { error: profileError } = await supabase.from('profiles').insert({
            id: data.user.id,
            full_name: fullName,
            class_grade: classGrade,
            phone: phone,
            sector_interest: interest,
            transaction_id: transactionId,
            status: 'pending',
            email: email
          });

          if (profileError) {
            // Don't throw here if we want the user to at least have an auth account, 
            // but the request is "make sure it's saved", so we should probably alert or handle it.
            if (profileError.code !== '42P01') {
              throw new Error(`Profile creation failed: ${profileError.message}`);
            } else {
              throw new Error('Database not configured. Please run the SQL setup script.');
            }
          }
        }
        
        setStep(3);
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
          {step === 1 && (
            <motion.section
              key="step1"
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
                          <input 
                            type="tel" 
                            value={phone} 
                            onChange={e => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))} 
                            placeholder="00000 00000" 
                            className="flex-1 bg-transparent p-3 text-on-surface outline-none" 
                            required
                            maxLength={10}
                            pattern="\d{10}"
                          />
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
                          <option value="web_dev" className="text-on-surface bg-slate-900">Web Development Sector</option>
                          <option value="ai_academic" className="text-on-surface bg-slate-900">AI Academic Studio Sector</option>
                          <option value="image_video_gen" className="text-on-surface bg-slate-900">Image and Video Generation Sector</option>
                          <option value="ai_agents" className="text-on-surface bg-slate-900">Building AI Agents Sector</option>
                          <option value="ai_music_voice" className="text-on-surface bg-slate-900">AI Music & Voice Generation Sector</option>
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
                        {isLogin ? 'Login to Dashboard' : 'Continue to Payment'}
                        <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
                      </>
                    )}
                  </button>

                  <div className="mt-4 text-center">
                    <button type="button" onClick={() => setIsLogin(!isLogin)} className="text-sm text-on-surface-variant hover:text-primary transition-colors">
                      {isLogin ? "Don't have an account? Register here." : "Already have an account? Login here."}
                    </button>
                  </div>
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
          )}

          {step === 2 && !isLogin && (
            <motion.section
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="w-full flex flex-col gap-8"
            >
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                <div className="md:col-span-7 flex flex-col gap-8">

                  
                  <div className="glass-card p-8 rounded-2xl flex flex-col gap-6">
                    <h3 className="text-xl font-bold">Payment Method</h3>
                    
                    <div className="flex flex-col items-center gap-6 p-6 bg-surface-container-lowest rounded-xl border border-white/5">
                      <p className="text-sm text-on-surface-variant text-center">
                        Scan the QR code below to pay.
                      </p>
                      
                      <div className="p-4 bg-white rounded-xl">
                        <img src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=upi://pay?pa=ajazahmad3289-1@oksbi%26pn=AI%2520Course%2520Registration%26am=100%26cu=INR%26tn=Registration%2520Fee" alt="QR Code" className="w-[200px] h-[200px]" />
                      </div>

                      <a 
                        href="upi://pay?pa=ajazahmad3289-1@oksbi&pn=AI%20Course%20Registration&am=100&cu=INR&tn=Registration%20Fee" 
                        className="w-full bg-primary/10 hover:bg-primary/20 border border-primary/30 rounded-xl p-4 flex items-center justify-center gap-3 transition-all group"
                      >
                        <div className="w-8 h-8 flex items-center justify-center bg-white rounded-md p-1">
                          <img src="https://upload.wikimedia.org/wikipedia/commons/e/e1/UPI-Logo-vector.svg" alt="UPI" className="w-full h-full object-contain" />
                        </div>
                        <span className="font-bold text-primary group-hover:text-white transition-colors">Pay via UPI App</span>
                      </a>
                      
                      <div className="w-full">
                        <label className="text-xs font-mono text-outline uppercase tracking-widest ml-1 mb-2 block">Transaction ID</label>
                        <input type="text" value={transactionId} onChange={e => setTransactionId(e.target.value)} placeholder="e.g. UPI-1234567890" className="w-full bg-black/20 border border-white/10 rounded-xl p-3 text-on-surface focus:border-primary focus:ring-1 focus:ring-primary/20 outline-none transition-all" required />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="md:col-span-5 flex flex-col gap-6">
                  <div className="glass-card p-8 rounded-2xl flex flex-col gap-6 border-primary/20">
                    <div className="w-14 h-14 rounded-full bg-primary/20 flex items-center justify-center">
                      <ShieldCheck className="text-primary" size={28} />
                    </div>
                    
                    <div>
                      <h4 className="text-2xl font-bold mb-6 tracking-tight">Confirm Registration</h4>
                      <ul className="flex flex-col gap-4">
                        <li className="flex items-start gap-3 text-sm text-on-surface">
                          <CheckCircle2 className="text-secondary mt-0.5 flex-shrink-0" size={18} />
                          <span className="leading-tight">Unlimited AI Lab Access</span>
                        </li>
                        <li className="flex items-start gap-3 text-sm text-on-surface">
                          <CheckCircle2 className="text-secondary mt-0.5 flex-shrink-0" size={18} />
                          <span className="leading-tight">Private Community Discord</span>
                        </li>
                        <li className="flex items-start gap-3 text-sm text-on-surface">
                          <CheckCircle2 className="text-secondary mt-0.5 flex-shrink-0" size={18} />
                          <span className="leading-tight">Certified Learning Path</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  
                  {error && (
                    <div className="flex items-center gap-2 p-4 rounded-xl bg-error/10 text-error border border-error/20 text-sm mt-2">
                      <AlertCircle size={18} className="flex-shrink-0" />
                      <span>{error}</span>
                    </div>
                  )}

                  <div className="flex flex-col gap-4 mt-2">
                    <button onClick={handleAuth} disabled={loading} className="gradient-btn-primary w-full py-4 rounded-xl text-lg font-bold text-on-primary-container shadow-[0_0_20px_rgba(77,142,255,0.3)] hover:scale-[1.02] active:scale-[0.98] transition-all flex justify-center">
                      {loading ? (
                         <span className="flex items-center gap-2">
                           <div className="w-5 h-5 rounded-full border-2 border-on-primary-container border-t-transparent animate-spin"></div>
                           Processing...
                         </span>
                      ) : (
                        "Confirm Payment & Register"
                      )}
                    </button>
                    <button onClick={() => setStep(1)} className="w-full py-4 rounded-xl font-medium text-on-surface-variant hover:text-white hover:bg-white/5 transition-all text-sm">
                      Back to Profile Details
                    </button>
                  </div>
                </div>
              </div>
            </motion.section>
          )}
        </AnimatePresence>

        <SuccessModal 
          isOpen={step === 3}
          onClose={() => navigate('/dashboard')}
          title="Registration Success! 🎉"
          message="Your application has been received. Our team will verify your transaction (usually takes 12-24 hours). Welcome to the next generation of AI architects!"
          transactionId={transactionId}
          status="pending"
          actionText="Go to Dashboard"
          onAction={() => navigate('/dashboard')}
        />
      </div>
    </div>
  );
}
