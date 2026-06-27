import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { LogOut } from 'lucide-react';

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, signOut } = useAuth();

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
