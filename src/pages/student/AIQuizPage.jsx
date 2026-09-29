import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Sparkles,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Award,
  HelpCircle,
  Clock,
  Check,
} from 'lucide-react';
import { classService } from '../../services/classService';
import { aiService } from '../../services/aiService';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';

export default function AIQuizPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [classItem, setClassItem] = useState(() => classService.getMissedClassById(id));

  const [loading, setLoading] = useState(true);
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const item = classService.getMissedClassById(id);
    setClassItem(item);
    if (!item) {
      setLoading(false);
      return;
    }

    let isCancelled = false;
    setLoading(true);

    async function loadQuiz() {
      try {
        const qList = await aiService.generateQuiz(item);
        if (isCancelled) return;
        setQuestions(qList);
      } catch (err) {
        console.error('Quiz loading error:', err);
      } finally {
        if (!isCancelled) {
          setLoading(false);
        }
      }
    }
    loadQuiz();

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

  const handleSelectOption = (optionIndex) => {
    if (submitted) return; // Prevent changing after submission
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentIndex]: optionIndex,
    }));
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const handleSubmit = () => {
    let calculatedScore = 0;
    questions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctIndex) {
        calculatedScore += 1;
      }
    });
    setScore(calculatedScore);
    setSubmitted(true);

    // If passed (>= 3 out of 5), mark class as caught up
    if (calculatedScore >= 3 && classItem) {
      const updated = classService.markLearningComplete(classItem.id);
      if (updated) setClassItem(updated);
    }
  };

  const handleRetry = () => {
    setSelectedAnswers({});
    setSubmitted(false);
    setCurrentIndex(0);
    setScore(0);
  };

  const currentQ = questions[currentIndex];
  const totalQuestions = questions.length;
  const answeredCount = Object.keys(selectedAnswers).length;
  const progressPercent = totalQuestions > 0 ? Math.round(((currentIndex + 1) / totalQuestions) * 100) : 0;
  const isPassed = score >= Math.ceil(totalQuestions * 0.6);

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-16">
      {/* Header Bar */}
      <div className="flex items-center justify-between">
        <Link
          to={`/student/catch-up/${classItem.id}`}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Catch-Up Plan
        </Link>

        <div className="flex items-center gap-2">
          <Badge variant="ai">
            <Sparkles className="w-3 h-3 text-indigo-600 dark:text-indigo-400" />
            AI Verification Quiz
          </Badge>
          <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">5 Questions</span>
        </div>
      </div>

      {/* Quiz Card */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200/90 dark:border-slate-800 shadow-sm relative overflow-hidden transition-colors">
        {/* Topic Title */}
        <div className="pb-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
              {classItem.subjectName} • {classItem.subjectCode}
            </span>
            <h1 className="text-xl font-bold text-slate-900 dark:text-white mt-0.5">
              Continuity Quiz: {classItem.topic}
            </h1>
          </div>

          {!submitted && (
            <div className="text-right">
              <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400">
                Question {currentIndex + 1} of {totalQuestions}
              </span>
              <p className="text-[11px] text-slate-400 dark:text-slate-500">{answeredCount} answered</p>
            </div>
          )}
        </div>

        {/* Progress Bar */}
        {!submitted && (
          <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full mt-4 overflow-hidden">
            <div
              className="h-full bg-indigo-600 rounded-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        )}

        {loading ? (
          <div className="py-16 text-center space-y-3">
            <Sparkles className="w-8 h-8 text-indigo-600 dark:text-indigo-400 mx-auto animate-spin" />
            <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">
              Generating 5 Targeted Mastery Questions...
            </p>
          </div>
        ) : submitted ? (
          /* Quiz Results View */
          <div className="py-8 space-y-8 text-center animate-in fade-in duration-300">
            <div className="max-w-md mx-auto">
              <div
                className={`w-16 h-16 mx-auto rounded-3xl flex items-center justify-center mb-4 ${
                  isPassed ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400' : 'bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400'
                }`}
              >
                {isPassed ? <Award className="w-8 h-8" /> : <RotateCcw className="w-8 h-8" />}
              </div>

              <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">
                {isPassed ? '🎉 Continuity Certified!' : 'Keep Practicing'}
              </h2>

              <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">
                You scored <span className="font-extrabold text-slate-900 dark:text-white">{score}</span> out of{' '}
                <span className="font-extrabold text-slate-900 dark:text-white">{totalQuestions}</span> (
                {Math.round((score / totalQuestions) * 100)}%)
              </p>

              {isPassed ? (
                <div className="mt-3 p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/70 border border-emerald-200 dark:border-emerald-800/80 text-xs text-emerald-800 dark:text-emerald-300 font-semibold">
                  ✓ Great job! This missed lecture has been automatically marked as Caught Up in your academic record.
                </div>
              ) : (
                <div className="mt-3 p-3 rounded-xl bg-amber-50 dark:bg-amber-950/70 border border-amber-200 dark:border-amber-800/80 text-xs text-amber-800 dark:text-amber-300">
                  Review the key concepts in your Catch-Up Plan and try again to achieve certification.
                </div>
              )}
            </div>

            {/* Answer Review */}
            <div className="text-left space-y-4 pt-6 border-t border-slate-100 dark:border-slate-800">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">Review Questions & Explanations:</h3>

              {questions.map((q, idx) => {
                const userChoice = selectedAnswers[idx];
                const isCorrect = userChoice === q.correctIndex;

                return (
                  <div
                    key={q.id || idx}
                    className={`p-4 rounded-2xl border ${
                      isCorrect ? 'bg-emerald-50/40 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800/80' : 'bg-rose-50/40 dark:bg-rose-950/30 border-rose-200 dark:border-rose-800/80'
                    }`}
                  >
                    <div className="flex items-start gap-2.5">
                      {isCorrect ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                      ) : (
                        <XCircle className="w-5 h-5 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
                      )}
                      <div className="flex-1">
                        <p className="text-xs font-semibold text-slate-900 dark:text-white">
                          {idx + 1}. {q.question}
                        </p>

                        <div className="mt-2 space-y-1 text-xs">
                          <p className="text-slate-600 dark:text-slate-300">
                            <span className="font-medium text-slate-500 dark:text-slate-400">Your Answer: </span>
                            {userChoice !== undefined ? q.options[userChoice] : 'Not answered'}
                          </p>
                          {!isCorrect && (
                            <p className="text-emerald-700 dark:text-emerald-400 font-medium">
                              <span>Correct Answer: </span>
                              {q.options[q.correctIndex]}
                            </p>
                          )}
                        </div>

                        <div className="mt-2.5 p-2.5 rounded-lg bg-white/80 dark:bg-slate-800/80 border border-slate-200/60 dark:border-slate-700/80 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                          <span className="font-bold text-slate-800 dark:text-slate-200">Explanation: </span>
                          {q.explanation}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Post-Quiz Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
              <Button
                variant="outline"
                size="md"
                onClick={handleRetry}
                icon={RotateCcw}
              >
                Retry Quiz
              </Button>
              <Link to="/student">
                <Button variant="ai" size="md" iconRight={ArrowRight}>
                  Return to Dashboard
                </Button>
              </Link>
            </div>
          </div>
        ) : (
          /* Question Form View */
          <div className="mt-6 space-y-6">
            <div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-snug">
                {currentIndex + 1}. {currentQ?.question}
              </h2>
            </div>

            {/* Options List */}
            <div className="space-y-3">
              {currentQ?.options?.map((option, optIdx) => {
                const isSelected = selectedAnswers[currentIndex] === optIdx;

                return (
                  <div
                    key={optIdx}
                    onClick={() => handleSelectOption(optIdx)}
                    className={`p-4 rounded-xl border text-xs sm:text-sm font-medium transition-all cursor-pointer flex items-center justify-between ${
                      isSelected
                        ? 'bg-indigo-50/80 dark:bg-indigo-950/70 border-indigo-600 text-indigo-900 dark:text-indigo-200 shadow-xs'
                        : 'bg-slate-50 dark:bg-slate-800/60 hover:bg-white dark:hover:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:border-slate-300 dark:hover:border-slate-600'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={`w-6 h-6 rounded-lg text-xs font-bold flex items-center justify-center ${
                          isSelected
                            ? 'bg-indigo-600 text-white'
                            : 'bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-500 dark:text-slate-300'
                        }`}
                      >
                        {String.fromCharCode(65 + optIdx)}
                      </span>
                      <span>{option}</span>
                    </div>

                    {isSelected && <Check className="w-4 h-4 text-indigo-600 dark:text-indigo-400 stroke-[3]" />}
                  </div>
                );
              })}
            </div>

            {/* Controls */}
            <div className="pt-6 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <Button
                variant="outline"
                size="sm"
                onClick={handlePrev}
                disabled={currentIndex === 0}
                icon={ArrowLeft}
              >
                Previous
              </Button>

              <div className="flex items-center gap-2">
                {currentIndex < totalQuestions - 1 ? (
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={handleNext}
                    iconRight={ArrowRight}
                  >
                    Next Question
                  </Button>
                ) : (
                  <Button
                    variant="ai"
                    size="sm"
                    onClick={handleSubmit}
                    disabled={answeredCount < totalQuestions}
                    icon={CheckCircle2}
                  >
                    Submit Quiz
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
