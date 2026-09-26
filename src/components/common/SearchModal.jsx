import React, { useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, BookOpen, FileText, ArrowRight, CornerDownLeft } from 'lucide-react';
import { useSearch } from '../../context/SearchContext';

export default function SearchModal() {
  const { isOpen, setIsOpen, query, setQuery, results } = useSearch();
  const inputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSelect = (link) => {
    setIsOpen(false);
    setQuery('');
    navigate(link);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4">
      <div
        className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs transition-opacity"
        onClick={() => setIsOpen(false)}
      />

      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden z-10 flex flex-col max-h-[75vh]">
        {/* Search Input Bar */}
        <div className="p-4 border-b border-slate-100 flex items-center gap-3">
          <Search className="w-5 h-5 text-slate-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search subjects, missed classes, topics, assignments..."
            className="w-full text-base outline-none placeholder:text-slate-400 text-slate-800 bg-transparent"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 rounded-md text-slate-400 hover:text-slate-600"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <kbd className="hidden sm:inline-block px-2 py-0.5 text-xs text-slate-400 bg-slate-100 rounded border border-slate-200">
            ESC
          </kbd>
        </div>

        {/* Results List */}
        <div className="p-2 overflow-y-auto divide-y divide-slate-50 flex-1">
          {query.trim() === '' ? (
            <div className="p-8 text-center text-slate-400">
              <Search className="w-8 h-8 mx-auto mb-2 opacity-40" />
              <p className="text-sm font-medium">Type to search anything across ContinuEd</p>
              <p className="text-xs text-slate-400 mt-1">Try "Linked Lists", "Digital Electronics", "Assignment", or "Math"</p>
            </div>
          ) : results.length === 0 ? (
            <div className="p-8 text-center text-slate-400">
              <p className="text-sm">No matching subjects, classes, or assignments found for "{query}".</p>
            </div>
          ) : (
            results.map((item, index) => (
              <div
                key={index}
                onClick={() => handleSelect(item.link)}
                className="p-3 rounded-xl hover:bg-indigo-50/60 cursor-pointer flex items-center justify-between group transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-slate-100 rounded-lg group-hover:bg-indigo-100 group-hover:text-indigo-600 transition-colors">
                    <BookOpen className="w-4 h-4 text-slate-600 group-hover:text-indigo-600" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-slate-800 group-hover:text-indigo-700">
                        {item.title}
                      </span>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${item.tagColor}`}>
                        {item.tag}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5">{item.subtitle}</p>
                  </div>
                </div>
                <div className="flex items-center text-slate-400 group-hover:text-indigo-600 transition-colors">
                  <span className="text-xs mr-1 opacity-0 group-hover:opacity-100 font-medium">Jump to</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="px-4 py-2.5 bg-slate-50 border-t border-slate-100 text-[11px] text-slate-400 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 bg-white border border-slate-200 rounded">↵</kbd> select
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 bg-white border border-slate-200 rounded">esc</kbd> close
            </span>
          </div>
          <span>ContinuEd Continuity Search</span>
        </div>
      </div>
    </div>
  );
}
