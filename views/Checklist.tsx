import React, { useState } from 'react';
import { Task, UserProfile } from '../types';
import { CheckCircle2, Circle, Sparkles, Loader2, Plus } from 'lucide-react';
import { generateRoleBasedTasks } from '../services/geminiService';

interface ChecklistProps {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  user: UserProfile;
}

const Checklist: React.FC<ChecklistProps> = ({ tasks, setTasks, user }) => {
  const [activeTab, setActiveTab] = useState<'All' | 'Day 1' | 'Week 1' | 'Month 1'>('All');
  const [isGenerating, setIsGenerating] = useState(false);

  const toggleTask = (id: string) => {
    setTasks(prev => prev.map(t => 
      t.id === id ? { ...t, status: t.status === 'completed' ? 'pending' : 'completed' } : t
    ));
  };

  const filteredTasks = activeTab === 'All' 
    ? tasks 
    : tasks.filter(t => t.category === activeTab);

  const handleGenerateTasks = async () => {
    setIsGenerating(true);
    const newTasks = await generateRoleBasedTasks(user);
    if (newTasks.length > 0) {
      const formattedTasks: Task[] = newTasks.map((t, idx) => ({
        id: `gen_${Date.now()}_${idx}`,
        title: t.title || 'New Task',
        description: t.description || '',
        status: 'pending',
        category: t.category || 'Week 1',
        isAiGenerated: true,
      }));
      setTasks(prev => [...prev, ...formattedTasks]);
    }
    setIsGenerating(false);
  };

  return (
    <div className="max-w-4xl mx-auto h-full flex flex-col">
      <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Your Checklist</h1>
          <p className="text-gray-500 text-sm">Track your onboarding journey step by step.</p>
        </div>
        <button
          onClick={handleGenerateTasks}
          disabled={isGenerating}
          className="flex items-center space-x-2 px-4 py-2 bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-100 transition-colors disabled:opacity-50 text-sm font-medium"
        >
          {isGenerating ? <Loader2 className="animate-spin w-4 h-4" /> : <Sparkles className="w-4 h-4" />}
          <span>AI: Add {user.role} Tasks</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg w-full md:w-auto self-start mb-6">
        {(['All', 'Day 1', 'Week 1', 'Month 1'] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 md:flex-none px-4 py-1.5 rounded-md text-sm font-medium transition-all ${
              activeTab === tab 
                ? 'bg-white text-gray-900 shadow-sm' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex-1">
        <div className="divide-y divide-gray-100">
          {filteredTasks.length === 0 ? (
            <div className="p-12 text-center text-gray-400">
              <div className="mx-auto w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center mb-3">
                 <CheckCircle2 className="w-6 h-6 text-gray-300" />
              </div>
              <p>No tasks found for this category.</p>
            </div>
          ) : (
            filteredTasks.map(task => (
              <div 
                key={task.id} 
                className={`p-5 flex items-start group transition-colors hover:bg-gray-50 ${
                  task.status === 'completed' ? 'bg-gray-50/50' : ''
                }`}
              >
                <button 
                  onClick={() => toggleTask(task.id)}
                  className={`mt-0.5 flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                    task.status === 'completed' 
                      ? 'bg-green-500 border-green-500 text-white' 
                      : 'border-gray-300 text-transparent hover:border-blue-400'
                  }`}
                >
                  <CheckCircle2 size={16} fill="currentColor" className={task.status === 'completed' ? 'opacity-100' : 'opacity-0'} />
                </button>
                
                <div className="ml-4 flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className={`font-medium text-gray-900 ${task.status === 'completed' ? 'line-through text-gray-400' : ''}`}>
                      {task.title}
                    </h3>
                    <div className="flex items-center space-x-2">
                       {task.isAiGenerated && (
                         <span className="text-[10px] uppercase tracking-wider font-bold text-indigo-500 bg-indigo-50 px-2 py-0.5 rounded-full">
                           AI
                         </span>
                       )}
                       <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                         task.category === 'Day 1' ? 'bg-orange-100 text-orange-700' :
                         task.category === 'Week 1' ? 'bg-blue-100 text-blue-700' :
                         'bg-purple-100 text-purple-700'
                       }`}>
                         {task.category}
                       </span>
                    </div>
                  </div>
                  <p className={`text-sm text-gray-500 mt-1 ${task.status === 'completed' ? 'line-through opacity-75' : ''}`}>
                    {task.description}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Checklist;
