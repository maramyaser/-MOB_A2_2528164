export const FULL_NAME = 'Muram Yaser Basher';
export const REG_NUMBER = '25/28164';
export const LAST4 = REG_NUMBER.replace(/\D/g, '').slice(-4);
export const VERIFICATION_CODE = `MOB-A2-${LAST4}`;
export const APP_NAME = 'MuramPortfolio';
export const APP_VERSION = '1.0.0';

export const DEFAULT_PROFILE = {
  headline: 'Software Engineering Student | React Native & Django',
  bio: 'I am a Software Engineering student at INES-Ruhengeri who enjoys building practical software solutions to real-world problems. I have worked on mobile applications, REST APIs, and AI-powered projects, including VisionBridge, an assistive technology concept developed with Team Limitless. I am eager to keep learning, collaborate with other developers, and contribute to meaningful software projects.',
  primarySkill: 'React Native',
  availability: 'Open to internship',
  imageUri: null as string | null,
};


export const SKILLS = [
  {
    name: 'React Native & Expo',
    level: 'Intermediate',
    note: 'Building mobile app interfaces, navigation, and integrating backend APIs.',
  },
  {
    name: 'Python & Django REST Framework',
    level: 'Intermediate',
    note: 'Developing backend APIs, handling requests, and working with authentication.',
  },
  {
    name: 'JavaScript & React',
    level: 'Intermediate',
    note: 'Building interactive web interfaces and connecting frontend components to APIs.',
  },
  {
    name: 'Git & GitHub',
    level: 'Intermediate',
    note: 'Managing repositories, branches, commits, and collaborating on projects.',
  },
  {
    name: 'AI & Computer Vision Integration',
    level: 'Beginner',
    note: 'Exploring object detection, OCR, and AI-powered features for VisionBridge.',
  },
];


export const EDUCATION = [
  {
    period: '2024 - present',
    title: 'BSc in Software Engineering',
    place: 'INES-Ruhengeri, Rwanda',
  },
];


export const PROJECTS = [
  {
    id: 'p1',
    title: 'VisionBridge — AI Assistive Glasses',
    problem:
      'Blind and visually impaired people can face barriers when identifying objects, reading text, and navigating unfamiliar surroundings. Commercial assistive devices can also be expensive.',
    contribution:
      'Contributed to the development and pitching of an affordable AI-assisted accessibility solution with Team Limitless. Worked on the mobile application concept, React Native and Expo implementation, backend integration, and exploring AI-powered object recognition and text reading.',
    tech: [
      'React Native',
      'Expo',
      'Python',
      'Django REST Framework',
      'AI',
      'Computer Vision',
    ],
    link: 'https://github.com/visionBridge2026/Vision111',
  },
  {
    id: 'p2',
    title: 'Opportune — Opportunity Tracker',
    problem:
      'Students and early-career professionals often discover internships, hackathons, scholarships, and events when they are too busy to apply, then forget about them before the deadline.',
    contribution:
      'Developed a web application using React and Django REST Framework to help users save opportunities, organize favorites, track deadlines, and manage their applications. Worked on frontend integration, API requests, authentication, and opportunity-saving functionality.',
    tech: [
      'React',
      'JavaScript',
      'Python',
      'Django REST Framework',
      'REST APIs',
    ],
    link: 'https://github.com/maramyaser',
  },
  {
    id: 'p3',
    title: 'Personal Portfolio Website',
    problem:
      'Students need a central place to present their skills, projects, education, and professional interests to potential internship providers.',
    contribution:
      'Built a personal portfolio with a React frontend and Django REST Framework backend. Worked on project presentation, API integration, database configuration, and deployment of the frontend and backend.',
    tech: [
      'React',
      'JavaScript',
      'Python',
      'Django REST Framework',
      'PostgreSQL',
      'Vercel',
      'Render',
    ],
    link: 'https://github.com/maramyaser',
  },
  {
    id: 'p4',
    title: 'MilkCheck — Milk Quality Classification',
    problem:
      'Milk quality assessment can benefit from data-driven methods that help identify potentially problematic samples.',
    contribution:
      'Worked on a group AI coursework project involving machine learning, data analysis, and classification. Explored model evaluation and contributed to the project’s assigned implementation tasks.',
    tech: [
      'Python',
      'Machine Learning',
      'Data Analysis',
      'FastAPI',
      'Git',
      'GitHub',
    ],
    link: 'https://github.com/maramyaser',
  },
];
