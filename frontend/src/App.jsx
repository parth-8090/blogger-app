import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import BlogDetail from './pages/BlogDetail';
import AdminDashboard from './pages/AdminDashboard';
import AdminLogin from './pages/AdminLogin';
import UserLogin from './pages/UserLogin';
import CreateBlog from './pages/CreateBlog';
import EditBlog from './pages/EditBlog';
import Landing from './pages/Landing';

function App() {
  const ProtectedUserRoute = ({ children }) => {
    return localStorage.getItem('userToken') ? children : <Navigate to="/" />;
  };

  const ProtectedAdminRoute = ({ children }) => {
    return localStorage.getItem('adminToken') ? children : <Navigate to="/admin/login" />;
  };

  return (
    <Router>
      <div className="min-h-screen bg-[var(--color-canvas)]">
        <Navbar />
        <main className="container mx-auto px-4 py-8 max-w-5xl">
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/user/login" element={<UserLogin />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/blogs" element={<ProtectedUserRoute><Home /></ProtectedUserRoute>} />
            <Route path="/blog/:id" element={<ProtectedUserRoute><BlogDetail /></ProtectedUserRoute>} />
            <Route path="/admin" element={<ProtectedAdminRoute><AdminDashboard /></ProtectedAdminRoute>} />
            <Route path="/admin/create" element={<ProtectedAdminRoute><CreateBlog /></ProtectedAdminRoute>} />
            <Route path="/admin/edit/:id" element={<ProtectedAdminRoute><EditBlog /></ProtectedAdminRoute>} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
