export const categories = [
  // Ring 1 (Inner) - Core Dev
  { id: 'prog', name: 'Programming Languages', color: '#00E5FF', ring: 1, angle: 0 },
  { id: 'front', name: 'Frontend Development', color: '#8B5CF6', ring: 1, angle: (2 * Math.PI) / 3 },
  { id: 'back', name: 'Backend Development', color: '#3B82F6', ring: 1, angle: (4 * Math.PI) / 3 },

  // Ring 2 (Middle) - Data & AI
  { id: 'db', name: 'Databases', color: '#10B981', ring: 2, angle: 0 },
  { id: 'ai', name: 'Artificial Intelligence', color: '#FF3366', ring: 2, angle: (2 * Math.PI) / 4 },
  { id: 'aif', name: 'AI Frameworks', color: '#FF9900', ring: 2, angle: (4 * Math.PI) / 4 },
  { id: 'ds', name: 'Data Science', color: '#38BDF8', ring: 2, angle: (6 * Math.PI) / 4 },

  // Ring 3 (Outer) - Engineering & Cloud
  { id: 'cloud', name: 'Cloud & DevOps', color: '#2496ED', ring: 3, angle: 0 },
  { id: 'tools', name: 'Tools & Platforms', color: '#F7DF1E', ring: 3, angle: (2 * Math.PI) / 5 },
  { id: 'se', name: 'Software Engineering', color: '#ffffff', ring: 3, angle: (4 * Math.PI) / 5 },
  { id: 'sec', name: 'Security & Auth', color: '#EF4444', ring: 3, angle: (6 * Math.PI) / 5 },
  { id: 'learn', name: 'Current Learning', color: '#A855F7', ring: 3, angle: (8 * Math.PI) / 5 },
];

// Calculate 3D positions based on rings
const ringRadii = { 1: 5, 2: 9, 3: 14 };

categories.forEach(cat => {
  const radius = ringRadii[cat.ring];
  cat.position = [
    Math.cos(cat.angle) * radius,
    (Math.random() - 0.5) * 4, // Slight vertical variance for 3D look
    Math.sin(cat.angle) * radius
  ];
});

export const skills = [
  // Programming Languages
  { id: 'python', category: 'prog', name: 'Python' },
  { id: 'javascript', category: 'prog', name: 'JavaScript' },
  { id: 'typescript', category: 'prog', name: 'TypeScript' },
  { id: 'sql_lang', category: 'prog', name: 'SQL' },
  { id: 'java', category: 'prog', name: 'Java' },

  // Frontend Development
  { id: 'react', category: 'front', name: 'React.js' },
  { id: 'next', category: 'front', name: 'Next.js' },
  { id: 'html', category: 'front', name: 'HTML5' },
  { id: 'css', category: 'front', name: 'CSS3' },
  { id: 'tailwind', category: 'front', name: 'Tailwind CSS' },
  { id: 'framer', category: 'front', name: 'Framer Motion' },
  { id: 'redux', category: 'front', name: 'Redux' },
  { id: 'responsive', category: 'front', name: 'Responsive Design' },
  { id: 'uiux', category: 'front', name: 'UI/UX Development' },

  // Backend Development
  { id: 'fastapi', category: 'back', name: 'FastAPI' },
  { id: 'node', category: 'back', name: 'Node.js' },
  { id: 'express', category: 'back', name: 'Express.js' },
  { id: 'rest', category: 'back', name: 'REST APIs' },
  { id: 'api_int', category: 'back', name: 'API Integration' },
  { id: 'auth_sys', category: 'back', name: 'Authentication Systems' },
  { id: 'jwt_back', category: 'back', name: 'JWT' },
  { id: 'microservices', category: 'back', name: 'Microservices' },

  // Databases
  { id: 'postgres', category: 'db', name: 'PostgreSQL' },
  { id: 'mysql', category: 'db', name: 'MySQL' },
  { id: 'mongodb', category: 'db', name: 'MongoDB' },
  { id: 'sqlite', category: 'db', name: 'SQLite' },
  { id: 'firebase', category: 'db', name: 'Firebase' },

  // Artificial Intelligence
  { id: 'ml', category: 'ai', name: 'Machine Learning' },
  { id: 'dl', category: 'ai', name: 'Deep Learning' },
  { id: 'genai', category: 'ai', name: 'Generative AI' },
  { id: 'prompt', category: 'ai', name: 'Prompt Engineering' },
  { id: 'agents', category: 'ai', name: 'AI Agents' },
  { id: 'agentic', category: 'ai', name: 'Agentic Workflows' },
  { id: 'rag', category: 'ai', name: 'RAG Systems' },
  { id: 'finetuning', category: 'ai', name: 'Fine-Tuning Concepts' },
  { id: 'llmapps', category: 'ai', name: 'LLM Applications' },
  { id: 'aiauto', category: 'ai', name: 'AI Automation' },

  // AI Frameworks
  { id: 'langchain', category: 'aif', name: 'LangChain' },
  { id: 'langgraph', category: 'aif', name: 'LangGraph' },
  { id: 'crewai', category: 'aif', name: 'CrewAI' },
  { id: 'openai', category: 'aif', name: 'OpenAI SDK' },
  { id: 'gemini', category: 'aif', name: 'Gemini API' },
  { id: 'hf', category: 'aif', name: 'Hugging Face' },
  { id: 'transformers', category: 'aif', name: 'Transformers' },

  // Data Science
  { id: 'numpy', category: 'ds', name: 'NumPy' },
  { id: 'pandas', category: 'ds', name: 'Pandas' },
  { id: 'matplotlib', category: 'ds', name: 'Matplotlib' },
  { id: 'seaborn', category: 'ds', name: 'Seaborn' },
  { id: 'sklearn', category: 'ds', name: 'Scikit-learn' },
  { id: 'data_ana', category: 'ds', name: 'Data Analysis' },
  { id: 'data_viz', category: 'ds', name: 'Data Visualization' },

  // Cloud & DevOps
  { id: 'aws', category: 'cloud', name: 'AWS' },
  { id: 'docker', category: 'cloud', name: 'Docker' },
  { id: 'git', category: 'cloud', name: 'Git' },
  { id: 'github', category: 'cloud', name: 'GitHub' },
  { id: 'gha', category: 'cloud', name: 'GitHub Actions' },
  { id: 'cicd', category: 'cloud', name: 'CI/CD' },
  { id: 'vercel', category: 'cloud', name: 'Vercel' },
  { id: 'netlify', category: 'cloud', name: 'Netlify' },
  { id: 'linux', category: 'cloud', name: 'Linux' },

  // Tools & Platforms
  { id: 'vscode', category: 'tools', name: 'VS Code' },
  { id: 'postman', category: 'tools', name: 'Postman' },
  { id: 'figma', category: 'tools', name: 'Figma' },
  { id: 'notion', category: 'tools', name: 'Notion' },
  { id: 'jira', category: 'tools', name: 'Jira' },
  { id: 'canva', category: 'tools', name: 'Canva' },

  // Software Engineering
  { id: 'oop', category: 'se', name: 'OOP' },
  { id: 'design_pat', category: 'se', name: 'Design Patterns' },
  { id: 'sysdesign', category: 'se', name: 'System Design' },
  { id: 'ds_algo', category: 'se', name: 'Data Structures' },
  { id: 'algo', category: 'se', name: 'Algorithms' },
  { id: 'prob', category: 'se', name: 'Problem Solving' },
  { id: 'arch', category: 'se', name: 'Software Architecture' },
  { id: 'test', category: 'se', name: 'Testing & Debugging' },

  // Security & Authentication
  { id: 'oauth', category: 'sec', name: 'OAuth' },
  { id: 'jwt', category: 'sec', name: 'JWT' },
  { id: 'rbac', category: 'sec', name: 'Role-Based Access Control' },
  { id: 'apisec', category: 'sec', name: 'API Security' },
  { id: 'secauth', category: 'sec', name: 'Secure Authentication' },

  // Current Learning
  { id: 'multiagent', category: 'learn', name: 'Multi-Agent Systems' },
  { id: 'advsys', category: 'learn', name: 'Advanced System Design' },
  { id: 'mlops', category: 'learn', name: 'MLOps' },
  { id: 'k8s', category: 'learn', name: 'Kubernetes' },
  { id: 'vecdb', category: 'learn', name: 'Vector Databases' },
  { id: 'prodai', category: 'learn', name: 'Production AI Systems' },
];

export const generateNodePositions = () => {
  const nodeData = [];
  
  categories.forEach(cat => {
    const catSkills = skills.filter(s => s.category === cat.id);
    const orbitRadius = 1.6; 
    
    catSkills.forEach((skill, i) => {
      // Create a nice orbit distance for children
      const angle = (i * 2 * Math.PI) / catSkills.length;
      
      // Store local orbital coordinates instead of absolute
      // so we can animate them easily inside a group
      const localPosition = [
        Math.cos(angle) * orbitRadius,
        0, 
        Math.sin(angle) * orbitRadius
      ];
      
      nodeData.push({
        ...skill,
        color: cat.color,
        categoryName: cat.name,
        localPosition,
        catPosition: cat.position,
        angleOffset: (Math.random() * Math.PI * 2), // random starting angle
        orbitSpeed: 0.5 + Math.random() * 0.5 // random orbit speed
      });
    });
  });
  
  return nodeData;
};

export const connections = [
  // Inter-category connections for neural mapping
  ['prog', 'front'],
  ['prog', 'back'],
  ['prog', 'ai'],
  ['prog', 'ds'],
  ['front', 'back'],
  ['back', 'db'],
  ['back', 'sec'],
  ['ai', 'aif'],
  ['ai', 'ds'],
  ['back', 'cloud'],
  ['se', 'prog'],
  ['se', 'cloud'],
  ['tools', 'front'],
  ['tools', 'cloud'],
  ['learn', 'ai'],
  ['learn', 'cloud']
];
