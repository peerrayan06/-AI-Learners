import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import BottomNav from './components/layout/BottomNav';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Register from './pages/Register';
import Admin from './pages/Admin';
import { AuthProvider } from './contexts/AuthContext';
import { UIProvider, useUI } from './contexts/UIContext';

function AppLayout() {
  const { isUILocked } = useUI();
  
  return (
    <div className="min-h-[100dvh] flex flex-col">
      {!isUILocked && <Navbar />}
      <main className="flex-grow flex flex-col pb-24 md:pb-0">
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/home" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/register" element={<Register />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </main>
      {!isUILocked && <Footer />}
      {!isUILocked && <BottomNav />}
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <UIProvider>
        <Router>
          <AppLayout />
        </Router>
      </UIProvider>
    </AuthProvider>
  );
}

