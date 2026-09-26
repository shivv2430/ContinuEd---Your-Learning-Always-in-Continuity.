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
    <div className="space-y-6 pb-20">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Manage Class Lectures
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Edit sessions, manage syllabus materials, and audit student continuity recovery.
          </p>
        </div>

        <Link to="/teacher/classes/new">
          <Button variant="primary" size="sm" icon={PlusCircle}>
            + Add New Class
          </Button>
        </Link>
      </div>

      {/* Search Input */}
      <div className="max-w-md">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Filter classes by topic or code..."
          className="w-full px-3.5 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 bg-white"
        />
      </div>

      {/* Class Management List */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xs divide-y divide-slate-100 overflow-hidden">
        {filtered.map((cls) => (
          <div key={cls.id} className="p-5 hover:bg-slate-50/60 transition-colors">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div className="space-y-1 max-w-2xl">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200">
                    {cls.subjectCode}
                  </span>
                  <span className="text-xs text-slate-500 font-medium">
                    {cls.subjectName} • {cls.displayDate}
                  </span>
                </div>

                <h3 className="text-base font-bold text-slate-900">{cls.topic}</h3>
                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                  {cls.description}
                </p>

                <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 pt-1">
                  <span>{cls.resources?.length || 0} Files Attached</span>
                  <span>•</span>
                  <span>{cls.assignment ? '1 Assignment Given' : 'No Assignment'}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => setSelectedClassForStudents(cls)}
                  className="px-3 py-1.5 rounded-xl border border-amber-200 bg-amber-50 hover:bg-amber-100 text-amber-800 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Users className="w-3.5 h-3.5 text-amber-600" />
                  <span>{cls.studentsMissedCount || 3} Missed Students</span>
                </button>

                <button
                  type="button"
                  onClick={() => setEditModalClass(cls)}
                  className="p-2 rounded-xl text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 transition-colors cursor-pointer"
                  title="Edit Class"
                >
                  <Edit3 className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={() => handleDelete(cls.id)}
                  className="p-2 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                  title="Delete Class"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

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
