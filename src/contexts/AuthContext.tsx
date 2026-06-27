import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import { XCircle } from 'lucide-react';

interface AuthContextType {
  session: Session | null;
  user: User | null;
  signOut: () => Promise<void>;
  error: Error | null;
}

const AuthContext = createContext<AuthContextType>({ session: null, user: null, signOut: async () => {}, error: null });

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    // Immediate check
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Fallback/Init
    const initAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session) {
          setSession(session);
          setUser(session.user);
        }
      } catch (err: any) {
        console.error('Failed to get Supabase session:', err);
        if (err.message?.includes('Failed to fetch')) setError(err);
      } finally {
        setLoading(false);
      }
    };

    initAuth();

    return () => subscription.unsubscribe();
  }, []);

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  if (loading) {
    return <LoadingSpinner message="Initializing Auth..." fullScreen={true} />;
  }

  if (error && error.message.includes('Failed to fetch')) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface p-6">
        <div className="glass-card p-8 rounded-2xl max-w-md text-center border-error/20">
          <div className="w-16 h-16 bg-error/10 rounded-full flex items-center justify-center text-error mx-auto mb-6">
            <XCircle size={32} />
          </div>
          <h2 className="text-2xl font-bold mb-4">Connection Error</h2>
          <p className="text-on-surface-variant mb-6">
            We couldn't connect to the backend. This is usually due to missing configuration or network issues. 
            Please ensure your Supabase keys are correctly set in the Secrets panel.
          </p>
          <button 
            onClick={() => window.location.reload()} 
            className="gradient-btn-primary px-8 py-3 rounded-xl font-bold"
          >
            Retry Connection
          </button>
        </div>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ session, user, signOut, error }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
