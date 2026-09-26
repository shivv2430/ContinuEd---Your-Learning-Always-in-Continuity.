import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  BookOpen,
  AlertCircle,
  TrendingUp,
  Settings,
  PlusCircle,
  FolderOpen,
  FileCheck2,
  Sparkles,
  HelpCircle,
  CheckCircle2,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { classService } from '../../services/classService';

export default function Sidebar({ isOpen, onClose }) {
  const { role } = useAuth();
  const missedClasses = classService.getMissedClasses();
  const pendingCatchupsCount = missedClasses.filter((c) => c.status !== 'completed').length;

  const studentLinks = [
    {
      to: '/student',
      label: 'Dashboard',
      icon: LayoutDashboard,
      end: true,
    },
    {
      to: '/student/classes',
      label: 'My Enrolled Courses',
      icon: BookOpen,
    },
    {
      to: '/student/missed',
      label: 'Missed Classes',
      icon: AlertCircle,
      badge: pendingCatchupsCount > 0 ? `${pendingCatchupsCount}` : null,
      badgeColor: 'bg-amber-100 text-amber-800',
    },
    {
      to: '/student/progress',
      label: 'Learning Progress',
      icon: TrendingUp,
    },
    {
      to: '/settings',
      label: 'Settings',
      icon: Settings,
    },
  ];

  const teacherLinks = [
    {
      to: '/teacher',
      label: 'Teacher Overview',
      icon: LayoutDashboard,
      end: true,
    },
    {
      to: '/teacher/classes',
      label: 'Manage Classes',
      icon: BookOpen,
    },
    {
      to: '/teacher/classes/new',
      label: 'Add Class Update',
      icon: PlusCircle,
      highlight: true,
    },
    {
      to: '/teacher/resources',
      label: 'Course Resources',
      icon: FolderOpen,
    },
    {
      to: '/teacher/assignments',
      label: 'Assignments',
      icon: FileCheck2,
    },
    {
      to: '/settings',
      label: 'Settings',
      icon: Settings,
    },
  ];

  const links = role === 'teacher' ? teacherLinks : studentLinks;

  const content = (
    <div className="flex flex-col h-full justify-between p-4">
      <div className="space-y-6">
        {/* Navigation Category Label */}
        <div>
          <div className="px-3 mb-2 flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              {role === 'teacher' ? 'Faculty Portal' : 'Student Space'}
            </span>
            <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-mono">
              v1.0
            </span>
          </div>

          <nav className="space-y-1">
            {links.map((link) => {
              const Icon = link.icon;
              return (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.end}
                  onClick={onClose}
                  className={({ isActive }) =>
                    `flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                      isActive
                        ? 'bg-indigo-600 text-white shadow-xs font-semibold'
                        : link.highlight
                        ? 'bg-indigo-50/80 text-indigo-700 hover:bg-indigo-100/80 border border-indigo-200/50'
                        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <div className="flex items-center gap-3">
                        <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-500'}`} />
                        <span>{link.label}</span>
                      </div>
                      {link.badge && (
                        <span
                          className={`text-xs px-2 py-0.5 rounded-full font-bold ${
                            isActive ? 'bg-white text-indigo-700' : link.badgeColor
                          }`}
                        >
                          {link.badge}
                        </span>
                      )}
                    </>
                  )}
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* AI Continuity Quick Card */}
        {role === 'student' && (
          <div className="bg-gradient-to-br from-indigo-50 via-purple-50 to-white rounded-2xl p-4 border border-indigo-100/80 shadow-2xs">
            <div className="flex items-center gap-2 mb-2">
              <div className="p-1.5 bg-indigo-600 rounded-lg text-white">
                <Sparkles className="w-3.5 h-3.5" />
              </div>
              <span className="text-xs font-bold text-slate-800">Continuity Assistant</span>
            </div>
            <p className="text-[11px] text-slate-600 leading-relaxed mb-3">
              Missed a class? Let AI synthesize what happened and generate your 4-step recovery plan.
            </p>
            <NavLink
              to="/student/missed"
              onClick={onClose}
              className="inline-flex items-center justify-center w-full px-3 py-1.5 bg-white hover:bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-semibold rounded-lg shadow-2xs transition-colors"
            >
              Resume Catch-Up
            </NavLink>
          </div>
        )}
      </div>

      {/* Footer Info */}
      <div className="pt-4 border-t border-slate-100">
        <div className="flex items-center justify-between text-xs text-slate-400">
          <span>ContinuEd Platform</span>
          <span className="flex items-center gap-1 text-emerald-600">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            Online
          </span>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:block w-64 shrink-0 bg-white border-r border-slate-200/80 min-h-[calc(100vh-4rem)]">
        {content}
      </aside>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs" onClick={onClose} />
          <div className="fixed inset-y-0 left-0 w-72 bg-white shadow-2xl z-10 flex flex-col">
            <div className="h-16 flex items-center justify-between px-6 border-b border-slate-100">
              <span className="font-bold text-slate-900">ContinuEd Navigation</span>
              <button
                onClick={onClose}
                className="text-xs bg-slate-100 hover:bg-slate-200 px-2 py-1 rounded text-slate-600"
              >
                Close
              </button>
            </div>
            <div className="flex-1 overflow-y-auto">{content}</div>
          </div>
        </div>
      )}
    </>
  );
}
