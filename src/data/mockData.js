/**
 * ContinuEd Demo & Mock Dataset
 * Highly realistic academic data for academic continuity
 */

export const INITIAL_USER = {
  id: 'usr_student_01',
  name: 'Alex Rivera',
  email: 'alex.rivera@university.edu',
  role: 'student', // 'student' | 'teacher'
  department: 'Computer Science & Engineering',
  semester: '4th Semester',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250',
};

export const TEACHER_USER = {
  id: 'usr_teacher_01',
  name: 'Prof. David Vance',
  email: 'd.vance@university.edu',
  role: 'teacher',
  department: 'Computer Science & Engineering',
  avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=250',
};

export const SUBJECTS = [
  {
    id: 'subj_cs201',
    code: 'CS201',
    name: 'Data Structures',
    instructor: 'Prof. David Vance',
    instructorEmail: 'd.vance@university.edu',
    instructorOffice: 'Faculty Tower B, Room 412',
    color: '#4F46E5', // Indigo
    badgeColor: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    schedule: 'Mon, Wed, Fri • 10:00 AM',
    progress: 72,
    room: 'Hall B-204',
    credits: 4,
    totalLectures: 24,
    attended: 21,
    missed: 1,
    description:
      'Fundamental principles of data abstraction, memory pointer mechanics, dynamic allocations, balanced tree hierarchies, graphs, hash tables, and asymptotic algorithm complexity analysis.',
    topics: [
      {
        id: 'topic_ds_01',
        topicNumber: 1,
        title: 'Static Arrays, Memory Layout & Asymptotic Notation',
        date: '2026-09-18',
        displayDate: 'September 18, 2026',
        status: 'attended',
        studentMissed: false,
        summary:
          'Review of contiguous memory address calculations, cache line hits, Big-O, Big-Omega, and amortized vector reallocation.',
        teacherUploaded: {
          resources: [
            { id: 'res_ds_01', title: 'Lecture 01 Deck - Asymptotics & Memory Allocation.pdf', type: 'pdf', size: '2.8 MB', uploadDate: 'Sep 18, 2026' },
            { id: 'res_ds_02', title: 'Homework #1 - Big-O Complexity Problem Set.pdf', type: 'doc', size: '420 KB', uploadDate: 'Sep 18, 2026' },
          ],
          notes: 'Covered tight bounds, cache locality advantages of contiguous arrays, and why vector resizing costs amortized O(1).',
        },
        teacherAudit: {
          studentsAbsentCount: 1,
          absentStudentsList: [{ name: 'Liam Patel', email: 'l.patel@university.edu', avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=150', catchupStatus: 'Completed' }],
        },
      },
      {
        id: 'topic_ds_02',
        topicNumber: 2,
        title: 'Linked Lists & Pointer Operations',
        date: '2026-09-24',
        displayDate: 'September 24, 2026',
        status: 'missed',
        studentMissed: true,
        missedClassId: 'missed_ds_01',
        summary:
          'Detailed introduction to singly linked lists, non-contiguous heap pointers, dynamic memory allocation, traversal loops, and node deletion mechanics.',
        studentMissedDetails: {
          reason: 'Absent (University Inter-College Hackathon)',
          missedLecturesCount: 1,
          estimatedMinutes: 40,
          keyConceptsMissed: [
            'Contiguous vs non-contiguous heap memory allocation',
            'Node structure (*next pointer and data payload)',
            'Time complexity trade-off: O(1) prepend vs O(n) arbitrary access',
            'Head pointer vulnerability: avoiding catastrophic memory stranding',
            'Traversing while current != NULL and edge case handling',
          ],
          warningForUpcoming: 'Crucial prerequisite for next class on Doubly & Circular Linked Lists!',
          aiCatchupReady: true,
          quizAvailable: true,
        },
        teacherUploaded: {
          resources: [
            { id: 'res_01', title: 'Lecture 14 Slides - Singly Linked Lists.pdf', type: 'pdf', size: '3.4 MB', uploadDate: 'Sep 24, 2026' },
            { id: 'res_02', title: 'Board Snapshot - Memory Layout Diagram.png', type: 'image', size: '1.2 MB', uploadDate: 'Sep 24, 2026' },
            { id: 'res_03', title: 'Starter Code - node_structure.py', type: 'code', size: '12 KB', uploadDate: 'Sep 24, 2026' },
            { id: 'res_04', title: 'Class Recording - Linked List Pointer Traversal.mp4', type: 'video', size: '185 MB', uploadDate: 'Sep 24, 2026' },
          ],
          notes: 'Emphasized why array resizing is expensive vs dynamic linked nodes. Homework #3 was assigned with deadline Sep 30.',
          assignment: {
            id: 'asg_ds_01',
            title: 'Implement Singly Linked List Operations',
            description: 'Implement insertion at head, insertion at tail, deletion by value, and list traversal.',
            dueDate: 'Sep 30, 2026',
            points: 100,
            status: 'pending',
          },
        },
        teacherAudit: {
          studentsAbsentCount: 4,
          absentStudentsList: [
            { name: 'Alex Rivera (You)', email: 'alex.rivera@university.edu', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150', catchupStatus: 'Not started' },
            { name: 'Marcus Brody', email: 'm.brody@university.edu', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150', catchupStatus: 'In progress' },
            { name: 'Sophia Lin', email: 's.lin@university.edu', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150', catchupStatus: 'Completed' },
            { name: 'Ethan Hunt', email: 'e.hunt@university.edu', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150', catchupStatus: 'Not started' },
          ],
        },
      },
      {
        id: 'topic_ds_03',
        topicNumber: 3,
        title: 'Doubly Linked Lists & Circular Sentinels',
        date: '2026-09-28',
        displayDate: 'September 28, 2026',
        status: 'upcoming',
        studentMissed: false,
        summary:
          'Bidirectional traversal (*prev and *next), dummy head/tail sentinels eliminating edge-case null checks, circular queue mechanics.',
        teacherUploaded: {
          resources: [
            { id: 'res_ds_05', title: 'Lecture 15 Pre-Reading - Doubly Linked Lists.pdf', type: 'pdf', size: '2.1 MB', uploadDate: 'Sep 26, 2026' },
            { id: 'res_ds_06', title: 'Lab 4 Spec - Circular Buffer Implementation.pdf', type: 'doc', size: '510 KB', uploadDate: 'Sep 26, 2026' },
          ],
          notes: 'Students must master singly linked list pointer assignment before this session.',
        },
        teacherAudit: { studentsAbsentCount: 0, absentStudentsList: [] },
      },
      {
        id: 'topic_ds_04',
        topicNumber: 4,
        title: 'Stacks, Call Frames & Expression Parsing',
        date: '2026-09-15',
        displayDate: 'September 15, 2026',
        status: 'attended',
        studentMissed: false,
        summary:
          'LIFO access, call stack execution, parenthesis balancing, and infix to postfix evaluation.',
        teacherUploaded: {
          resources: [
            { id: 'res_ds_07', title: 'Lecture 11 Slides - Stacks & Call Frames.pdf', type: 'pdf', size: '3.1 MB', uploadDate: 'Sep 15, 2026' },
            { id: 'res_ds_08', title: 'Python Code - Shunting Yard Algorithm.py', type: 'code', size: '18 KB', uploadDate: 'Sep 15, 2026' },
          ],
          notes: 'Demonstrated stack overflow and how compilers implement recursion.',
        },
        teacherAudit: { studentsAbsentCount: 2, absentStudentsList: [] },
      },
      {
        id: 'topic_ds_05',
        topicNumber: 5,
        title: 'Binary Search Trees & Traversal Algorithms',
        date: '2026-09-12',
        displayDate: 'September 12, 2026',
        status: 'attended',
        studentMissed: false,
        summary:
          'Hierarchical trees, BST invariant, In-order/Pre-order/Post-order traversals, and search/insert complexity.',
        teacherUploaded: {
          resources: [
            { id: 'res_ds_09', title: 'Lecture 09 Slides - BST Principles.pdf', type: 'pdf', size: '4.2 MB', uploadDate: 'Sep 12, 2026' },
            { id: 'res_ds_10', title: 'Interactive BST Traversal Guide.pdf', type: 'doc', size: '890 KB', uploadDate: 'Sep 12, 2026' },
          ],
          notes: 'Key emphasis: BST degenerative behavior into linked list O(n) if unbalanced.',
        },
        teacherAudit: { studentsAbsentCount: 1, absentStudentsList: [] },
      },
    ],
  },
  {
    id: 'subj_ec202',
    code: 'EC202',
    name: 'Digital Electronics',
    instructor: 'Dr. Sarah Jenkins',
    instructorEmail: 's.jenkins@university.edu',
    instructorOffice: 'Engineering Block C, Room 208',
    color: '#0D9488', // Teal
    badgeColor: 'bg-teal-50 text-teal-700 border-teal-200',
    schedule: 'Tue, Thu • 02:00 PM',
    progress: 65,
    room: 'Lab 3',
    credits: 4,
    totalLectures: 20,
    attended: 18,
    missed: 1,
    description:
      'Study of combinational logic design, sequential memory elements, flip-flops, synchronous and asynchronous counters, shift registers, and finite state machines (FSM).',
    topics: [
      {
        id: 'topic_de_01',
        topicNumber: 1,
        title: 'Boolean Algebra & Karnaugh Map Simplification',
        date: '2026-09-17',
        displayDate: 'September 17, 2026',
        status: 'attended',
        studentMissed: false,
        summary:
          'Sum of products (SOP), Product of sums (POS), minterms, maxterms, and 4-variable K-map minimization techniques.',
        teacherUploaded: {
          resources: [
            { id: 'res_de_01', title: 'Lecture 06 Deck - Karnaugh Maps Mastery.pdf', type: 'pdf', size: '3.6 MB', uploadDate: 'Sep 17, 2026' },
            { id: 'res_de_02', title: 'Practice Sheet - 4-Variable K-Map Problems.pdf', type: 'doc', size: '640 KB', uploadDate: 'Sep 17, 2026' },
          ],
          notes: 'Emphasized don’t-care conditions and avoiding redundant prime implicant loops.',
        },
        teacherAudit: { studentsAbsentCount: 0, absentStudentsList: [] },
      },
      {
        id: 'topic_de_02',
        topicNumber: 2,
        title: 'Sequential Circuits & Flip-Flops',
        date: '2026-09-25',
        displayDate: 'September 25, 2026',
        status: 'missed',
        studentMissed: true,
        missedClassId: 'missed_de_01',
        summary:
          'Difference between combinational logic and sequential logic with internal memory feedback. Analysis of SR Latches, D Flip-Flops, and clock triggers.',
        studentMissedDetails: {
          reason: 'Absent (Medical Checkup)',
          missedLecturesCount: 1,
          estimatedMinutes: 35,
          keyConceptsMissed: [
            'Combinational logic vs sequential state loops',
            'SR Latch forbidden condition (S=1, R=1 in active-high NOR latches)',
            'Clock triggering: Edge-triggered vs Level-sensitive',
            'Setup time (t_su) and hold time (t_h) constraints',
            'Why D flip-flop inverter eliminates indeterminate conditions',
          ],
          warningForUpcoming: 'Crucial prerequisite for next class on JK & T Flip-Flops and Counters!',
          aiCatchupReady: true,
          quizAvailable: true,
        },
        teacherUploaded: {
          resources: [
            { id: 'res_04', title: 'Sequential Logic & Flip-Flop Fundamentals.pdf', type: 'pdf', size: '5.1 MB', uploadDate: 'Sep 25, 2026' },
            { id: 'res_05', title: 'Timing Diagrams Simulation Handout.pdf', type: 'pdf', size: '1.8 MB', uploadDate: 'Sep 25, 2026' },
            { id: 'res_de_03', title: 'Oscilloscope Waveform Capture - Setup Skew.png', type: 'image', size: '920 KB', uploadDate: 'Sep 25, 2026' },
          ],
          notes: 'Dr. Jenkins demonstrated race conditions on the oscilloscope. Assigned Homework #2 on D Flip-Flop timing.',
          assignment: {
            id: 'asg_de_01',
            title: 'D Flip-Flop Timing & Truth Table Analysis',
            description: 'Derive excitation table and draw timing waveforms for master-slave flip-flop.',
            dueDate: 'Oct 02, 2026',
            points: 50,
            status: 'pending',
          },
        },
        teacherAudit: {
          studentsAbsentCount: 3,
          absentStudentsList: [
            { name: 'Alex Rivera (You)', email: 'alex.rivera@university.edu', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150', catchupStatus: 'Not started' },
            { name: 'Liam Patel', email: 'l.patel@university.edu', avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=150', catchupStatus: 'Completed' },
            { name: 'Maya Gomez', email: 'm.gomez@university.edu', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=150', catchupStatus: 'In progress' },
          ],
        },
      },
      {
        id: 'topic_de_03',
        topicNumber: 3,
        title: 'JK & T Flip-Flops and Synchronous Counters',
        date: '2026-09-30',
        displayDate: 'September 30, 2026',
        status: 'upcoming',
        studentMissed: false,
        summary:
          'Toggle mode in JK and T flip-flops, designing modulo-N synchronous up/down counters using excitation tables.',
        teacherUploaded: {
          resources: [
            { id: 'res_de_04', title: 'Lab Guide - Modulo-16 Synchronous Counter.pdf', type: 'doc', size: '1.2 MB', uploadDate: 'Sep 26, 2026' },
          ],
          notes: 'Read up on excitation tables prior to Wednesday lab.',
        },
        teacherAudit: { studentsAbsentCount: 0, absentStudentsList: [] },
      },
    ],
  },
  {
    id: 'subj_ma201',
    code: 'MA201',
    name: 'Mathematics III',
    instructor: 'Dr. Robert Chen',
    instructorEmail: 'r.chen@university.edu',
    instructorOffice: 'Science Building A, Room 315',
    color: '#EA580C', // Orange
    badgeColor: 'bg-orange-50 text-orange-700 border-orange-200',
    schedule: 'Mon, Wed • 11:30 AM',
    progress: 85,
    room: 'Lecture Hall 1',
    credits: 4,
    totalLectures: 22,
    attended: 21,
    missed: 1,
    description:
      'Advanced engineering mathematics covering vector spaces, linear transformations, eigenvalue decompositions, Fourier transforms, and boundary value partial differential equations.',
    topics: [
      {
        id: 'topic_ma_01',
        topicNumber: 1,
        title: 'Vector Spaces & Subspace Basis',
        date: '2026-09-15',
        displayDate: 'September 15, 2026',
        status: 'attended',
        studentMissed: false,
        summary:
          'Linear independence, spanning sets, dimension of vector spaces, row space, column space, and null space.',
        teacherUploaded: {
          resources: [
            { id: 'res_ma_01', title: 'Lecture 08 Notes - Linear Independence & Basis.pdf', type: 'pdf', size: '2.5 MB', uploadDate: 'Sep 15, 2026' },
          ],
          notes: 'Demonstrated Rank-Nullity Theorem with worked 4x4 matrix.',
        },
        teacherAudit: { studentsAbsentCount: 1, absentStudentsList: [] },
      },
      {
        id: 'topic_ma_02',
        topicNumber: 2,
        title: 'Eigenvalues & Characteristic Equations',
        date: '2026-09-22',
        displayDate: 'September 22, 2026',
        status: 'missed',
        studentMissed: true,
        missedClassId: 'missed_ma_01',
        summary:
          'Finding eigenvalues and eigenvectors of 2x2 and 3x3 square matrices using det(A - lambda*I) = 0 and solving the homogeneous null space.',
        studentMissedDetails: {
          reason: 'Absent (Severe Commute Disruption)',
          missedLecturesCount: 1,
          estimatedMinutes: 45,
          keyConceptsMissed: [
            'Definition: A*v = lambda*v where v != 0 is the eigenvector',
            'Solving det(A - lambda*I) = 0 yields the characteristic polynomial',
            'Multiplicity of eigenvalues: algebraic vs geometric multiplicity',
            'Applications in principal component analysis (PCA) and stability analysis',
          ],
          warningForUpcoming: 'Crucial prerequisite for Diagonalization of Symmetric Matrices!',
          aiCatchupReady: true,
          quizAvailable: true,
        },
        teacherUploaded: {
          resources: [
            { id: 'res_06', title: 'Eigenvalues and Diagonalization Guide.pdf', type: 'pdf', size: '2.9 MB', uploadDate: 'Sep 22, 2026' },
            { id: 'res_ma_02', title: 'Class Handout - Characteristic Polynomial Roots.pdf', type: 'doc', size: '580 KB', uploadDate: 'Sep 22, 2026' },
          ],
          notes: 'Calculated 3 examples on the blackboard. Students struggled most with distinguishing algebraic vs geometric multiplicity.',
          assignment: {
            id: 'asg_ma_01',
            title: 'Characteristic Polynomial Problem Set',
            description: 'Compute eigenvalues and find eigenvectors for 5 provided matrices in problem set 4.',
            dueDate: 'Sep 28, 2026',
            points: 75,
            status: 'submitted',
          },
        },
        teacherAudit: {
          studentsAbsentCount: 2,
          absentStudentsList: [
            { name: 'Alex Rivera (You)', email: 'alex.rivera@university.edu', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150', catchupStatus: 'In progress' },
            { name: 'Chloe Taylor', email: 'c.taylor@university.edu', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150', catchupStatus: 'Completed' },
          ],
        },
      },
      {
        id: 'topic_ma_03',
        topicNumber: 3,
        title: 'Diagonalization of Symmetric Matrices',
        date: '2026-09-29',
        displayDate: 'September 29, 2026',
        status: 'upcoming',
        studentMissed: false,
        summary:
          'Orthogonal diagonalization, Spectral Theorem, and matrix powers via A^k = P * D^k * P^-1.',
        teacherUploaded: {
          resources: [
            { id: 'res_ma_03', title: 'Lecture 12 Preview - Spectral Theorem.pdf', type: 'pdf', size: '2.2 MB', uploadDate: 'Sep 25, 2026' },
          ],
          notes: 'Requires mastery of finding eigenvectors from the previous lecture.',
        },
        teacherAudit: { studentsAbsentCount: 0, absentStudentsList: [] },
      },
    ],
  },
  {
    id: 'subj_cs105',
    code: 'CS105',
    name: 'Python Programming',
    instructor: 'Prof. Elena Rostova',
    instructorEmail: 'e.rostova@university.edu',
    instructorOffice: 'Computing Hub, Room 102',
    color: '#0284C7', // Sky
    badgeColor: 'bg-sky-50 text-sky-700 border-sky-200',
    schedule: 'Fri • 03:00 PM',
    progress: 90,
    room: 'Comp Lab 1',
    credits: 3,
    totalLectures: 18,
    attended: 18,
    missed: 0,
    description:
      'Modern Python application engineering, functional paradigms, object-oriented design patterns, generator pipelines, asynchronous concurrency, and clean test-driven design.',
    topics: [
      {
        id: 'topic_py_01',
        topicNumber: 1,
        title: 'Object-Oriented Programming & Dunder Protocols',
        date: '2026-09-20',
        displayDate: 'September 20, 2026',
        status: 'attended',
        studentMissed: false,
        summary:
          'Classes, encapsulation, inheritance hierarchies, abstract base classes, and dunder methods (__str__, __repr__, __eq__, __iter__).',
        teacherUploaded: {
          resources: [
            { id: 'res_py_01', title: 'Lecture 08 Deck - Python OOP & Data Model.pdf', type: 'pdf', size: '4.8 MB', uploadDate: 'Sep 20, 2026' },
            { id: 'res_py_02', title: 'Starter Code - banking_system_skeleton.py', type: 'code', size: '24 KB', uploadDate: 'Sep 20, 2026' },
            { id: 'res_py_03', title: 'Recording - Dunder Methods in Practice.mp4', type: 'video', size: '210 MB', uploadDate: 'Sep 20, 2026' },
          ],
          notes: 'Assigned OOP Banking System CLI Project due Oct 05.',
          assignment: {
            id: 'asg_py_01',
            title: 'Object-Oriented Banking System CLI',
            description: 'Implement polymorphic Account classes with transaction history generators.',
            dueDate: 'Oct 05, 2026',
            points: 100,
            status: 'pending',
          },
        },
        teacherAudit: { studentsAbsentCount: 0, absentStudentsList: [] },
      },
      {
        id: 'topic_py_02',
        topicNumber: 2,
        title: 'Generators, Iterators & Memory-Efficient Pipelines',
        date: '2026-09-13',
        displayDate: 'September 13, 2026',
        status: 'attended',
        studentMissed: false,
        summary:
          'The yield statement, generator functions vs expressions, infinite streams, and stream processing large CSV datasets without RAM blowup.',
        teacherUploaded: {
          resources: [
            { id: 'res_py_04', title: 'Generators and Coroutines in Python.pdf', type: 'pdf', size: '3.1 MB', uploadDate: 'Sep 13, 2026' },
            { id: 'res_py_05', title: 'Dataset Processing Benchmark Script.py', type: 'code', size: '14 KB', uploadDate: 'Sep 13, 2026' },
          ],
          notes: 'Great attendance and active participation in the live coding session.',
        },
        teacherAudit: { studentsAbsentCount: 0, absentStudentsList: [] },
      },
    ],
  },
];

export const MISSED_CLASSES = [
  {
    id: 'missed_ds_01',
    classId: 'class_ds_linkedlists',
    subjectId: 'subj_cs201',
    subjectName: 'Data Structures',
    subjectCode: 'CS201',
    topic: 'Linked Lists & Pointer Operations',
    missedDate: '2026-09-24',
    displayDate: 'September 24, 2026',
    instructor: 'Prof. David Vance',
    status: 'needs_catchup', // 'needs_catchup' | 'in_progress' | 'completed'
    catchupProgress: 0, // 0 - 100%
    estimatedMinutes: 40,
    description:
      'Detailed introduction to singly linked lists, comparison with contiguous memory arrays, dynamic pointer allocation, and head pointer mechanics.',
    importantPoints: [
      'Contiguous vs. non-contiguous memory allocations in heap vs stack',
      'Node structure: data payload and next reference pointer (*next)',
      'Time complexity tradeoffs: O(1) prepend vs O(n) arbitrary access',
      'Handling edge cases: null head pointer and single-element lists',
      'Memory leaks: why deallocating traversed pointers matters in C/C++ and garbage collection in Java/Python',
    ],
    prerequisites: ['Static Arrays', 'Pointers & Memory Addresses', 'Structs / Classes Basics'],
    notes:
      'Prof. Vance covered how arrays suffer from expensive shifts during insertion O(n), whereas linked lists can insert in O(1) if pointer is already at hand. Homework #3 was assigned.',
    resources: [
      {
        id: 'res_01',
        title: 'Lecture 14 Slides - Singly Linked Lists.pdf',
        type: 'pdf',
        size: '3.4 MB',
        url: '#',
      },
      {
        id: 'res_02',
        title: 'Board Snapshot - Memory Layout Diagram.png',
        type: 'image',
        size: '1.2 MB',
        url: '#',
      },
      {
        id: 'res_03',
        title: 'Starter Code - node_structure.py',
        type: 'doc',
        size: '12 KB',
        url: '#',
      },
    ],
    assignment: {
      id: 'asg_ds_01',
      title: 'Implement Singly Linked List Operations',
      description:
        'Implement insertion at head, insertion at tail, deletion by value, and list traversal in your preferred language. Test against empty lists.',
      dueDate: '2026-09-30',
      points: 100,
      status: 'pending',
    },
    studentsMissedCount: 4,
    studentsMissedList: [
      { name: 'Alex Rivera', email: 'alex.rivera@university.edu', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150', catchupStatus: 'Not started' },
      { name: 'Marcus Brody', email: 'm.brody@university.edu', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150', catchupStatus: 'In progress' },
      { name: 'Sophia Lin', email: 's.lin@university.edu', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150', catchupStatus: 'Completed' },
      { name: 'Ethan Hunt', email: 'e.hunt@university.edu', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150', catchupStatus: 'Not started' },
    ],
  },
  {
    id: 'missed_de_01',
    classId: 'class_de_sequential',
    subjectId: 'subj_ec202',
    subjectName: 'Digital Electronics',
    subjectCode: 'EC202',
    topic: 'Sequential Circuits & Flip-Flops',
    missedDate: '2026-09-25',
    displayDate: 'September 25, 2026',
    instructor: 'Dr. Sarah Jenkins',
    status: 'needs_catchup',
    catchupProgress: 0,
    estimatedMinutes: 35,
    description:
      'Difference between combinational logic and sequential logic with internal memory feedback. Analysis of SR Latches, D Flip-Flops, and clock triggers.',
    importantPoints: [
      'Combinational logic output depends purely on current inputs',
      'Sequential logic incorporates state feedback loops storing previous memory',
      'SR Latch invalid state (S=1, R=1 in active-high NOR latches)',
      'Clock triggering: Edge-triggered (rising/falling) vs Level-sensitive',
      'Setup time (t_su) and hold time (t_h) timing constraints',
    ],
    prerequisites: ['Logic Gates (AND, OR, NOT, NAND, NOR)', 'Truth Tables', 'Boolean Algebra'],
    notes:
      'Dr. Jenkins demonstrated race conditions on the oscilloscope. She emphasized understanding why D flip-flops eliminate indeterminate states.',
    resources: [
      {
        id: 'res_04',
        title: 'Sequential Logic & Flip-Flop Fundamentals.pdf',
        type: 'pdf',
        size: '5.1 MB',
        url: '#',
      },
      {
        id: 'res_05',
        title: 'Timing Diagrams Simulation Handout.pdf',
        type: 'pdf',
        size: '1.8 MB',
        url: '#',
      },
    ],
    assignment: {
      id: 'asg_de_01',
      title: 'D Flip-Flop Timing & Truth Table Analysis',
      description:
        'Derive the excitation table for a JK flip-flop and draw the timing waveform for a master-slave configuration with clock skew.',
      dueDate: '2026-10-02',
      points: 50,
      status: 'pending',
    },
    studentsMissedCount: 3,
    studentsMissedList: [
      { name: 'Alex Rivera', email: 'alex.rivera@university.edu', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150', catchupStatus: 'Not started' },
      { name: 'Liam Patel', email: 'l.patel@university.edu', avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=150', catchupStatus: 'Completed' },
      { name: 'Maya Gomez', email: 'm.gomez@university.edu', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=150', catchupStatus: 'In progress' },
    ],
  },
  {
    id: 'missed_ma_01',
    classId: 'class_ma_eigen',
    subjectId: 'subj_ma201',
    subjectName: 'Mathematics III',
    subjectCode: 'MA201',
    topic: 'Eigenvalues & Characteristic Equations',
    missedDate: '2026-09-22',
    displayDate: 'September 22, 2026',
    instructor: 'Dr. Robert Chen',
    status: 'in_progress',
    catchupProgress: 50,
    estimatedMinutes: 45,
    description:
      'Finding eigenvalues and eigenvectors of 2x2 and 3x3 square matrices using det(A - lambda*I) = 0 and solving the homogeneous null space.',
    importantPoints: [
      'Definition: A*v = lambda*v where v != 0 is the eigenvector',
      'Solving det(A - lambda*I) = 0 yields the characteristic polynomial',
      'Multiplicity of eigenvalues: algebraic vs geometric multiplicity',
      'Applications in principal component analysis (PCA) and stability analysis',
    ],
    prerequisites: ['Matrix Multiplication', 'Determinants of 2x2 and 3x3 matrices', 'Gaussian Elimination'],
    notes:
      'Calculated 3 examples on the blackboard. Students struggled most with distinguishing algebraic vs geometric multiplicity when lambda has repeated roots.',
    resources: [
      {
        id: 'res_06',
        title: 'Eigenvalues and Diagonalization Guide.pdf',
        type: 'pdf',
        size: '2.9 MB',
        url: '#',
      },
    ],
    assignment: {
      id: 'asg_ma_01',
      title: 'Characteristic Polynomial Problem Set',
      description: 'Compute eigenvalues and find eigenvectors for 5 provided matrices in problem set 4.',
      dueDate: '2026-09-28',
      points: 75,
      status: 'submitted',
    },
    studentsMissedCount: 2,
    studentsMissedList: [
      { name: 'Alex Rivera', email: 'alex.rivera@university.edu', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150', catchupStatus: 'In progress' },
      { name: 'Chloe Taylor', email: 'c.taylor@university.edu', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150', catchupStatus: 'Completed' },
    ],
  },
];

export const UPCOMING_CLASSES = [
  {
    id: 'up_01',
    subject: 'Data Structures',
    topic: 'Doubly Linked Lists & Circular Lists',
    instructor: 'Prof. David Vance',
    time: 'Tomorrow, 10:00 AM',
    room: 'Hall B-204',
    badgeColor: 'bg-indigo-50 text-indigo-700',
    prerequisiteNote: 'Requires understanding Singly Linked Lists',
  },
  {
    id: 'up_02',
    subject: 'Digital Electronics',
    topic: 'JK & T Flip-Flops and Counters',
    instructor: 'Dr. Sarah Jenkins',
    time: 'Wednesday, 02:00 PM',
    room: 'Lab 3',
    badgeColor: 'bg-teal-50 text-teal-700',
    prerequisiteNote: 'Requires understanding SR & D Flip-Flops',
  },
  {
    id: 'up_03',
    subject: 'Mathematics III',
    topic: 'Diagonalization of Symmetric Matrices',
    instructor: 'Dr. Robert Chen',
    time: 'Wednesday, 11:30 AM',
    room: 'Lecture Hall 1',
    badgeColor: 'bg-orange-50 text-orange-700',
    prerequisiteNote: 'Requires understanding Eigenvalues',
  },
];

export const PENDING_ASSIGNMENTS = [
  {
    id: 'asg_ds_01',
    title: 'Implement Singly Linked List Operations',
    subject: 'Data Structures',
    dueDate: 'Sep 30, 2026',
    daysLeft: 4,
    status: 'urgent',
    points: 100,
  },
  {
    id: 'asg_de_01',
    title: 'D Flip-Flop Timing & Truth Table Analysis',
    subject: 'Digital Electronics',
    dueDate: 'Oct 02, 2026',
    daysLeft: 6,
    status: 'normal',
    points: 50,
  },
  {
    id: 'asg_py_01',
    title: 'Object-Oriented Banking System CLI',
    subject: 'Python Programming',
    dueDate: 'Oct 05, 2026',
    daysLeft: 9,
    status: 'normal',
    points: 100,
  },
];

export const AI_CATCHUP_PLANS = {
  missed_ds_01: {
    missedClassId: 'missed_ds_01',
    topic: 'Linked Lists & Pointer Operations',
    subject: 'Data Structures',
    simpleExplanation:
      'Imagine an array as a row of connected school lockers: all lockers are in a strict physical row, and expanding them requires relocating the entire wall. A Linked List is like a treasure hunt: each locker (node) can be anywhere in the building, but each contains a piece of paper pointing with an address to the next locker.\n\nBecause nodes do not need to be consecutive in memory, you can insert or remove a node anywhere in constant O(1) time simply by reconnecting the paper links, without having to shift every single item behind it.',
    keyConcepts: [
      {
        title: 'Node Anatomy',
        description: 'A composite container holding two things: the stored Data and a Pointer (*next) referencing the memory address of the succeeding Node.',
        badge: 'Fundamental',
      },
      {
        title: 'Head Pointer Reference',
        description: 'The sole entry point to the list. If you lose the Head pointer reference, the entire list becomes unreachable in memory (a memory leak).',
        badge: 'Critical',
      },
      {
        title: 'O(1) vs O(n) Complexity',
        description: 'Arrays grant O(1) instant random access by index, but O(n) insertion. Linked lists give O(1) insertion at current pointer, but require O(n) traversal to find arbitrary indices.',
        badge: 'Exam Favorite',
      },
      {
        title: 'Null Pointer Sentinel',
        description: 'The tail node points to NULL (or None), signaling the deliberate terminus of traversal loops.',
        badge: 'Edge Case',
      },
    ],
    whatToKnowFirst: [
      'How pointers hold memory addresses in C/C++ or how object references behave in Python/Java',
      'The difference between contiguous stack memory and dynamic heap allocation (malloc/new)',
      'Basic while loop traversal conditions (while current != null)',
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Review Pointer & Memory Layout Basics',
        durationMinutes: 10,
        type: 'Review',
        summary: 'Understand how references point to memory blocks in the heap.',
        completed: true,
      },
      {
        stepNumber: 2,
        title: 'Understand Singly Linked List Core Mechanics',
        durationMinutes: 15,
        type: 'Core Concept',
        summary: 'Walk through node creation, head updates, and pointer reassignment visual sequences.',
        completed: false,
      },
      {
        stepNumber: 3,
        title: 'Practice Insertion & Deletion Walkthrough',
        durationMinutes: 10,
        type: 'Interactive Practice',
        summary: 'Trace edge cases: inserting at head, middle, and tail with null guards.',
        completed: false,
      },
      {
        stepNumber: 4,
        title: 'Take Continuity Validation Quiz',
        durationMinutes: 5,
        type: 'Quiz Assessment',
        summary: '5 targeted questions to certify your mastery and mark this class caught up.',
        completed: false,
      },
    ],
    practiceQuestions: [
      {
        q: 'Why does inserting a node at the head of a linked list take O(1) time, while inserting at the beginning of an array takes O(n)?',
        hint: 'Think about whether other elements need to shift in memory.',
      },
      {
        q: 'What happens if you reassign the head pointer before connecting the new node’s next pointer to the old head?',
        hint: 'Draw the memory links on paper; you lose the rest of the chain.',
      },
      {
        q: 'How do you detect if a singly linked list has reached its final element?',
        hint: 'Check the value of node.next.',
      },
    ],
  },

  missed_de_01: {
    missedClassId: 'missed_de_01',
    topic: 'Sequential Circuits & Flip-Flops',
    subject: 'Digital Electronics',
    simpleExplanation:
      'In basic combinational logic (like an AND or OR gate), the output depends exclusively on what you are pressing right this millisecond. The moment you let go, it forgets everything. Sequential logic introduces memory feedback: the circuit remembers its previous state.\n\nA Flip-Flop is the fundamental 1-bit memory cell of modern computer CPUs. By using feedback loops regulated by a periodic clock pulse, flip-flops sample and hold bit states securely without oscillating into chaos.',
    keyConcepts: [
      {
        title: 'Memory Feedback Loop',
        description: 'Cross-coupling outputs back into inputs creates bistable states that sustain high (1) or low (0) indefinitely until triggered.',
        badge: 'Fundamental',
      },
      {
        title: 'SR Latch Race Conditions',
        description: 'When Set=1 and Reset=1 simultaneously in a NOR latch, both outputs turn 0. When released, circuit races unpredictably into an indeterminate state.',
        badge: 'Critical',
      },
      {
        title: 'The D Flip-Flop Solution',
        description: 'Data (D) flip-flop passes the input D to output Q strictly on a designated clock edge (rising or falling), completely avoiding invalid state overlaps.',
        badge: 'Core Architecture',
      },
      {
        title: 'Setup & Hold Timing',
        description: 'Input data must remain stable for t_setup before the clock edge and t_hold after the edge to prevent metastability.',
        badge: 'Hardware Standard',
      },
    ],
    whatToKnowFirst: [
      'Basic logic gate truth tables (NAND, NOR, Inverters)',
      'Understanding clock waveforms (period, frequency, rising and falling edges)',
      'Propagation delays through physical silicon transistors',
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Review Combinational vs Sequential Foundations',
        durationMinutes: 10,
        type: 'Review',
        summary: 'Contrast memoryless circuits with state-driven feedback loops.',
        completed: false,
      },
      {
        stepNumber: 2,
        title: 'Master SR Latches & D Flip-Flop Mechanics',
        durationMinutes: 15,
        type: 'Core Concept',
        summary: 'Inspect how clock edges capture data and isolate invalid states.',
        completed: false,
      },
      {
        stepNumber: 3,
        title: 'Analyze Timing Diagrams & Metastability',
        durationMinutes: 10,
        type: 'Interactive Practice',
        summary: 'Trace output waveforms across clock transitions with real setup/hold constraints.',
        completed: false,
      },
      {
        stepNumber: 4,
        title: 'Complete Flip-Flop Mastery Quiz',
        durationMinutes: 5,
        type: 'Quiz Assessment',
        summary: '5 questions verifying state transitions and clock triggering.',
        completed: false,
      },
    ],
    practiceQuestions: [
      {
        q: 'Why is S=1, R=1 called the forbidden or invalid state in a NOR-based SR latch?',
        hint: 'Examine what happens to Q and Q_bar outputs.',
      },
      {
        q: 'How does a D flip-flop guarantee that the forbidden state never occurs?',
        hint: 'Look at the inverter placed between S and R inputs.',
      },
    ],
  },
};

export const QUIZZES = {
  missed_ds_01: [
    {
      id: 1,
      question: 'What is the time complexity of prepending (inserting at the head) in a Singly Linked List when you hold a reference to the head node?',
      options: ['O(1)', 'O(n)', 'O(log n)', 'O(n²)'],
      correctIndex: 0,
      explanation: 'Inserting at the head requires simply pointing the new node to the current head and moving the head pointer. No element shifting is needed, making it strictly O(1) constant time.',
    },
    {
      id: 2,
      question: 'What catastrophe occurs if you execute `head = newNode;` before doing `newNode.next = head;`?',
      options: [
        'The list will reverse automatically',
        'You overwrite the head reference, losing access to all subsequent nodes in memory',
        'A compile-time syntax error is thrown by the compiler',
        'The node will insert at the tail instead'
      ],
      correctIndex: 1,
      explanation: 'Because `head` was the only known entry point into the list, overwriting it first breaks the reference chain, stranding the rest of the list in memory (causing a memory leak).',
    },
    {
      id: 3,
      question: 'Which of the following describes a key advantage of Linked Lists over static Arrays?',
      options: [
        'Direct random access to any element in O(1) time',
        'Smaller memory footprint because no pointer overhead is needed',
        'Dynamic sizing without requiring contiguous blocks of memory allocation',
        'Better CPU cache locality during sequential iteration'
      ],
      correctIndex: 2,
      explanation: 'Linked lists allocate nodes dynamically anywhere in heap memory as needed, unlike static arrays which require a single contiguous chunk of reserved memory.',
    },
    {
      id: 4,
      question: 'What marks the end of a standard Singly Linked List during a traversal loop?',
      options: [
        'The next pointer contains a zero value or NULL / None pointer',
        'The next pointer points back to the first node',
        'The node’s data payload contains -1',
        'A special end-of-file EOF byte marker'
      ],
      correctIndex: 0,
      explanation: 'The terminal node’s next pointer is explicitly assigned to NULL (or None in Python), which terminates while loops like `while (current != null)`.',
    },
    {
      id: 5,
      question: 'To delete a node B located between node A and node C (A -> B -> C), what pointer modification must you execute?',
      options: [
        'A.next = B.next',
        'B.next = NULL',
        'A.next = NULL',
        'C.next = A'
      ],
      correctIndex: 0,
      explanation: 'Setting `A.next = B.next` (which points to C) bypasses node B entirely. Once bypassed, node B can be safely freed from memory.',
    },
  ],

  missed_de_01: [
    {
      id: 1,
      question: 'What distinguishes a sequential logic circuit from a combinational logic circuit?',
      options: [
        'Sequential circuits use higher voltage levels',
        'Sequential circuits include memory feedback loops that remember previous states',
        'Combinational circuits only use NAND gates',
        'Sequential circuits cannot be simulated on modern computers'
      ],
      correctIndex: 1,
      explanation: 'Sequential circuits contain feedback mechanisms allowing current outputs to depend on past inputs as well as present inputs.',
    },
    {
      id: 2,
      question: 'In an active-high NOR-gate SR latch, what input condition represents the "invalid/forbidden" state?',
      options: ['S = 0, R = 0', 'S = 1, R = 0', 'S = 0, R = 1', 'S = 1, R = 1'],
      correctIndex: 3,
      explanation: 'Setting both Set=1 and Reset=1 forces both outputs Q and Q_bar to 0 simultaneously, violating the complementary rule and risking race conditions upon release.',
    },
    {
      id: 3,
      question: 'How does a D (Data) Flip-Flop prevent the invalid condition present in basic SR latches?',
      options: [
        'By running at higher clock frequencies',
        'By using an inverter between the Set and Reset control branches, ensuring inputs are always complementary',
        'By utilizing analog capacitors to buffer current spikes',
        'By doubling the number of feedback resistors'
      ],
      correctIndex: 1,
      explanation: 'In a D flip-flop, input D drives S, and NOT(D) drives R. Thus, S and R can never be 1 at the same time.',
    },
    {
      id: 4,
      question: 'What is "setup time" (t_su) in flip-flop specifications?',
      options: [
        'The time required to install the chip onto a printed circuit board',
        'The minimum duration the data input must remain stable BEFORE the active clock transition edge',
        'The delay between powering on the power supply and output availability',
        'The time required to cool down the gate junction temperature'
      ],
      correctIndex: 1,
      explanation: 'Setup time is the indispensable time interval that data input must stay steady prior to the triggering clock edge to ensure reliable bit capture.',
    },
    {
      id: 5,
      question: 'An edge-triggered flip-flop responds to its inputs during:',
      options: [
        'The entire high level of the clock signal',
        'Only during the transition instant (rising or falling edge) of the clock pulse',
        'The entire low level of the clock signal',
        'Randomly whenever heat fluctuations trigger the silicon'
      ],
      correctIndex: 1,
      explanation: 'Edge-triggered flip-flops sample input states strictly during the sharp transition edge (0 to 1 or 1 to 0), remaining immune to glitches during level states.',
    },
  ],
};

export const NOTIFICATIONS = [
  {
    id: 'notif_01',
    title: 'New Class Notes Available',
    message: 'Prof. David Vance uploaded Lecture 14 Slides for Data Structures.',
    time: '2 hours ago',
    type: 'info',
    read: false,
    link: '/student/class/missed_ds_01',
  },
  {
    id: 'notif_02',
    title: 'Assignment Deadline Approaching',
    message: 'Implement Singly Linked List Operations is due in 4 days.',
    time: '5 hours ago',
    type: 'warning',
    read: false,
    link: '/student/class/missed_ds_01',
  },
  {
    id: 'notif_03',
    title: 'Unfinished Catch-Up Plan',
    message: 'You have completed Step 1 of your Linked Lists recovery plan. Continue now!',
    time: 'Yesterday',
    type: 'alert',
    read: false,
    link: '/student/catch-up/missed_ds_01',
  },
  {
    id: 'notif_04',
    title: 'Catch-Up Milestone Reached! 🎯',
    message: 'You successfully caught up on Mathematics III: Eigenvalues.',
    time: '2 days ago',
    type: 'success',
    read: true,
    link: '/student/progress',
  },
];
