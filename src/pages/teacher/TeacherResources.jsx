import React, { useState } from 'react';
import { FolderOpen, FileText, Download, Upload, Search, Trash2 } from 'lucide-react';
import { classService } from '../../services/classService';
import Button from '../../components/common/Button';

export default function TeacherResources() {
  const classes = classService.getMissedClasses();
  const [search, setSearch] = useState('');

  // Collect all resources across classes
  const allResources = [];
  classes.forEach((c) => {
    c.resources?.forEach((r) => {
      allResources.push({
        ...r,
        subject: c.subjectName,
        topic: c.topic,
        date: c.displayDate,
      });
    });
  });

  const filtered = allResources.filter((r) =>
    r.title.toLowerCase().includes(search.toLowerCase()) ||
    r.subject.toLowerCase().includes(search.toLowerCase()) ||
    r.topic.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 pb-20">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Course Resources Repository
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Syllabus slides, lecture handouts, and reference materials stored in Supabase Storage.
          </p>
        </div>
      </div>

      <div className="max-w-md">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Filter resources by name or topic..."
          className="w-full px-3.5 py-2 text-xs border border-slate-200 rounded-xl bg-white"
        />
      </div>

      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xs divide-y divide-slate-100 overflow-hidden">
        {filtered.map((res, i) => (
          <div key={i} className="p-4 flex items-center justify-between hover:bg-slate-50/70">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-xl">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-slate-900">{res.title}</h4>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  {res.subject} • {res.topic} • {res.size}
                </p>
              </div>
            </div>

            <button
              onClick={() => alert(`Downloading: ${res.title}`)}
              className="p-2 rounded-xl text-slate-400 hover:text-indigo-600 hover:bg-slate-100 transition-colors cursor-pointer"
              title="Download file"
            >
              <Download className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
