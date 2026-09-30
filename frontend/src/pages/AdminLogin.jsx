import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post((import.meta.env.VITE_API_URL || 'http://localhost:4000') + '/admins/login', { email, password });
      localStorage.setItem('adminToken', res.data.token);
      navigate('/admin');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 bg-[var(--color-card)] p-8 border border-[var(--color-divider)]">
      <h2 className="text-2xl font-bold text-center text-[var(--color-ink)] mb-8">Publisher Access</h2>
      {error && <div className="mb-4 p-3 bg-red-50 text-red-600 text-sm">{error}</div>}
      <form onSubmit={handleLogin} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-[var(--color-stone)] mb-2">Email Address</label>
          <input
            type="email"
            required
            className="w-full px-4 py-2 border border-[var(--color-divider)] bg-[var(--color-canvas)] focus:outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-[var(--color-stone)] mb-2">Password</label>
          <input
            type="password"
            required
            className="w-full px-4 py-2 border border-[var(--color-divider)] bg-[var(--color-canvas)] focus:outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="w-full bg-[var(--color-ink)] text-[var(--color-canvas)] font-medium py-2 hover:opacity-90 transition-opacity">
          Sign In
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;
