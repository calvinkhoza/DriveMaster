import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useApp } from './context/AppContext';
import Navbar from './components/shared/Navbar';
import DashboardLayout from './components/shared/DashboardLayout';

// Public
import LandingPage   from './pages/LandingPage';
import LoginPage     from './pages/auth/LoginPage';
import RegisterPage  from './pages/auth/RegisterPage';

// Student
import StudentDashboard  from './pages/student/StudentDashboard';
import CoursesPage       from './pages/student/CoursesPage';
import NotesPage         from './pages/student/NotesPage';
import MockExamPage      from './pages/student/MockExamPage';
import LiveSessionsPage  from './pages/student/LiveSessionsPage';
import AITutorPage       from './pages/student/AITutorPage';
import ProgressPage      from './pages/student/ProgressPage';
import CommunityPage     from './pages/student/CommunityPage';
import CertificatesPage  from './pages/student/CertificatesPage';

// Instructor
import InstructorDashboard from './pages/instructor/InstructorDashboard';
import ContentManager      from './pages/instructor/ContentManager';
import InstructorLive      from './pages/instructor/InstructorLive';
import InstructorStudents  from './pages/instructor/InstructorStudents';
import RevenuePage         from './pages/instructor/RevenuePage';

// Admin
import AdminDashboard    from './pages/admin/AdminDashboard';
import UserManagement    from './pages/admin/UserManagement';
import SystemMonitoring  from './pages/admin/SystemMonitoring';
import BroadcastPage     from './pages/admin/BroadcastPage';
import SecurityPage      from './pages/admin/SecurityPage';

/* ── Route guards ──────────────────────────────────────────────────────── */
function RequireAuth({ children, allowedRole }) {
  const { user } = useApp();
  const location = useLocation();
  if (!user) return <Navigate to="/login" state={{ from: location }} replace />;
  if (allowedRole && user.role !== allowedRole)
    return <Navigate to={`/${user.role}`} replace />;
  return children;
}

function PublicOnly({ children }) {
  const { user } = useApp();
  if (user) return <Navigate to={`/${user.role}`} replace />;
  return children;
}

/* ── Wrapped dashboard page ────────────────────────────────────────────── */
function DashPage({ children }) {
  return <DashboardLayout>{children}</DashboardLayout>;
}

export default function App() {
  const { user } = useApp();
  const location = useLocation();
  const isAuthPage = ['/login', '/register'].includes(location.pathname);

  return (
    <div className="min-h-screen bg-gray-950">
      {/* Navbar is hidden on auth pages */}
      {!isAuthPage && <Navbar />}

      <Routes>
        {/* ── Public ── */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login"    element={<PublicOnly><LoginPage /></PublicOnly>} />
        <Route path="/register" element={<PublicOnly><RegisterPage /></PublicOnly>} />

        {/* ── Student ── */}
        <Route path="/student" element={
          <RequireAuth allowedRole="student">
            <DashPage><StudentDashboard /></DashPage>
          </RequireAuth>
        } />
        <Route path="/student/courses" element={
          <RequireAuth allowedRole="student">
            <DashPage><CoursesPage /></DashPage>
          </RequireAuth>
        } />
        <Route path="/student/notes" element={
          <RequireAuth allowedRole="student">
            <DashPage><NotesPage /></DashPage>
          </RequireAuth>
        } />
        <Route path="/student/exam" element={
          <RequireAuth allowedRole="student">
            <DashPage><MockExamPage /></DashPage>
          </RequireAuth>
        } />
        <Route path="/student/live" element={
          <RequireAuth allowedRole="student">
            <DashPage><LiveSessionsPage /></DashPage>
          </RequireAuth>
        } />
        <Route path="/student/ai" element={
          <RequireAuth allowedRole="student">
            <DashPage><AITutorPage /></DashPage>
          </RequireAuth>
        } />
        <Route path="/student/progress" element={
          <RequireAuth allowedRole="student">
            <DashPage><ProgressPage /></DashPage>
          </RequireAuth>
        } />
        <Route path="/student/community" element={
          <RequireAuth allowedRole="student">
            <DashPage><CommunityPage /></DashPage>
          </RequireAuth>
        } />
        <Route path="/student/certificates" element={
          <RequireAuth allowedRole="student">
            <DashPage><CertificatesPage /></DashPage>
          </RequireAuth>
        } />

        {/* ── Instructor ── */}
        <Route path="/instructor" element={
          <RequireAuth allowedRole="instructor">
            <DashPage><InstructorDashboard /></DashPage>
          </RequireAuth>
        } />
        <Route path="/instructor/content" element={
          <RequireAuth allowedRole="instructor">
            <DashPage><ContentManager /></DashPage>
          </RequireAuth>
        } />
        <Route path="/instructor/live" element={
          <RequireAuth allowedRole="instructor">
            <DashPage><InstructorLive /></DashPage>
          </RequireAuth>
        } />
        <Route path="/instructor/students" element={
          <RequireAuth allowedRole="instructor">
            <DashPage><InstructorStudents /></DashPage>
          </RequireAuth>
        } />
        <Route path="/instructor/revenue" element={
          <RequireAuth allowedRole="instructor">
            <DashPage><RevenuePage /></DashPage>
          </RequireAuth>
        } />
        {/* Stub placeholders for sidebar links not yet full-paged */}
        <Route path="/instructor/analytics" element={
          <RequireAuth allowedRole="instructor">
            <DashPage><RevenuePage /></DashPage>
          </RequireAuth>
        } />
        <Route path="/instructor/notifications" element={
          <RequireAuth allowedRole="instructor">
            <DashPage><InstructorDashboard /></DashPage>
          </RequireAuth>
        } />

        {/* ── Admin ── */}
        <Route path="/admin" element={
          <RequireAuth allowedRole="admin">
            <DashPage><AdminDashboard /></DashPage>
          </RequireAuth>
        } />
        <Route path="/admin/users" element={
          <RequireAuth allowedRole="admin">
            <DashPage><UserManagement /></DashPage>
          </RequireAuth>
        } />
        <Route path="/admin/monitoring" element={
          <RequireAuth allowedRole="admin">
            <DashPage><SystemMonitoring /></DashPage>
          </RequireAuth>
        } />
        <Route path="/admin/broadcast" element={
          <RequireAuth allowedRole="admin">
            <DashPage><BroadcastPage /></DashPage>
          </RequireAuth>
        } />
        <Route path="/admin/security" element={
          <RequireAuth allowedRole="admin">
            <DashPage><SecurityPage /></DashPage>
          </RequireAuth>
        } />
        <Route path="/admin/settings" element={
          <RequireAuth allowedRole="admin">
            <DashPage><AdminDashboard /></DashPage>
          </RequireAuth>
        } />

        {/* ── Fallback ── */}
        <Route path="*" element={
          <div className="min-h-screen flex flex-col items-center justify-center text-center px-6 pt-16">
            <p className="text-8xl font-black text-white/10 mb-4">404</p>
            <h1 className="text-2xl font-bold text-white mb-2">Page not found</h1>
            <p className="text-gray-400 mb-6">The page you're looking for doesn't exist.</p>
            <a href="/" className="btn-primary">Go home</a>
          </div>
        } />
      </Routes>
    </div>
  );
}
