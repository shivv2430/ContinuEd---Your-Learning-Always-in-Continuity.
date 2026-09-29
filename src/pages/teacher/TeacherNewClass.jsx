import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  PlusCircle,
  Upload,
  FileText,
  Calendar,
  CheckCircle2,
  Sparkles,
  ArrowLeft,
  X,
  AlertCircle,
  CloudUpload,
  Link2,
} from 'lucide-react';
import { classService } from '../../services/classService';
import Button from '../../components/common/Button';

export default function TeacherNewClass() {
  const navigate = useNavigate();
  const subjects = classService.getSubjects();

  const [formData, setFormData] = useState({
    subjectId: subjects[0]?.id || 'subj_cs201',
    topic: '',
    date: new Date().toISOString().split('T')[0],
    description: '',
    importantPoints: '',
    notes: '',
    assignmentTitle: '',
    assignmentDescription: '',
    assignmentDeadline: '',
    referenceLinks: '',
  });

  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [uploadProgress, setUploadProgress] = useState(null); // number or null
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    // Simulate Supabase Storage upload progress
    setUploadProgress(15);
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            const newFiles = files.map((f, i) => ({
              id: `file_${Date.now()}_${i}`,
              title: f.name,
              size: `${(f.size / (1024 * 1024)).toFixed(1)} MB`,
              type: f.name.endsWith('.pdf') ? 'pdf' : f.name.endsWith('.png') || f.name.endsWith('.jpg') ? 'image' : 'doc',
              url: '#',
            }));
            setUploadedFiles((current) => [...current, ...newFiles]);
            setUploadProgress(null);
          }, 300);
          return 100;
        }
        return prev + 25;
      });
    }, 150);
  };

  const removeFile = (id) => {
    setUploadedFiles((prev) => prev.filter((f) => f.id !== id));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.topic.trim()) {
      alert('Please provide a class topic.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      const created = classService.addClass({
        ...formData,
        resources: uploadedFiles,
      });
      setIsSubmitting(false);
      setSuccess(true);
      setTimeout(() => {
        navigate('/teacher/classes');
      }, 1000);
    }, 600);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-20">
      {/* Top Bar */}
      <div className="flex items-center justify-between">
        <Link
          to="/teacher"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Faculty Overview
        </Link>
        <span className="text-xs text-slate-400 font-medium">Supabase Storage Integrated</span>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200/90 dark:border-slate-800 shadow-sm space-y-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/70 text-indigo-700 dark:text-indigo-300 text-xs font-bold mb-2 border border-indigo-200 dark:border-indigo-800/80">
            <PlusCircle className="w-3.5 h-3.5" />
            <span>Academic Continuity Update</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Publish Class Update
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Provide lecture notes, slides, and assignments. ContinuEd AI will automatically generate personalized catch-up plans for any students who missed today's session.
          </p>
        </div>

        {success && (
          <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/70 border border-emerald-200 dark:border-emerald-800/80 text-emerald-800 dark:text-emerald-300 text-xs font-semibold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>Class update published successfully! AI Continuity generation initialized.</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Row 1: Subject, Topic, Date */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                Course / Subject <span className="text-rose-500">*</span>
              </label>
              <select
                value={formData.subjectId}
                onChange={(e) => setFormData({ ...formData, subjectId: e.target.value })}
                className="w-full px-3 py-2 text-xs sm:text-sm border border-slate-300 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
              >
                {subjects.map((s) => (
                  <option key={s.id} value={s.id} className="bg-white dark:bg-slate-800 text-slate-900 dark:text-white">
                    {s.code}: {s.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                Lecture Date <span className="text-rose-500">*</span>
              </label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="w-full px-3 py-2 text-xs sm:text-sm border border-slate-300 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
              Class Topic <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              value={formData.topic}
              onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
              placeholder="e.g. Doubly Linked Lists & Circular Pointers"
              className="w-full px-3 py-2 text-xs sm:text-sm border border-slate-300 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
              Class Description / Lecture Overview
            </label>
            <textarea
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Summarize the core concepts covered in today's classroom lecture..."
              className="w-full px-3 py-2 text-xs sm:text-sm border border-slate-300 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500"
            />
          </div>

          {/* Important Points */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
              Important Key Points (One per line)
            </label>
            <textarea
              rows={3}
              value={formData.importantPoints}
              onChange={(e) => setFormData({ ...formData, importantPoints: e.target.value })}
              placeholder="• Difference between prev and next pointers&#10;• Memory overhead per node&#10;• Handling circular loop sentinel null checks"
              className="w-full px-3 py-2 text-xs sm:text-sm border border-slate-300 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500"
            />
          </div>

          {/* Teacher Notes */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
              Pedagogical Notes / Common Stumbling Blocks
            </label>
            <textarea
              rows={2}
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              placeholder="e.g. Many students were confused by pointer dereferencing in reverse traversal. Please emphasize Step 2 in the catchup plan."
              className="w-full px-3 py-2 text-xs sm:text-sm border border-slate-300 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500"
            />
          </div>

          {/* File Upload (Supabase Storage Architecture) */}
          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/90 dark:border-slate-700/80 space-y-3">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-bold text-slate-800 dark:text-slate-200">
                Upload Lecture Resources (PDF, PPT/PPTX, Images, Documents)
              </label>
              <span className="text-[10px] text-slate-400 dark:text-slate-500">Max 50MB</span>
            </div>

            <label className="border-2 border-dashed border-slate-300 dark:border-slate-700 hover:border-indigo-400 dark:hover:border-indigo-500 bg-white dark:bg-slate-800 rounded-2xl p-6 flex flex-col items-center justify-center cursor-pointer transition-colors group">
              <CloudUpload className="w-8 h-8 text-slate-400 dark:text-slate-500 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors mb-2" />
              <p className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                Click to browse or drop slides and files here
              </p>
              <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-0.5">
                PDF, PPTX, DOCX, JPG, PNG
              </p>
              <input
                type="file"
                multiple
                accept=".pdf,.ppt,.pptx,.doc,.docx,.png,.jpg,.jpeg"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>

            {/* Upload Progress UI */}
            {uploadProgress !== null && (
              <div className="p-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                <div className="flex justify-between text-xs font-semibold mb-1 text-slate-700 dark:text-slate-300">
                  <span>Uploading to Supabase Storage...</span>
                  <span className="text-indigo-600 dark:text-indigo-400">{uploadProgress}%</span>
                </div>
                <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-indigo-600 rounded-full transition-all duration-150"
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
              </div>
            )}

            {/* Uploaded File List */}
            {uploadedFiles.length > 0 && (
              <div className="space-y-2 pt-2">
                {uploadedFiles.map((file) => (
                  <div
                    key={file.id}
                    className="p-2.5 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 flex items-center justify-between text-xs"
                  >
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                      <span className="font-medium text-slate-800 dark:text-slate-200">{file.title}</span>
                      <span className="text-slate-400 dark:text-slate-500">({file.size})</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeFile(file.id)}
                      className="text-slate-400 hover:text-rose-600 p-1"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Assignment Section */}
          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/90 dark:border-slate-700/80 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              Attached Assignment (Optional)
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Assignment Title
                </label>
                <input
                  type="text"
                  value={formData.assignmentTitle}
                  onChange={(e) => setFormData({ ...formData, assignmentTitle: e.target.value })}
                  placeholder="e.g. Implement Doubly Linked List Traversal"
                  className="w-full px-3 py-2 text-xs border border-slate-300 dark:border-slate-700 rounded-xl focus:outline-none focus:border-indigo-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Submission Deadline
                </label>
                <input
                  type="date"
                  value={formData.assignmentDeadline}
                  onChange={(e) => setFormData({ ...formData, assignmentDeadline: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-slate-300 dark:border-slate-700 rounded-xl focus:outline-none focus:border-indigo-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Assignment Instructions
              </label>
              <textarea
                rows={2}
                value={formData.assignmentDescription}
                onChange={(e) => setFormData({ ...formData, assignmentDescription: e.target.value })}
                placeholder="Specific problem requirements, starter repository links, grading rubrics..."
                className="w-full px-3 py-2 text-xs border border-slate-300 dark:border-slate-700 rounded-xl focus:outline-none focus:border-indigo-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500"
              />
            </div>
          </div>

          {/* Reference Links */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5 flex items-center gap-1.5">
              <Link2 className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500" /> Reference / Video Links
            </label>
            <input
              type="text"
              value={formData.referenceLinks}
              onChange={(e) => setFormData({ ...formData, referenceLinks: e.target.value })}
              placeholder="https://..."
              className="w-full px-3 py-2 text-xs sm:text-sm border border-slate-300 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500"
            />
          </div>

          {/* Submit Button */}
          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-end gap-3">
            <Link to="/teacher">
              <Button variant="outline" size="md">
                Cancel
              </Button>
            </Link>
            <Button
              type="submit"
              variant="ai"
              size="md"
              disabled={isSubmitting}
              icon={Sparkles}
            >
              {isSubmitting ? 'Publishing & Triggering AI...' : 'Publish Class Update'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
