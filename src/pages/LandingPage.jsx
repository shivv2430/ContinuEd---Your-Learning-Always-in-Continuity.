import React from 'react';
import { Link } from 'react-router-dom';
import {
  BookOpenCheck,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Clock,
  Compass,
  FileText,
  HelpCircle,
  TrendingUp,
  BrainCircuit,
  GraduationCap,
  Users,
  ShieldCheck,
  ChevronRight,
  Layers,
  Zap,
  Sun,
  Moon,
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';

export default function LandingPage() {
  const { toggleTheme, isDark } = useTheme();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 selection:bg-indigo-500 selection:text-white transition-colors">
      {/* Top Navbar */}
      <nav className="sticky top-0 z-50 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-indigo-700 flex items-center justify-center text-white shadow-xs">
              <BookOpenCheck className="w-5 h-5" />
            </div>
            <span className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              Continu<span className="text-indigo-600 dark:text-indigo-400">Ed</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600 dark:text-slate-400">
            <a href="#how-it-works" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
              How It Works
            </a>
            <a href="#why-continued" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
              Why ContinuEd
            </a>
            <a href="#workflow" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
              The Continuity Story
            </a>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              title={`Switch to ${isDark ? 'Light' : 'Dark'} mode`}
              className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200/80 dark:border-slate-700/80 transition-all cursor-pointer"
              aria-label="Toggle theme"
            >
              {isDark ? (
                <Sun className="w-4.5 h-4.5 text-amber-400 transition-transform rotate-0 hover:rotate-45" />
              ) : (
                <Moon className="w-4.5 h-4.5 text-slate-600 transition-transform rotate-0 hover:-rotate-12" />
              )}
            </button>

            <Link to="/login">
              <Button variant="ghost" size="sm">
                Log In
              </Button>
            </Link>
            <Link to="/student">
              <Button variant="ai" size="sm" iconRight={ArrowRight}>
                Try Live Demo
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-16 pb-20 sm:pt-24 sm:pb-28 overflow-hidden">
        {/* Ambient Gradient Glows */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[1000px] h-[450px] bg-gradient-to-tr from-indigo-100/70 via-purple-100/50 to-emerald-100/40 dark:from-indigo-950/40 dark:via-purple-950/30 dark:to-emerald-950/20 blur-3xl pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/70 border border-indigo-200/80 dark:border-indigo-800/80 text-indigo-700 dark:text-indigo-300 text-xs font-semibold mb-6 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-indigo-500 animate-spin" />
            <span>Academic Continuity Platform • Nebius AI Ready</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-white max-w-4xl mx-auto leading-[1.1]">
            Continu<span className="text-indigo-600 dark:text-indigo-400">Ed</span>
          </h1>

          <p className="mt-3 text-2xl sm:text-3xl font-bold text-slate-800 dark:text-slate-200 tracking-tight">
            "Your Learning, Always in Continuity."
          </p>

          <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Missed a class? Don't miss the learning.
            <br className="hidden sm:inline" />
            ContinuEd brings together everything you missed and helps you catch up with AI-powered guidance.
          </p>

          <div className="mt-2 text-sm font-medium text-indigo-600/90 dark:text-indigo-400 italic">
            "Life happens. Learning continues."
          </div>

          {/* CTA Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link to="/signup" className="w-full sm:w-auto">
              <Button variant="ai" size="lg" className="w-full sm:w-auto shadow-indigo-500/25 shadow-lg">
                Get Started Free
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <a href="#how-it-works" className="w-full sm:w-auto">
              <Button variant="outline" size="lg" className="w-full sm:w-auto bg-white/80 dark:bg-slate-900/80">
                See How It Works
              </Button>
            </a>
          </div>

          {/* Realistic Dashboard Mockup */}
          <div className="mt-14 max-w-5xl mx-auto rounded-3xl p-3 sm:p-4 bg-white/70 dark:bg-slate-900/70 backdrop-blur-md border border-slate-200/90 dark:border-slate-800 shadow-2xl shadow-indigo-900/10">
            <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 sm:p-8 text-left overflow-hidden">
              {/* Header Bar of Mockup */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-100 dark:border-slate-800 gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider bg-indigo-50 dark:bg-indigo-950/70 px-2 py-0.5 rounded border border-indigo-200 dark:border-indigo-800/80">
                      ContinuEd Recovery Center
                    </span>
                    <span className="text-xs text-slate-400 dark:text-slate-500">• Student View</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mt-1">
                    Good morning, Aarav Sharma 👋
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Let's get you back on track.</p>
                </div>
                <Link to="/student/class/missed_ds_01">
                  <Button variant="ai" size="sm" iconRight={ArrowRight}>
                    Open Missed Class
                  </Button>
                </Link>
              </div>

              {/* Mockup Active Recovery Card */}
              <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-2 bg-gradient-to-br from-indigo-50/70 via-purple-50/40 to-white dark:from-indigo-950/40 dark:via-purple-950/20 dark:to-slate-900 rounded-2xl p-5 border border-indigo-100 dark:border-indigo-900/60">
                  <div className="flex items-center justify-between">
                    <Badge variant="amber">Missed: Sep 24</Badge>
                    <span className="text-xs font-semibold text-indigo-700 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-950/70 px-2 py-0.5 rounded-full border border-indigo-200 dark:border-indigo-800/80">
                      40 mins recovery
                    </span>
                  </div>
                  <div className="mt-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                      Data Structures • CS201
                    </span>
                    <h4 className="text-lg font-bold text-slate-900 dark:text-white mt-0.5">
                      Linked Lists & Pointer Operations
                    </h4>
                    <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                      Memory layout comparison, head pointer mechanics, and O(1) vs O(n) complexities.
                    </p>
                  </div>

                  {/* 4-Step Progress bar preview */}
                  <div className="mt-4 pt-4 border-t border-indigo-100/60 dark:border-indigo-900/60 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400">
                      <Sparkles className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                      <span>AI Catch-Up Plan Ready</span>
                    </div>
                    <Link to="/student/catch-up/missed_ds_01">
                      <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 flex items-center gap-1">
                        Catch Me Up <ChevronRight className="w-3.5 h-3.5" />
                      </span>
                    </Link>
                  </div>
                </div>

                <div className="bg-slate-50/80 dark:bg-slate-800/60 rounded-2xl p-5 border border-slate-200/80 dark:border-slate-700/80 flex flex-col justify-between">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                      Upcoming Lecture
                    </span>
                    <h5 className="text-sm font-bold text-slate-900 dark:text-white mt-1">
                      Doubly Linked Lists & Trees
                    </h5>
                    <p className="text-xs text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/70 p-2 rounded-lg mt-2 border border-amber-200/60 dark:border-amber-800/60">
                      ⚠️ Needs understanding of Singly Linked Lists before tomorrow's 10 AM class!
                    </p>
                  </div>
                  <div className="mt-3 text-xs text-slate-500 dark:text-slate-400 flex items-center justify-between">
                    <span>Prof. Rajesh Sharma</span>
                    <span className="font-semibold text-slate-700 dark:text-slate-300">Tomorrow</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4-Step Process Section */}
      <section id="how-it-works" className="py-20 bg-white dark:bg-slate-900 border-y border-slate-200/80 dark:border-slate-800 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/70 px-2.5 py-1 rounded-full border border-indigo-200 dark:border-indigo-800/80">
              The Academic Continuity Engine
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-3">
              From Missed Class to Caught Up
            </h2>
            <p className="mt-2 text-base text-slate-600 dark:text-slate-300">
              A frictionless 4-step workflow engineered to eliminate academic debt before your next class.
            </p>
          </div>

          <div className="mt-14 grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Step 1 */}
            <div className="bg-slate-50 dark:bg-slate-800/60 rounded-2xl p-6 border border-slate-200/80 dark:border-slate-700/80 relative hover:border-indigo-300 dark:hover:border-indigo-500/80 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-950/70 text-amber-800 dark:text-amber-300 font-extrabold flex items-center justify-center text-sm mb-4">
                01
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">Miss a Class</h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
                Life happens. Whether due to illness, commute delays, or emergencies, your attendance log flags the missed session immediately.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-slate-50 dark:bg-slate-800/60 rounded-2xl p-6 border border-slate-200/80 dark:border-slate-700/80 relative hover:border-indigo-300 dark:hover:border-indigo-500/80 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-indigo-100 dark:bg-indigo-950/70 text-indigo-700 dark:text-indigo-300 font-extrabold flex items-center justify-center text-sm mb-4">
                02
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">See What You Missed</h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
                Review the exact concepts taught by your professor, board photos, uploaded slides, prerequisites, and assigned homework.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-slate-50 dark:bg-slate-800/60 rounded-2xl p-6 border border-slate-200/80 dark:border-slate-700/80 relative hover:border-indigo-300 dark:hover:border-indigo-500/80 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-950/70 text-purple-700 dark:text-purple-300 font-extrabold flex items-center justify-center text-sm mb-4">
                03
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">Let AI Explain It</h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
                Nebius AI transforms complex professor notes into simple intuitive analogies, key points, and foundational prerequisites.
              </p>
            </div>

            {/* Step 4 */}
            <div className="bg-slate-50 dark:bg-slate-800/60 rounded-2xl p-6 border border-slate-200/80 dark:border-slate-700/80 relative hover:border-indigo-300 dark:hover:border-indigo-500/80 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950/70 text-emerald-700 dark:text-emerald-300 font-extrabold flex items-center justify-center text-sm mb-4">
                04
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">Follow Catch-Up Plan</h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
                Complete a timed 4-step recovery plan, validate comprehension with an interactive 5-question quiz, and mark yourself caught up.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* The Central Product Story Callout */}
      <section id="workflow" className="py-20 bg-slate-900 dark:bg-slate-950 text-white relative overflow-hidden border-b border-slate-800">
        <div className="absolute top-0 right-1/4 w-[500px] h-[300px] bg-indigo-500/10 blur-3xl pointer-events-none" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-400 bg-indigo-950/80 px-3 py-1 rounded-full border border-indigo-800">
              The Core Philosophy
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold mt-3">
              Not Another Generic LMS. A Recovery Engine.
            </h2>
            <p className="mt-2 text-slate-400 text-sm max-w-xl mx-auto">
              LMS tools act as passive document dumpsters. ContinuEd provides active recovery.
            </p>
          </div>

          {/* Dialogue Flow */}
          <div className="space-y-4 max-w-2xl mx-auto">
            <div className="flex items-start gap-3 bg-slate-800/80 dark:bg-slate-900/90 p-4 rounded-2xl border border-slate-700">
              <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xs shrink-0">
                👨‍🏫
              </div>
              <div>
                <p className="text-xs text-slate-400 font-semibold">Teacher</p>
                <p className="text-sm text-slate-200 mt-0.5">"Here is what I taught today in Data Structures."</p>
              </div>
            </div>

            <div className="flex items-start gap-3 bg-slate-800/80 dark:bg-slate-900/90 p-4 rounded-2xl border border-slate-700">
              <div className="w-8 h-8 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-xs shrink-0">
                🙋
              </div>
              <div>
                <p className="text-xs text-slate-400 font-semibold">Student</p>
                <p className="text-sm text-slate-200 mt-0.5">"I missed it due to an emergency."</p>
              </div>
            </div>

            <div className="flex items-start gap-3 bg-indigo-950/70 p-4 rounded-2xl border border-indigo-700/80">
              <div className="w-8 h-8 rounded-full bg-indigo-500/30 text-indigo-300 flex items-center justify-center font-bold text-xs shrink-0">
                <BookOpenCheck className="w-4 h-4 text-indigo-400" />
              </div>
              <div>
                <p className="text-xs text-indigo-300 font-semibold">ContinuEd</p>
                <p className="text-sm text-white font-medium mt-0.5">"Here's exactly what you missed, organized into notes, slides, and homework."</p>
              </div>
            </div>

            <div className="flex items-start gap-3 bg-purple-950/70 p-4 rounded-2xl border border-purple-700/80">
              <div className="w-8 h-8 rounded-full bg-purple-500/30 text-purple-300 flex items-center justify-center font-bold text-xs shrink-0">
                <Sparkles className="w-4 h-4 text-purple-400" />
              </div>
              <div>
                <p className="text-xs text-purple-300 font-semibold">Nebius AI Assistant</p>
                <p className="text-sm text-white font-medium mt-0.5">"Here's a 35-minute personalized catch-up plan, simple analogies, and a test quiz."</p>
              </div>
            </div>

            <div className="flex items-start gap-3 bg-emerald-950/70 p-4 rounded-2xl border border-emerald-700/80">
              <div className="w-8 h-8 rounded-full bg-emerald-500/30 text-emerald-300 flex items-center justify-center font-bold text-xs shrink-0">
                🎯
              </div>
              <div>
                <p className="text-xs text-emerald-300 font-semibold">Student</p>
                <p className="text-sm text-white font-semibold mt-0.5">"I took the quiz, scored 100%, and I'm caught up for tomorrow's class!"</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why ContinuEd Features Grid */}
      <section id="why-continued" className="py-20 bg-slate-50 dark:bg-slate-950 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/70 px-2.5 py-1 rounded-full border border-indigo-200 dark:border-indigo-800/80">
              Core Capabilities
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-3">
              Why ContinuEd?
            </h2>
            <p className="mt-2 text-base text-slate-600 dark:text-slate-300">
              Everything built with one single obsession: preventing missed classes from turning into failed semesters.
            </p>
          </div>

          <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/70 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-4">
                <FileText className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">Everything in One Place</h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
                Lecture slides, blackboard snapshots, teacher annotations, and assignment deadlines consolidated per missed session.
              </p>
            </div>

            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-950/70 text-purple-600 dark:text-purple-400 flex items-center justify-center mb-4">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">AI-Powered Summaries</h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
                Distill a 90-minute complex engineering lecture into a plain-English explanation that clicks within 3 minutes.
              </p>
            </div>

            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-xl bg-teal-50 dark:bg-teal-950/70 text-teal-600 dark:text-teal-400 flex items-center justify-center mb-4">
                <Clock className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">Personalized Catch-Up Plans</h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
                Step-by-step timed tracks with progress checkpoints (e.g. 10m review, 15m core, 10m practice, 5m quiz).
              </p>
            </div>

            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/70 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-4">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">Practice Quizzes</h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
                5 targeted multiple-choice questions with instant rationale explanations to certify true comprehension.
              </p>
            </div>

            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950/70 text-amber-600 dark:text-amber-400 flex items-center justify-center mb-4">
                <Compass className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">Prerequisite Detection</h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
                AI flags exactly which underlying topics you need to review before diving into the new material.
              </p>
            </div>

            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-xl bg-rose-50 dark:bg-rose-950/70 text-rose-600 dark:text-rose-400 flex items-center justify-center mb-4">
                <TrendingUp className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">Progress Continuity Tracking</h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
                Celebrate caught-up milestones, monitor course-by-course attendance rates, and never fall behind.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-white dark:bg-slate-900 border-t border-slate-200/80 dark:border-slate-800 transition-colors">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
            Never Let a Missed Class Cost You Your Semester.
          </h2>
          <p className="mt-3 text-base text-slate-600 dark:text-slate-300 max-w-xl mx-auto">
            Experience the academic continuity workflow designed specifically for modern students and professors.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/signup">
              <Button variant="ai" size="lg" iconRight={ArrowRight}>
                Create Free Account
              </Button>
            </Link>
            <Link to="/student">
              <Button variant="secondary" size="lg">
                Explore Demo Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 bg-slate-100 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400 text-center transition-colors">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <BookOpenCheck className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            <span className="font-bold text-slate-800 dark:text-slate-200">ContinuEd</span>
            <span>— "Your Learning, Always in Continuity."</span>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/student" className="hover:text-slate-800 dark:hover:text-slate-200">Student Portal</Link>
            <Link to="/teacher" className="hover:text-slate-800 dark:hover:text-slate-200">Teacher Portal</Link>
            <Link to="/settings" className="hover:text-slate-800 dark:hover:text-slate-200">Settings</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
