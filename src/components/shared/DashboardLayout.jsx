import { useApp } from '../../context/AppContext';
import Sidebar from './Sidebar';
import AIChatbot from '../AIChatbot';

export default function DashboardLayout({ children }) {
  const { sidebarOpen } = useApp();

  return (
    <div className="flex min-h-screen bg-gray-950">
      <Sidebar />
      <main
        className={`flex-1 min-h-screen pt-16 transition-all duration-300 ${
          sidebarOpen ? 'lg:ml-60' : 'ml-0'
        }`}
      >
        <div className="p-6 max-w-screen-xl">
          {children}
        </div>
      </main>
      <AIChatbot />
    </div>
  );
}
