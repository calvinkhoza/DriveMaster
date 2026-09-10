import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Bell, Menu, X, ChevronDown, LogOut, User, Settings,
  BookOpen, Shield,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function Navbar() {
  const { user, logout, sidebarOpen, setSidebarOpen, notifications, markNotificationsRead } = useApp();
  const [notifOpen, setNotifOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const navigate = useNavigate();

  const unread = notifications.filter(n => !n.read).length;

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const roleLabel = { student: 'Student', instructor: 'Instructor', admin: 'Admin' };
  const roleColor = {
    student:    'bg-blue-500/20 text-blue-300',
    instructor: 'bg-purple-500/20 text-purple-300',
    admin:      'bg-red-500/20 text-red-300',
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-16 bg-dark-900/95 backdrop-blur-md border-b border-white/10 flex items-center px-4 gap-4">
      {/* Sidebar toggle (authenticated) */}
      {user && (
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
        >
          {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      )}

      {/* Logo */}
      <Link to={user ? `/${user.role}` : '/'} className="flex items-center gap-2.5 mr-auto">
        <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center shadow-lg shadow-primary-900/50">
          <BookOpen size={16} className="text-white" />
        </div>
        <div className="hidden sm:block">
          <span className="font-bold text-white text-sm leading-tight">K53 DriveMaster</span>
          <span className="block text-[10px] text-primary-400 font-medium leading-tight">Academy</span>
        </div>
      </Link>

      {/* Public nav links */}
      {!user && (
        <div className="hidden md:flex items-center gap-6 mr-4">
          <a href="#features" className="text-sm text-gray-400 hover:text-white transition-colors">Features</a>
          <a href="#pricing" className="text-sm text-gray-400 hover:text-white transition-colors">Pricing</a>
          <a href="#about" className="text-sm text-gray-400 hover:text-white transition-colors">About</a>
        </div>
      )}

      {/* Auth buttons (public) */}
      {!user && (
        <div className="flex items-center gap-3">
          <Link to="/login" className="text-sm text-gray-300 hover:text-white transition-colors font-medium">Sign In</Link>
          <Link to="/register" className="btn-primary text-sm py-2 px-4">Get Started</Link>
        </div>
      )}

      {/* Authenticated right section */}
      {user && (
        <div className="flex items-center gap-2">
          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => { setNotifOpen(!notifOpen); setProfileOpen(false); markNotificationsRead(); }}
              className="relative p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
            >
              <Bell size={20} />
              {unread > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-accent-500 rounded-full text-[10px] font-bold text-white flex items-center justify-center">
                  {unread}
                </span>
              )}
            </button>

            {notifOpen && (
              <div className="absolute right-0 mt-2 w-80 bg-dark-800 border border-white/10 rounded-2xl shadow-2xl overflow-hidden animate-slide-up">
                <div className="p-4 border-b border-white/10">
                  <h3 className="font-semibold text-white">Notifications</h3>
                </div>
                {notifications.map(n => (
                  <div key={n.id} className={`p-4 flex gap-3 hover:bg-white/5 transition-colors ${!n.read ? 'bg-primary-600/5' : ''}`}>
                    <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${n.read ? 'bg-gray-600' : 'bg-primary-500'}`} />
                    <div>
                      <p className="text-sm text-gray-200">{n.text}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{n.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Profile */}
          <div className="relative">
            <button
              onClick={() => { setProfileOpen(!profileOpen); setNotifOpen(false); }}
              className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-white/10 transition-colors"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-sm font-bold text-white">
                {user.name?.[0]?.toUpperCase() || 'U'}
              </div>
              <div className="hidden sm:block text-left">
                <p className="text-sm font-medium text-white leading-tight">{user.name}</p>
                <p className="text-[11px] text-gray-400">{roleLabel[user.role]}</p>
              </div>
              <ChevronDown size={14} className="text-gray-400 hidden sm:block" />
            </button>

            {profileOpen && (
              <div className="absolute right-0 mt-2 w-52 bg-dark-800 border border-white/10 rounded-2xl shadow-2xl overflow-hidden animate-slide-up">
                <div className="p-3 border-b border-white/10">
                  <p className="text-xs font-medium text-white">{user.name}</p>
                  <span className={`badge text-[10px] mt-1 ${roleColor[user.role]}`}>
                    {roleLabel[user.role]}
                  </span>
                </div>
                <div className="p-2">
                  <button
                    onClick={() => { navigate(`/${user.role}`); setProfileOpen(false); }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                  >
                    <User size={15} /> Dashboard
                  </button>
                  {user.role === 'admin' && (
                    <button
                      onClick={() => { navigate('/admin'); setProfileOpen(false); }}
                      className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                    >
                      <Shield size={15} /> Admin Panel
                    </button>
                  )}
                  <button className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors">
                    <Settings size={15} /> Settings
                  </button>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors"
                  >
                    <LogOut size={15} /> Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
