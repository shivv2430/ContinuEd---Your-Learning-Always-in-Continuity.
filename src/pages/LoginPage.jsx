import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, GraduationCap, UserCheck, ArrowRight, Sparkles } from 'lucide-react';
import Button from '../components/common/Button';
import { useAuth } from '../context/AuthContext';

export default function LoginPage() {
  const [email, setEmail] = useState('alex.rivera@university.edu');
  const [password, setPassword] = useState('password123');
  const [role, setRole] = useState('student');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleAutofill = (selectedRole) => {
    setRole(selectedRole);
    if (selectedRole === 'student') {
      setEmail('alex.rivera@university.edu');
      setPassword('password123');
    } else {
      setEmail('d.vance@university.edu');
      setPassword('teacher123');
    }
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please provide both email and password.');
      return;
    }

    setLoading(true);
    try {
      const res = await login(email, password, role);
      if (res.success) {
        if (role === 'teacher') {
          navigate('/teacher');
        } else {
          navigate('/student');
        }
      } else {
        setError('Authentication failed. Please verify credentials.');
      }
    } catch (err) {
      setError(err.message || 'Login failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="mb-6 text-center">
        <h2 className="text-xl font-bold text-slate-900">Welcome Back</h2>
        <p className="text-xs text-slate-500 mt-1">Sign in to resume your academic continuity</p>
      </div>

      {/* Role Toggle */}
      <div className="grid grid-cols-2 gap-2 p-1 bg-slate-100 rounded-xl mb-6">
        <button
          type="button"
          onClick={() => setRole('student')}
          className={`flex items-center justify-center gap-1.5 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
            role === 'student'
              ? 'bg-white text-indigo-700 shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <GraduationCap className="w-3.5 h-3.5" />
          <span>Student</span>
        </button>
        <button
          type="button"
          onClick={() => setRole('teacher')}
          className={`flex items-center justify-center gap-1.5 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
            role === 'teacher'
              ? 'bg-white text-indigo-700 shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <UserCheck className="w-3.5 h-3.5" />
          <span>Teacher</span>
        </button>
      </div>

      {error && (
        <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Academic Email
          </label>
          <div className="relative">
            <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@university.edu"
              required
              className="w-full pl-9 pr-3 py-2 text-sm border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 bg-white"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Password
          </label>
          <div className="relative">
            <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="w-full pl-9 pr-3 py-2 text-sm border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 bg-white"
            />
          </div>
        </div>

        <Button
          type="submit"
          variant="primary"
          className="w-full mt-2"
          disabled={loading}
          iconRight={ArrowRight}
        >
          {loading ? 'Authenticating...' : `Sign in as ${role === 'student' ? 'Student' : 'Professor'}`}
        </Button>
      </form>

      {/* Demo Autofill Shortcuts */}
      <div className="mt-6 pt-5 border-t border-slate-100 text-center">
        <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-2">
          Demo Instant Access
        </p>
        <div className="flex items-center justify-center gap-2">
          <button
            type="button"
            onClick={() => handleAutofill('student')}
            className="px-2.5 py-1 text-xs font-medium rounded-lg bg-indigo-50 text-indigo-700 hover:bg-indigo-100 transition-colors border border-indigo-200 cursor-pointer"
          >
            Fill Demo Student
          </button>
          <button
            type="button"
            onClick={() => handleAutofill('teacher')}
            className="px-2.5 py-1 text-xs font-medium rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100 transition-colors border border-emerald-200 cursor-pointer"
          >
            Fill Demo Teacher
          </button>
        </div>
      </div>

      <div className="mt-6 text-center text-xs text-slate-500">
        Don't have an account yet?{' '}
        <Link to="/signup" className="font-semibold text-indigo-600 hover:text-indigo-800">
          Create Account
        </Link>
      </div>
    </div>
  );
}
