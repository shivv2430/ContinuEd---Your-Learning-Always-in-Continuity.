import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Calendar, MapPin, User, ArrowRight, CheckCircle2, AlertCircle, FileText, Sparkles } from 'lucide-react';
import { classService } from '../../services/classService';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';

export default function StudentClasses() {
  const subjects = classService.getSubjects();

  return (
    <div className="space-y-6 pb-16">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            My Enrolled Courses
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Active semester registrations, room allocations, syllabus topics, and continuity details.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {subjects.map((subj) => {
          const missedTopicCount = (subj.topics || []).filter((t) => t.studentMissed).length;
          const uploadCount = (subj.topics || []).reduce((acc, t) => acc + (t.teacherUploaded?.resources?.length || 0), 0);

          return (
            <div
              key={subj.id}
              className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/90 dark:border-slate-800 shadow-xs hover:border-indigo-400 dark:hover:border-indigo-600 transition-all space-y-4 group relative"
            >
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 px-2 py-0.5 rounded-md border border-indigo-200 dark:border-indigo-800/80">
                    {subj.code}
                  </span>
                  <Link to={`/student/subject/${subj.id}`} className="block">
                    <h2 className="text-xl font-bold text-slate-900 dark:text-white mt-1 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                      {subj.name}
                    </h2>
                  </Link>
                </div>
                <Badge variant={subj.missed > 0 ? 'amber' : 'emerald'}>
                  {subj.missed > 0 ? `${subj.missed} Missed` : 'Perfect Attendance'}
                </Badge>
              </div>

              <div className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
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

              {/* Highlights badge bar */}
              <div className="flex flex-wrap items-center gap-2 pt-1 text-[11px]">
                <span className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 flex items-center gap-1 font-medium">
                  <BookOpen className="w-3 h-3 text-indigo-500" /> {subj.topics?.length || 0} Topics
                </span>
                <span className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 flex items-center gap-1 font-medium">
                  <FileText className="w-3 h-3 text-indigo-500" /> {uploadCount} Uploads
                </span>
                {missedTopicCount > 0 && (
                  <span className="px-2 py-0.5 rounded-md bg-amber-50 dark:bg-amber-950/50 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800 flex items-center gap-1 font-semibold">
                    <AlertCircle className="w-3 h-3 text-amber-500" /> {missedTopicCount} Missed Lecture
                  </span>
                )}
              </div>

              {/* Attendance & Syllabus meter */}
              <div className="pt-3 border-t border-slate-100 dark:border-slate-800">
                <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  <span>Syllabus Completion</span>
                  <span>{subj.progress}%</span>
                </div>
                <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-indigo-600 dark:bg-indigo-500 rounded-full"
                    style={{ width: `${subj.progress}%` }}
                  />
                </div>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <span className="text-xs text-slate-400">
                  {subj.attended} of {subj.totalLectures} lectures attended
                </span>
                <Link to={`/student/subject/${subj.id}`}>
                  <Button variant="primary" size="sm" iconRight={ArrowRight}>
                    View Subject Details & Topics
                  </Button>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
