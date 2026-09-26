import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  BookOpen,
  Users,
  PlusCircle,
  FileCheck2,
  TrendingUp,
  Clock,
  Sparkles,
  Calendar,
  AlertCircle,
  ArrowRight,
  ExternalLink,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { classService } from '../../services/classService';
import StatCard from '../../components/common/StatCard';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import Modal from '../../components/common/Modal';

export default function TeacherDashboard() {
  const { user } = useAuth();
  const classes = classService.getMissedClasses();

  const [selectedClassForAttendance, setSelectedClassForAttendance] = useState(null);

  return (
    <div className="space-y-8 pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Welcome back, Professor {user?.name?.split(' ')[1] || 'Vance'}.
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Department of Computer Science & Engineering • Academic Continuity Control Center
          </p>
        </div>

        <Link to="/teacher/classes/new">
          <Button variant="primary" size="md" icon={PlusCircle}>
            + Add Class Update
          </Button>
        </Link>
      </div>

      {/* 4 Dashboard Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Classes"
          value="24"
          subtitle="Spring Semester 2026"
          icon={BookOpen}
          color="indigo"
        />
        <StatCard
          title="Students Enrolled"
          value="142"
          subtitle="Across 4 sections"
          icon={Users}
          color="teal"
        />
        <StatCard
          title="Recent Updates"
          value="3"
          subtitle="Published this week"
          icon={Sparkles}
          color="purple"
          trend="Active"
        />
        <StatCard
          title="Pending Assignments"
          value="5"
          subtitle="Awaiting grade reviews"
          icon={FileCheck2}
          color="rose"
        />
      </div>

      {/* Main Section: Recent Class Updates & Student Recovery Status */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100">
          <div>
            <h2 className="text-base font-bold text-slate-900">Recent Lecture Sessions & Continuity</h2>
            <p className="text-xs text-slate-500">
              Students who missed these classes receive automatic AI recovery plans
            </p>
          </div>
          <Link
            to="/teacher/classes"
            className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
          >
            Manage all classes <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="divide-y divide-slate-100">
          {classes.map((cls) => (
            <div
              key={cls.id}
              className="py-4.5 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-slate-50/70 p-3 rounded-2xl transition-colors"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200">
                    {cls.subjectCode}
                  </span>
                  <span className="text-xs text-slate-400">• {cls.displayDate}</span>
                </div>
                <h3 className="text-base font-bold text-slate-900">{cls.topic}</h3>
                <p className="text-xs text-slate-500 line-clamp-1 max-w-xl">
                  {cls.description}
                </p>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <button
                  type="button"
                  onClick={() => setSelectedClassForAttendance(cls)}
                  className="px-3 py-1.5 rounded-xl border border-amber-200 bg-amber-50 hover:bg-amber-100 text-amber-800 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
                  <span>{cls.studentsMissedCount || 3} Students Missed</span>
                </button>

                <Link to={`/teacher/classes/${cls.id}`}>
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Attendance Modal */}
      <Modal
        isOpen={Boolean(selectedClassForAttendance)}
        onClose={() => setSelectedClassForAttendance(null)}
        title="Students Who Missed This Lecture"
        subtitle={`${selectedClassForAttendance?.subjectName} — ${selectedClassForAttendance?.topic}`}
      >
        <div className="space-y-4">
          <p className="text-xs text-slate-500">
            These students automatically received ContinuEd AI Catch-Up Plans and notifications.
          </p>

          <div className="divide-y divide-slate-100">
            {selectedClassForAttendance?.studentsMissedList?.map((std, i) => (
              <div key={i} className="py-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={std.avatar}
                    alt={std.name}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">{std.name}</h4>
                    <p className="text-[11px] text-slate-400">{std.email}</p>
                  </div>
                </div>
                <Badge
                  variant={
                    std.catchupStatus === 'Completed'
                      ? 'emerald'
                      : std.catchupStatus === 'In progress'
                      ? 'indigo'
                      : 'amber'
                  }
                >
                  {std.catchupStatus}
                </Badge>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-slate-100 flex justify-end">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setSelectedClassForAttendance(null)}
            >
              Close
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
