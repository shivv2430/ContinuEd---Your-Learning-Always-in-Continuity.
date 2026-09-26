import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  AlertCircle,
  Clock,
  Sparkles,
  ArrowRight,
  Calendar,
  CheckCircle2,
  FileText,
  TrendingUp,
  BookOpen,
  ChevronRight,
  Flame,
  Award,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { classService } from '../../services/classService';
import { assignmentService } from '../../services/assignmentService';
import StatCard from '../../components/common/StatCard';
import Badge from '../../components/common/Badge';
import Button from '../../components/common/Button';

export default function StudentDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const missedClasses = classService.getMissedClasses();
  const upcomingClasses = classService.getUpcomingClasses();
  const assignments = assignmentService.getAssignments();

  const missedCount = missedClasses.length;
  const pendingCatchups = missedClasses.filter((c) => c.status !== 'completed').length;
  const completedCatchups = missedClasses.filter((c) => c.status === 'completed').length;
  const pendingAssignmentsCount = assignments.filter((a) => a.status !== 'submitted').length;

  // Overall recovery rate
  const recoveryRate = missedCount > 0 ? Math.round((completedCatchups / missedCount) * 100) : 100;

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Good morning, {user?.name || 'Alex'} 👋
          </h1>
          <p className="text-sm text-slate-600 mt-1">
            Let's get you back on track. Academic continuity in active session.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link to="/student/missed">
            <Button variant="ai" size="sm" icon={Sparkles}>
              Start Catch-Up ({pendingCatchups} pending)
            </Button>
          </Link>
        </div>
      </div>

      {/* 4 Dashboard Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Classes Missed"
          value={missedCount}
          subtitle="Recent 14 days"
          icon={AlertCircle}
          color="amber"
        />
        <StatCard
          title="Catch-ups Pending"
          value={pendingCatchups}
          subtitle="AI recovery plans ready"
          icon={Clock}
          color="rose"
        />
        <StatCard
          title="Assignments Due"
          value={pendingAssignmentsCount}
          subtitle="Upcoming deadlines"
          icon={FileText}
          color="indigo"
        />
        <StatCard
          title="Learning Progress"
          value={`${recoveryRate}%`}
          subtitle={`${completedCatchups} of ${missedCount} recovered`}
          icon={TrendingUp}
          color="emerald"
          trend="+12% this week"
        />
      </div>

      {/* Main Section: Classes You Missed */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold text-slate-900">Classes You Missed</h2>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800">
              Needs Attention
            </span>
          </div>
          <Link
            to="/student/missed"
            className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
          >
            View all missed classes <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {missedClasses.map((item) => (
            <div
              key={item.id}
              className={`rounded-2xl border p-5 transition-all relative overflow-hidden bg-white ${
                item.status === 'completed'
                  ? 'border-emerald-200 bg-emerald-50/20'
                  : 'border-slate-200/90 hover:border-indigo-300 hover:shadow-md'
              }`}
            >
              {/* Top Meta */}
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  {item.subjectName} • {item.subjectCode}
                </span>
                {item.status === 'completed' ? (
                  <Badge variant="emerald">
                    <CheckCircle2 className="w-3 h-3" /> Caught Up
                  </Badge>
                ) : item.status === 'in_progress' ? (
                  <Badge variant="indigo">In Progress ({item.catchupProgress}%)</Badge>
                ) : (
                  <Badge variant="amber">Needs Catch-Up</Badge>
                )}
              </div>

              {/* Topic & Description */}
              <div className="mt-3">
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-indigo-600">
                  {item.topic}
                </h3>
                <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                  {item.description}
                </p>
              </div>

              {/* Date & Recovery Time */}
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  Missed: {item.displayDate}
                </span>
                <span className="flex items-center gap-1.5 font-medium text-slate-700">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  ~{item.estimatedMinutes} mins
                </span>
              </div>

              {/* Action Buttons */}
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
                <Link
                  to={`/student/class/${item.id}`}
                  className="text-xs font-semibold text-slate-600 hover:text-slate-900 flex items-center gap-1"
                >
                  View What You Missed
                </Link>

                {item.status === 'completed' ? (
                  <Link to={`/student/catch-up/${item.id}`}>
                    <Button variant="secondary" size="sm">
                      Review Plan
                    </Button>
                  </Link>
                ) : (
                  <Link to={`/student/catch-up/${item.id}`}>
                    <Button variant="ai" size="sm" icon={Sparkles}>
                      Catch Me Up
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Two Column Section: Upcoming Classes & Pending Assignments */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Upcoming Classes */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-indigo-600" />
              <h3 className="font-bold text-slate-900 text-sm">Upcoming Classes</h3>
            </div>
            <span className="text-xs text-slate-400 font-medium">Next 48 Hours</span>
          </div>

          <div className="space-y-3">
            {upcomingClasses.map((item) => (
              <div
                key={item.id}
                className="p-3.5 rounded-xl border border-slate-100 bg-slate-50/50 hover:bg-slate-50 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-700">{item.subject}</span>
                  <span className="text-xs font-medium text-indigo-600">{item.time}</span>
                </div>
                <h4 className="text-sm font-bold text-slate-900 mt-1">{item.topic}</h4>
                <div className="mt-2 text-xs text-slate-500 flex items-center justify-between">
                  <span>{item.room} • {item.instructor}</span>
                </div>
                {item.prerequisiteNote && (
                  <div className="mt-2 pt-2 border-t border-slate-200/60 text-[11px] text-amber-700 flex items-center gap-1.5 font-medium">
                    <AlertCircle className="w-3 h-3 text-amber-500 shrink-0" />
                    <span>{item.prerequisiteNote}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Pending Assignments */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-indigo-600" />
              <h3 className="font-bold text-slate-900 text-sm">Pending Assignments</h3>
            </div>
            <span className="text-xs text-slate-400 font-medium">{pendingAssignmentsCount} Active</span>
          </div>

          <div className="space-y-3">
            {assignments.map((item) => (
              <div
                key={item.id}
                className="p-3.5 rounded-xl border border-slate-100 bg-slate-50/50 hover:bg-slate-50 transition-colors flex items-center justify-between gap-3"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-medium text-slate-500">{item.subject}</span>
                    {item.status === 'urgent' && (
                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-rose-100 text-rose-700">
                        Urgent
                      </span>
                    )}
                    {item.status === 'submitted' && (
                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-700">
                        Submitted
                      </span>
                    )}
                  </div>
                  <h4 className="text-sm font-semibold text-slate-900 mt-0.5">{item.title}</h4>
                  <p className="text-xs text-slate-400 mt-1">Due {item.dueDate} • {item.points} Points</p>
                </div>

                {item.status !== 'submitted' ? (
                  <Link to="/student/classes">
                    <Button variant="outline" size="sm">
                      Submit
                    </Button>
                  </Link>
                ) : (
                  <span className="text-xs text-emerald-600 font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4" /> Done
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Continuity Progress Bar Banner */}
      <div className="bg-gradient-to-r from-indigo-900 via-indigo-800 to-purple-900 rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden shadow-lg">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-xs text-xs font-semibold text-indigo-200 mb-3 border border-white/10">
            <Award className="w-3.5 h-3.5 text-amber-300" />
            <span>Academic Continuity Streak</span>
          </div>
          <h3 className="text-2xl font-extrabold tracking-tight">
            You've recovered 2 of 3 missed lectures this month!
          </h3>
          <p className="text-sm text-indigo-200 mt-2 leading-relaxed">
            Stay ahead of the curve. Complete your Linked Lists AI Catch-Up Plan to achieve 100% lecture continuity.
          </p>

          <div className="mt-5 flex items-center gap-4">
            <Link to="/student/catch-up/missed_ds_01">
              <Button variant="secondary" size="md" className="bg-white text-indigo-900 hover:bg-slate-100 font-bold">
                Finish Linked Lists Recovery
              </Button>
            </Link>
            <Link to="/student/progress" className="text-xs font-semibold text-white/90 hover:text-white underline">
              View Detailed Progress
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
