import { SUBJECTS, MISSED_CLASSES, UPCOMING_CLASSES } from '../data/mockData';

const MISSED_CLASSES_KEY = 'continued_missed_classes';
const SUBJECTS_KEY = 'continued_subjects';

function initStorage() {
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
      return data ? JSON.parse(data) : SUBJECTS;
    } catch {
      return SUBJECTS;
    }
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
