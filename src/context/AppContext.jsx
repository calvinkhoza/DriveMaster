import { createContext, useContext, useState } from 'react';

const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);         // null = logged out
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [chatOpen, setChatOpen] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, text: 'Your mock exam results are ready!', time: '2m ago', read: false },
    { id: 2, text: 'Live session starting in 30 minutes', time: '28m ago', read: false },
    { id: 3, text: 'New lesson added: Emergency Braking', time: '1h ago', read: true },
  ]);

  const login = (userData) => setUser(userData);
  const logout = () => setUser(null);
  const markNotificationsRead = () =>
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));

  return (
    <AppContext.Provider value={{
      user, login, logout,
      sidebarOpen, setSidebarOpen,
      chatOpen, setChatOpen,
      notifications, markNotificationsRead,
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
