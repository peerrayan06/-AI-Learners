import { Link, useLocation } from 'react-router-dom';
import { Home, LayoutDashboard, CreditCard, User } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

export default function BottomNav() {
  const location = useLocation();
  const { user } = useAuth();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-surface/80 backdrop-blur-lg border-t border-white/10 px-6 py-3 flex justify-between items-center shadow-[0_-4px_20px_rgba(0,0,0,0.2)]">
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
  );
}
