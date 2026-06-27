import { Link } from 'react-router-dom';
import { Twitter, Linkedin, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="w-full px-4 md:px-12 pt-8 pb-24 md:pb-8 flex flex-col md:flex-row justify-between items-center gap-6 bg-surface-container-lowest border-t border-white/10 mt-auto">
      <div className="flex flex-col items-center md:items-start gap-2">
        <span className="text-2xl font-extrabold text-primary">AI Learners</span>
        <span className="text-xs text-on-surface-variant tracking-wider">© 2024 AI Learners. All rights reserved.</span>
      </div>
      
      <div className="flex flex-wrap justify-center gap-6">
        <Link to="/" className="text-on-surface-variant text-sm hover:text-secondary transition-colors duration-200 uppercase tracking-widest">Privacy Policy</Link>
        <Link to="/" className="text-on-surface-variant text-sm hover:text-secondary transition-colors duration-200 uppercase tracking-widest">Terms of Service</Link>
        <Link to="/admin" className="text-on-surface-variant text-sm hover:text-secondary transition-colors duration-200 uppercase tracking-widest">Admin Panel</Link>
      </div>
      
      <div className="flex gap-4">
        <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-on-surface-variant hover:text-white hover:bg-secondary/20 transition-all">
          <Twitter size={18} />
        </a>
        <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-on-surface-variant hover:text-white hover:bg-secondary/20 transition-all">
          <Linkedin size={18} />
        </a>
      </div>
    </footer>
  );
}
