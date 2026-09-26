import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Sparkles,
  BookOpen,
  Calendar,
  Clock,
  ArrowLeft,
  FileText,
  Download,
  AlertTriangle,
  CheckCircle2,
  Share2,
  ExternalLink,
  ChevronRight,
  Layers,
  HelpCircle,
  Upload,
} from 'lucide-react';
import { classService } from '../../services/classService';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';

export default function MissedClassDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const classItem = classService.getMissedClassById(id);

  const [assignmentSubmitted, setAssignmentSubmitted] = useState(
    classItem?.assignment?.status === 'submitted'
  );
  const [submissionFile, setSubmissionFile] = useState(null);

  if (!classItem) {
    return (
      <div className="py-16 text-center space-y-4">
        <h2 className="text-xl font-bold text-slate-800">Missed Class Record Not Found</h2>
        <p className="text-sm text-slate-500">The requested lecture could not be loaded.</p>
        <Link to="/student">
          <Button variant="outline">Back to Dashboard</Button>
        </Link>
      </div>
    );
  }

  const handleAssignmentSubmit = (e) => {
    e.preventDefault();
    setAssignmentSubmitted(true);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-16">
      {/* Back button & Breadcrumbs */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" /> Back
        </button>

        <div className="flex items-center gap-2">
          {classItem.status === 'completed' ? (
            <Badge variant="emerald">
              <CheckCircle2 className="w-3.5 h-3.5" /> Learning Caught Up
            </Badge>
          ) : (
            <Badge variant="amber">Status: Needs Catch-Up</Badge>
          )}
          <span className="text-xs text-slate-400">• Estimated ~{classItem.estimatedMinutes} mins</span>
        </div>
      </div>

      {/* Prominent Header Box */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-50/50 rounded-full blur-2xl pointer-events-none -mr-10 -mt-10" />

        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-md border border-indigo-200">
              <BookOpen className="w-3.5 h-3.5" />
              <span>What You Missed</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2 tracking-tight">
              {classItem.topic}
            </h1>

            <div className="mt-3 flex flex-wrap items-center gap-y-2 gap-x-4 text-xs text-slate-500">
              <span className="font-semibold text-slate-800">
                Subject: {classItem.subjectName} ({classItem.subjectCode})
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                Date: {classItem.displayDate}
              </span>
              <span>•</span>
              <span>Instructor: {classItem.instructor}</span>
            </div>
          </div>

          {/* Prominent USP CTA */}
          <div className="shrink-0 flex sm:flex-col items-center justify-end gap-2">
            <Link to={`/student/catch-up/${classItem.id}`} className="w-full">
              <Button
                variant="ai"
                size="lg"
                className="w-full shadow-lg shadow-indigo-500/20 font-bold"
                icon={Sparkles}
              >
                ✨ Catch Me Up with AI
              </Button>
            </Link>
            <span className="text-[11px] text-center text-slate-400 hidden sm:block">
              Synthesized 4-step recovery plan
            </span>
          </div>
        </div>
      </div>

      {/* 6 Core Sections Required by Prompt */}

      {/* Section 1: Class Summary */}
      <section className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-3">
        <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
          <div className="w-7 h-7 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-xs">
            1
          </div>
          <h2 className="text-base font-bold text-slate-900">Class Summary</h2>
        </div>
        <p className="text-sm text-slate-700 leading-relaxed">
          {classItem.description}
        </p>
        {classItem.notes && (
          <div className="mt-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200/70 text-xs text-slate-600 leading-relaxed">
            <span className="font-semibold text-slate-800 block mb-1">Teacher Notes:</span>
            {classItem.notes}
          </div>
        )}
      </section>

      {/* Section 2: Important Concepts */}
      <section className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-4">
        <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
          <div className="w-7 h-7 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center font-bold text-xs">
            2
          </div>
          <h2 className="text-base font-bold text-slate-900">Important Concepts</h2>
        </div>

        <div className="grid grid-cols-1 gap-2.5">
          {classItem.importantPoints?.map((point, index) => (
            <div
              key={index}
              className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-start gap-3"
            >
              <div className="w-5 h-5 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                {index + 1}
              </div>
              <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
                {point}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Section 3: Notes & Resources */}
      <section className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-teal-50 text-teal-600 flex items-center justify-center font-bold text-xs">
              3
            </div>
            <h2 className="text-base font-bold text-slate-900">Notes & Resources</h2>
          </div>
          <span className="text-xs text-slate-400">
            {classItem.resources?.length || 0} Attached files
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {classItem.resources?.map((res) => (
            <div
              key={res.id}
              className="p-3.5 rounded-xl border border-slate-200/80 bg-slate-50/60 hover:bg-slate-50 flex items-center justify-between transition-colors group"
            >
              <div className="flex items-center gap-3 overflow-hidden">
                <div className="p-2 bg-white rounded-lg border border-slate-200 shadow-2xs group-hover:border-indigo-300">
                  <FileText className="w-4 h-4 text-indigo-600" />
                </div>
                <div className="truncate">
                  <p className="text-xs font-semibold text-slate-800 truncate">{res.title}</p>
                  <p className="text-[10px] text-slate-400">{res.size} • {res.type.toUpperCase()}</p>
                </div>
              </div>

              <a
                href={res.url}
                onClick={(e) => {
                  e.preventDefault();
                  alert(`Downloading: ${res.title}`);
                }}
                className="p-2 rounded-lg text-slate-400 hover:text-indigo-600 hover:bg-white transition-colors"
                title="Download resource"
              >
                <Download className="w-4 h-4" />
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Section 4: Assignment */}
      {classItem.assignment && (
        <section className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center font-bold text-xs">
                4
              </div>
              <h2 className="text-base font-bold text-slate-900">Assignment Given</h2>
            </div>
            <Badge variant={assignmentSubmitted ? 'emerald' : 'amber'}>
              {assignmentSubmitted ? 'Submitted' : 'Pending Submission'}
            </Badge>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/70">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <h3 className="text-sm font-bold text-slate-900">{classItem.assignment.title}</h3>
              <span className="text-xs font-semibold text-rose-600">
                Deadline: {classItem.assignment.dueDate} ({classItem.assignment.points} pts)
              </span>
            </div>
            <p className="text-xs text-slate-600 mt-2 leading-relaxed">
              {classItem.assignment.description}
            </p>

            {/* Quick Submission area */}
            <form onSubmit={handleAssignmentSubmit} className="mt-4 pt-3 border-t border-slate-200/60 flex flex-col sm:flex-row items-center gap-3">
              <input
                type="file"
                onChange={(e) => setSubmissionFile(e.target.files[0])}
                className="text-xs text-slate-500 file:mr-2 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-white file:text-slate-700 hover:file:bg-slate-100"
              />
              <Button
                type="submit"
                variant={assignmentSubmitted ? 'outline' : 'primary'}
                size="sm"
                className="w-full sm:w-auto"
              >
                {assignmentSubmitted ? 'Resubmit Solution' : 'Submit Assignment'}
              </Button>
            </form>
          </div>
        </section>
      )}

      {/* Section 5: Prerequisites */}
      <section className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-4">
        <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
          <div className="w-7 h-7 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center font-bold text-xs">
            5
          </div>
          <h2 className="text-base font-bold text-slate-900">Foundational Prerequisites</h2>
        </div>

        <p className="text-xs text-slate-500">
          Before diving into this lecture's core exercises, make sure you feel confident with:
        </p>

        <div className="flex flex-wrap gap-2">
          {classItem.prerequisites?.map((prereq, index) => (
            <span
              key={index}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-amber-50 text-amber-800 border border-amber-200"
            >
              <AlertTriangle className="w-3 h-3 text-amber-600" />
              {prereq}
            </span>
          ))}
        </div>
      </section>

      {/* Section 6: AI Catch-Up Banner */}
      <section className="bg-gradient-to-br from-indigo-900 via-indigo-800 to-purple-900 rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden shadow-xl">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-7 h-7 rounded-lg bg-white/20 text-white flex items-center justify-center font-bold text-xs">
            6
          </div>
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-200">
            AI Catch-Up Continuity Engine
          </span>
        </div>

        <h3 className="text-2xl font-extrabold text-white mt-2">
          Ready to turn this missed class into certified mastery?
        </h3>

        <p className="text-sm text-indigo-100 mt-2 max-w-xl leading-relaxed">
          Nebius AI has distilled this lecture into a plain-English simple explanation, key points, a 4-step recovery plan, and an interactive practice quiz.
        </p>

        <div className="mt-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <Link to={`/student/catch-up/${classItem.id}`}>
            <Button
              variant="secondary"
              size="lg"
              className="bg-white text-indigo-900 hover:bg-slate-100 font-extrabold shadow-md"
              icon={Sparkles}
            >
              ✨ Launch Personalized Catch-Up Plan
            </Button>
          </Link>
          <span className="text-xs text-indigo-200">Takes only ~{classItem.estimatedMinutes} minutes</span>
        </div>
      </section>
    </div>
  );
}
