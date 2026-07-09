import { useState, useEffect } from 'react';
import { Calendar, LogOut, Clock, XCircle, CheckCircle2, ArrowRight } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import { useNavigate } from 'react-router-dom';
import { Skeleton } from '../components/ui/Skeleton';
import { SuccessModal } from '../components/ui/SuccessModal';
import Confetti from 'react-confetti';
import { useWindowSize } from 'react-use';

export default function Dashboard() {
  const { user, signOut, isLoading: isAuthLoading } = useAuth();
  const navigate = useNavigate();
  const { width, height } = useWindowSize();
  
  const [isLoading, setIsLoading] = useState(!user?.user_metadata);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  
  const [profile, setProfile] = useState<any>({
    full_name: user?.user_metadata?.full_name || '',
    email: user?.email || '',
    phone: '',
    class_grade: '',
    sector_interest: '',
    transaction_id: '',
    status: 'pending'
  });

  useEffect(() => {
    if (isAuthLoading) return;
    
    if (!user) {
      navigate('/register?mode=login');
      return;
    }

    const loadProfile = async () => {
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .maybeSingle();
          
        if (error) {
          console.warn('Error loading profile:', error);
        }

        if (data) {
          setProfile(data);
        } else {
          // If profile doesn't exist, use data from auth user
          setProfile(prev => ({
            ...prev,
            full_name: user.user_metadata?.full_name || '',
            email: user.email || ''
          }));
        }
      } catch (err) {
        console.error('Unexpected error loading profile:', err);
      } finally {
        setIsLoading(false);
      }
    };

    loadProfile();

    // Set up realtime subscription for profile status changes
    const subscription = supabase
      .channel(`profile-${user.id}`)
      .on('postgres_changes', { 
        event: 'UPDATE', 
        schema: 'public', 
        table: 'profiles',
        filter: `id=eq.${user.id}`
      }, (payload) => {
        setProfile(prev => ({ ...prev, ...payload.new }));
      })
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, [user, navigate]);

  useEffect(() => {
    if (profile.status === 'approved') {
      const hasSeenConfetti = sessionStorage.getItem(`confetti_shown_${user?.id}`);
      if (!hasSeenConfetti) {
        setShowConfetti(true);
        sessionStorage.setItem(`confetti_shown_${user?.id}`, 'true');
        setTimeout(() => setShowConfetti(false), 5000);
      }
    }
  }, [profile.status, user?.id]);

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  if ((isLoading && !profile.full_name) || isAuthLoading) {
    return (
      <div className="max-w-[1280px] mx-auto px-4 md:px-12 py-12 w-full flex-grow">
        <header className="mb-12">
          <Skeleton className="h-12 md:h-14 w-3/4 max-w-lg mb-4" />
          <Skeleton className="h-6 w-full max-w-2xl" />
          <Skeleton className="h-6 w-5/6 max-w-2xl mt-2" />
        </header>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          <div className="md:col-span-6 glass-card p-8 rounded-2xl flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start mb-6">
                <Skeleton className="w-16 h-16 rounded-full" />
                <Skeleton className="w-32 h-6 rounded-full" />
              </div>
              
              <Skeleton className="h-8 w-48 mb-2" />
              <Skeleton className="h-5 w-64 mb-6" />
              
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <Skeleton className="h-3 w-24" />
                  <Skeleton className="h-5 w-32" />
                </div>
                <div className="flex flex-col gap-2">
                  <Skeleton className="h-3 w-24" />
                  <Skeleton className="h-5 w-32" />
                </div>
                <div className="flex flex-col gap-2 col-span-2">
                  <Skeleton className="h-3 w-32" />
                  <Skeleton className="h-5 w-48" />
                </div>
              </div>
            </div>
          </div>

          <div className="md:col-span-6 glass-card p-8 rounded-2xl flex flex-col gap-4">
            <Skeleton className="h-7 w-48 mb-2" />
            <div className="p-4 rounded-xl border border-white/5 flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <Skeleton className="h-3 w-32" />
                <Skeleton className="h-5 w-full max-w-xs" />
              </div>
              <div className="flex flex-col gap-2">
                <Skeleton className="h-3 w-32" />
                <Skeleton className="h-5 w-40" />
              </div>
            </div>
            
            <Skeleton className="h-7 w-40 mt-4 mb-2" />
            <Skeleton className="h-16 w-full rounded-xl mt-auto" />
          </div>
        </div>
      </div>
    );
  }

  const displayName = profile.full_name || user?.email?.split('@')[0] || 'Student';

  return (
    <>
      {showConfetti && (
        <Confetti
          width={width}
          height={height}
          recycle={false}
          numberOfPieces={500}
          gravity={0.15}
          style={{ position: 'fixed', top: 0, left: 0, zIndex: 100 }}
        />
      )}
      <div className="max-w-[1280px] mx-auto px-4 md:px-12 py-12 w-full flex-grow">
      <header className="mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
          Welcome back, <span className="text-primary">{displayName}</span>
        </h1>
        <p className="text-on-surface-variant mt-4 text-lg max-w-2xl leading-relaxed">
          Ready to continue your journey into neural networks? Your progress is saved and the latest labs are waiting for you.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        
        {/* Profile Summary Card */}
        <div className="md:col-span-6 glass-card p-8 rounded-2xl flex flex-col justify-between group">
          <div>
            <div className="flex justify-between items-start mb-6">
              <div className="w-16 h-16 rounded-full border-2 border-primary/30 overflow-hidden bg-primary/10 flex items-center justify-center">
                <span className="text-primary font-bold text-xl">{displayName.charAt(0).toUpperCase()}</span>
              </div>
              <div className="flex flex-col items-end gap-2">
                {profile.status === 'approved' ? (
                  <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary/10 text-secondary text-[10px] font-mono font-bold uppercase tracking-widest border border-secondary/20">
                    <CheckCircle2 size={12} /> Approved
                  </span>
                ) : profile.status === 'declined' ? (
                  <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-error/10 text-error text-[10px] font-mono font-bold uppercase tracking-widest border border-error/20">
                    <XCircle size={12} /> Declined
                  </span>
                ) : (
                  <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-mono font-bold uppercase tracking-widest border border-primary/20">
                    <Clock size={12} /> Pending Verification
                  </span>
                )}
              </div>
            </div>
            
            <h3 className="text-2xl font-bold">{displayName}</h3>
            <p className="text-on-surface-variant text-base">{profile.email || user?.email || 'Email not set'}</p>
            
            <div className="mt-6 grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <span className="text-[10px] font-mono text-outline uppercase tracking-widest">Class / Grade</span>
                <span className="text-sm font-medium">{profile.class_grade || 'Not set'}</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-[10px] font-mono text-outline uppercase tracking-widest">Phone Number</span>
                <span className="text-sm font-medium">{profile.phone || 'Not set'}</span>
              </div>
              <div className="flex flex-col gap-1 col-span-2">
                <span className="text-[10px] font-mono text-outline uppercase tracking-widest">Sector Interest</span>
                <span className="text-sm font-medium text-primary">
                  {profile.sector_interest ? (
                    profile.sector_interest === 'web_dev' ? 'Web Development' :
                    profile.sector_interest === 'ai_academic' ? 'AI Academic Studio' :
                    profile.sector_interest === 'image_video_gen' ? 'Image & Video Gen' :
                    profile.sector_interest === 'ai_agents' ? 'Building AI Agents' :
                    profile.sector_interest === 'ai_music_voice' ? 'AI Music & Voice' :
                    profile.sector_interest
                  ) : 'Not selected'}
                </span>
              </div>
            </div>

            <div className="mt-6 flex items-center gap-2 text-on-surface-variant text-[10px] font-mono uppercase tracking-wider">
              <Calendar size={16} />
              Member since {new Date(user?.created_at || Date.now()).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
            </div>
          </div>
        </div>

          <div className="md:col-span-6 glass-card p-8 rounded-2xl flex flex-col gap-4">
            <h3 className="text-xl font-bold mb-2">Payment Verification</h3>
            
            <div className="p-4 rounded-xl bg-black/20 border border-white/5 flex flex-col gap-3">
              <div className="flex flex-col gap-1">
                <span className="text-[10px] font-mono text-outline uppercase tracking-widest">Transaction ID</span>
                <span className="text-sm font-mono text-primary break-all">{profile.transaction_id || 'Not found'}</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-[10px] font-mono text-outline uppercase tracking-widest">Verification Status</span>
                <div className="flex items-center gap-2 mt-1">
                  {profile.status === 'approved' ? (
                    <span className="text-secondary text-xs font-bold flex items-center gap-1">
                      <CheckCircle2 size={14} /> Payment Verified
                    </span>
                  ) : profile.status === 'declined' ? (
                    <span className="text-error text-xs font-bold flex items-center gap-1">
                      <XCircle size={14} /> Verification Failed
                    </span>
                  ) : (
                    <span className="text-primary text-xs font-bold flex items-center gap-1">
                      <Clock size={14} /> Pending Review
                    </span>
                  )}
                </div>
              </div>
            </div>
            
            <h3 className="text-xl font-bold mb-2 mt-4">Quick Actions</h3>
          

          
          <button onClick={handleSignOut} className="flex items-center gap-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-transparent hover:border-white/10 transition-all duration-200 group text-left mt-auto">
            <div className="p-2 bg-error/10 rounded-lg group-hover:bg-error/20 transition-colors">
              <LogOut className="text-error" size={20} />
            </div>
            <span className="font-bold text-sm text-error">Sign Out</span>
          </button>
        </div>

        <SuccessModal 
          isOpen={showSuccess}
          onClose={() => setShowSuccess(false)}
          title="Payment Confirmed"
          message="We've received your confirmation. Our team will verify the transaction ID and update your status within 12-24 hours."
          transactionId={profile.transaction_id}
          status={profile.status}
          actionText="Great, Thanks!"
          onAction={() => setShowSuccess(false)}
        />
      </div>
    </div>
    </>
  );
}
