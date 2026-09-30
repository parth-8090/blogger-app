import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateBlog = () => {
  const [title, setTitle] = useState('');
  const [mediaFile, setMediaFile] = useState(null);
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const token = localStorage.getItem('adminToken');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('description', description);
      if (mediaFile) {
        formData.append('media', mediaFile);
      }

      await axios.post(
        (import.meta.env.VITE_API_URL || 'http://localhost:4000') + '/blogs',
        formData,
        { 
          headers: { 
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
          } 
        }
      );
      navigate('/admin');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create blog');
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-[var(--color-card)] p-8 border border-[var(--color-divider)]">
      <h2 className="text-2xl font-bold text-[var(--color-ink)] mb-8">Create New Entry</h2>
      {error && <div className="mb-4 p-3 bg-red-50 text-red-600 text-sm">{error}</div>}
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-[var(--color-stone)] mb-2">Title</label>
          <input
            type="text"
            required
            className="w-full px-4 py-2 border border-[var(--color-divider)] bg-[var(--color-canvas)] focus:outline-none"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Essay Title"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-[var(--color-stone)] mb-2">Upload Media (Image / Video / GIF)</label>
          <input
            type="file"
            accept="image/*,video/*"
            className="w-full px-4 py-2 border border-[var(--color-divider)] bg-[var(--color-canvas)] focus:outline-none file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:font-semibold file:bg-[var(--color-ink)] file:text-[var(--color-canvas)] hover:file:opacity-90"
            onChange={(e) => setMediaFile(e.target.files[0])}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-[var(--color-stone)] mb-2">Content</label>
          <textarea
            required
            className="w-full px-4 py-3 border border-[var(--color-divider)] bg-[var(--color-canvas)] focus:outline-none h-48 resize-none font-serif"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Write your content here..."
          />
        </div>
        <div className="flex gap-4 pt-4">
          <button type="submit" className="px-6 py-2 bg-[var(--color-ink)] text-[var(--color-canvas)] font-medium hover:opacity-90 transition-opacity">
            Publish
          </button>
          <button type="button" onClick={() => navigate('/admin')} className="px-6 py-2 border border-[var(--color-ink)] text-[var(--color-ink)] font-medium hover:bg-[var(--color-ink)] hover:text-[var(--color-canvas)] transition-colors">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateBlog;
