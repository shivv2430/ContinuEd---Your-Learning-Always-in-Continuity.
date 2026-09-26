import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { NotificationProvider } from './context/NotificationContext';
import { SearchProvider } from './context/SearchContext';

import MainLayout from './layouts/MainLayout';
import AuthLayout from './layouts/AuthLayout';

// Pages
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';

// Student Pages
import StudentDashboard from './pages/student/StudentDashboard';
import StudentClasses from './pages/student/StudentClasses';
import StudentMissedClasses from './pages/student/StudentMissedClasses';
import MissedClassDetail from './pages/student/MissedClassDetail';
import AICatchUpPage from './pages/student/AICatchUpPage';
import AIQuizPage from './pages/student/AIQuizPage';
import StudentProgressPage from './pages/student/StudentProgressPage';

// Teacher Pages
import TeacherDashboard from './pages/teacher/TeacherDashboard';
import TeacherClasses from './pages/teacher/TeacherClasses';
import TeacherNewClass from './pages/teacher/TeacherNewClass';
import TeacherClassDetail from './pages/teacher/TeacherClassDetail';
import TeacherResources from './pages/teacher/TeacherResources';
import TeacherAssignments from './pages/teacher/TeacherAssignments';

// Common Pages
import SettingsPage from './pages/SettingsPage';

function App() {
  return (
    <AuthProvider>
      <NotificationProvider>
        <SearchProvider>
          <BrowserRouter>
            <Routes>
              {/* Public Landing Page */}
              <Route path="/" element={<LandingPage />} />

              {/* Authentication Routes */}
              <Route element={<AuthLayout />}>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
              </Route>

              {/* Student Portal (Main Layout) */}
              <Route path="/student" element={<MainLayout />}>
                <Route index element={<StudentDashboard />} />
                <Route path="classes" element={<StudentClasses />} />
                <Route path="missed" element={<StudentMissedClasses />} />
                <Route path="class/:id" element={<MissedClassDetail />} />
                <Route path="catch-up/:id" element={<AICatchUpPage />} />
                <Route path="quiz/:id" element={<AIQuizPage />} />
                <Route path="progress" element={<StudentProgressPage />} />
              </Route>

              {/* Faculty / Teacher Portal (Main Layout) */}
              <Route path="/teacher" element={<MainLayout />}>
                <Route index element={<TeacherDashboard />} />
                <Route path="classes" element={<TeacherClasses />} />
                <Route path="classes/new" element={<TeacherNewClass />} />
                <Route path="classes/:id" element={<TeacherClassDetail />} />
                <Route path="resources" element={<TeacherResources />} />
                <Route path="assignments" element={<TeacherAssignments />} />
              </Route>

              {/* Settings Route */}
              <Route path="/settings" element={<MainLayout />}>
                <Route index element={<SettingsPage />} />
              </Route>

              {/* Fallback to Home */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </BrowserRouter>
        </SearchProvider>
      </NotificationProvider>
    </AuthProvider>
  );
}

export default App;
