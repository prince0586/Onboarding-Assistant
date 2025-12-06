import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import MobileNav from './components/MobileNav';
import Setup from './views/Setup';
import Dashboard from './views/Dashboard';
import Checklist from './views/Checklist';
import Assistant from './views/Assistant';
import Resources from './views/Resources';
import { UserProfile, ViewState, Task } from './types';
import { INITIAL_TASKS } from './constants';

const App: React.FC = () => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [currentView, setCurrentView] = useState<ViewState>('setup');
  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS);

  const handleSetupComplete = (profile: UserProfile) => {
    setUser(profile);
    setCurrentView('dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    setTasks(INITIAL_TASKS);
    setCurrentView('setup');
  };

  if (!user || currentView === 'setup') {
    return <Setup onComplete={handleSetupComplete} />;
  }

  const renderView = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard user={user} tasks={tasks} goToTasks={() => setCurrentView('checklist')} />;
      case 'checklist':
        return <Checklist tasks={tasks} setTasks={setTasks} user={user} />;
      case 'assistant':
        return <Assistant user={user} />;
      case 'resources':
        return <Resources />;
      default:
        return <Dashboard user={user} tasks={tasks} goToTasks={() => setCurrentView('checklist')} />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50 text-gray-900 font-sans overflow-hidden">
      <Sidebar currentView={currentView} setView={setCurrentView} onLogout={handleLogout} />
      
      <main className="flex-1 flex flex-col h-full overflow-hidden relative">
        <header className="bg-white border-b border-gray-200 py-4 px-8 flex justify-between items-center md:hidden z-10">
           <span className="font-bold text-lg text-gray-800">OnboardIA</span>
           <button onClick={handleLogout} className="text-sm text-gray-500">Sign Out</button>
        </header>

        <div className="flex-1 overflow-y-auto p-4 md:p-8 pb-24 md:pb-8 scroll-smooth">
          {renderView()}
        </div>

        <MobileNav currentView={currentView} setView={setCurrentView} />
      </main>
    </div>
  );
};

export default App;
