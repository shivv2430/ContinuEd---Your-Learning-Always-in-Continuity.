import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Bell, CheckCheck, Clock, AlertCircle, Info, CheckCircle2 } from 'lucide-react';
import { useNotifications } from '../../context/NotificationContext';

export default function NotificationDropdown({ isOpen, onClose }) {
  const { notifications, unreadCount, markAsRead, markAllAsRead } = useNotifications();
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const getIcon = (type) => {
    switch (type) {
      case 'alert':
      case 'warning':
        return <AlertCircle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />;
      case 'success':
        return <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />;
      default:
        return <Info className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" />;
    }
  };

  return (
    <div
      ref={dropdownRef}
      className="absolute right-0 top-12 w-80 sm:w-96 bg-white rounded-2xl shadow-xl border border-slate-200 z-50 overflow-hidden"
    >
      <div className="p-4 border-b border-slate-100 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h4 className="font-semibold text-slate-900 text-sm">Notifications</h4>
          {unreadCount > 0 && (
            <span className="bg-indigo-100 text-indigo-700 text-xs px-2 py-0.5 rounded-full font-medium">
              {unreadCount} new
            </span>
          )}
        </div>
        {unreadCount > 0 && (
          <button
            onClick={markAllAsRead}
            className="text-xs text-indigo-600 hover:text-indigo-800 font-medium flex items-center gap-1 cursor-pointer"
          >
            <CheckCheck className="w-3.5 h-3.5" />
            Mark all read
          </button>
        )}
      </div>

      <div className="max-h-80 overflow-y-auto divide-y divide-slate-100">
        {notifications.length === 0 ? (
          <div className="p-6 text-center text-sm text-slate-500">
            No notifications right now
          </div>
        ) : (
          notifications.map((notif) => (
            <Link
              key={notif.id}
              to={notif.link || '#'}
              onClick={() => {
                markAsRead(notif.id);
                onClose();
              }}
              className={`p-4 flex gap-3 transition-colors hover:bg-slate-50 block ${
                !notif.read ? 'bg-indigo-50/40' : ''
              }`}
            >
              {getIcon(notif.type)}
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <p className={`text-xs font-semibold ${!notif.read ? 'text-slate-900' : 'text-slate-700'}`}>
                    {notif.title}
                  </p>
                  <span className="text-[10px] text-slate-400 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {notif.time}
                  </span>
                </div>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">{notif.message}</p>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
