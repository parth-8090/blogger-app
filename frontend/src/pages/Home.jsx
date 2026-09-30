import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import MediaRenderer from '../components/MediaRenderer';
import { Heart, Share2, MessageCircle } from 'lucide-react';

const API_URL = (import.meta.env.VITE_API_URL || 'http://localhost:4000') + '/blogs';

const Home = () => {
  const currentUserId = localStorage.getItem('userId');
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const res = await axios.get(API_URL, { 
        headers: { Authorization: `Bearer ${localStorage.getItem('userToken')}` } 
      });
      setBlogs(res.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

    const handleLike = async (e, id) => {
    e.preventDefault();
    // Optimistic UI Update
    setBlogs(blogs.map(blog => {
      if (blog._id === id) {
        const isLiked = blog.likes?.some(l => l._id === currentUserId);
        return {
          ...blog,
          likes: isLiked 
            ? blog.likes.filter(l => l._id !== currentUserId) 
            : [...(blog.likes || []), { _id: currentUserId }]
        };
      }
      return blog;
    }));

    try {
      await axios.post(`${API_URL}/${id}/like`, {}, { 
        headers: { Authorization: `Bearer ${localStorage.getItem('userToken')}` } 
      });
    } catch (err) {
      console.error(err);
      fetchBlogs(); // Revert on failure
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center py-20"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[var(--color-terracotta)]"></div></div>;
  }

  return (
    <div className="space-y-8">
      {blogs.map((blog) => (
        <Link key={blog._id} to={`/blog/${blog._id}`} className="block bg-[var(--color-card)] rounded-xl shadow-sm border border-[var(--color-divider)] overflow-hidden hover:shadow-md transition-shadow group">
          {blog.mediaUrl && (
            <div className="h-48 md:h-64 w-full overflow-hidden border-b border-[var(--color-divider)]">
              <MediaRenderer url={blog.mediaUrl} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>
          )}
          <div className="p-4 md:p-8">
            <h2 className="text-xl md:text-3xl font-bold text-[var(--color-ink)] mb-4">{blog.title}</h2>
            <p className="text-[var(--color-stone)] line-clamp-3 mb-6 font-serif">{blog.description}</p>
            <div className="flex items-center gap-6 text-[var(--color-stone)] text-sm font-medium">
              <button onClick={(e) => handleLike(e, blog._id)} className="flex items-center gap-2 hover:text-[var(--color-terracotta)] transition-colors">
                <Heart className={`w-5 h-5 ${blog.likes?.some(l => l._id === currentUserId) ? 'fill-[var(--color-terracotta)] text-[var(--color-terracotta)]' : ''}`} />
                <span>{blog.likes?.length || 0}</span>
              </button>
              <div className="flex items-center gap-2 hover:text-[var(--color-ink)] transition-colors">
                <MessageCircle className="w-5 h-5" />
                <span>{blog.comments?.length || 0}</span>
              </div>
              <div className="flex items-center gap-2 hover:text-[var(--color-ink)] transition-colors">
                <Share2 className="w-5 h-5" />
                <span>{blog.shares}</span>
              </div>
            </div>
          </div>
        </Link>
      ))}
      {blogs.length === 0 && (
        <div className="text-center py-20 text-[var(--color-stone)]">
          No entries found.
        </div>
      )}
    </div>
  );
};

export default Home;
