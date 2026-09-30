import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LogOut } from 'lucide-react';

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('adminToken');
  const userToken = localStorage.getItem('userToken');

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('userToken');
    localStorage.removeItem('userId');
    navigate('/');
  };

  return (
    <nav className="bg-[var(--color-canvas)] border-b border-[var(--color-divider)]">
      <div className="container mx-auto px-4 max-w-5xl py-4 flex flex-row items-center justify-between">
        <Link to="/" className="flex items-center hover:opacity-80 transition-opacity">
          <div className="w-32 h-8 md:w-48 md:h-12">
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
        <div className="flex flex-wrap items-center gap-3 md:gap-6">
          {token && (
            <>
              <Link to="/admin" className="text-sm font-medium text-[var(--color-stone)] hover:text-[var(--color-ink)] transition-colors">
                Dashboard
              </Link>
              <button onClick={handleLogout} className="flex items-center gap-2 text-sm font-medium text-[var(--color-terracotta)] hover:opacity-80 transition-opacity">
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </>
          )}
          {userToken && !token && (
            <>
              <span className="text-sm font-medium text-[var(--color-stone)]">Reader Mode</span>
              <button onClick={handleLogout} className="flex items-center gap-2 text-sm font-medium text-[var(--color-terracotta)] hover:opacity-80 transition-opacity">
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </>
          )}
          {!token && !userToken && (
            <Link to="/user/login" className="text-sm font-medium text-[var(--color-stone)] hover:text-[var(--color-ink)] transition-colors">
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
