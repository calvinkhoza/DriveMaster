import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard, PlayCircle, BookOpen, FileQuestion,
  Calendar, MessageSquare, BarChart2, Users, DollarSign,
  Settings, Video, Shield, Bell, HelpCircle, Award,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

const studentNav = [
  { to: '/student',         label: 'Dashboard',      icon: LayoutDashboard },
  { to: '/student/courses', label: 'My Courses',     icon: PlayCircle },
  { to: '/student/notes',   label: 'Notes & Study',  icon: BookOpen },
  { to: '/student/exam',    label: 'Mock Exams',      icon: FileQuestion },
  { to: '/student/live',    label: 'Live Sessions',   icon: Calendar },
  { to: '/student/ai',      label: 'AI Tutor',        icon: MessageSquare },
  { to: '/student/progress',label: 'Progress',        icon: BarChart2 },
  { to: '/student/community',label:'Community',       icon: HelpCircle },
  { to: '/student/certificates',label:'Certificates', icon: Award },
];

const instructorNav = [
  { to: '/instructor',             label: 'Dashboard',        icon: LayoutDashboard },
  { to: '/instructor/content',     label: 'Content Manager',  icon: Video },
  { to: '/instructor/live',        label: 'Live Sessions',    icon: Calendar },
  { to: '/instructor/students',    label: 'Students',         icon: Users },
  { to: '/instructor/revenue',     label: 'Revenue',          icon: DollarSign },
  { to: '/instructor/analytics',   label: 'Analytics',        icon: BarChart2 },
  { to: '/instructor/notifications',label:'Notifications',    icon: Bell },
];

const adminNav = [
  { to: '/admin',              label: 'Overview',       icon: LayoutDashboard },
  { to: '/admin/users',        label: 'User Management',icon: Users },
  { to: '/admin/security',     label: 'Security',       icon: Shield },
  { to: '/admin/monitoring',   label: 'Monitoring',     icon: BarChart2 },
  { to: '/admin/broadcast',    label: 'Broadcast',      icon: Bell },
  { to: '/admin/settings',     label: 'Settings',       icon: Settings },
];

const navMap = { student: studentNav, instructor: instructorNav, admin: adminNav };

export default function Sidebar() {
  const { user, sidebarOpen } = useApp();
  if (!user) return null;

  const items = navMap[user.role] || studentNav;
  const roleColors = {
    student:    'from-primary-600 to-primary-800',
    instructor: 'from-purple-600 to-purple-800',
    admin:      'from-red-600 to-red-800',
  };

  return (
    <>
      {/* Overlay on mobile */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-30 lg:hidden" />
      )}

      <aside
        className={`
          fixed top-16 left-0 bottom-0 z-40 w-60 bg-dark-900 border-r border-white/10
          flex flex-col overflow-y-auto transition-transform duration-300
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        {/* User card */}
        <div className={`m-3 p-3 rounded-xl bg-gradient-to-br ${roleColors[user.role]} bg-opacity-20`}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-base font-bold text-white flex-shrink-0">
              {user.name?.[0]?.toUpperCase()}
            </div>
            <div className="overflow-hidden">
              <p className="text-sm font-semibold text-white truncate">{user.name}</p>
              <p className="text-xs text-white/60 truncate">{user.email}</p>
            </div>
          </div>
        </div>

        {/* Nav items */}
        <nav className="flex-1 px-3 py-2 space-y-0.5">
          {items.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/student' || to === '/instructor' || to === '/admin'}
              className={({ isActive }) =>
                isActive ? 'sidebar-item-active' : 'sidebar-item'
              }
            >
              <Icon size={18} className="flex-shrink-0" />
              <span className="text-sm">{label}</span>
            </NavLink>
          ))}
        </nav>

        {/* Bottom */}
        <div className="p-3 border-t border-white/10">
          <div className="px-3 py-2 text-xs text-gray-600">
            K53 DriveMaster Academy v1.0
          </div>
        </div>
      </aside>
    </>
  );
}
