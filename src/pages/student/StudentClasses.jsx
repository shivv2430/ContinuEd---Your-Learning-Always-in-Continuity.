import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Calendar, MapPin, User, ArrowRight, CheckCircle2, AlertCircle } from 'lucide-react';
import { classService } from '../../services/classService';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';

export default function StudentClasses() {
  const subjects = classService.getSubjects();

  return (
    <div className="space-y-6 pb-16">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            My Enrolled Courses
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Active semester registrations, room allocations, and attendance breakdown.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {subjects.map((subj) => (
          <div
            key={subj.id}
            className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs hover:border-indigo-300 transition-all space-y-4"
          >
            <div className="flex items-start justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md border border-indigo-200">
                  {subj.code}
                </span>
                <h2 className="text-xl font-bold text-slate-900 mt-1">{subj.name}</h2>
              </div>
              <Badge variant={subj.missed > 0 ? 'amber' : 'emerald'}>
                {subj.missed > 0 ? `${subj.missed} Missed` : 'Perfect Attendance'}
              </Badge>
            </div>

            <div className="space-y-2 text-xs text-slate-600">
              <div className="flex items-center gap-2">
                <User className="w-3.5 h-3.5 text-slate-400" />
                <span>Instructor: {subj.instructor}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                <span>Schedule: {subj.schedule}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                <span>Location: {subj.room}</span>
              </div>
            </div>

            {/* Attendance & Syllabus meter */}
            <div className="pt-3 border-t border-slate-100">
              <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                <span>Syllabus Completion</span>
                <span>{subj.progress}%</span>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-indigo-600 rounded-full"
                  style={{ width: `${subj.progress}%` }}
                />
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between">
              <span className="text-xs text-slate-400">
                {subj.attended} of {subj.totalLectures} lectures attended
              </span>
              <Link to="/student/missed">
                <Button variant="outline" size="sm" iconRight={ArrowRight}>
                  View Missed Lectures
                </Button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
