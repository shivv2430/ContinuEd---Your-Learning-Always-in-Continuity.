import React, { useState } from 'react';
import {
  User,
  Mail,
  Shield,
  Bell,
  Sparkles,
  Database,
  CheckCircle2,
  AlertCircle,
  Save,
  GraduationCap,
  UserCheck,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { isSupabaseConfigured } from '../services/supabaseClient';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';

export default function SettingsPage() {
  const { user, role, switchRole } = useAuth();
  const [name, setName] = useState(user?.name || 'Alex Rivera');
  const [email, setEmail] = useState(user?.email || 'alex.rivera@university.edu');
  const [department, setDepartment] = useState(user?.department || 'Computer Science & Engineering');
  const [aiAssistanceLevel, setAiAssistanceLevel] = useState('detailed');
  const [saved, setSaved] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-20">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
          Settings & Continuity Preferences
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Configure your academic profile, role views, and AI continuity engine parameters.
        </p>
      </div>

      {saved && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>Preferences updated successfully!</span>
        </div>
      )}

      {/* Role Switcher Card */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h2 className="text-sm font-bold text-slate-900">Active Role Perspective</h2>
            <p className="text-xs text-slate-500">
              Toggle between Student and Teacher perspectives for testing
            </p>
          </div>
          <Badge variant={role === 'student' ? 'indigo' : 'emerald'}>
            Current: {role.toUpperCase()}
          </Badge>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => switchRole('student')}
            className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
              role === 'student'
                ? 'bg-indigo-50/70 border-indigo-500 shadow-xs'
                : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
            }`}
          >
            <div className="flex items-center gap-2">
              <GraduationCap className={`w-5 h-5 ${role === 'student' ? 'text-indigo-600' : 'text-slate-500'}`} />
              <h3 className="text-sm font-bold text-slate-900">Student Portal</h3>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Missed classes, catch-up plans, quizzes, and learning progress.
            </p>
          </button>

          <button
            type="button"
            onClick={() => switchRole('teacher')}
            className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
              role === 'teacher'
                ? 'bg-emerald-50/70 border-emerald-500 shadow-xs'
                : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
            }`}
          >
            <div className="flex items-center gap-2">
              <UserCheck className={`w-5 h-5 ${role === 'teacher' ? 'text-emerald-600' : 'text-slate-500'}`} />
              <h3 className="text-sm font-bold text-slate-900">Teacher Portal</h3>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Publish class updates, upload lecture slides, track absent students.
            </p>
          </button>
        </div>
      </div>

      {/* Backend & AI Connection Status */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs space-y-4">
        <div>
          <h2 className="text-sm font-bold text-slate-900">Continuity Architecture Status</h2>
          <p className="text-xs text-slate-500">
            Current backend readiness and environment variable status
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50 flex items-start gap-3">
            <div className="p-2 bg-emerald-100 text-emerald-700 rounded-xl">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-900">Nebius AI Engine</h4>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Local synthesis engine active • Express proxy ready
              </p>
              <span className="inline-block mt-1 text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                Operational
              </span>
            </div>
          </div>

          <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50 flex items-start gap-3">
            <div className="p-2 bg-indigo-100 text-indigo-700 rounded-xl">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-900">Supabase & PostgreSQL</h4>
              <p className="text-[11px] text-slate-500 mt-0.5">
                {isSupabaseConfigured
                  ? 'Connected to remote instance'
                  : 'Demo local storage engine active'}
              </p>
              <span className="inline-block mt-1 text-[10px] font-semibold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200">
                {isSupabaseConfigured ? 'Connected' : 'Demo Mode Active'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Profile Form */}
      <form onSubmit={handleSave} className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs space-y-4">
        <h2 className="text-sm font-bold text-slate-900 pb-3 border-b border-slate-100">
          Personal Information
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 text-xs sm:text-sm border border-slate-300 rounded-xl bg-white"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Academic Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 text-xs sm:text-sm border border-slate-300 rounded-xl bg-white"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Department</label>
          <input
            type="text"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            className="w-full px-3 py-2 text-xs sm:text-sm border border-slate-300 rounded-xl bg-white"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">AI Catch-Up Detail Level</label>
          <select
            value={aiAssistanceLevel}
            onChange={(e) => setAiAssistanceLevel(e.target.value)}
            className="w-full px-3 py-2 text-xs sm:text-sm border border-slate-300 rounded-xl bg-white"
          >
            <option value="concise">Concise (Bullet Points & Key Summaries)</option>
            <option value="detailed">Detailed (In-depth explanations with real-world analogies)</option>
            <option value="exam-prep">Exam Focused (Emphasis on past question patterns & traps)</option>
          </select>
        </div>

        <div className="pt-4 border-t border-slate-100 flex justify-end">
          <Button type="submit" variant="primary" size="md" icon={Save}>
            Save Preferences
          </Button>
        </div>
      </form>
    </div>
  );
}
