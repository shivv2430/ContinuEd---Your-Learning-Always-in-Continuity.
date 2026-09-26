import React from 'react';

const BADGE_STYLES = {
  default: 'bg-slate-100 text-slate-700 border-slate-200',
  indigo: 'bg-indigo-50 text-indigo-700 border-indigo-200',
  emerald: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  amber: 'bg-amber-50 text-amber-800 border-amber-200',
  rose: 'bg-rose-50 text-rose-700 border-rose-200',
  teal: 'bg-teal-50 text-teal-700 border-teal-200',
  purple: 'bg-purple-50 text-purple-700 border-purple-200',
  ai: 'bg-gradient-to-r from-indigo-50 to-purple-50 text-indigo-700 border-indigo-200 font-semibold shadow-xs',
};

export default function Badge({ children, variant = 'default', size = 'sm', className = '' }) {
  const sizeClasses = size === 'xs' ? 'px-2 py-0.5 text-xs' : 'px-2.5 py-1 text-xs';
  const style = BADGE_STYLES[variant] || BADGE_STYLES.default;

  return (
    <span className={`inline-flex items-center gap-1.5 font-medium rounded-full border ${sizeClasses} ${style} ${className}`}>
      {children}
    </span>
  );
}
