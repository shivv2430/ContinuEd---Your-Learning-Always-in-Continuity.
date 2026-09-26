import { SUBJECTS, MISSED_CLASSES, UPCOMING_CLASSES } from '../data/mockData';

const MISSED_CLASSES_KEY = 'continued_missed_classes';
const SUBJECTS_KEY = 'continued_subjects';
const DATA_VERSION_KEY = 'continued_data_version';
const CURRENT_VERSION = '2.1';

function initStorage() {
  const storedVersion = localStorage.getItem(DATA_VERSION_KEY);
  if (storedVersion !== CURRENT_VERSION) {
    // Refresh with enriched dataset
    localStorage.setItem(SUBJECTS_KEY, JSON.stringify(SUBJECTS));
    localStorage.setItem(MISSED_CLASSES_KEY, JSON.stringify(MISSED_CLASSES));
    localStorage.setItem(DATA_VERSION_KEY, CURRENT_VERSION);
    return;
  }

  if (!localStorage.getItem(MISSED_CLASSES_KEY)) {
    localStorage.setItem(MISSED_CLASSES_KEY, JSON.stringify(MISSED_CLASSES));
  }
  if (!localStorage.getItem(SUBJECTS_KEY)) {
    localStorage.setItem(SUBJECTS_KEY, JSON.stringify(SUBJECTS));
  }
}

initStorage();

export const classService = {
  getSubjects() {
    try {
      const data = localStorage.getItem(SUBJECTS_KEY);
      const parsed = data ? JSON.parse(data) : SUBJECTS;
      // Safeguard: Ensure topics exist
      if (Array.isArray(parsed) && parsed.length > 0 && !parsed[0].topics) {
        localStorage.setItem(SUBJECTS_KEY, JSON.stringify(SUBJECTS));
        return SUBJECTS;
      }
      return parsed;
    } catch {
      return SUBJECTS;
    }
  },

  getSubjectById(id) {
    const subjects = this.getSubjects();
    return (
      subjects.find(
        (s) =>
          s.id === id ||
          s.code.toLowerCase() === (id || '').toLowerCase() ||
          s.name.toLowerCase().replace(/\s+/g, '-') === (id || '').toLowerCase()
      ) || null
    );
  },

  saveSubjects(updatedSubjects) {
    try {
      localStorage.setItem(SUBJECTS_KEY, JSON.stringify(updatedSubjects));
    } catch (e) {
      console.error('Failed to save subjects', e);
    }
  },

  addUploadToTopic(subjectId, topicId, resource) {
    const subjects = this.getSubjects();
    const updated = subjects.map((subj) => {
      if (subj.id !== subjectId) return subj;
      const updatedTopics = (subj.topics || []).map((top) => {
        if (top.id !== topicId) return top;
        const currentResources = top.teacherUploaded?.resources || [];
        const newRes = {
          id: `res_custom_${Date.now()}`,
          title: resource.title || 'Untitled Resource',
          type: resource.type || 'pdf',
          size: resource.size || '1.5 MB',
          uploadDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
          url: resource.url || '#',
        };
        return {
          ...top,
          teacherUploaded: {
            ...top.teacherUploaded,
            resources: [newRes, ...currentResources],
            notes: resource.notes ? `${top.teacherUploaded?.notes || ''}\n${resource.notes}`.trim() : top.teacherUploaded?.notes,
          },
        };
      });
      return { ...subj, topics: updatedTopics };
    });

    this.saveSubjects(updated);
    return updated.find((s) => s.id === subjectId);
  },

  addTopicToSubject(subjectId, topicData) {
    const subjects = this.getSubjects();
    const updated = subjects.map((subj) => {
      if (subj.id !== subjectId) return subj;
      const nextTopicNumber = (subj.topics?.length || 0) + 1;
      const newTopic = {
        id: `topic_${subjectId}_${Date.now()}`,
        topicNumber: nextTopicNumber,
        title: topicData.title,
        date: topicData.date || new Date().toISOString().split('T')[0],
        displayDate: new Date(topicData.date || Date.now()).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
        status: topicData.status || 'attended',
        studentMissed: Boolean(topicData.studentMissed),
        summary: topicData.summary || '',
        teacherUploaded: {
          resources: topicData.resources || [],
          notes: topicData.notes || '',
        },
        teacherAudit: {
          studentsAbsentCount: topicData.studentsAbsentCount || 0,
          absentStudentsList: [],
        },
      };
      return {
        ...subj,
        totalLectures: subj.totalLectures + 1,
        topics: [...(subj.topics || []), newTopic],
      };
    });

    this.saveSubjects(updated);
    return updated.find((s) => s.id === subjectId);
  },

  getMissedClasses() {
    try {
      const data = localStorage.getItem(MISSED_CLASSES_KEY);
      return data ? JSON.parse(data) : MISSED_CLASSES;
    } catch {
      return MISSED_CLASSES;
    }
  },

  getMissedClassById(id) {
    const list = this.getMissedClasses();
    return list.find((item) => item.id === id || item.classId === id) || null;
  },

  getUpcomingClasses() {
    return UPCOMING_CLASSES;
  },

  updateMissedClassStatus(id, newStatus, catchupProgress = null) {
    const list = this.getMissedClasses();
    const updated = list.map((item) => {
      if (item.id === id || item.classId === id) {
        return {
          ...item,
          status: newStatus,
          catchupProgress: catchupProgress !== null ? catchupProgress : (newStatus === 'completed' ? 100 : item.catchupProgress),
        };
      }
      return item;
    });
    localStorage.setItem(MISSED_CLASSES_KEY, JSON.stringify(updated));
    return updated.find((c) => c.id === id || c.classId === id);
  },

  markLearningComplete(id) {
    return this.updateMissedClassStatus(id, 'completed', 100);
  },

  addClass(newClassData) {
    const subjects = this.getSubjects();
    const subject = subjects.find((s) => s.id === newClassData.subjectId || s.name === newClassData.subjectName);

    const newClassItem = {
      id: `missed_custom_${Date.now()}`,
      classId: `class_${Date.now()}`,
      subjectId: subject ? subject.id : 'subj_cs201',
      subjectName: subject ? subject.name : newClassData.subjectName || 'Computer Science',
      subjectCode: subject ? subject.code : 'CS301',
      topic: newClassData.topic,
      missedDate: newClassData.date,
      displayDate: new Date(newClassData.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      instructor: newClassData.instructor || 'Prof. David Vance',
      status: 'needs_catchup',
      catchupProgress: 0,
      estimatedMinutes: 40,
      description: newClassData.description,
      importantPoints: Array.isArray(newClassData.importantPoints)
        ? newClassData.importantPoints
        : (newClassData.importantPoints || '').split('\n').filter(Boolean),
      prerequisites: Array.isArray(newClassData.prerequisites)
        ? newClassData.prerequisites
        : (newClassData.prerequisites || '').split('\n').filter(Boolean),
      notes: newClassData.notes || '',
      resources: newClassData.resources || [],
      assignment: newClassData.assignmentTitle ? {
        id: `asg_${Date.now()}`,
        title: newClassData.assignmentTitle,
        description: newClassData.assignmentDescription || '',
        dueDate: newClassData.assignmentDeadline || '2026-10-05',
        points: 100,
        status: 'pending',
      } : null,
      studentsMissedCount: 3,
      studentsMissedList: [
        { name: 'Alex Rivera', email: 'alex.rivera@university.edu', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150', catchupStatus: 'Not started' },
        { name: 'Marcus Brody', email: 'm.brody@university.edu', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150', catchupStatus: 'Not started' },
      ],
    };

    const currentList = this.getMissedClasses();
    const updated = [newClassItem, ...currentList];
    localStorage.setItem(MISSED_CLASSES_KEY, JSON.stringify(updated));
    return newClassItem;
  },

  deleteClass(id) {
    const list = this.getMissedClasses();
    const updated = list.filter((item) => item.id !== id && item.classId !== id);
    localStorage.setItem(MISSED_CLASSES_KEY, JSON.stringify(updated));
    return true;
  },
};
