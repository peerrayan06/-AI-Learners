import { useState, useEffect } from 'react';
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
  status: string;
  created_at: string;
}

export default function Admin() {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
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
  }, []);

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
    profile.transaction_id?.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredProfiles.map((profile) => (
              <motion.div
                key={profile.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="glass-card p-6 rounded-2xl flex flex-col gap-6 relative group overflow-hidden"
              >
                {/* Status Badge */}
                <div className="absolute top-4 right-4">
                  <span className={`px-3 py-1 rounded-full text-[10px] font-mono font-bold tracking-widest uppercase ${
                    profile.status === 'approved' ? 'bg-secondary/20 text-secondary' :
                    profile.status === 'declined' ? 'bg-error/20 text-error' :
                    'bg-primary/20 text-primary'
                  }`}>
                    {profile.status || 'pending'}
                  </span>
                </div>

                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                      <User size={24} />
                    </div>
                    <div className="flex flex-col">
                      <span className="font-bold text-lg text-white leading-tight">{profile.full_name}</span>
                      <span className="text-xs text-on-surface-variant flex items-center gap-1 mt-1">
                        <Mail size={12} /> {profile.email}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 py-4 border-y border-white/5">
                    <div className="flex flex-col gap-1">
                      <span className="text-[10px] font-mono text-outline uppercase tracking-widest">Class</span>
                      <span className="text-sm font-medium flex items-center gap-1.5">
                        <GraduationCap size={14} className="text-tertiary" /> {profile.class_grade}
                      </span>
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="text-[10px] font-mono text-outline uppercase tracking-widest">Phone</span>
                      <span className="text-sm font-medium flex items-center gap-1.5">
                        <Phone size={14} className="text-secondary" /> {profile.phone}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 p-3 bg-black/20 rounded-xl border border-white/5">
                    <span className="text-[10px] font-mono text-outline uppercase tracking-widest">Transaction ID</span>
                    <span className="text-sm font-mono text-primary break-all flex items-center gap-2">
                      <Hash size={14} /> {profile.transaction_id || 'N/A'}
                    </span>
                  </div>
                </div>

                {profile.status === 'pending' && (
                  <div className="flex gap-3 mt-2">
                    <button 
                      onClick={() => updateStatus(profile.id, 'approved')}
                      className="flex-1 bg-secondary/10 hover:bg-secondary/20 text-secondary py-3 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 border border-secondary/20"
                    >
                      <CheckCircle2 size={18} /> Approve
                    </button>
                    <button 
                      onClick={() => updateStatus(profile.id, 'declined')}
                      className="flex-1 bg-error/10 hover:bg-error/20 text-error py-3 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 border border-error/20"
                    >
                      <XCircle size={18} /> Decline
                    </button>
                  </div>
                )}
                
                {profile.status !== 'pending' && (
                  <button 
                    onClick={() => updateStatus(profile.id, 'pending')}
                    className="mt-2 w-full bg-white/5 hover:bg-white/10 text-on-surface-variant py-2 rounded-lg text-xs font-medium transition-all"
                  >
                    Reset to Pending
                  </button>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
