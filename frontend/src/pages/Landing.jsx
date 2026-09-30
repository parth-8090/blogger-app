import React from 'react';
import { Link } from 'react-router-dom';

const Landing = () => {
  return (
    <div className="max-w-3xl mx-auto mt-20 flex flex-col md:flex-row gap-8">
      <div className="flex-1 bg-[var(--color-card)] border border-[var(--color-divider)] p-10 flex flex-col items-center text-center">
        <h2 className="text-3xl font-bold mb-4">Readers</h2>
        <p className="text-[var(--color-stone)] mb-8">Access curated essays, leave thoughts, and save favorites.</p>
        <Link to="/user/login" className="w-full bg-[var(--color-ink)] text-[var(--color-canvas)] font-medium py-3 hover:opacity-90 transition-opacity">
          Enter as Reader
        </Link>
      </div>
      <div className="flex-1 bg-[var(--color-canvas)] border border-[var(--color-divider)] p-10 flex flex-col items-center text-center">
        <h2 className="text-3xl font-bold mb-4">Publishers</h2>
        <p className="text-[var(--color-stone)] mb-8">Manage publications, draft new entries, and view analytics.</p>
        <Link to="/admin/login" className="w-full border border-[var(--color-ink)] text-[var(--color-ink)] font-medium py-3 hover:bg-[var(--color-ink)] hover:text-[var(--color-canvas)] transition-colors">
          Enter as Publisher
        </Link>
      </div>
    </div>
  );
};

export default Landing;
