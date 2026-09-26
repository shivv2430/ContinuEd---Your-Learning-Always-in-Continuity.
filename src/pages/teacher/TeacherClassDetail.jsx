import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Calendar,
  BookOpen,
  FileText,
  Users,
  Download,
  AlertCircle,
  PlusCircle,
  Edit3,
} from 'lucide-react';
import { classService } from '../../services/classService';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';

export default function TeacherClassDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const classItem = classService.getMissedClassById(id);

  if (!classItem) {
    return (
      <div className="py-16 text-center space-y-4">
        <h2 className="text-xl font-bold text-slate-800">Class Not Found</h2>
        <Link to="/teacher/classes">
          <Button variant="outline">Back to Classes</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-20">
      <div className="flex items-center justify-between">
        <Link
          to="/teacher/classes"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Class List
        </Link>
        <Badge variant="indigo">{classItem.subjectCode}</Badge>
      </div>

      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xs space-y-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
            {classItem.subjectName}
          </span>
          <h1 className="text-2xl font-extrabold text-slate-900 mt-1">{classItem.topic}</h1>
          <p className="text-xs text-slate-500 mt-1">Conducted on {classItem.displayDate}</p>
        </div>

        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
            Description
          </h3>
          <p className="text-sm text-slate-700 leading-relaxed">{classItem.description}</p>
        </div>

        {/* Resources */}
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
            Uploaded Lecture Materials ({classItem.resources?.length || 0})
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {classItem.resources?.map((r) => (
              <div
                key={r.id}
                className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between text-xs"
              >
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-indigo-600" />
                  <span className="font-semibold text-slate-800">{r.title}</span>
                </div>
                <span className="text-slate-400">{r.size}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Missed Students Continuity Roster */}
        <div className="pt-4 border-t border-slate-100 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Students Who Missed This Lecture & Recovery Status
            </h3>
            <span className="text-xs font-semibold text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
              {classItem.studentsMissedCount || 3} Absent
            </span>
          </div>

          <div className="divide-y divide-slate-100 border border-slate-100 rounded-2xl overflow-hidden">
            {classItem.studentsMissedList?.map((s, idx) => (
              <div key={idx} className="p-3.5 flex items-center justify-between bg-white">
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
        </div>
      </div>
    </div>
  );
}
