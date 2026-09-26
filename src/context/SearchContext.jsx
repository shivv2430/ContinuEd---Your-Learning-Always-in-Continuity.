import React, { createContext, useContext, useState, useEffect } from 'react';
import { classService } from '../services/classService';
import { assignmentService } from '../services/assignmentService';

const SearchContext = createContext(null);

export const SearchProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  // Global keyboard shortcut
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const q = query.toLowerCase();
    const missedClasses = classService.getMissedClasses();
    const subjects = classService.getSubjects();
    const assignments = assignmentService.getAssignments();

    const matched = [];

    // Search Missed Classes & Topics
    missedClasses.forEach((cls) => {
      if (
        cls.topic.toLowerCase().includes(q) ||
        cls.subjectName.toLowerCase().includes(q) ||
        cls.description.toLowerCase().includes(q)
      ) {
        matched.push({
          type: 'Class / Topic',
          title: cls.topic,
          subtitle: `${cls.subjectName} • ${cls.displayDate}`,
          link: `/student/class/${cls.id}`,
          tag: 'Missed Class',
          tagColor: 'bg-amber-100 text-amber-800',
        });
      }
    });

    // Search Subjects
    subjects.forEach((subj) => {
      if (
        subj.name.toLowerCase().includes(q) ||
        subj.code.toLowerCase().includes(q) ||
        subj.instructor.toLowerCase().includes(q)
      ) {
        matched.push({
          type: 'Subject',
          title: `${subj.code}: ${subj.name}`,
          subtitle: `Instructor: ${subj.instructor}`,
          link: `/student/classes`,
          tag: 'Course',
          tagColor: 'bg-indigo-100 text-indigo-800',
        });
      }
    });

    // Search Assignments
    assignments.forEach((asg) => {
      if (asg.title.toLowerCase().includes(q) || (asg.subject && asg.subject.toLowerCase().includes(q))) {
        matched.push({
          type: 'Assignment',
          title: asg.title,
          subtitle: `Due: ${asg.dueDate} (${asg.points} pts)`,
          link: `/student`,
          tag: 'Assignment',
          tagColor: 'bg-rose-100 text-rose-800',
        });
      }
    });

    setResults(matched);
  }, [query]);

  return (
    <SearchContext.Provider value={{ isOpen, setIsOpen, query, setQuery, results }}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => useContext(SearchContext);
