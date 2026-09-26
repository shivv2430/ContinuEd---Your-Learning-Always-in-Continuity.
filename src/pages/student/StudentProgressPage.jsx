import React from 'react';
import { Link } from 'react-router-dom';
import {
  TrendingUp,
  CheckCircle2,
  AlertCircle,
  Clock,
  Award,
  BookOpen,
  ArrowRight,
  Flame,
  Zap,
  Target,
  BarChart3,
} from 'lucide-react';
import { classService } from '../../services/classService';
import StatCard from '../../components/common/StatCard';
import Badge from '../../components/common/Badge';
import Button from '../../components/common/Button';

export default function StudentProgressPage() {
  const subjects = classService.getSubjects();
  const missedClasses = classService.getMissedClasses();

  const totalClasses = 15; // 12 attended + 3 missed
  const completedClasses = 12;
  const missedCount = missedClasses.length;
  const pendingCatchups = missedClasses.filter((c) => c.status !== 'completed').length;
  const recoveredCount = missedClasses.filter((c) => c.status === 'completed').length;

  const recoveryRate = Math.round((recoveredCount / missedCount) * 100);

  const achievements = [
    {
      id: 1,
      title: 'Continuity Champion',
      desc: '🎯 Caught up with 3 missed classes this week',
      date: '2 days ago',
      icon: '🎯',
      badge: 'Unlocked',
    },
    {
      id: 2,
      title: 'Pointer Master',
      desc: 'Certified 100% on Data Structures Linked Lists Quiz',
      date: 'Yesterday',
      icon: '🧠',
      badge: 'Mastery',
    },
    {
      id: 3,
      title: 'Zero Academic Debt',
      desc: 'Maintained 85%+ syllabus continuity across all 4 courses',
      date: 'Active Streak',
      icon: '⚡',
      badge: 'Active',
    },
  ];

  return (
    <div className="space-y-8 pb-16">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Learning & Continuity Progress
        </h1>
        <p className="text-sm text-slate-600 mt-1">
          Detailed metrics tracking your recovery velocity, course attendance, and syllabus mastery.
        </p>
      </div>

      {/* Main Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Overall Attendance"
          value="88%"
          subtitle="Semester average"
          icon={TrendingUp}
          color="indigo"
          trend="+4% from catch-ups"
        />
        <StatCard
          title="Lectures Attended"
          value="12"
          subtitle="On schedule in person"
          icon={CheckCircle2}
          color="emerald"
        />
        <StatCard
          title="Classes Missed"
          value={`${missedCount}`}
          subtitle="Tracked in recovery center"
          icon={AlertCircle}
          color="amber"
        />
        <StatCard
          title="Catch-Ups Pending"
          value={`${pendingCatchups}`}
          subtitle="AI recovery plans ready"
          icon={Clock}
          color="rose"
        />
      </div>

      {/* Catch-Up Completion Chart & Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xs space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-slate-900">Catch-Up Recovery Velocity</h2>
              <p className="text-xs text-slate-500">Weekly resolution of missed learning</p>
            </div>
            <Badge variant="emerald">
              <Zap className="w-3 h-3" /> High Velocity
            </Badge>
          </div>

          {/* Visual Weekly Resolution Bars */}
          <div className="space-y-4 pt-2">
            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span className="text-slate-700">Week 1 (Sep 1 - Sep 7)</span>
                <span className="text-emerald-600 font-bold">100% Recovered (2/2)</span>
              </div>
              <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 rounded-full" style={{ width: '100%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span className="text-slate-700">Week 2 (Sep 8 - Sep 14)</span>
                <span className="text-emerald-600 font-bold">100% Recovered (1/1)</span>
              </div>
              <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 rounded-full" style={{ width: '100%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span className="text-slate-700">Week 3 (Sep 15 - Sep 21)</span>
                <span className="text-indigo-600 font-bold">No Missed Sessions</span>
              </div>
              <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-indigo-500 rounded-full" style={{ width: '100%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span className="text-slate-700">Week 4 (Current: Sep 22 - Sep 28)</span>
                <span className="text-amber-600 font-bold">{recoveryRate}% Recovered ({recoveredCount}/{missedCount})</span>
              </div>
              <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-amber-500 rounded-full transition-all duration-300"
                  style={{ width: `${Math.max(recoveryRate, 20)}%` }}
                />
              </div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-indigo-50/60 border border-indigo-100 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-indigo-600 text-white rounded-xl">
                <Flame className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-indigo-950">Academic Continuity Quotient: 91/100</h3>
                <p className="text-xs text-indigo-700">You typically recover missed classes in under 48 hours.</p>
              </div>
            </div>
            <Link to="/student/missed">
              <Button variant="ai" size="sm">
                Catch Up Now
              </Button>
            </Link>
          </div>
        </div>

        {/* Recent Achievements */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <h2 className="text-sm font-bold text-slate-900">Recent Achievements</h2>
            <Award className="w-4 h-4 text-amber-500" />
          </div>

          <div className="space-y-3">
            {achievements.map((ach) => (
              <div
                key={ach.id}
                className="p-3.5 rounded-2xl border border-slate-100 bg-slate-50/60 hover:bg-slate-50 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <span className="text-lg">{ach.icon}</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-800">
                    {ach.badge}
                  </span>
                </div>
                <h4 className="text-xs font-bold text-slate-900 mt-2">{ach.title}</h4>
                <p className="text-[11px] text-slate-600 mt-0.5 leading-snug">{ach.desc}</p>
                <span className="text-[10px] text-slate-400 mt-2 block">{ach.date}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Subject-Wise Progress Section */}
      <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-6">
        <div>
          <h2 className="text-base font-bold text-slate-900">Subject-Wise Continuity</h2>
          <p className="text-xs text-slate-500">Syllabus progression and recovery status across enrolled courses</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {subjects.map((subj) => (
            <div
              key={subj.id}
              className="p-5 rounded-2xl border border-slate-200 bg-slate-50/40 hover:bg-slate-50 transition-colors space-y-3"
            >
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-indigo-600">{subj.code}</span>
                  <h3 className="text-base font-bold text-slate-900 mt-0.5">{subj.name}</h3>
                </div>
                <span className="text-xs font-bold text-slate-700 bg-white px-2.5 py-1 rounded-lg border border-slate-200">
                  {subj.progress}% Syllabus
                </span>
              </div>

              <div className="w-full h-2 bg-slate-200/70 rounded-full overflow-hidden">
                <div
                  className="h-full bg-indigo-600 rounded-full"
                  style={{ width: `${subj.progress}%` }}
                />
              </div>

              <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-200/50">
                <span>{subj.attended} attended • {subj.missed} missed</span>
                <span>{subj.instructor}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
