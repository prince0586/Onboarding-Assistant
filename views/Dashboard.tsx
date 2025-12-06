import React from 'react';
import { Task, UserProfile, ViewState } from '../types';
import { Circle, CheckCircle2, CalendarClock, Trophy } from 'lucide-react';

interface DashboardProps {
  user: UserProfile;
  tasks: Task[];
  goToTasks: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ user, tasks, goToTasks }) => {
  const completedTasks = tasks.filter(t => t.status === 'completed').length;
  const totalTasks = tasks.length;
  const progress = totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);

  const nextTask = tasks.find(t => t.status === 'pending');
  const day1Tasks = tasks.filter(t => t.category === 'Day 1');
  const day1Progress = Math.round((day1Tasks.filter(t => t.status === 'completed').length / day1Tasks.length) * 100) || 0;

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-fade-in">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-white shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-white opacity-10 rounded-full blur-3xl"></div>
        <div className="relative z-10">
          <h1 className="text-3xl font-bold mb-2">Welcome aboard, {user.name.split(' ')[0]}! 👋</h1>
          <p className="text-blue-100 text-lg max-w-2xl">
            We're thrilled to have you join the {user.department} team as a {user.role}. 
            Your first few days are all about getting settled and comfortable.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Progress Card */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-500 font-medium">Onboarding Progress</h3>
              <Trophy className={`w-5 h-5 ${progress === 100 ? 'text-yellow-500' : 'text-gray-300'}`} />
            </div>
            <div className="flex items-end space-x-2 mb-2">
              <span className="text-4xl font-bold text-gray-900">{progress}%</span>
              <span className="text-sm text-gray-500 mb-1">completed</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
              <div 
                className="bg-blue-600 h-2.5 rounded-full transition-all duration-1000 ease-out" 
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
          <p className="text-xs text-gray-400 mt-4">Keep going! You're doing great.</p>
        </div>

        {/* Day 1 Focus */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col justify-between">
           <div>
             <h3 className="text-gray-500 font-medium mb-4">Day 1 Goals</h3>
             <div className="space-y-3">
               <div className="flex items-center justify-between">
                 <span className="text-sm text-gray-600">Tasks Completed</span>
                 <span className="text-sm font-semibold text-gray-900">{day1Tasks.filter(t => t.status === 'completed').length} / {day1Tasks.length}</span>
               </div>
               <div className="w-full bg-gray-100 rounded-full h-1.5">
                  <div className="bg-green-500 h-1.5 rounded-full" style={{ width: `${day1Progress}%` }}></div>
               </div>
             </div>
           </div>
           <div className="mt-4 pt-4 border-t border-gray-100">
              <p className="text-xs text-gray-500">Focus on meeting your team and setting up your environment today.</p>
           </div>
        </div>

        {/* Quick Action */}
        <div className="bg-blue-50 p-6 rounded-xl border border-blue-100 flex flex-col justify-center items-center text-center">
          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mb-3 shadow-sm">
             <CalendarClock className="text-blue-600 w-6 h-6" />
          </div>
          <h3 className="font-semibold text-gray-900 mb-1">Next Up</h3>
          {nextTask ? (
            <>
              <p className="text-sm text-gray-600 mb-4 line-clamp-2">{nextTask.title}</p>
              <button 
                onClick={goToTasks}
                className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
              >
                Go to Tasks
              </button>
            </>
          ) : (
            <p className="text-sm text-green-600 font-medium">All caught up!</p>
          )}
        </div>
      </div>

      {/* Up Next Section */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
          <h2 className="font-bold text-gray-800">Priority Tasks</h2>
          <button onClick={goToTasks} className="text-sm text-blue-600 hover:text-blue-800 font-medium">View All</button>
        </div>
        <div className="divide-y divide-gray-50">
          {tasks.filter(t => t.status === 'pending').slice(0, 3).map(task => (
             <div key={task.id} className="p-4 flex items-start space-x-3 hover:bg-gray-50 transition-colors">
               <Circle className="w-5 h-5 text-gray-300 mt-0.5 flex-shrink-0" />
               <div>
                 <p className="text-sm font-medium text-gray-800">{task.title}</p>
                 <p className="text-xs text-gray-500 mt-0.5">{task.category}</p>
               </div>
             </div>
          ))}
          {tasks.every(t => t.status === 'completed') && (
            <div className="p-8 text-center text-gray-500">
              <CheckCircle2 className="w-12 h-12 mx-auto text-green-500 mb-2 opacity-50" />
              <p>You have completed all your onboarding tasks!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
