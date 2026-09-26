import { PENDING_ASSIGNMENTS } from '../data/mockData';

const ASSIGNMENTS_KEY = 'continued_assignments';

function initAssignments() {
  if (!localStorage.getItem(ASSIGNMENTS_KEY)) {
    localStorage.setItem(ASSIGNMENTS_KEY, JSON.stringify(PENDING_ASSIGNMENTS));
  }
}

initAssignments();

export const assignmentService = {
  getAssignments() {
    try {
      const data = localStorage.getItem(ASSIGNMENTS_KEY);
      return data ? JSON.parse(data) : PENDING_ASSIGNMENTS;
    } catch {
      return PENDING_ASSIGNMENTS;
    }
  },

  submitAssignment(id) {
    const list = this.getAssignments();
    const updated = list.map((a) => (a.id === id ? { ...a, status: 'submitted' } : a));
    localStorage.setItem(ASSIGNMENTS_KEY, JSON.stringify(updated));
    return updated;
  },

  createAssignment(newAssignment) {
    const list = this.getAssignments();
    const item = {
      id: `asg_${Date.now()}`,
      ...newAssignment,
      daysLeft: 7,
      status: 'normal',
    };
    const updated = [item, ...list];
    localStorage.setItem(ASSIGNMENTS_KEY, JSON.stringify(updated));
    return item;
  },
};
