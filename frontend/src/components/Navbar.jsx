import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { BookOpen, LogOut, PenTool, LayoutDashboard } from 'lucide-react';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isAdmin = localStorage.getItem('adminToken');
  const isUser = localStorage.getItem('userToken');

  // Attempt to get emails, fallback to generic roles if not saved yet
  const adminEmail = localStorage.getItem('adminEmail')?.split('@')[0] || 'Publisher';
  const userEmail = localStorage.getItem('userEmail')?.split('@')[0] || 'Reader';

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('userToken');
    localStorage.removeItem('userId');
    localStorage.removeItem('adminEmail');
    localStorage.removeItem('userEmail');
    navigate('/');
  };

  const getNavLinks = () => {
    if (isAdmin) {
      return (
        <>
          <span className="text-xs font-serif bg-[var(--color-divider)] px-2 py-1 rounded hidden sm:inline-block">Welcome, {adminEmail}</span>
          <Link to="/admin" className="flex items-center gap-2 hover:text-[var(--color-terracotta)] transition-colors">
            <LayoutDashboard className="w-4 h-4" />
            <span className="hidden sm:inline">Dashboard</span>
          </Link>
          <Link to="/blogs" className="flex items-center gap-2 hover:text-[var(--color-terracotta)] transition-colors">
            <BookOpen className="w-4 h-4" />
            <span className="hidden sm:inline">Reader Mode</span>
          </Link>
          <button onClick={handleLogout} className="flex items-center gap-2 hover:text-[var(--color-terracotta)] transition-colors">
            <LogOut className="w-4 h-4" />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </>
      );
    }
    
    if (isUser) {
      return (
        <>
          <span className="text-xs font-serif bg-[var(--color-divider)] px-2 py-1 rounded hidden sm:inline-block">Welcome, {userEmail}</span>
          <Link to="/blogs" className="flex items-center gap-2 hover:text-[var(--color-terracotta)] transition-colors">
            <BookOpen className="w-4 h-4" />
            <span className="hidden sm:inline">Reader Mode</span>
          </Link>
          <button onClick={handleLogout} className="flex items-center gap-2 hover:text-[var(--color-terracotta)] transition-colors">
            <LogOut className="w-4 h-4" />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </>
      );
    }

    return (
      <>
        <Link to="/user/login" className="hover:text-[var(--color-terracotta)] transition-colors">Reader Login</Link>
        <Link to="/admin/login" className="hover:text-[var(--color-terracotta)] transition-colors">Publisher Login</Link>
      </>
    );
  };

  return (
    <nav className="border-b border-[var(--color-divider)] bg-[var(--color-canvas)]">
      <div className="container mx-auto px-4 max-w-5xl h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <div className="bg-[var(--color-ink)] p-1.5 rounded flex items-center justify-center">
            <PenTool className="w-5 h-5 text-[var(--color-canvas)]" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-[var(--color-ink)] leading-none tracking-tight">blogger</h1>
            <p className="text-[0.55rem] uppercase tracking-widest text-[var(--color-stone)] mt-0.5">Curated Essays & Notes</p>
          </div>
        </Link>
        
        <div className="flex items-center gap-4 sm:gap-6 text-sm font-medium text-[var(--color-stone)]">
          {getNavLinks()}
        </div>
      </div>
      
      {/* Mobile-only sub-navbar for emails since they hide on xs screens */}
      {(isAdmin || isUser) && (
        <div className="sm:hidden border-t border-[var(--color-divider)] bg-[var(--color-canvas)] px-4 py-2 flex justify-between text-xs text-[var(--color-stone)]">
          <span>Logged in as:</span>
          <span className="font-semibold text-[var(--color-ink)]">{isAdmin ? adminEmail : userEmail}</span>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
