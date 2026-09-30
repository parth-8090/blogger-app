import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import MediaRenderer from '../components/MediaRenderer';
import axios from 'axios';
import { Heart, Share2, MessageCircle, Send } from 'lucide-react';

const API_URL = (import.meta.env.VITE_API_URL || 'http://localhost:4000') + '/blogs';

const BlogDetail = () => {
  const currentUserId = localStorage.getItem('userId');
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [commentText, setCommentText] = useState('');

  useEffect(() => {
    fetchBlog();
  }, [id]);

  const getHeaders = () => ({
    headers: { Authorization: `Bearer ${localStorage.getItem('userToken') || localStorage.getItem('adminToken')}` }
  });

  const fetchBlog = async () => {
    try {
      const res = await axios.get(`${API_URL}/${id}`, getHeaders());
      setBlog(res.data);
    } catch (err) {
      console.error(err);
    }
  };

    const handleLike = async () => {
    // Optimistic UI Update
    const isLiked = blog.likes?.some(l => l._id === currentUserId);
    setBlog({
      ...blog,
      likes: isLiked 
        ? blog.likes.filter(l => l._id !== currentUserId) 
        : [...(blog.likes || []), { _id: currentUserId }]
    });

    try {
      await axios.post(`${API_URL}/${id}/like`, {}, {
        headers: { Authorization: `Bearer ${localStorage.getItem('userToken') || localStorage.getItem('adminToken')}` }
      });
    } catch (err) {
      console.error(err);
      fetchBlog(); // Revert on failure
    }
  };

  const handleShare = async () => {
    try {
      await axios.post(`${API_URL}/${id}/share`, {}, getHeaders());
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
      fetchBlog();
    } catch (err) {
      console.error(err);
    }
  };

  const submitComment = async (e) => {
    e.preventDefault();
    if (!commentText) return;
    try {
      await axios.post(`${API_URL}/${id}/comment`, { text: commentText }, getHeaders());
      setCommentText('');
      fetchBlog();
    } catch (err) {
      console.error(err);
    }
  };

  if (!blog) {
    return <div className="flex justify-center items-center py-20"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[var(--color-terracotta)]"></div></div>;
  }

  return (
    <div className="bg-[var(--color-card)] rounded-xl shadow-sm border border-[var(--color-divider)] overflow-hidden">
      {blog.mediaUrl && (
        <div className="w-full h-[250px] md:h-[400px] border-b border-[var(--color-divider)]">
          <MediaRenderer url={blog.mediaUrl} className="w-full h-full object-cover" />
        </div>
      )}
      <div className="p-10">
        <h1 className="text-2xl md:text-4xl font-bold text-[var(--color-ink)] mb-6">{blog.title}</h1>
        <div className="prose max-w-none text-[var(--color-ink)] font-serif text-lg leading-relaxed mb-10 whitespace-pre-wrap">
          {blog.description}
        </div>
        
        <div className="flex items-center gap-8 py-6 border-t border-b border-[var(--color-divider)] mb-10">
          <button onClick={handleLike} className="flex items-center gap-2 text-[var(--color-stone)] hover:text-[var(--color-terracotta)] font-medium transition-colors">
            <Heart className={`w-5 h-5 ${blog.likes?.some(l => l._id === currentUserId) ? 'fill-[var(--color-terracotta)] text-[var(--color-terracotta)]' : ''}`} />
            <span>{blog.likes?.length || 0} Likes</span>
          </button>
          <div className='text-xs text-[var(--color-stone)] mt-2'>{blog.likes?.map(l => l.email.split('@')[0]).join(', ')}</div>
          <button onClick={handleShare} className="flex items-center gap-2 text-[var(--color-stone)] hover:text-[var(--color-ink)] font-medium transition-colors">
            <Share2 className="w-5 h-5" />
            <span>{blog.shares} Shares</span>
          </button>
        </div>

        <div className="space-y-10">
          <h3 className="text-2xl font-bold text-[var(--color-ink)] flex items-center gap-3">
            <MessageCircle className="w-6 h-6" />
            Discussion ({blog.comments?.length || 0})
          </h3>
          
          <div className="space-y-6">
            {blog.comments?.map((c, i) => (
              <div key={i} className="bg-[var(--color-canvas)] rounded-lg p-6 border border-[var(--color-divider)]">
                <h4 className="font-semibold text-[var(--color-ink)] mb-2">{c.name || 'Anonymous Reader'}</h4>
                <p className="text-[var(--color-stone)] font-serif">{c.text}</p>
              </div>
            ))}
          </div>

          <form onSubmit={submitComment} className="bg-[var(--color-canvas)] p-8 rounded-xl border border-[var(--color-divider)] mt-8">
            <h4 className="font-semibold text-[var(--color-ink)] mb-4">Leave a note</h4>
            <div className="space-y-4">
              <textarea
                placeholder="What are your thoughts?"
                className="w-full px-4 py-3 rounded-lg border border-[var(--color-divider)] focus:outline-none bg-[var(--color-canvas)] focus:bg-white h-32 resize-none font-serif"
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
              />
              <button type="submit" className="flex items-center gap-2 bg-[var(--color-ink)] text-[var(--color-canvas)] px-8 py-3 rounded hover:opacity-90 transition-opacity font-medium">
                <Send className="w-4 h-4" />
                Publish
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BlogDetail;
