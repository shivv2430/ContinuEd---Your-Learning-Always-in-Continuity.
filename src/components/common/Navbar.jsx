import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  BookOpenCheck,
  Search,
  Bell,
  Sparkles,
  UserCheck,
  GraduationCap,
  SlidersHorizontal,
  LogOut,
  ChevronDown,
  Menu,
  X
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useNotifications } from '../../context/NotificationContext';
import { useSearch } from '../../context/SearchContext';
import NotificationDropdown from './NotificationDropdown';

export default function Navbar({ onMobileMenuToggle, isMobileMenuOpen }) {
  const { user, role, switchRole, logout } = useAuth();
  const { unreadCount } = useNotifications();
  const { setIsOpen: setSearchOpen } = useSearch();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleRoleToggle = () => {
    const nextRole = role === 'student' ? 'teacher' : 'student';
    switchRole(nextRole);
    if (nextRole === 'teacher') {
      navigate('/teacher');
    } else {
      navigate('/student');
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo & Mobile Trigger */}
          <div className="flex items-center gap-3">
            <button
              onClick={onMobileMenuToggle}
              className="lg:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100 focus:outline-none"
              aria-label="Toggle navigation"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-indigo-700 flex items-center justify-center text-white shadow-xs group-hover:scale-105 transition-transform">
                <BookOpenCheck className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xl font-bold tracking-tight text-slate-900 flex items-center gap-1.5">
                  Continu<span className="text-indigo-600">Ed</span>
                  <span className="hidden sm:inline-flex items-center gap-0.5 text-[10px] font-semibold tracking-wider uppercase px-1.5 py-0.5 rounded bg-indigo-50 text-indigo-700 border border-indigo-200">
                    <Sparkles className="w-2.5 h-2.5 text-indigo-500" /> AI
                  </span>
                </span>
                <p className="text-[10px] text-slate-400 font-medium hidden md:block -mt-0.5 leading-none">
                  Your Learning, Always in Continuity
                </p>
              </div>
            </Link>
          </div>

          {/* Search Trigger */}
          <div className="flex-1 max-w-md mx-4 hidden md:block">
            <button
              onClick={() => setSearchOpen(true)}
              className="w-full flex items-center justify-between px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200/70 border border-slate-200/60 rounded-xl text-slate-500 text-sm transition-all"
            >
              <div className="flex items-center gap-2">
                <Search className="w-4 h-4 text-slate-400" />
                <span>Search missed topics, courses, assignments...</span>
              </div>
              <kbd className="text-[10px] font-mono bg-white px-2 py-0.5 rounded border border-slate-200 text-slate-400 shadow-2xs">
                ⌘K
              </kbd>
            </button>
          </div>

          {/* Right Action Controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Quick Mobile Search Button */}
            <button
              onClick={() => setSearchOpen(true)}
              className="md:hidden p-2 rounded-xl text-slate-600 hover:bg-slate-100"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Role Switcher Pill */}
            <button
              onClick={handleRoleToggle}
              title={`Click to switch to ${role === 'student' ? 'Teacher' : 'Student'} mode`}
              className={`hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all cursor-pointer ${
                role === 'student'
                  ? 'bg-indigo-50 text-indigo-700 border-indigo-200 hover:bg-indigo-100'
                  : 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100'
              }`}
            >
              {role === 'student' ? (
                <>
                  <GraduationCap className="w-3.5 h-3.5 text-indigo-600" />
                  <span>Student View</span>
                </>
              ) : (
                <>
                  <UserCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Teacher View</span>
                </>
              )}
              <span className="text-[10px] font-normal text-slate-500 underline ml-0.5">switch</span>
            </button>

            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications((prev) => !prev)}
                className="p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 relative transition-colors cursor-pointer"
                aria-label="Notifications"
              >
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-indigo-600 rounded-full ring-2 ring-white animate-pulse" />
                )}
              </button>
              <NotificationDropdown
                isOpen={showNotifications}
                onClose={() => setShowNotifications(false)}
              />
            </div>

            {/* Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowProfileMenu((prev) => !prev)}
                className="flex items-center gap-2 p-1 pl-2 rounded-full hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <img
                  src={user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150'}
                  alt={user?.name || 'User'}
                  className="w-8 h-8 rounded-full object-cover ring-2 ring-indigo-500/20"
                />
                <span className="hidden lg:block text-xs font-semibold text-slate-700 max-w-[100px] truncate text-left">
                  {user?.name?.split(' ')[0] || 'Account'}
                </span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden lg:block" />
              </button>

              {showProfileMenu && (
                <div className="absolute right-0 top-12 w-56 bg-white rounded-2xl shadow-xl border border-slate-200 py-1.5 z-50 animate-in fade-in zoom-in-95 duration-100">
                  <div className="px-4 py-2 border-b border-slate-100">
                    <p className="text-xs font-semibold text-slate-900">{user?.name}</p>
                    <p className="text-[11px] text-slate-400 truncate">{user?.email}</p>
                    <div className="mt-1.5 inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold capitalize bg-slate-100 text-slate-700">
                      {role}
                    </div>
                  </div>

                  <div className="py-1">
                    <button
                      onClick={() => {
                        handleRoleToggle();
                        setShowProfileMenu(false);
                      }}
                      className="w-full px-4 py-2 text-left text-xs text-slate-700 hover:bg-slate-50 flex items-center justify-between cursor-pointer"
                    >
                      <span className="flex items-center gap-2">
                        <GraduationCap className="w-4 h-4 text-slate-400" />
                        Switch to {role === 'student' ? 'Teacher' : 'Student'} Mode
                      </span>
                    </button>

                    <Link
                      to="/settings"
                      onClick={() => setShowProfileMenu(false)}
                      className="w-full px-4 py-2 text-left text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                    >
                      <SlidersHorizontal className="w-4 h-4 text-slate-400" />
                      Settings & Preferences
                    </Link>
                  </div>

                  <div className="border-t border-slate-100 pt-1">
                    <button
                      onClick={() => {
                        logout();
                        setShowProfileMenu(false);
                        navigate('/login');
                      }}
                      className="w-full px-4 py-2 text-left text-xs text-rose-600 hover:bg-rose-50 flex items-center gap-2 cursor-pointer"
                    >
                      <LogOut className="w-4 h-4 text-rose-500" />
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
