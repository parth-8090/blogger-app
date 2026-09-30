import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BookOpen, LogOut, LayoutDashboard, User } from 'lucide-react';

const Navbar = () => {
  const navigate = useNavigate();
  const isAdmin = localStorage.getItem('adminToken');
  const isUser = localStorage.getItem('userToken');

  const adminEmail = localStorage.getItem('adminEmail')?.split('@')[0];
  const userEmail = localStorage.getItem('userEmail')?.split('@')[0];

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
          <Link to="/admin" className="flex items-center gap-1.5 md:gap-2 text-[var(--color-stone)] hover:text-[var(--color-ink)] transition-colors text-sm font-medium">
            <LayoutDashboard className="w-5 h-5 md:w-5 md:h-5" />
            <span className="hidden sm:inline">Dashboard</span>
          </Link>
          <Link to="/blogs" className="flex items-center gap-1.5 md:gap-2 text-[var(--color-stone)] hover:text-[var(--color-ink)] transition-colors text-sm font-medium">
            <BookOpen className="w-5 h-5 md:w-5 md:h-5" />
            <span className="hidden sm:inline">Reader Mode</span>
          </Link>
          <button onClick={handleLogout} className="flex items-center gap-1.5 md:gap-2 text-[var(--color-terracotta)] hover:opacity-80 transition-opacity text-sm font-medium">
            <LogOut className="w-5 h-5 md:w-5 md:h-5" />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </>
      );
    }
    
    if (isUser) {
      return (
        <>
          <Link to="/blogs" className="flex items-center gap-1.5 md:gap-2 text-[var(--color-stone)] hover:text-[var(--color-ink)] transition-colors text-sm font-medium">
            <BookOpen className="w-5 h-5 md:w-5 md:h-5" />
            <span className="hidden sm:inline">Reader Mode</span>
          </Link>
          <button onClick={handleLogout} className="flex items-center gap-1.5 md:gap-2 text-[var(--color-terracotta)] hover:opacity-80 transition-opacity text-sm font-medium">
            <LogOut className="w-5 h-5 md:w-5 md:h-5" />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </>
      );
    }

    return (
      <div className="flex gap-4">
        <Link to="/user/login" className="text-sm font-medium text-[var(--color-stone)] hover:text-[var(--color-ink)] transition-colors">Reader Login</Link>
        <Link to="/admin/login" className="text-sm font-medium text-[var(--color-stone)] hover:text-[var(--color-ink)] transition-colors">Publisher Login</Link>
      </div>
    );
  };

  const displayName = isAdmin ? (adminEmail || 'Publisher') : (userEmail || 'Reader');

  return (
    <nav className="bg-[var(--color-canvas)] border-b border-[var(--color-divider)]">
      {/* Top Main Navbar */}
      <div className="container mx-auto px-4 max-w-5xl py-3 md:py-4 flex flex-row items-center justify-between">
        <Link to="/" className="flex items-center hover:opacity-80 transition-opacity shrink-0">
          <div className="w-36 h-10 md:w-48 md:h-12 -ml-2 md:ml-0">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 540 120" width="100%" height="100%">
              <g transform="translate(15, 18)">
                <rect x="10" y="10" width="64" height="64" rx="14" fill="#1C1917"/>
                <path d="M 10 50 L 50 10 L 50 50 Z" fill="#C2593F"/>
                <circle cx="54" cy="54" r="7" fill="#F4EFEA"/>
              </g>
              <text x="110" y="62" fontFamily="'Newsreader', 'Playfair Display', Georgia, serif" fontWeight="600" fontSize="38" fill="#1C1917" letterSpacing="-0.5">
                blogger
              </text>
              <text x="112" y="86" fontFamily="system-ui, -apple-system, 'Inter', sans-serif" fontWeight="500" fontSize="11" fill="#78716C" letterSpacing="3">
                CURATED ESSAYS &amp; NOTES
              </text>
            </svg>
          </div>
        </Link>
        
        <div className="flex items-center gap-5 md:gap-6 ml-auto">
          {getNavLinks()}
        </div>
      </div>

      {/* Mobile/Desktop User Identification Bar */}
      {(isAdmin || isUser) && (
        <div className="bg-[var(--color-divider)] bg-opacity-30 border-t border-[var(--color-divider)]">
          <div className="container mx-auto px-4 max-w-5xl py-1.5 flex items-center justify-end gap-2 text-xs font-serif text-[var(--color-stone)]">
            <User className="w-3.5 h-3.5" />
            <span className="tracking-wide">Logged in as <span className="font-semibold text-[var(--color-ink)]">{displayName}</span></span>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
