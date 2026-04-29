export interface Task {
  id: string;
  title: string;
  description?: string;
  category: string;
  progress: number;
  priority: 'low' | 'medium' | 'high';
  dueDate?: string;
  createdAt: string;
  subtasks?: Subtask[];
}

export interface Subtask {
  id: string;
  title: string;
  completed: boolean;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
  taskCount: number;
}

export interface UserProfile {
  name: string;
  email: string;
  avatar: any;
  course: string;
  studentId: string;
  college: string;
  studyStreak: number;
  completedTasks: number;
  totalTasks: number;
}

export const mockTasks: Task[] = [
  {
    id: '1',
    title: 'Complete React Native Assignment',
    description: 'Build a mobile app with navigation and animations',
    category: 'Assignments',
    progress: 0.75,
    priority: 'high',
    dueDate: 'Dec 15, 2024',
    createdAt: '2024-12-01',
    subtasks: [
      { id: '1-1', title: 'Setup project structure', completed: true },
      { id: '1-2', title: 'Implement navigation', completed: true },
      { id: '1-3', title: 'Add animations', completed: false },
      { id: '1-4', title: 'Write documentation', completed: false },
    ],
  },
  {
    id: '2',
    title: 'Study for Calculus Midterm',
    description: 'Review chapters 1-5 and practice problems',
    category: 'Study',
    progress: 0.4,
    priority: 'high',
    dueDate: 'Dec 18, 2024',
    createdAt: '2024-12-02',
  },
  {
    id: '3',
    title: 'Computer Science Project',
    description: 'Develop a web application using React and Node.js',
    category: 'Projects',
    progress: 0.25,
    priority: 'medium',
    dueDate: 'Dec 22, 2024',
    createdAt: '2024-12-03',
  },
  {
    id: '4',
    title: 'Physics Lab Report',
    description: 'Complete lab report on quantum mechanics experiment',
    category: 'Assignments',
    progress: 0.9,
    priority: 'medium',
    dueDate: 'Dec 12, 2024',
    createdAt: '2024-11-28',
  },
  {
    id: '5',
    title: 'Literature Essay',
    description: 'Write 2000-word essay on modern poetry',
    category: 'Assignments',
    progress: 0.1,
    priority: 'low',
    dueDate: 'Dec 20, 2024',
    createdAt: '2024-12-05',
  },
  {
    id: '6',
    title: 'Data Structures Study',
    description: 'Review trees, graphs, and algorithms',
    category: 'Study',
    progress: 0.6,
    priority: 'medium',
    dueDate: 'Dec 25, 2024',
    createdAt: '2024-12-01',
  },
  {
    id: '7',
    title: 'Final Exam Preparation',
    description: 'Comprehensive review of all subjects',
    category: 'Exams',
    progress: 0.3,
    priority: 'high',
    dueDate: 'Jan 5, 2025',
    createdAt: '2024-12-04',
  },
];

export const mockCategories: Category[] = [
  {
    id: '1',
    name: 'Assignments',
    icon: 'doc.text.fill',
    color: '#4f46e5',
    taskCount: 3,
  },
  {
    id: '2',
    name: 'Study',
    icon: 'book.fill',
    color: '#059669',
    taskCount: 2,
  },
  {
    id: '3',
    name: 'Projects',
    icon: 'folder.fill',
    color: '#d97706',
    taskCount: 1,
  },
  {
    id: '4',
    name: 'Exams',
    icon: 'calendar.badge.clock',
    color: '#dc2626',
    taskCount: 1,
  },
];

export const mockUserProfile: UserProfile = {
  name: 'Sonam Wangmo',
  email: 'sonam.wangmo@university.edu',
  avatar: require('../public/images/profile.jpeg'),
  course: '2SWE',
  studentId: '02240363',
  college: 'College of Science and Technology',
  studyStreak: 15,
  completedTasks: 23,
  totalTasks: 30,
};
