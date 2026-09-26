import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  BookOpen,
  PlusCircle,
  Trash2,
  Edit3,
  Users,
  AlertCircle,
  FileText,
  FilePlus,
  Calendar,
  Search,
  ExternalLink,
} from 'lucide-react';
import { classService } from '../../services/classService';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import Modal from '../../components/common/Modal';

export default function TeacherClasses() {
  const [classes, setClasses] = useState(() => classService.getMissedClasses());
  const [subjects] = useState(() => classService.getSubjects());
  const [selectedClassForStudents, setSelectedClassForStudents] = useState(null);
  const [editModalClass, setEditModalClass] = useState(null);
  const [search, setSearch] = useState('');

  const handleDelete = (id) => {
    if (confirm('Are you sure you want to remove this lecture record?')) {
      classService.deleteClass(id);
      setClasses(classService.getMissedClasses());
    }
  };

  const handleSaveEdit = (e) => {
    e.preventDefault();
    // Update local state
    setClasses((prev) =>
      prev.map((c) => (c.id === editModalClass.id ? { ...c, ...editModalClass } : c))
    );
    setEditModalClass(null);
  };

  const filtered = classes.filter((c) => {
    if (!search.trim()) return true;
    const q = search.toLowerCase();
    return (
      c.topic.toLowerCase().includes(q) ||
      c.subjectName.toLowerCase().includes(q) ||
      c.description.toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-8 pb-20">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Manage Courses & Lectures
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Audit uploaded materials, syllabus topics, and monitor students who missed sessions.
          </p>
        </div>

        <Link to="/teacher/classes/new">
          <Button variant="primary" size="sm" icon={PlusCircle}>
            + Add New Class
          </Button>
        </Link>
      </div>

      {/* SECTION 1: COURSES TAUGHT - CLICK TO CHECK SUBJECT DETAIL & UPLOADS */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">Courses Taught</h2>
            <span className="text-xs px-2 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 font-semibold border border-indigo-200 dark:border-indigo-800">
              Click any subject to check details & uploads
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {subjects.map((subj) => {
            const uploadCount = (subj.topics || []).reduce(
              (acc, t) => acc + (t.teacherUploaded?.resources?.length || 0),
              0
            );
            const absentCount = (subj.topics || []).reduce(
              (acc, t) => acc + (t.teacherAudit?.studentsAbsentCount || 0),
              0
            );

            return (
              <Link
                key={subj.id}
                to={`/teacher/subject/${subj.id}`}
                className="bg-white dark:bg-slate-900 p-5 rounded-3xl border border-slate-200/90 dark:border-slate-800 shadow-xs hover:border-indigo-400 dark:hover:border-indigo-600 hover:shadow-md transition-all group flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 px-2 py-0.5 rounded border border-indigo-200 dark:border-indigo-800">
                      {subj.code}
                    </span>
                    <span className="text-[11px] text-slate-400 font-medium">
                      {subj.schedule.split('•')[0]}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                      {subj.name}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                      {subj.description}
                    </p>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 space-y-2">
                  <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                    <span className="flex items-center gap-1">
                      <FileText className="w-3.5 h-3.5 text-indigo-500" />
                      <strong>{uploadCount}</strong> Uploads
                    </span>
                    <span className="flex items-center gap-1 text-amber-600 dark:text-amber-400 font-semibold">
                      <Users className="w-3.5 h-3.5" />
                      {absentCount} Missed
                    </span>
                  </div>

                  <div className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 flex items-center justify-between pt-1">
                    <span>Check Subject Detail</span>
                    <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* SECTION 2: CLASS LECTURES MANAGEMENT */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">All Class Lectures</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Recent sessions, attached syllabus slides, and student recovery tracking
            </p>
          </div>

          <div className="max-w-xs w-full">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Filter lectures by topic or code..."
              className="w-full px-3.5 py-2 text-xs border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 placeholder:text-slate-400"
            />
          </div>
        </div>

        {/* Class Management List */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 shadow-xs divide-y divide-slate-100 dark:divide-slate-800 overflow-hidden">
          {filtered.map((cls) => (
            <div key={cls.id} className="p-5 hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition-colors">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="space-y-1 max-w-2xl">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-indigo-700 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/70 px-2 py-0.5 rounded border border-indigo-200 dark:border-indigo-800">
                      {cls.subjectCode}
                    </span>
                    <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                      {cls.subjectName} • {cls.displayDate}
                    </span>
                  </div>

                  <Link to={`/teacher/classes/${cls.id}`} className="block">
                    <h3 className="text-base font-bold text-slate-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                      {cls.topic}
                    </h3>
                  </Link>
                  <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed">
                    {cls.description}
                  </p>

                  <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 dark:text-slate-400 pt-1">
                    <span>{cls.resources?.length || 0} Files Attached</span>
                    <span>•</span>
                    <span>{cls.assignment ? '1 Assignment Given' : 'No Assignment'}</span>
                    <span>•</span>
                    <Link
                      to={`/teacher/subject/${cls.subjectId}`}
                      className="text-indigo-600 dark:text-indigo-400 hover:underline font-semibold"
                    >
                      View Subject Details →
                    </Link>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-wrap items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={() => setSelectedClassForStudents(cls)}
                    className="px-3 py-1.5 rounded-xl border border-amber-200 dark:border-amber-800/80 bg-amber-50 dark:bg-amber-950/60 hover:bg-amber-100 dark:hover:bg-amber-900/60 text-amber-800 dark:text-amber-300 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Users className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                    <span>{cls.studentsMissedCount || 3} Missed Students</span>
                  </button>

                  <Link to={`/teacher/classes/${cls.id}`}>
                    <Button variant="outline" size="sm">
                      Details
                    </Button>
                  </Link>

                  <button
                    type="button"
                    onClick={() => setEditModalClass(cls)}
                    className="p-2 rounded-xl text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950 transition-colors cursor-pointer"
                    title="Edit Class"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDelete(cls.id)}
                    className="p-2 rounded-xl text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950 transition-colors cursor-pointer"
                    title="Delete Class"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Missed Students Modal */}
      <Modal
        isOpen={Boolean(selectedClassForStudents)}
        onClose={() => setSelectedClassForStudents(null)}
        title="Students Who Missed This Class"
        subtitle={`${selectedClassForStudents?.subjectName} — ${selectedClassForStudents?.topic}`}
      >
        <div className="space-y-4">
          <p className="text-xs text-slate-500">
            ContinuEd sent personalized catch-up plans to these students immediately after attendance was finalized.
          </p>

          <div className="divide-y divide-slate-100">
            {selectedClassForStudents?.studentsMissedList?.map((s, idx) => (
              <div key={idx} className="py-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={s.avatar}
                    alt={s.name}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">{s.name}</h4>
                    <p className="text-[11px] text-slate-400">{s.email}</p>
                  </div>
                </div>

                <Badge
                  variant={
                    s.catchupStatus === 'Completed'
                      ? 'emerald'
                      : s.catchupStatus === 'In progress'
                      ? 'indigo'
                      : 'amber'
                  }
                >
                  {s.catchupStatus}
                </Badge>
              </div>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-100 flex justify-end">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setSelectedClassForStudents(null)}
            >
              Close
            </Button>
          </div>
        </div>
      </Modal>

      {/* Edit Class Modal */}
      <Modal
        isOpen={Boolean(editModalClass)}
        onClose={() => setEditModalClass(null)}
        title="Edit Class Details"
        subtitle={editModalClass?.topic}
      >
        {editModalClass && (
          <form onSubmit={handleSaveEdit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Topic
              </label>
              <input
                type="text"
                value={editModalClass.topic}
                onChange={(e) =>
                  setEditModalClass({ ...editModalClass, topic: e.target.value })
                }
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Description
              </label>
              <textarea
                rows={3}
                value={editModalClass.description}
                onChange={(e) =>
                  setEditModalClass({ ...editModalClass, description: e.target.value })
                }
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Teacher Notes
              </label>
              <textarea
                rows={2}
                value={editModalClass.notes || ''}
                onChange={(e) =>
                  setEditModalClass({ ...editModalClass, notes: e.target.value })
                }
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl"
              />
            </div>

            <div className="pt-3 border-t border-slate-100 flex justify-end gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setEditModalClass(null)}
              >
                Cancel
              </Button>
              <Button type="submit" variant="primary" size="sm">
                Save Changes
              </Button>
            </div>
          </form>
        )}
      </Modal>
    </div>
  );
}
