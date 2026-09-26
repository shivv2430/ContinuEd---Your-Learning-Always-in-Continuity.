import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  BookOpen,
  Calendar,
  Clock,
  MapPin,
  User,
  Mail,
  Building,
  Award,
  ArrowLeft,
  Sparkles,
  FileText,
  Upload,
  Download,
  AlertCircle,
  CheckCircle2,
  ChevronRight,
  ChevronDown,
  Layers,
  FilePlus,
  PlayCircle,
  Code,
  Image as ImageIcon,
  ExternalLink,
  Users,
  Eye,
  Check,
  Search,
  Filter,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { classService } from '../services/classService';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';
import Modal from '../components/common/Modal';

export default function SubjectDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { role: authRole } = useAuth();

  // Perspective switcher (allows user to test both Student view & Teacher view)
  const [viewPerspective, setViewPerspective] = useState(authRole || 'student');
  const isTeacherView = viewPerspective === 'teacher';

  const [subject, setSubject] = useState(() => classService.getSubjectById(id));
  const [activeTab, setActiveTab] = useState('topics'); // 'topics' | 'missed' | 'uploads' | 'audit'
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [topicFilter, setTopicFilter] = useState('all'); // 'all' | 'missed' | 'attended' | 'upcoming'
  const [searchQuery, setSearchQuery] = useState('');

  // Upload modal state (for teacher)
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [uploadTargetTopicId, setUploadTargetTopicId] = useState('');
  const [uploadFormData, setUploadFormData] = useState({
    title: '',
    type: 'pdf',
    size: '2.4 MB',
    notes: '',
  });
  const [uploadSuccessMessage, setUploadSuccessMessage] = useState(false);

  // New topic modal state (for teacher)
  const [isNewTopicModalOpen, setIsNewTopicModalOpen] = useState(false);
  const [newTopicFormData, setNewTopicFormData] = useState({
    title: '',
    summary: '',
    date: new Date().toISOString().split('T')[0],
    notes: '',
  });

  if (!subject) {
    return (
      <div className="py-20 text-center space-y-4">
        <div className="w-16 h-16 mx-auto rounded-2xl bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 flex items-center justify-center">
          <AlertCircle className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">Subject Not Found</h2>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
          The requested course record could not be loaded.
        </p>
        <div className="pt-2">
          <Link to={isTeacherView ? '/teacher/classes' : '/student/classes'}>
            <Button variant="outline" icon={ArrowLeft}>
              Back to Courses
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  // Reload subject from storage
  const reloadSubject = () => {
    setSubject(classService.getSubjectById(id));
  };

  // Filter topics
  const topics = subject.topics || [];
  const filteredTopics = topics.filter((top) => {
    if (topicFilter === 'missed' && !top.studentMissed) return false;
    if (topicFilter === 'attended' && (top.studentMissed || top.status === 'upcoming')) return false;
    if (topicFilter === 'upcoming' && top.status !== 'upcoming') return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = top.title.toLowerCase().includes(q);
      const matchSummary = (top.summary || '').toLowerCase().includes(q);
      return matchTitle || matchSummary;
    }
    return true;
  });

  const missedTopics = topics.filter((t) => t.studentMissed);

  // Collect all uploaded resources across this subject
  const allUploadedResources = [];
  topics.forEach((t) => {
    t.teacherUploaded?.resources?.forEach((r) => {
      allUploadedResources.push({
        ...r,
        topicId: t.id,
        topicNumber: t.topicNumber,
        topicTitle: t.title,
        date: t.displayDate,
      });
    });
  });

  // Handle teacher uploading material
  const handleUploadSubmit = (e) => {
    e.preventDefault();
    if (!uploadFormData.title.trim()) return;

    const targetTopic = uploadTargetTopicId || topics[0]?.id;
    if (!targetTopic) return;

    classService.addUploadToTopic(subject.id, targetTopic, uploadFormData);
    reloadSubject();
    setUploadSuccessMessage(true);
    setTimeout(() => {
      setUploadSuccessMessage(false);
      setIsUploadModalOpen(false);
      setUploadFormData({ title: '', type: 'pdf', size: '2.4 MB', notes: '' });
    }, 1200);
  };

  // Handle teacher adding a new topic
  const handleAddTopicSubmit = (e) => {
    e.preventDefault();
    if (!newTopicFormData.title.trim()) return;

    classService.addTopicToSubject(subject.id, {
      ...newTopicFormData,
      status: 'attended',
      studentMissed: false,
    });
    reloadSubject();
    setIsNewTopicModalOpen(false);
    setNewTopicFormData({
      title: '',
      summary: '',
      date: new Date().toISOString().split('T')[0],
      notes: '',
    });
  };

  const renderFileIcon = (type) => {
    switch (type) {
      case 'video':
        return <PlayCircle className="w-4 h-4 text-rose-500" />;
      case 'code':
        return <Code className="w-4 h-4 text-emerald-500" />;
      case 'image':
        return <ImageIcon className="w-4 h-4 text-purple-500" />;
      default:
        return <FileText className="w-4 h-4 text-indigo-500" />;
    }
  };

  return (
    <div className="space-y-6 pb-20">
      {/* Top Navigation Bar with Perspective Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="p-2 rounded-xl text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label="Back"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 px-2 py-0.5 rounded border border-indigo-200 dark:border-indigo-800/80">
                {subject.code}
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                {subject.credits || 4} Academic Credits
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight mt-0.5">
              {subject.name}
            </h1>
          </div>
        </div>

        {/* View Perspective Switcher (Student vs Teacher perspective) */}
        <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800/90 p-1 rounded-2xl border border-slate-200/80 dark:border-slate-700">
          <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 pl-2">
            View Perspective:
          </span>
          <button
            type="button"
            onClick={() => setViewPerspective('student')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              !isTeacherView
                ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Student View
          </button>
          <button
            type="button"
            onClick={() => setViewPerspective('teacher')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              isTeacherView
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Teacher View
          </button>
        </div>
      </div>

      {/* Hero Subject Header Card */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200/90 dark:border-slate-800 shadow-xs relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-indigo-500/10 via-purple-500/5 to-transparent rounded-full blur-3xl pointer-events-none" />

        <div className="relative space-y-5">
          <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {subject.description}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs text-slate-600 dark:text-slate-400">
                <div className="flex items-center gap-2">
                  <User className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                  <span>Instructor: <strong className="text-slate-800 dark:text-slate-200">{subject.instructor}</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                  <span>{subject.schedule}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                  <span>{subject.room}</span>
                </div>
              </div>
            </div>

            {/* Quick Metrics & Actions */}
            <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0">
              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-700/70 min-w-[200px]">
                <div className="flex items-center justify-between text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">
                  <span>{isTeacherView ? 'Syllabus Progress' : 'Course Attendance'}</span>
                  <span className="font-bold text-slate-800 dark:text-slate-100">{subject.progress}%</span>
                </div>
                <div className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-indigo-600 dark:bg-indigo-500 rounded-full transition-all"
                    style={{ width: `${subject.progress}%` }}
                  />
                </div>
                <p className="text-[11px] text-slate-400 mt-2">
                  {subject.attended} attended / {subject.totalLectures} total sessions
                </p>
              </div>

              {isTeacherView ? (
                <div className="flex gap-2">
                  <Button
                    variant="primary"
                    size="sm"
                    icon={Upload}
                    onClick={() => {
                      setUploadTargetTopicId(topics[0]?.id || '');
                      setIsUploadModalOpen(true);
                    }}
                  >
                    + Upload Content
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    icon={FilePlus}
                    onClick={() => setIsNewTopicModalOpen(true)}
                  >
                    Add Lecture
                  </Button>
                </div>
              ) : (
                missedTopics.length > 0 && (
                  <Link to={`/student/catch-up/${missedTopics[0]?.missedClassId || 'missed_ds_01'}`}>
                    <Button variant="ai" size="sm" icon={Sparkles}>
                      AI Catch-Up ({missedTopics.length} Missed)
                    </Button>
                  </Link>
                )
              )}
            </div>
          </div>

          {/* Perspective Alert Banner */}
          <div
            className={`p-3.5 rounded-2xl border text-xs flex items-center justify-between gap-3 ${
              isTeacherView
                ? 'bg-emerald-50/80 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800/80 text-emerald-900 dark:text-emerald-200'
                : missedTopics.length > 0
                ? 'bg-amber-50/80 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800/80 text-amber-900 dark:text-amber-200'
                : 'bg-indigo-50/80 dark:bg-indigo-950/30 border-indigo-200 dark:border-indigo-800/80 text-indigo-900 dark:text-indigo-200'
            }`}
          >
            <div className="flex items-center gap-2.5">
              {isTeacherView ? (
                <Users className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
              ) : missedTopics.length > 0 ? (
                <AlertCircle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
              ) : (
                <CheckCircle2 className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0" />
              )}
              <span>
                {isTeacherView
                  ? `Faculty Perspective Active: You can audit what materials you've uploaded for each topic, attach new handouts/slides, and review which students missed lectures.`
                  : missedTopics.length > 0
                  ? `You missed ${missedTopics.length} lecture topic in this subject. Click on the missed topic below to review what professor uploaded and your AI catch-up plan.`
                  : `You have perfect attendance in this subject! All uploaded professor materials and lecture notes are available below.`}
              </span>
            </div>

            <Badge variant={isTeacherView ? 'emerald' : missedTopics.length > 0 ? 'amber' : 'indigo'}>
              {isTeacherView ? 'Teacher Mode' : 'Student Mode'}
            </Badge>
          </div>
        </div>
      </div>

      {/* Main Navigation Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-2">
        <div className="flex items-center gap-1 sm:gap-2">
          <button
            onClick={() => setActiveTab('topics')}
            className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'topics'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Topics & Lectures</span>
            <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${activeTab === 'topics' ? 'bg-indigo-700 text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300'}`}>
              {topics.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('missed')}
            className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'missed'
                ? 'bg-amber-600 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <AlertCircle className="w-4 h-4" />
            <span>What Student Missed</span>
            {missedTopics.length > 0 && (
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${activeTab === 'missed' ? 'bg-amber-700 text-white' : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'}`}>
                {missedTopics.length}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('uploads')}
            className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'uploads'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Teacher Uploads</span>
            <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${activeTab === 'uploads' ? 'bg-indigo-700 text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300'}`}>
              {allUploadedResources.length}
            </span>
          </button>

          {isTeacherView && (
            <button
              onClick={() => setActiveTab('audit')}
              className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === 'audit'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <Users className="w-4 h-4" />
              <span>Student Recovery Audit</span>
            </button>
          )}
        </div>

        {/* Filter Pills */}
        {activeTab === 'topics' && (
          <div className="flex items-center gap-1.5">
            <span className="text-xs text-slate-400 hidden sm:inline">Filter:</span>
            {['all', 'missed', 'attended', 'upcoming'].map((filterKey) => (
              <button
                key={filterKey}
                onClick={() => setTopicFilter(filterKey)}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold capitalize transition-all cursor-pointer ${
                  topicFilter === filterKey
                    ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                {filterKey}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* TAB 1: TOPICS & LECTURES LIST */}
      {activeTab === 'topics' && (
        <div className="space-y-4">
          {/* Quick Search */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="relative w-full sm:max-w-md">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search topics, concepts, or keywords in this subject..."
                className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 text-slate-800 dark:text-slate-200 placeholder:text-slate-400"
              />
            </div>
            <p className="text-xs text-slate-400">
              Showing {filteredTopics.length} of {topics.length} lecture topics
            </p>
          </div>

          {/* Topics List */}
          <div className="space-y-3">
            {filteredTopics.map((topic) => {
              const resCount = topic.teacherUploaded?.resources?.length || 0;
              const hasAssignment = Boolean(topic.teacherUploaded?.assignment);

              return (
                <div
                  key={topic.id}
                  className={`bg-white dark:bg-slate-900 rounded-2xl border transition-all p-5 hover:shadow-md cursor-pointer ${
                    topic.studentMissed
                      ? 'border-amber-200 dark:border-amber-900/60 bg-amber-50/15 dark:bg-amber-950/10'
                      : 'border-slate-200/90 dark:border-slate-800 hover:border-indigo-300 dark:hover:border-indigo-700'
                  }`}
                  onClick={() => setSelectedTopic(topic)}
                >
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div className="space-y-2 flex-1">
                      {/* Topic Meta */}
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 px-2 py-0.5 rounded border border-indigo-200 dark:border-indigo-800/80">
                          Topic {topic.topicNumber}
                        </span>
                        <span className="text-xs text-slate-500 dark:text-slate-400">
                          {topic.displayDate}
                        </span>

                        {/* Status Badge */}
                        {topic.studentMissed ? (
                          <Badge variant="amber">
                            <AlertCircle className="w-3 h-3" /> Missed by Student
                          </Badge>
                        ) : topic.status === 'upcoming' ? (
                          <Badge variant="slate">Upcoming Session</Badge>
                        ) : (
                          <Badge variant="emerald">
                            <CheckCircle2 className="w-3 h-3" /> Attended
                          </Badge>
                        )}

                        {topic.studentMissed && topic.studentMissedDetails?.warningForUpcoming && (
                          <span className="text-[10px] font-semibold text-rose-700 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/50 px-2 py-0.5 rounded border border-rose-200 dark:border-rose-900">
                            Prerequisite Risk
                          </span>
                        )}
                      </div>

                      {/* Topic Title & Summary */}
                      <div>
                        <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2 group-hover:text-indigo-600">
                          <span>{topic.title}</span>
                          <ChevronRight className="w-4 h-4 text-slate-400 transition-transform group-hover:translate-x-1" />
                        </h3>
                        <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                          {topic.summary}
                        </p>
                      </div>

                      {/* Highlights: What Teacher Uploaded vs What Student Missed */}
                      <div className="pt-2 flex flex-wrap items-center gap-4 text-xs">
                        <div className="flex items-center gap-1.5 text-indigo-600 dark:text-indigo-400 font-semibold">
                          <FileText className="w-3.5 h-3.5" />
                          <span>{resCount} Teacher Uploads</span>
                        </div>

                        {hasAssignment && (
                          <div className="flex items-center gap-1.5 text-purple-600 dark:text-purple-400 font-semibold">
                            <Award className="w-3.5 h-3.5" />
                            <span>Assignment: {topic.teacherUploaded.assignment.title}</span>
                          </div>
                        )}

                        {topic.studentMissed && (
                          <div className="flex items-center gap-1.5 text-amber-600 dark:text-amber-400 font-semibold">
                            <Clock className="w-3.5 h-3.5" />
                            <span>{topic.studentMissedDetails?.estimatedMinutes || 40} mins recovery plan</span>
                          </div>
                        )}

                        {isTeacherView && (
                          <div className="flex items-center gap-1.5 text-emerald-700 dark:text-emerald-400 font-semibold">
                            <Users className="w-3.5 h-3.5" />
                            <span>{topic.teacherAudit?.studentsAbsentCount || 0} students missed</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Right Action Trigger */}
                    <div className="flex items-center gap-2 shrink-0">
                      <Button
                        variant="secondary"
                        size="sm"
                        iconRight={ChevronRight}
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedTopic(topic);
                        }}
                      >
                        Inspect Details
                      </Button>

                      {isTeacherView ? (
                        <Button
                          variant="outline"
                          size="sm"
                          icon={Upload}
                          onClick={(e) => {
                            e.stopPropagation();
                            setUploadTargetTopicId(topic.id);
                            setIsUploadModalOpen(true);
                          }}
                        >
                          + Upload
                        </Button>
                      ) : (
                        topic.studentMissed && (
                          <Link
                            to={`/student/catch-up/${topic.missedClassId || 'missed_ds_01'}`}
                            onClick={(e) => e.stopPropagation()}
                          >
                            <Button variant="ai" size="sm" icon={Sparkles}>
                              Catch Up
                            </Button>
                          </Link>
                        )
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 2: WHAT STUDENT MISSED (CONTINUITY HUB) */}
      {activeTab === 'missed' && (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/40 dark:to-orange-950/20 p-5 rounded-3xl border border-amber-200/80 dark:border-amber-900/60 space-y-2">
            <h2 className="text-base font-bold text-amber-900 dark:text-amber-200 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-600 dark:text-amber-400" />
              Academic Continuity & Missed Class Synthesis
            </h2>
            <p className="text-xs text-amber-800 dark:text-amber-300 leading-relaxed max-w-3xl">
              ContinuEd isolates every topic the student missed in {subject.name}, contrasts it directly with what the instructor published, and generates actionable 4-step recovery roadmaps.
            </p>
          </div>

          {missedTopics.length === 0 ? (
            <div className="py-12 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 text-center space-y-3">
              <div className="w-12 h-12 mx-auto rounded-full bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                <Check className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-800 dark:text-white">No Missed Classes in {subject.name}</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                You have attended all conducted lectures for this course. Excellent work!
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {missedTopics.map((topic) => (
                <div
                  key={topic.id}
                  className="bg-white dark:bg-slate-900 rounded-3xl border border-amber-200 dark:border-amber-900/80 p-6 space-y-5 shadow-xs"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-amber-800 dark:text-amber-300 bg-amber-100 dark:bg-amber-950 px-2 py-0.5 rounded">
                          Topic {topic.topicNumber} Missed
                        </span>
                        <span className="text-xs text-slate-500 dark:text-slate-400">
                          {topic.displayDate}
                        </span>
                      </div>
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-1">
                        {topic.title}
                      </h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        Reason: {topic.studentMissedDetails?.reason || 'Documented Absence'}
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <Link to={`/student/catch-up/${topic.missedClassId || 'missed_ds_01'}`}>
                        <Button variant="ai" size="sm" icon={Sparkles}>
                          Launch AI Catch-Up
                        </Button>
                      </Link>
                      <Link to={`/student/quiz/${topic.missedClassId || 'missed_ds_01'}`}>
                        <Button variant="outline" size="sm">
                          Mastery Quiz
                        </Button>
                      </Link>
                    </div>
                  </div>

                  {/* 2-Column Comparison: What Student Missed vs What Teacher Uploaded */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {/* Left: What was missed */}
                    <div className="p-4 rounded-2xl bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200/60 dark:border-amber-900/40 space-y-3">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-amber-800 dark:text-amber-300 flex items-center gap-1.5">
                        <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
                        What You Missed in this Lecture
                      </h4>
                      <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
                        {topic.studentMissedDetails?.keyConceptsMissed?.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>

                      {topic.studentMissedDetails?.warningForUpcoming && (
                        <div className="pt-2 text-[11px] font-semibold text-rose-700 dark:text-rose-400">
                          ⚠️ {topic.studentMissedDetails.warningForUpcoming}
                        </div>
                      )}
                    </div>

                    {/* Right: What Teacher Uploaded for this topic */}
                    <div className="p-4 rounded-2xl bg-indigo-50/50 dark:bg-indigo-950/20 border border-indigo-200/60 dark:border-indigo-900/40 space-y-3">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-800 dark:text-indigo-300 flex items-center gap-1.5">
                        <FileText className="w-3.5 h-3.5 text-indigo-600" />
                        What Teacher Uploaded For You ({topic.teacherUploaded?.resources?.length || 0})
                      </h4>

                      <div className="space-y-2">
                        {topic.teacherUploaded?.resources?.map((r) => (
                          <div
                            key={r.id}
                            className="p-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-between text-xs"
                          >
                            <div className="flex items-center gap-2 truncate">
                              {renderFileIcon(r.type)}
                              <span className="font-semibold text-slate-800 dark:text-slate-200 truncate">
                                {r.title}
                              </span>
                            </div>
                            <button
                              onClick={() => alert(`Downloading: ${r.title}`)}
                              className="text-indigo-600 dark:text-indigo-400 hover:underline text-[11px] shrink-0 font-medium ml-2 cursor-pointer"
                            >
                              Download ({r.size})
                            </button>
                          </div>
                        ))}
                      </div>

                      {topic.teacherUploaded?.notes && (
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 italic pt-1">
                          Professor's Note: "{topic.teacherUploaded.notes}"
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 3: TEACHER UPLOADS & REPOSITORY */}
      {activeTab === 'uploads' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white">
                Course Materials & Content Repository
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                All syllabus lecture decks, code templates, assignments, and board captures for {subject.name}.
              </p>
            </div>

            {isTeacherView && (
              <Button
                variant="primary"
                size="sm"
                icon={Upload}
                onClick={() => {
                  setUploadTargetTopicId(topics[0]?.id || '');
                  setIsUploadModalOpen(true);
                }}
              >
                + Upload New Material
              </Button>
            )}
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 divide-y divide-slate-100 dark:divide-slate-800 overflow-hidden shadow-xs">
            {allUploadedResources.map((res, i) => (
              <div
                key={i}
                className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-indigo-50 dark:bg-indigo-950/70 rounded-2xl shrink-0">
                    {renderFileIcon(res.type)}
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                      {res.title}
                    </h4>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      Topic {res.topicNumber}: {res.topicTitle} • Uploaded {res.uploadDate || res.date} • {res.size}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => alert(`Previewing: ${res.title}`)}
                    className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 flex items-center gap-1.5 cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Preview</span>
                  </button>
                  <button
                    onClick={() => alert(`Downloading file: ${res.title}`)}
                    className="p-2 rounded-xl text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                    title="Download File"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: TEACHER AUDIT (STUDENT RECOVERY TRACKER) */}
      {activeTab === 'audit' && isTeacherView && (
        <div className="space-y-5">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white">
                Absenteeism & Recovery Roster
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Track how absent students are progressing through their AI recovery modules for each topic.
              </p>
            </div>

            <div className="divide-y divide-slate-100 dark:divide-slate-800">
              {topics
                .filter((t) => t.teacherAudit?.studentsAbsentCount > 0)
                .map((topic) => (
                  <div key={topic.id} className="py-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400">
                          Topic {topic.topicNumber}: {topic.title}
                        </span>
                        <span className="text-xs text-slate-400 ml-2">({topic.displayDate})</span>
                      </div>
                      <Badge variant="amber">
                        {topic.teacherAudit?.studentsAbsentCount} Students Missed
                      </Badge>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {topic.teacherAudit?.absentStudentsList?.map((s, idx) => (
                        <div
                          key={idx}
                          className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700/80 flex items-center justify-between"
                        >
                          <div className="flex items-center gap-2.5">
                            <img
                              src={s.avatar}
                              alt={s.name}
                              className="w-7 h-7 rounded-full object-cover"
                            />
                            <div>
                              <h5 className="text-xs font-bold text-slate-900 dark:text-white">
                                {s.name}
                              </h5>
                              <p className="text-[10px] text-slate-400">{s.email}</p>
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
                ))}
            </div>
          </div>
        </div>
      )}

      {/* TOPIC DEEP DIVE MODAL / DRAWER */}
      <Modal
        isOpen={Boolean(selectedTopic)}
        onClose={() => setSelectedTopic(null)}
        title={`Topic ${selectedTopic?.topicNumber}: ${selectedTopic?.title}`}
        subtitle={`${subject.name} • Conducted ${selectedTopic?.displayDate}`}
      >
        {selectedTopic && (
          <div className="space-y-5">
            {/* Status Strip */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                {selectedTopic.studentMissed ? (
                  <Badge variant="amber">Missed by Student</Badge>
                ) : (
                  <Badge variant="emerald">Attended</Badge>
                )}
                <span className="text-xs text-slate-400">
                  {selectedTopic.teacherUploaded?.resources?.length || 0} Materials Attached
                </span>
              </div>

              {!isTeacherView && selectedTopic.studentMissed && (
                <Link to={`/student/catch-up/${selectedTopic.missedClassId || 'missed_ds_01'}`}>
                  <Button variant="ai" size="sm" icon={Sparkles}>
                    Catch Up Now
                  </Button>
                </Link>
              )}
            </div>

            {/* Topic Summary */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                Topic Curriculum Outline
              </h4>
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-200 leading-relaxed bg-slate-50 dark:bg-slate-800/70 p-3.5 rounded-2xl border border-slate-200 dark:border-slate-700">
                {selectedTopic.summary}
              </p>
            </div>

            {/* WHAT STUDENT MISSED SECTION */}
            {selectedTopic.studentMissed && (
              <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/60 space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-amber-800 dark:text-amber-300 flex items-center gap-1.5">
                  <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
                  What Student Missed In This Lecture
                </h4>
                <ul className="space-y-1 text-xs text-slate-700 dark:text-slate-300">
                  {selectedTopic.studentMissedDetails?.keyConceptsMissed?.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="pt-2 flex items-center justify-between text-xs text-amber-900 dark:text-amber-300">
                  <span>Estimated Recovery Time: ~{selectedTopic.studentMissedDetails?.estimatedMinutes || 40} mins</span>
                  <Link
                    to={`/student/catch-up/${selectedTopic.missedClassId || 'missed_ds_01'}`}
                    className="font-bold underline text-indigo-600 dark:text-indigo-400"
                  >
                    Open AI Recovery Plan →
                  </Link>
                </div>
              </div>
            )}

            {/* WHAT TEACHER UPLOADED SECTION */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  What Teacher Uploaded For This Topic
                </h4>
                {isTeacherView && (
                  <button
                    onClick={() => {
                      setUploadTargetTopicId(selectedTopic.id);
                      setIsUploadModalOpen(true);
                    }}
                    className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <Upload className="w-3 h-3" /> + Upload To This Topic
                  </button>
                )}
              </div>

              <div className="space-y-2">
                {selectedTopic.teacherUploaded?.resources?.map((r) => (
                  <div
                    key={r.id}
                    className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 flex items-center justify-between text-xs"
                  >
                    <div className="flex items-center gap-2.5 truncate">
                      {renderFileIcon(r.type)}
                      <span className="font-semibold text-slate-800 dark:text-slate-100 truncate">
                        {r.title}
                      </span>
                    </div>
                    <button
                      onClick={() => alert(`Downloading: ${r.title}`)}
                      className="px-2.5 py-1 rounded-lg bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 font-semibold hover:bg-indigo-100 transition-colors shrink-0 cursor-pointer"
                    >
                      Download ({r.size})
                    </button>
                  </div>
                ))}
              </div>

              {selectedTopic.teacherUploaded?.notes && (
                <div className="pt-2 text-xs text-slate-600 dark:text-slate-400">
                  <strong className="text-slate-800 dark:text-slate-200">Professor's Instruction: </strong>
                  {selectedTopic.teacherUploaded.notes}
                </div>
              )}
            </div>

            {/* Teacher Audit inside topic */}
            {isTeacherView && selectedTopic.teacherAudit?.studentsAbsentCount > 0 && (
              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Absent Students for this Lecture ({selectedTopic.teacherAudit.studentsAbsentCount})
                </h4>
                <div className="divide-y divide-slate-100 dark:divide-slate-800">
                  {selectedTopic.teacherAudit.absentStudentsList?.map((s, idx) => (
                    <div key={idx} className="py-2 flex items-center justify-between text-xs">
                      <span>{s.name} ({s.email})</span>
                      <Badge variant={s.catchupStatus === 'Completed' ? 'emerald' : 'amber'}>
                        {s.catchupStatus}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-end">
              <Button variant="outline" size="sm" onClick={() => setSelectedTopic(null)}>
                Close
              </Button>
            </div>
          </div>
        )}
      </Modal>

      {/* TEACHER UPLOAD CONTENT MODAL */}
      <Modal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        title="Upload Teaching Content"
        subtitle={`Add lecture slides, notes, code, or video to ${subject.name}`}
      >
        <form onSubmit={handleUploadSubmit} className="space-y-4">
          {uploadSuccessMessage && (
            <div className="p-3 bg-emerald-50 dark:bg-emerald-950 border border-emerald-200 dark:border-emerald-800 rounded-xl text-emerald-800 dark:text-emerald-300 text-xs font-semibold flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-600" />
              <span>Material uploaded successfully to course repository!</span>
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Target Lecture Topic
            </label>
            <select
              value={uploadTargetTopicId}
              onChange={(e) => setUploadTargetTopicId(e.target.value)}
              className="w-full px-3 py-2 text-xs sm:text-sm border border-slate-300 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100"
            >
              {topics.map((t) => (
                <option key={t.id} value={t.id}>
                  Topic {t.topicNumber}: {t.title}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Document / Resource Title
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Lecture 15 Deck - Doubly Linked Lists & Memory Overhead.pdf"
              value={uploadFormData.title}
              onChange={(e) => setUploadFormData({ ...uploadFormData, title: e.target.value })}
              className="w-full px-3 py-2 text-xs sm:text-sm border border-slate-300 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Resource Category
              </label>
              <select
                value={uploadFormData.type}
                onChange={(e) => setUploadFormData({ ...uploadFormData, type: e.target.value })}
                className="w-full px-3 py-2 text-xs border border-slate-300 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100"
              >
                <option value="pdf">Lecture Slides (PDF)</option>
                <option value="doc">Notes / Handout (DOC/PDF)</option>
                <option value="code">Starter Code (Python/C++/Java)</option>
                <option value="video">Class Recording (MP4/Stream)</option>
                <option value="image">Board Photo / Diagram</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Estimated File Size
              </label>
              <input
                type="text"
                value={uploadFormData.size}
                onChange={(e) => setUploadFormData({ ...uploadFormData, size: e.target.value })}
                className="w-full px-3 py-2 text-xs border border-slate-300 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Instructions for Students (Especially Absent Students)
            </label>
            <textarea
              rows={3}
              placeholder="e.g. Read slide 12 through 24 before tomorrow's lab. Test your code with empty list inputs."
              value={uploadFormData.notes}
              onChange={(e) => setUploadFormData({ ...uploadFormData, notes: e.target.value })}
              className="w-full px-3 py-2 text-xs border border-slate-300 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100"
            />
          </div>

          <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-end gap-2">
            <Button variant="outline" size="sm" onClick={() => setIsUploadModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" size="sm" icon={Upload}>
              Publish to Students
            </Button>
          </div>
        </form>
      </Modal>

      {/* TEACHER ADD NEW LECTURE TOPIC MODAL */}
      <Modal
        isOpen={isNewTopicModalOpen}
        onClose={() => setIsNewTopicModalOpen(false)}
        title="Add New Lecture Session"
        subtitle={`Add next topic to ${subject.name} curriculum`}
      >
        <form onSubmit={handleAddTopicSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Topic Title
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Hash Tables & Chaining vs Open Addressing"
              value={newTopicFormData.title}
              onChange={(e) => setNewTopicFormData({ ...newTopicFormData, title: e.target.value })}
              className="w-full px-3 py-2 text-xs sm:text-sm border border-slate-300 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Date Conducted
            </label>
            <input
              type="date"
              value={newTopicFormData.date}
              onChange={(e) => setNewTopicFormData({ ...newTopicFormData, date: e.target.value })}
              className="w-full px-3 py-2 text-xs border border-slate-300 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Curriculum Summary
            </label>
            <textarea
              rows={3}
              placeholder="Detailed description of what will be taught or what was covered in this lecture..."
              value={newTopicFormData.summary}
              onChange={(e) => setNewTopicFormData({ ...newTopicFormData, summary: e.target.value })}
              className="w-full px-3 py-2 text-xs border border-slate-300 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100"
            />
          </div>

          <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-end gap-2">
            <Button variant="outline" size="sm" onClick={() => setIsNewTopicModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" size="sm">
              Save Lecture
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
