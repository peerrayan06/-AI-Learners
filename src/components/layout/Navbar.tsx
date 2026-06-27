import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { LogOut, ChevronDown, MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const communities = [
    { name: 'AI Project Discussion', link: '#' },
    { name: 'AI Announcements', link: '#' },
    { name: 'Web Development Sector', link: '#' },
    { name: 'AI Academic Studio Sector', link: '#' },
    { name: 'Image and Video Generation Sector', link: '#' },
    { name: 'Building AI Agents Sector', link: '#' },
    { name: 'AI Music & Voice Generation Sector', link: '#' },
  ];

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const handleLogout = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <nav className="sticky top-0 z-50 flex justify-between items-center w-full px-4 md:px-12 py-4 bg-surface/70 backdrop-blur-md border-b border-white/10 shadow-sm">
      <div className="flex items-center gap-6">
        <Link to="/" className="text-2xl font-extrabold text-primary">
          AI Learners
        </Link>
        <div className="hidden md:flex gap-6 items-center">
          <Link
            to="/"
            className={`font-bold pb-1 transition-all duration-300 ${
              isActive('/') ? 'text-primary border-b-2 border-primary' : 'text-on-surface-variant hover:text-primary hover:bg-white/5 px-2 rounded-lg'
            }`}
          >
            Home
          </Link>
          {user && (
            <Link
              to="/dashboard"
              className={`font-bold pb-1 transition-all duration-300 ${
                isActive('/dashboard') ? 'text-primary border-b-2 border-primary' : 'text-on-surface-variant hover:text-primary hover:bg-white/5 px-2 rounded-lg'
              }`}
            >
              Dashboard
            </Link>
          )}

          <div 
            className="relative"
            onMouseEnter={() => setIsDropdownOpen(true)}
            onMouseLeave={() => setIsDropdownOpen(false)}
          >
            <button
              className={`flex items-center gap-1 font-bold pb-1 transition-all duration-300 text-on-surface-variant hover:text-primary hover:bg-white/5 px-2 rounded-lg`}
            >
              Join Here
              <ChevronDown size={14} className={`transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            <AnimatePresence>
              {isDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-full left-0 mt-2 w-72 bg-surface-container-low border border-white/10 rounded-xl shadow-xl overflow-hidden z-[60]"
                >
                  <div className="p-2 flex flex-col gap-1">
                    <div className="px-3 py-2 text-[10px] font-mono text-outline uppercase tracking-widest border-b border-white/5 mb-1">
                      WhatsApp Communities
                    </div>
                    {communities.map((community, index) => (
                      <a
                        key={index}
                        href={community.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-primary/10 text-on-surface text-sm font-medium transition-all group"
                      >
                        <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-500 group-hover:bg-emerald-500 group-hover:text-white transition-all">
                          <MessageCircle size={16} />
                        </div>
                        {community.name}
                      </a>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
      <div className="flex gap-4 items-center">
        {user ? (
          <>
            <div className="hidden md:flex items-center gap-2 px-3 py-1 bg-white/5 rounded-full border border-white/10 text-xs font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-on-surface">{user.email}</span>
            </div>
            <button onClick={handleLogout} className="flex items-center gap-2 text-on-surface-variant hover:text-error transition-colors px-4 py-2 rounded-lg hover:bg-error/10">
              <LogOut size={16} />
              <span className="hidden md:block">Logout</span>
            </button>
          </>
        ) : (
          <>
            <Link to="/register" className="hidden md:block gradient-btn-primary text-on-primary-container px-6 py-2.5 rounded-full font-bold text-xs uppercase tracking-wider active:scale-95 transition-transform duration-200">
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
