import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { Plus, Edit2, Trash2 } from 'lucide-react';

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

  const handleDelete = async (id) => {
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
    <div className="space-y-6">
      <div className="flex justify-between items-center bg-[var(--color-card)] p-6   border border-[var(--color-divider)]">
        <h1 className="text-2xl font-bold text-[var(--color-ink)]">Dashboard</h1>
        <Link to="/admin/create" className="flex items-center gap-2 bg-[var(--color-ink)] text-white px-4 py-2  hover:opacity-90 transition-colors font-medium">
          <Plus className="w-5 h-5" />
          Create Blog
        </Link>
      </div>

      <div className="bg-[var(--color-card)]   border border-[var(--color-divider)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-[var(--color-canvas)] border-b border-[var(--color-divider)]">
              <tr>
                <th className="px-6 py-4 font-semibold text-[var(--color-stone)]">Title</th>
                <th className="px-6 py-4 font-semibold text-[var(--color-stone)]">Date</th>
                <th className="px-6 py-4 font-semibold text-[var(--color-stone)] text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {blogs.map((blog) => (
                <tr key={blog._id} className="hover:bg-[var(--color-canvas)]/50 transition-colors">
                  <td className="px-6 py-4">
                    <span className="font-medium text-[var(--color-ink)]">{blog.title}</span>
                  </td>
                  <td className="px-6 py-4 text-[var(--color-stone)]">
                    {new Date(blog.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-3">
                      <Link to={`/admin/edit/${blog._id}`} className="p-2 text-indigo-600 hover:bg-indigo-50  transition-colors">
                        <Edit2 className="w-4 h-4" />
                      </Link>
                      <button onClick={() => handleDelete(blog._id)} className="p-2 text-red-600 hover:bg-red-50  transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {blogs.length === 0 && (
            <div className="text-center py-12 text-[var(--color-stone)]">
              No blogs created yet.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
