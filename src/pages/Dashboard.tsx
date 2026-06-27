import { useState, useEffect } from 'react';
import { Calendar, LogOut, Clock, XCircle, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from '../components/ui/LoadingSpinner';

export default function Dashboard() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  
  const [isLoading, setIsLoading] = useState(true);
  
  const [profile, setProfile] = useState<any>({
    full_name: '',
    short_bio: 'Senior Software Engineer at Technova Labs. Passionate about LLMs and exploring the intersection of human creativity and machine intelligence.',
    learning_goal: 'Mastering RAG Architecture & Vector DBs'
  });

  useEffect(() => {
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
          .single();
          
        if (data) {
          setProfile(prev => ({ ...prev, ...data }));
        }
      } catch (err) {
        console.warn('Could not load profile. Ensure profiles table exists.', err);
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

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  if (isLoading) {
    return <LoadingSpinner message="Loading Profile..." />;
  }

  const displayName = profile.full_name || user?.email?.split('@')[0] || 'Student';

  return (
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
            <p className="text-on-surface-variant text-base">{user?.email}</p>
            
            <div className="mt-6 grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <span className="text-[10px] font-mono text-outline uppercase tracking-widest">Class</span>
                <span className="text-sm font-medium">{profile.class_grade || 'Not set'}</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-[10px] font-mono text-outline uppercase tracking-widest">Phone</span>
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
          
          <div className="mt-8 pt-6 border-t border-white/5">
            <div className="flex justify-between items-center text-xs font-mono uppercase tracking-wider mb-2">
              <span className="text-on-surface-variant">Course Progress</span>
              <span className="text-primary font-bold">68%</span>
            </div>
            <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
              <div className="h-full gradient-btn-primary shimmer" style={{ width: '68%' }}></div>
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



      </div>
    </div>
  );
}
