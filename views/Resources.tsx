import React from 'react';
import { RESOURCES } from '../constants';
import * as LucideIcons from 'lucide-react';

const Resources: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Company Resources</h1>
        <p className="text-gray-500 text-sm">Quick access to essential tools and documents.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {RESOURCES.map((resource, index) => {
          // Dynamically resolve icon from string name
          // @ts-ignore
          const IconComponent = LucideIcons[resource.iconName] || LucideIcons.Link;

          return (
            <a
              key={index}
              href={resource.url}
              onClick={(e) => e.preventDefault()} // Prevent navigation for demo
              className="flex items-start p-6 bg-white border border-gray-200 rounded-xl hover:shadow-md hover:border-blue-300 transition-all group"
            >
              <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                <IconComponent size={24} />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                  {resource.title}
                </h3>
                <p className="text-sm text-gray-500 mt-1 leading-relaxed">
                  {resource.description}
                </p>
              </div>
            </a>
          );
        })}
      </div>

      <div className="mt-12 bg-gray-900 rounded-2xl p-8 text-white text-center">
        <h3 className="text-xl font-bold mb-2">Need access to something else?</h3>
        <p className="text-gray-400 mb-6">Contact IT support or ask your AI mentor for help locating specific documents.</p>
        <button className="px-6 py-2 bg-white text-gray-900 font-medium rounded-lg hover:bg-gray-100 transition-colors">
          Submit IT Ticket
        </button>
      </div>
    </div>
  );
};

export default Resources;
