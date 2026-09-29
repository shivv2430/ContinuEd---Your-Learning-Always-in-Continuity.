import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  AlertCircle,
  Clock,
  Sparkles,
  Calendar,
  CheckCircle2,
  Search,
  ArrowRight,
  Filter,
} from 'lucide-react';
import { classService } from '../../services/classService';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';

export default function StudentMissedClasses() {
  const [filter, setFilter] = useState('all'); // 'all' | 'needs_catchup' | 'in_progress' | 'completed'
  const [search, setSearch] = useState('');

  const missedClasses = classService.getMissedClasses();

  const filtered = missedClasses.filter((item) => {
    if (filter !== 'all' && item.status !== filter) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      return (
        item.topic.toLowerCase().includes(q) ||
        item.subjectName.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const pendingCount = missedClasses.filter((c) => c.status !== 'completed').length;

  return (
    <div className="space-y-6 pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-50 dark:bg-amber-950/70 border border-amber-200 dark:border-amber-800/80 text-amber-800 dark:text-amber-300 text-xs font-semibold mb-1">
            <AlertCircle className="w-3.5 h-3.5" />
            <span>Academic Continuity Recovery Center</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Missed Classes & Catch-Up Center
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Review sessions you couldn't attend in person and complete AI recovery pathways.
          </p>
        </div>

        {pendingCount > 0 && (
          <span className="text-xs font-bold text-amber-800 dark:text-amber-300 bg-amber-100 dark:bg-amber-950/80 border border-amber-200 dark:border-amber-800/80 px-3 py-1.5 rounded-xl flex items-center gap-1.5 self-start sm:self-auto">
            <Clock className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
            {pendingCount} catch-up{pendingCount > 1 ? 's' : ''} awaiting completion
          </span>
        )}
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-800/80 border border-slate-200/60 dark:border-slate-700/80 rounded-xl w-full sm:w-auto overflow-x-auto">
          {[
            { id: 'all', label: 'All Classes' },
            { id: 'needs_catchup', label: 'Needs Catch-Up' },
            { id: 'in_progress', label: 'In Progress' },
            { id: 'completed', label: 'Caught Up' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                filter === tab.id
                  ? 'bg-white dark:bg-slate-900 text-indigo-700 dark:text-indigo-300 shadow-2xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-slate-400 dark:text-slate-500 absolute left-3 top-2.5" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search missed topics..."
            className="w-full pl-9 pr-3 py-2 text-xs border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500"
          />
        </div>
      </div>

      {/* Classes Grid */}
      {filtered.length === 0 ? (
        <div className="p-12 text-center bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-3">
          <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto" />
          <h3 className="text-base font-bold text-slate-800 dark:text-slate-200">No Missed Classes Found</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {search ? `No results match "${search}".` : 'You have no missed classes in this category.'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filtered.map((item) => (
            <div
              key={item.id}
              className={`bg-white dark:bg-slate-900 rounded-3xl p-6 border transition-all space-y-4 ${
                item.status === 'completed'
                  ? 'border-emerald-200 dark:border-emerald-800/80 bg-emerald-50/20 dark:bg-emerald-950/20'
                  : 'border-slate-200/90 dark:border-slate-800 hover:border-indigo-300 dark:hover:border-indigo-500/60 hover:shadow-md'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                  {item.subjectName} • {item.subjectCode}
                </span>
                {item.status === 'completed' ? (
                  <Badge variant="emerald">
                    <CheckCircle2 className="w-3 h-3" /> Fully Caught Up
                  </Badge>
                ) : item.status === 'in_progress' ? (
                  <Badge variant="indigo">In Progress ({item.catchupProgress}%)</Badge>
                ) : (
                  <Badge variant="amber">Needs Catch-Up</Badge>
                )}
              </div>

              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">{item.topic}</h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 line-clamp-2 leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 pt-2 border-t border-slate-100 dark:border-slate-800">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500" />
                  Missed {item.displayDate}
                </span>
                <span className="flex items-center gap-1 font-medium text-slate-700 dark:text-slate-300">
                  <Clock className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500" />
                  ~{item.estimatedMinutes} mins recovery
                </span>
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-3">
                <Link
                  to={`/student/class/${item.id}`}
                  className="text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                >
                  What You Missed
                </Link>

                <Link to={`/student/catch-up/${item.id}`}>
                  <Button
                    variant={item.status === 'completed' ? 'secondary' : 'ai'}
                    size="sm"
                    icon={Sparkles}
                  >
                    {item.status === 'completed' ? 'Review Plan' : 'Catch Me Up'}
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
