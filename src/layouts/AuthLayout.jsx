import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { BookOpenCheck, Sparkles, ShieldCheck } from 'lucide-react';

export default function AuthLayout() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background soft ambient glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-gradient-to-b from-indigo-100/60 to-transparent blur-3xl pointer-events-none -z-10" />

      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <Link to="/" className="inline-flex items-center gap-2.5 group">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-indigo-600 to-indigo-700 flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
            <BookOpenCheck className="w-6 h-6" />
          </div>
          <span className="text-2xl font-extrabold tracking-tight text-slate-900">
            Continu<span className="text-indigo-600">Ed</span>
          </span>
        </Link>
        <p className="mt-2 text-sm text-slate-600 font-medium">
          "Your Learning, Always in Continuity."
        </p>
        <p className="text-xs text-slate-400 mt-0.5">Life happens. Learning continues.</p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4">
        <div className="bg-white py-8 px-6 shadow-xl shadow-slate-200/50 rounded-3xl border border-slate-200/80 sm:px-10">
          <Outlet />
        </div>

        <div className="mt-6 text-center text-xs text-slate-400 flex items-center justify-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-500" />
          <span>Academic Continuity Platform • Supabase & Nebius AI Ready</span>
        </div>
      </div>
    </div>
  );
}
