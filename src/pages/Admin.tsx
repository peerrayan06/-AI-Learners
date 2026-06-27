import { useState, useEffect, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, XCircle, User, Mail, Hash, Phone, GraduationCap, Search, AlertCircle, RefreshCcw } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface Profile {
  id: string;
  full_name: string;
  email: string;
  transaction_id: string;
  phone: string;
  class_grade: string;
  sector_interest: string;
  status: string;
  created_at: string;
}

export default function Admin() {
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [adminEmail, setAdminEmail] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const handleAdminLogin = (e: FormEvent) => {
    e.preventDefault();
    if (adminEmail === 'peerrayan06@gmail.com' && adminPassword === 'admin@06') {
      setIsAdminLoggedIn(true);
      setLoginError('');
    } else {
      setLoginError('Invalid admin credentials');
    }
  };

  useEffect(() => {
    if (isAdminLoggedIn) {
      fetchProfiles();

      // Set up realtime subscription
      const subscription = supabase
        .channel('public:profiles')
        .on('postgres_changes', { event: '*', schema: 'public', table: 'profiles' }, () => {
          fetchProfiles();
        })
        .subscribe();

      return () => {
        supabase.removeChannel(subscription);
      };
    }
  }, [isAdminLoggedIn]);

  const fetchProfiles = async () => {
    try {
      setLoading(true);
      const { data, error: fetchError } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });

      if (fetchError) throw fetchError;
      setProfiles(data || []);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch profiles');
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: string, status: 'approved' | 'declined' | 'pending') => {
    try {
      const { error: updateError } = await supabase
        .from('profiles')
        .update({ status })
        .eq('id', id);

      if (updateError) throw updateError;
      // Realtime subscription will handle the UI update
    } catch (err: any) {
      alert(err.message || 'Failed to update status');
    }
  };

  const filteredProfiles = profiles.filter(profile => 
    profile.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    profile.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    profile.transaction_id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    profile.sector_interest?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getSectorLabel = (sector: string) => {
    const sectors: Record<string, string> = {
      'web_dev': 'Web Development',
      'ai_academic': 'AI Academic Studio',
      'image_video_gen': 'Image & Video Gen',
      'ai_agents': 'Building AI Agents',
      'ai_music_voice': 'AI Music & Voice'
    };
    return sectors[sector] || sector;
  };

  if (!isAdminLoggedIn) {
    return (
      <div className="flex-grow flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-8 rounded-3xl w-full max-w-md border border-white/10 shadow-2xl"
        >
          <div className="flex flex-col items-center gap-4 mb-8">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
              <AlertCircle size={32} />
            </div>
            <h1 className="text-2xl font-bold text-white">Admin Access</h1>
            <p className="text-on-surface-variant text-sm text-center">Please enter your administrative credentials to continue.</p>
          </div>

          <form onSubmit={handleAdminLogin} className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-xs font-mono text-outline uppercase tracking-widest ml-1">Admin Email</label>
              <div className="flex bg-surface-container-lowest border border-white/10 rounded-xl overflow-hidden focus-within:border-primary transition-all">
                <span className="p-3 text-on-surface-variant bg-white/5 border-r border-white/10">
                  <Mail size={18} />
                </span>
                <input 
                  type="email" 
                  value={adminEmail} 
                  onChange={e => setAdminEmail(e.target.value)} 
                  className="flex-1 bg-transparent p-3 text-on-surface outline-none" 
                  placeholder="admin@example.com"
                  required 
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs font-mono text-outline uppercase tracking-widest ml-1">Password</label>
              <div className="flex bg-surface-container-lowest border border-white/10 rounded-xl overflow-hidden focus-within:border-primary transition-all">
                <span className="p-3 text-on-surface-variant bg-white/5 border-r border-white/10">
                  <AlertCircle size={18} />
                </span>
                <input 
                  type="password" 
                  value={adminPassword} 
                  onChange={e => setAdminPassword(e.target.value)} 
                  className="flex-1 bg-transparent p-3 text-on-surface outline-none" 
                  placeholder="••••••••"
                  required 
                />
              </div>
            </div>

            {loginError && (
              <p className="text-error text-xs font-medium bg-error/10 p-3 rounded-lg border border-error/20 flex items-center gap-2">
                <XCircle size={14} /> {loginError}
              </p>
            )}

            <button 
              type="submit"
              className="w-full bg-primary hover:bg-primary/90 text-on-primary py-4 rounded-xl font-bold transition-all shadow-lg shadow-primary/20 mt-4 active:scale-[0.98]"
            >
              Login to Admin Panel
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-12 py-12 w-full flex-grow flex flex-col">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
        <div className="flex flex-col gap-2">
          <h1 className="text-4xl font-extrabold text-white tracking-tight">Admin <span className="text-primary">Dashboard</span></h1>
          <p className="text-on-surface-variant text-lg">Verify student registrations and transactions.</p>
        </div>

        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className="relative flex-grow md:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-outline" size={18} />
            <input 
              type="text" 
              placeholder="Search by name, email or ID..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-surface-container-lowest border border-white/10 rounded-xl py-3 pl-12 pr-4 text-on-surface focus:border-primary outline-none transition-all"
            />
          </div>
          <button 
            onClick={fetchProfiles} 
            className="p-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all text-on-surface"
            title="Refresh Data"
          >
            <RefreshCcw size={20} className={loading ? 'animate-spin' : ''} />
          </button>
        </div>
      </div>

      {error && (
        <div className="flex items-center gap-3 p-4 rounded-xl bg-error/10 text-error border border-error/20 mb-8">
          <AlertCircle size={20} />
          <span>{error}</span>
        </div>
      )}

      {loading && profiles.length === 0 ? (
        <div className="flex-grow flex items-center justify-center">
          <div className="w-12 h-12 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
        </div>
      ) : filteredProfiles.length === 0 ? (
        <div className="flex-grow flex flex-col items-center justify-center py-24 glass-card rounded-3xl border-dashed">
          <User className="text-outline mb-4" size={48} />
          <p className="text-on-surface-variant text-lg">No registration requests found.</p>
        </div>
      ) : (
      <div className="glass-card rounded-3xl border border-white/10 overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white/5 border-b border-white/10">
                <th className="px-6 py-4 text-[10px] font-mono text-outline uppercase tracking-widest">Student Info</th>
                <th className="px-6 py-4 text-[10px] font-mono text-outline uppercase tracking-widest">Class</th>
                <th className="px-6 py-4 text-[10px] font-mono text-outline uppercase tracking-widest">Sector Interest</th>
                <th className="px-6 py-4 text-[10px] font-mono text-outline uppercase tracking-widest">Transaction ID</th>
                <th className="px-6 py-4 text-[10px] font-mono text-outline uppercase tracking-widest text-center">Status</th>
                <th className="px-6 py-4 text-[10px] font-mono text-outline uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              <AnimatePresence mode="popLayout">
                {filteredProfiles.map((profile) => (
                  <motion.tr 
                    key={profile.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="hover:bg-white/[0.02] transition-colors group"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                          <User size={18} />
                        </div>
                        <div className="flex flex-col">
                          <span className="font-bold text-white text-sm leading-tight">{profile.full_name}</span>
                          <span className="text-[11px] text-on-surface-variant flex items-center gap-1 mt-0.5">
                            <Mail size={10} className="opacity-50" /> {profile.email}
                          </span>
                          <span className="text-[11px] text-on-surface-variant flex items-center gap-1">
                            <Phone size={10} className="opacity-50" /> {profile.phone}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-[11px] font-medium text-white flex items-center gap-1.5 w-fit">
                        <GraduationCap size={12} className="text-tertiary" /> {profile.class_grade}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_8px_rgba(77,142,255,0.8)]"></div>
                        <span className="text-xs font-medium text-on-surface-variant">
                          {getSectorLabel(profile.sector_interest)}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-[11px] font-mono text-primary/80 group-hover:text-primary transition-colors cursor-help bg-primary/5 px-2 py-1 rounded-md border border-primary/10" title={profile.transaction_id}>
                        {profile.transaction_id ? `${profile.transaction_id.substring(0, 8)}...` : 'N/A'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex justify-center">
                        {profile.status === 'approved' ? (
                          <span className="flex items-center gap-1 text-[9px] font-bold uppercase tracking-widest text-secondary bg-secondary/10 px-2.5 py-1 rounded-full border border-secondary/20">
                            <CheckCircle2 size={10} /> Approved
                          </span>
                        ) : profile.status === 'declined' ? (
                          <span className="flex items-center gap-1 text-[9px] font-bold uppercase tracking-widest text-error bg-error/10 px-2.5 py-1 rounded-full border border-error/20">
                            <XCircle size={10} /> Declined
                          </span>
                        ) : (
                          <span className="flex items-center gap-1 text-[9px] font-bold uppercase tracking-widest text-primary bg-primary/10 px-2.5 py-1 rounded-full border border-primary/20">
                            <AlertCircle size={10} /> Pending
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {profile.status === 'pending' ? (
                          <>
                            <button 
                              onClick={() => updateStatus(profile.id, 'approved')}
                              className="p-2 rounded-lg bg-secondary/10 text-secondary hover:bg-secondary hover:text-on-secondary transition-all"
                              title="Approve"
                            >
                              <CheckCircle2 size={16} />
                            </button>
                            <button 
                              onClick={() => updateStatus(profile.id, 'declined')}
                              className="p-2 rounded-lg bg-error/10 text-error hover:bg-error hover:text-on-error transition-all"
                              title="Decline"
                            >
                              <XCircle size={16} />
                            </button>
                          </>
                        ) : (
                          <button 
                            onClick={() => updateStatus(profile.id, 'pending')}
                            className="p-2 rounded-lg bg-white/5 text-on-surface-variant hover:bg-white/10 transition-all"
                            title="Reset to Pending"
                          >
                            <RefreshCcw size={16} />
                          </button>
                        )}
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      </div>
      )}
    </div>
  );
}
