import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { Plus, Edit2, Trash2, Heart, MessageCircle, Share2 } from 'lucide-react';
import MediaRenderer from '../components/MediaRenderer';

const API_URL = (import.meta.env.VITE_API_URL || 'http://localhost:4000') + '/blogs';

const AdminDashboard = () => {
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem('adminToken');

  useEffect(() => {
    if (!token) {
      navigate('/admin/login');
      return;
    }
    fetchBlogs();
  }, [token, navigate]);

  const fetchBlogs = async () => {
    try {
      const res = await axios.get(API_URL, { headers: { Authorization: `Bearer ${token}` } });
      setBlogs(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (e, id) => {
    e.preventDefault();
    if (window.confirm('Are you sure you want to delete this blog?')) {
      try {
        await axios.delete(`${API_URL}/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        fetchBlogs();
      } catch (err) {
        console.error(err);
        alert('Failed to delete blog');
      }
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center bg-[var(--color-card)] p-6 rounded-xl border border-[var(--color-divider)]">
        <div>
          <h1 className="text-2xl font-bold text-[var(--color-ink)]">Publisher Dashboard</h1>
          <p className="text-[var(--color-stone)] mt-1 font-serif text-sm">Manage your publications</p>
        </div>
        <Link to="/admin/create" className="flex items-center gap-2 bg-[var(--color-ink)] text-white px-5 py-2.5 rounded-lg hover:opacity-90 transition-opacity font-medium">
          <Plus className="w-5 h-5" />
          <span className="hidden sm:inline">Create Entry</span>
        </Link>
      </div>

      <div className="space-y-8">
        {blogs.map((blog) => (
          <Link key={blog._id} to={`/blog/${blog._id}`} className="block bg-[var(--color-card)] rounded-xl shadow-sm border border-[var(--color-divider)] overflow-hidden hover:shadow-md transition-shadow group relative">
            {blog.mediaUrl && (
              <div className="h-48 md:h-64 w-full overflow-hidden border-b border-[var(--color-divider)]">
                <MediaRenderer url={blog.mediaUrl} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
            )}
            <div className="p-4 md:p-8">
              <h2 className="text-2xl md:text-3xl font-bold text-[var(--color-ink)] mb-4">{blog.title}</h2>
              <p className="text-[var(--color-stone)] line-clamp-3 mb-6 font-serif">{blog.description}</p>
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-6 pt-6 border-t border-[var(--color-divider)]">
                <div className="flex items-center gap-6 text-[var(--color-stone)] text-sm font-medium">
                  <div className="flex items-center gap-2">
                    <Heart className="w-4 h-4" />
                    <span>{blog.likes?.length || 0}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MessageCircle className="w-4 h-4" />
                    <span>{blog.comments?.length || 0}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Share2 className="w-4 h-4" />
                    <span>{blog.shares || 0}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Link 
                    to={`/admin/edit/${blog._id}`} 
                    onClick={(e) => e.stopPropagation()}
                    className="flex items-center gap-2 px-4 py-2 bg-[var(--color-canvas)] border border-[var(--color-divider)] rounded hover:border-[var(--color-ink)] text-[var(--color-ink)] transition-colors text-sm font-medium z-10"
                  >
                    <Edit2 className="w-4 h-4" />
                    Edit
                  </Link>
                  <button 
                    onClick={(e) => handleDelete(e, blog._id)} 
                    className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 border border-red-200 rounded hover:bg-red-100 transition-colors text-sm font-medium z-10"
                  >
                    <Trash2 className="w-4 h-4" />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </Link>
        ))}
        {blogs.length === 0 && (
          <div className="text-center py-20 text-[var(--color-stone)]">
            No publications found.
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
