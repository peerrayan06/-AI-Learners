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
    { name: 'AI Project Discussion', link: 'https://chat.whatsapp.com/KjzKE5msjhm9WJ3YhF1d8N?s=cl&p=a&mlu=0' },
    { name: 'AI Announcements', link: 'https://chat.whatsapp.com/G94jr5sW3sz6DPiYIf12hT' },
    { name: 'Web Development Sector', link: 'https://chat.whatsapp.com/H6HzluUD5DaJykAmOaeJGh?s=sh&p=a&mlu=0' },
    { name: 'AI Academic Studio Sector', link: 'https://chat.whatsapp.com/FnvhXEEUYKy9Dj5PsikEyG?s=sh&p=a&mlu=0' },
    { name: 'Image and Video Generation Sector', link: 'https://chat.whatsapp.com/HXa72BWJBEI8e3UzZQXtPU?s=cl&p=a&mlu=0' },
    { name: 'Building AI Agents Sector', link: 'https://chat.whatsapp.com/JtIJBCHsF0sEECFGCPgqJE?s=cl&p=a&mlu=0' },
    { name: 'AI Music & Voice Generation Sector', link: 'https://chat.whatsapp.com/DZ9dQM8aMVA7cHbuMsWnhV?s=cl&p=a&mlu=0' },
  ];

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const handleLogout = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <nav className="sticky top-0 z-50 flex justify-between items-center w-full px-4 md:px-12 py-4 bg-background/80 backdrop-blur-3xl border-b border-white/5">
      <div className="flex items-center gap-8">
        <Link to="/home" className="text-2xl font-black tracking-tight text-white flex items-center gap-2">
          <div className="w-4 h-4 bg-cyber-yellow rounded-full"></div>
          AI Learners
        </Link>
        <div className="hidden md:flex gap-8 items-center">
          <Link
            to="/home"
            className={`font-bold transition-colors ${
              isActive('/home') ? 'text-cyber-yellow' : 'text-white hover:text-cyber-yellow'
            }`}
          >
            Home
          </Link>
          {user && (
            <Link
              to="/dashboard"
              className={`font-bold transition-colors ${
                isActive('/dashboard') ? 'text-cyber-yellow' : 'text-white hover:text-cyber-yellow'
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
              className="flex items-center gap-1 font-bold transition-colors text-white hover:text-cyber-yellow"
            >
              Join Here
              <ChevronDown size={16} className={`transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            <AnimatePresence>
              {isDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-full left-0 mt-4 w-80 glass-card rounded-2xl overflow-hidden z-[60]"
                >
                  <div className="p-2 flex flex-col gap-1">
                    <div className="px-4 py-3 text-[10px] font-mono text-white/50 uppercase tracking-widest border-b border-white/5 mb-1">
                      WhatsApp Communities
                    </div>
                    {communities.map((community, index) => (
                      <a
                        key={index}
                        href={community.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-cyber-yellow hover:text-black text-white text-sm font-bold transition-all group"
                      >
                        <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-black/10 transition-all">
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
        {user && location.pathname !== '/' && location.pathname !== '/register' ? (
          <>
            <div className="hidden md:flex items-center gap-2 px-4 py-1.5 bg-white/5 rounded-full border border-white/10 text-xs font-mono">
              <span className="w-2 h-2 rounded-full bg-cyber-yellow animate-pulse"></span>
              <span className="text-white font-bold">{user.email}</span>
            </div>
            <button onClick={handleLogout} className="flex items-center gap-2 text-white/60 hover:text-cyber-yellow transition-colors font-bold px-4 py-2">
              <LogOut size={16} />
              <span className="hidden md:block">Logout</span>
            </button>
          </>
        ) : !user ? (
          <>
            <Link to="/register" className="hidden md:block bg-cyber-yellow text-black px-6 py-2.5 rounded-full font-bold text-sm hover:scale-105 active:scale-95 transition-transform duration-200">
              Register
            </Link>
          </>
        ) : null}
      </div>
    </nav>
  );
}
