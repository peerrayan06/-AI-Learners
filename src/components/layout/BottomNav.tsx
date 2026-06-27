import { Link, useLocation } from 'react-router-dom';
import { Home, LayoutDashboard, User, MessageCircle, X } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export default function BottomNav() {
  const location = useLocation();
  const { user } = useAuth();
  const [isJoinOpen, setIsJoinOpen] = useState(false);

  const communities = [
    { name: 'AI Project Discussion', link: '#' },
    { name: 'AI Announcements', link: '#' },
    { name: 'Web Development', link: '#' },
    { name: 'AI Academic Studio', link: '#' },
    { name: 'Image & Video Gen', link: '#' },
    { name: 'Building AI Agents', link: '#' },
    { name: 'AI Music & Voice', link: '#' },
  ];

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <>
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-surface/80 backdrop-blur-lg border-t border-white/10 px-4 py-3 flex justify-between items-center shadow-[0_-4px_20px_rgba(0,0,0,0.2)]">
        <Link
          to="/"
          className={`flex flex-col items-center gap-1 transition-colors ${
            isActive('/') ? 'text-primary' : 'text-on-surface-variant hover:text-primary'
          }`}
        >
          <Home size={20} />
          <span className="text-[10px] font-bold uppercase tracking-wider">Home</span>
        </Link>

        {user && (
          <Link
            to="/dashboard"
            className={`flex flex-col items-center gap-1 transition-colors ${
              isActive('/dashboard') ? 'text-primary' : 'text-on-surface-variant hover:text-primary'
            }`}
          >
            <LayoutDashboard size={20} />
            <span className="text-[10px] font-bold uppercase tracking-wider">Dashboard</span>
          </Link>
        )}

        <button
          onClick={() => setIsJoinOpen(!isJoinOpen)}
          className={`flex flex-col items-center gap-1 transition-colors ${
            isJoinOpen ? 'text-emerald-500' : 'text-on-surface-variant hover:text-emerald-500'
          }`}
        >
          <MessageCircle size={20} />
          <span className="text-[10px] font-bold uppercase tracking-wider">Join</span>
        </button>

        {!user && (
          <Link
            to="/register"
            className={`flex flex-col items-center gap-1 transition-colors ${
              isActive('/register') && !location.search.includes('mode=login') ? 'text-primary' : 'text-on-surface-variant hover:text-primary'
            }`}
          >
            <User size={20} />
            <span className="text-[10px] font-bold uppercase tracking-wider">Register</span>
          </Link>
        )}
      </nav>

      <AnimatePresence>
        {isJoinOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsJoinOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] md:hidden"
            />
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed bottom-0 left-0 right-0 z-[70] bg-surface-container-low border-t border-white/10 rounded-t-3xl p-5 md:hidden shadow-[0_-10px_40px_rgba(0,0,0,0.5)] max-h-[80vh] overflow-y-auto"
            >
              <div className="flex justify-between items-center mb-4 sticky top-0 bg-surface-container-low z-10 pb-2 border-b border-white/5">
                <div className="flex flex-col">
                  <h3 className="text-lg font-bold text-white">Join Community</h3>
                  <p className="text-on-surface-variant text-[10px]">Select a sector to join our WhatsApp groups</p>
                </div>
                <button
                  onClick={() => setIsJoinOpen(false)}
                  className="p-2 hover:bg-white/5 rounded-full text-on-surface-variant transition-all"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="flex flex-col gap-2 pb-6">
                {communities.map((community, index) => (
                  <a
                    key={index}
                    href={community.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-primary/10 hover:border-primary/30 transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-500 group-hover:bg-emerald-500 group-hover:text-white transition-all">
                        <MessageCircle size={16} />
                      </div>
                      <span className="font-bold text-on-surface text-sm">{community.name}</span>
                    </div>
                    <div className="text-[9px] font-mono text-emerald-500 font-bold uppercase tracking-widest bg-emerald-500/10 px-2 py-1 rounded">
                      Join
                    </div>
                  </a>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
