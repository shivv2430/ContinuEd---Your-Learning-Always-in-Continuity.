import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Sparkles,
  BookOpen,
  CheckCircle2,
  Clock,
  ArrowRight,
  ArrowLeft,
  ChevronDown,
  ChevronUp,
  BrainCircuit,
  HelpCircle,
  Lightbulb,
  Check,
  Award,
  Layers,
  CheckSquare,
  Square,
} from 'lucide-react';
import { classService } from '../../services/classService';
import { aiService } from '../../services/aiService';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';

export default function AICatchUpPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [classItem, setClassItem] = useState(() => classService.getMissedClassById(id));

  const [loading, setLoading] = useState(true);
  const [aiPlan, setAiPlan] = useState(null);
  const [completedSteps, setCompletedSteps] = useState({});
  const [expandedHints, setExpandedHints] = useState({});
  const [isCompleted, setIsCompleted] = useState(() => {
    const item = classService.getMissedClassById(id);
    return item?.status === 'completed';
  });

  useEffect(() => {
    const item = classService.getMissedClassById(id);
    setClassItem(item);
    if (!item) {
      setLoading(false);
      return;
    }

    setIsCompleted(item.status === 'completed');
    let isCancelled = false;
    setLoading(true);

    async function loadPlan() {
      try {
        const plan = await aiService.generateCatchUpPlan(item);
        if (isCancelled) return;
        setAiPlan(plan);
        // Preload any completed steps
        const initialStatus = {};
        plan.steps?.forEach((step, idx) => {
          if (step.completed || item.status === 'completed') {
            initialStatus[idx] = true;
          }
        });
        setCompletedSteps(initialStatus);
      } catch (err) {
        console.error('Error generating AI plan:', err);
      } finally {
        if (!isCancelled) {
          setLoading(false);
        }
      }
    }
    loadPlan();

    return () => {
      isCancelled = true;
    };
  }, [id]);

  if (!classItem) {
    return (
      <div className="py-16 text-center space-y-4">
        <h2 className="text-xl font-bold text-slate-800">Class Record Not Found</h2>
        <Link to="/student">
          <Button variant="outline">Back to Dashboard</Button>
        </Link>
      </div>
    );
  }

  const totalSteps = aiPlan?.steps?.length || 4;
  const numCompleted = Object.values(completedSteps).filter(Boolean).length;
  const progressPercent = Math.round((numCompleted / totalSteps) * 100);

  const toggleStep = (stepIndex) => {
    if (!classItem) return;
    const updated = { ...completedSteps, [stepIndex]: !completedSteps[stepIndex] };
    setCompletedSteps(updated);

    const newCompletedCount = Object.values(updated).filter(Boolean).length;
    const newProgress = Math.round((newCompletedCount / totalSteps) * 100);

    const newStatus = newProgress === 100 ? 'completed' : 'in_progress';
    const updatedItem = classService.updateMissedClassStatus(classItem.id, newStatus, newProgress);
    if (updatedItem) setClassItem(updatedItem);

    if (newProgress === 100) {
      setIsCompleted(true);
    } else {
      setIsCompleted(false);
    }
  };

  const handleMarkComplete = () => {
    if (!classItem) return;
    const updatedItem = classService.markLearningComplete(classItem.id);
    if (updatedItem) setClassItem(updatedItem);
    setIsCompleted(true);
    // Mark all steps completed
    const all = {};
    aiPlan?.steps?.forEach((_, i) => {
      all[i] = true;
    });
    setCompletedSteps(all);
  };

  const toggleHint = (index) => {
    setExpandedHints((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-16">
      {/* Top Navigation */}
      <div className="flex items-center justify-between">
        <Link
          to={`/student/class/${classItem.id}`}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800"
        >
          <ArrowLeft className="w-4 h-4" /> Back to What You Missed
        </Link>

        <div className="flex items-center gap-3">
          <Badge variant="ai">
            <Sparkles className="w-3 h-3 text-indigo-600 animate-spin" />
            Nebius AI Continuity Engine
          </Badge>
          {isCompleted && (
            <Badge variant="emerald">
              <CheckCircle2 className="w-3 h-3" /> Fully Caught Up
            </Badge>
          )}
        </div>
      </div>

      {/* Main Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm relative overflow-hidden">
        <div className="max-w-3xl">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-md border border-indigo-200">
            {classItem.subjectName} • {classItem.subjectCode}
          </span>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2 tracking-tight">
            Personalized Catch-Up Plan: {classItem.topic}
          </h1>

          <p className="text-sm text-slate-600 mt-2 leading-relaxed">
            AI-synthesized learning sequence designed to bridge your missed lecture before the next class.
          </p>

          {/* Progress Bar & Actions */}
          <div className="mt-6 pt-6 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex-1 max-w-md">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-700 mb-1.5">
                <span>Recovery Progress</span>
                <span className="text-indigo-600">{progressPercent}% Completed</span>
              </div>
              <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-full transition-all duration-300"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>

            {/* Header Action Buttons */}
            <div className="flex items-center gap-2">
              <Link to={`/student/quiz/${classItem.id}`}>
                <Button variant="ai" size="sm" icon={Sparkles}>
                  Take Quiz
                </Button>
              </Link>
              {!isCompleted ? (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleMarkComplete}
                  icon={CheckCircle2}
                >
                  Mark Completed
                </Button>
              ) : (
                <Button
                  variant="success"
                  size="sm"
                  disabled
                  icon={Award}
                >
                  Completed!
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="p-12 text-center bg-white rounded-3xl border border-slate-200 shadow-xs space-y-4">
          <div className="w-12 h-12 mx-auto rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center animate-bounce">
            <Sparkles className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-slate-800">
            Synthesizing Personalized AI Plan...
          </h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Analyzing instructor lecture notes, identifying prerequisites, and generating structured recovery milestones.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Section: Your Catch-Up Plan (4-step sequence with times) */}
          <section className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-indigo-50 rounded-lg text-indigo-600">
                  <Layers className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-slate-900">Your Catch-Up Plan</h2>
                  <p className="text-xs text-slate-500">
                    4 focused steps • {classItem.estimatedMinutes || 40} minutes total
                  </p>
                </div>
              </div>
              <span className="text-xs font-semibold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full">
                {numCompleted} / {totalSteps} Steps Complete
              </span>
            </div>

            <div className="space-y-3">
              {aiPlan?.steps?.map((step, index) => {
                const checked = Boolean(completedSteps[index]);
                return (
                  <div
                    key={index}
                    onClick={() => toggleStep(index)}
                    className={`p-4 rounded-xl border transition-all cursor-pointer flex items-start gap-4 ${
                      checked
                        ? 'bg-emerald-50/40 border-emerald-200'
                        : 'bg-slate-50 hover:bg-white border-slate-200 hover:border-indigo-300'
                    }`}
                  >
                    <button
                      type="button"
                      className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 mt-0.5 border transition-all ${
                        checked
                          ? 'bg-emerald-600 border-emerald-600 text-white'
                          : 'bg-white border-slate-300 text-transparent hover:border-indigo-400'
                      }`}
                    >
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </button>

                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">
                            Step {step.stepNumber}
                          </span>
                          <span className="text-xs text-slate-400">•</span>
                          <span className="text-xs text-slate-500 font-medium">{step.type}</span>
                        </div>
                        <span className="text-xs font-semibold text-slate-600 flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-slate-400" />
                          {step.durationMinutes} minutes
                        </span>
                      </div>

                      <h4
                        className={`text-sm font-bold mt-1 ${
                          checked ? 'line-through text-slate-500' : 'text-slate-900'
                        }`}
                      >
                        {step.title}
                      </h4>

                      <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                        {step.summary}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Section: Simple Explanation */}
          <section className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-3">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
              <div className="p-1.5 bg-amber-50 rounded-lg text-amber-600">
                <Lightbulb className="w-4 h-4" />
              </div>
              <h2 className="text-base font-bold text-slate-900">Simple Explanation</h2>
            </div>

            <div className="prose prose-sm max-w-none text-slate-700 text-sm leading-relaxed whitespace-pre-line bg-amber-50/30 p-4 rounded-xl border border-amber-100/80">
              {aiPlan?.simpleExplanation}
            </div>
          </section>

          {/* Section: Key Concepts */}
          <section className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
              <div className="p-1.5 bg-purple-50 rounded-lg text-purple-600">
                <BrainCircuit className="w-4 h-4" />
              </div>
              <h2 className="text-base font-bold text-slate-900">Key Concepts</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {aiPlan?.keyConcepts?.map((concept, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5"
                >
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-bold text-slate-900">{concept.title}</h4>
                    {concept.badge && (
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">
                        {concept.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {concept.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Section: What You Should Know First */}
          <section className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-3">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
              <div className="p-1.5 bg-rose-50 rounded-lg text-rose-600">
                <HelpCircle className="w-4 h-4" />
              </div>
              <h2 className="text-base font-bold text-slate-900">What You Should Know First</h2>
            </div>

            <ul className="space-y-2">
              {aiPlan?.whatToKnowFirst?.map((item, index) => (
                <li
                  key={index}
                  className="flex items-start gap-2.5 text-xs text-slate-700 font-medium"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Section: Practice Questions */}
          {aiPlan?.practiceQuestions && aiPlan.practiceQuestions.length > 0 && (
            <section className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-3">
              <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
                <div className="p-1.5 bg-emerald-50 rounded-lg text-emerald-600">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <h2 className="text-base font-bold text-slate-900">Practice Questions</h2>
              </div>

              <div className="space-y-3">
                {aiPlan.practiceQuestions.map((qItem, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-slate-50 border border-slate-100 text-xs"
                  >
                    <p className="font-semibold text-slate-900 text-sm">
                      Q{idx + 1}: {qItem.q}
                    </p>

                    <div className="mt-2">
                      <button
                        type="button"
                        onClick={() => toggleHint(idx)}
                        className="text-indigo-600 hover:text-indigo-800 font-semibold flex items-center gap-1 cursor-pointer"
                      >
                        {expandedHints[idx] ? (
                          <>
                            <ChevronUp className="w-3.5 h-3.5" /> Hide Solution Hint
                          </>
                        ) : (
                          <>
                            <ChevronDown className="w-3.5 h-3.5" /> Show Solution Hint
                          </>
                        )}
                      </button>

                      {expandedHints[idx] && (
                        <div className="mt-2 p-2.5 rounded-lg bg-indigo-50/70 border border-indigo-100 text-indigo-900">
                          <span className="font-bold">Pedagogical Hint: </span>
                          {qItem.hint}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Action Button Strip Required by Prompt */}
          <div className="p-6 rounded-3xl bg-slate-900 text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
            <div>
              <h3 className="text-lg font-bold">Ready to Validate Your Comprehension?</h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Take the 5-question AI mastery quiz to certify your recovery and mark this class caught up.
              </p>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <Link to={`/student/quiz/${classItem.id}`} className="w-full sm:w-auto">
                <Button variant="ai" size="md" className="w-full sm:w-auto font-bold" iconRight={ArrowRight}>
                  Take Quiz Now
                </Button>
              </Link>
              {!isCompleted && (
                <Button
                  variant="outline"
                  size="md"
                  onClick={handleMarkComplete}
                  className="w-full sm:w-auto bg-slate-800 text-white border-slate-700 hover:bg-slate-700"
                >
                  Mark as Completed
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
