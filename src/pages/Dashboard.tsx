import { useState, useEffect } from 'react';
import { Calendar, User, LogOut, Check, Edit2, TrendingUp, Clock, AlertTriangle, XCircle, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from '../components/ui/LoadingSpinner';

export default function Dashboard() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved'>('idle');
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

  const handleSave = async () => {
    if (!user) return;
    
    setIsSaving(true);
    setSaveStatus('saving');
    
    try {
      await supabase.from('profiles').upsert({
        id: user.id,
        full_name: profile.full_name,
        short_bio: profile.short_bio,
        learning_goal: profile.learning_goal,
        updated_at: new Date()
      });
      
      setSaveStatus('saved');
      setTimeout(() => setSaveStatus('idle'), 2000);
    } catch (err) {
      console.error('Error saving profile:', err);
      setSaveStatus('idle');
    } finally {
      setIsSaving(false);
    }
  };
  
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
            
            <div className="mt-6 flex items-center gap-2 text-on-surface-variant text-xs font-mono uppercase tracking-wider">
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

        {/* Quick Actions Card */}
        <div className="md:col-span-6 glass-card p-8 rounded-2xl flex flex-col gap-4">
          <h3 className="text-xl font-bold mb-2">Quick Actions</h3>
          
          <a href="#profile" className="flex items-center gap-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-transparent hover:border-white/10 transition-all duration-200 group">
            <div className="p-2 bg-on-surface-variant/10 rounded-lg group-hover:bg-primary/20 transition-colors">
              <User className="text-on-surface-variant group-hover:text-primary transition-colors" size={20} />
            </div>
            <span className="font-bold text-sm">View Profile</span>
          </a>
          
          <button onClick={handleSignOut} className="flex items-center gap-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-transparent hover:border-white/10 transition-all duration-200 group text-left mt-auto">
            <div className="p-2 bg-error/10 rounded-lg group-hover:bg-error/20 transition-colors">
              <LogOut className="text-error" size={20} />
            </div>
            <span className="font-bold text-sm text-error">Sign Out</span>
          </button>
        </div>

        {/* Profile Detailed Section */}
        <div id="profile" className="md:col-span-12 glass-card p-8 md:p-12 rounded-2xl mt-8">
          <div className="max-w-3xl mx-auto">
            
            <div className="flex flex-col items-center mb-12">
              <div className="relative group">
                <div className="w-32 h-32 rounded-full border-4 border-primary/20 overflow-hidden relative bg-primary/10 flex items-center justify-center">
                  <span className="text-primary font-bold text-5xl">{displayName.charAt(0).toUpperCase()}</span>
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity cursor-pointer">
                    <Edit2 className="text-white" size={24} />
                  </div>
                </div>
                <div className="absolute bottom-1 right-1 bg-primary text-on-primary-container p-1.5 rounded-full border-4 border-background shadow-lg">
                  <Check size={16} strokeWidth={3} />
                </div>
              </div>
              
              <h2 className="text-3xl md:text-4xl font-extrabold mt-6">{displayName}</h2>
              <div className="flex items-center gap-3 mt-3">
                <span className="text-on-surface-variant text-xs font-mono tracking-wider">Member since {new Date(user?.created_at || Date.now()).getFullYear()}</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              
              <div className="space-y-4">
                <label className="block">
                  <span className="text-xs font-mono text-on-surface-variant uppercase tracking-widest block mb-3">Full Name</span>
                  <input 
                    type="text" 
                    className="w-full bg-surface-container-lowest border border-white/10 rounded-xl px-4 py-3 text-on-surface focus:border-primary focus:ring-1 focus:ring-primary/30 transition-all outline-none" 
                    value={profile.full_name}
                    onChange={(e) => setProfile({ ...profile, full_name: e.target.value })}
                  />
                </label>

                <label className="block">
                  <span className="text-xs font-mono text-on-surface-variant uppercase tracking-widest block mb-3">Short Bio</span>
                  <textarea 
                    className="w-full bg-surface-container-lowest border border-white/10 rounded-xl px-4 py-3 text-on-surface focus:border-primary focus:ring-1 focus:ring-primary/30 transition-all outline-none min-h-[140px] resize-none" 
                    value={profile.short_bio}
                    onChange={(e) => setProfile({ ...profile, short_bio: e.target.value })}
                  />
                </label>
              </div>
              
              <div className="space-y-4">
                <label className="block">
                  <span className="text-xs font-mono text-on-surface-variant uppercase tracking-widest block mb-3">Current Learning Goal</span>
                  <input 
                    type="text" 
                    className="w-full bg-surface-container-lowest border border-white/10 rounded-xl px-4 py-3 text-on-surface focus:border-primary focus:ring-1 focus:ring-primary/30 transition-all outline-none" 
                    value={profile.learning_goal}
                    onChange={(e) => setProfile({ ...profile, learning_goal: e.target.value })}
                  />
                </label>
                
                <div className="bg-white/5 border border-white/10 rounded-xl p-5 mt-6">
                  <div className="flex items-center gap-3 mb-4">
                    <TrendingUp className="text-secondary" size={20} />
                    <span className="font-bold text-sm">Weekly Streak</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {['M', 'T', 'W', 'T'].map((day, i) => (
                      <div key={i} className={`w-8 h-8 rounded flex items-center justify-center font-bold text-sm ${i === 0 ? 'bg-primary/20 text-primary' : 'bg-primary text-on-primary-container'}`}>
                        {day}
                      </div>
                    ))}
                    {['F', 'S', 'S'].map((day, i) => (
                      <div key={i} className="w-8 h-8 rounded bg-white/5 flex items-center justify-center text-on-surface-variant/40 font-bold text-sm border border-white/5">
                        {day}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
            </div>

            <div className="mt-12 flex justify-end gap-4">
              <button className="px-8 py-3 rounded-xl border border-white/10 text-on-surface hover:bg-white/5 transition-all font-medium">
                Cancel
              </button>
              <button 
                onClick={handleSave}
                disabled={isSaving}
                className="px-8 py-3 rounded-xl gradient-btn-primary text-on-primary-container font-bold transition-all min-w-[160px] flex items-center justify-center"
              >
                {saveStatus === 'idle' && 'Save Changes'}
                {saveStatus === 'saving' && <span className="flex items-center gap-2"><svg className="animate-spin h-5 w-5 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg> Saving...</span>}
                {saveStatus === 'saved' && <span className="flex items-center gap-2"><Check size={18} /> Saved</span>}
              </button>
            </div>
            
          </div>
        </div>

      </div>
    </div>
  );
}
