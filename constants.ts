import { Task, ResourceLink } from './types';

export const INITIAL_TASKS: Task[] = [
  {
    id: 't1',
    title: 'Complete HR Paperwork',
    description: 'Sign your offer letter, NDA, and tax forms in the HR portal.',
    status: 'pending',
    category: 'Day 1',
  },
  {
    id: 't2',
    title: 'Set up Workstation',
    description: 'Configure your laptop, monitor, and ergonomic chair.',
    status: 'pending',
    category: 'Day 1',
  },
  {
    id: 't3',
    title: 'Meet the Team',
    description: 'Join the morning stand-up and introduce yourself.',
    status: 'pending',
    category: 'Day 1',
  },
  {
    id: 't4',
    title: 'Configure Email Signature',
    description: 'Set up your professional email signature using the company template.',
    status: 'pending',
    category: 'Week 1',
  },
  {
    id: 't5',
    title: 'Security Training',
    description: 'Complete the mandatory cybersecurity awareness module.',
    status: 'pending',
    category: 'Week 1',
  },
  {
    id: 't6',
    title: '1-on-1 with Manager',
    description: 'Discuss your 30-60-90 day goals.',
    status: 'pending',
    category: 'Week 1',
  },
  {
    id: 't7',
    title: 'First Project Review',
    description: 'Complete your first small contribution or bug fix.',
    status: 'pending',
    category: 'Month 1',
  },
];

export const RESOURCES: ResourceLink[] = [
  {
    title: 'Employee Handbook',
    url: '#',
    description: 'Everything you need to know about policies and culture.',
    iconName: 'Book',
  },
  {
    title: 'Benefits Portal',
    url: '#',
    description: 'Manage your health insurance and perks.',
    iconName: 'Heart',
  },
  {
    title: 'IT Helpdesk',
    url: '#',
    description: 'Submit tickets for hardware or software issues.',
    iconName: 'Monitor',
  },
  {
    title: 'Learning Management',
    url: '#',
    description: 'Access courses and training materials.',
    iconName: 'GraduationCap',
  },
];
