/**
 * Utility functions for Job Description Analysis
 */

// Skill Categories and Keywords
const SKILL_CATEGORIES = {
  'Core CS': ['DSA', 'OOP', 'DBMS', 'OS', 'Networks', 'Data Structures', 'Algorithms', 'Object Oriented', 'Operating Systems', 'Computer Networks'],
  'Languages': ['Java', 'Python', 'JavaScript', 'TypeScript', 'C', 'C++', 'C#', 'Go', 'Golang', 'Ruby', 'Swift', 'Kotlin', 'Rust', 'PHP'],
  'Web': ['React', 'Next.js', 'Node.js', 'Express', 'REST', 'GraphQL', 'HTML', 'CSS', 'Tailwind', 'Redux', 'Vue', 'Angular'],
  'Data': ['SQL', 'MongoDB', 'PostgreSQL', 'MySQL', 'Redis', 'NoSQL', 'Oracle', 'Cassandra', 'DynamoDB'],
  'Cloud/DevOps': ['AWS', 'Azure', 'GCP', 'Docker', 'Kubernetes', 'CI/CD', 'Linux', 'Jenkins', 'Terraform', 'Ansible'],
  'Testing': ['Selenium', 'Cypress', 'Playwright', 'JUnit', 'PyTest', 'Jest', 'Mocha', 'Chai', 'TestNG']
};

/**
 * Extract skills from JD text using simple keyword matching
 */
const extractSkills = (text) => {
  if (!text) return {};
  
  const lowerText = text.toLowerCase();
  const extracted = {};
  
  Object.entries(SKILL_CATEGORIES).forEach(([category, keywords]) => {
    const found = keywords.filter(keyword => {
      // Use word boundary regex to avoid partial matches (e.g. "Go" in "Good")
      // Escape special chars like C++
      const escapedKeyword = keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      // For C++ and C#, we want to match exact word-like tokens, but \b fails on +.
      // So we handle them separately or just use includes for simplicity on specific tokens if regex is tricky.
      
      let regex;
      if (keyword === 'C++' || keyword === 'C#') {
         // Special handling: check if it exists surrounded by non-word chars or start/end
         // This is a rough heuristic.
         return lowerText.includes(keyword.toLowerCase());
      } else {
         regex = new RegExp(`\\b${escapedKeyword}\\b`, 'i');
         return regex.test(lowerText);
      }
    });
    
    if (found.length > 0) {
      extracted[category] = found;
    }
  });

  // If no skills found, simple fallback could be handled by caller or here. 
  // Let's return empty and handle "General" logic in main function or UI.
  return extracted;
};

/**
 * Calculate readiness score based on heuristics
 */
const calculateScore = (extractedSkills, company, role, text) => {
  let score = 35; // Base score
  
  // +5 per detected category (max 30)
  const categoriesCount = Object.keys(extractedSkills).length;
  score += Math.min(categoriesCount * 5, 30);
  
  // +10 if company name provided
  if (company && company.trim().length > 1) score += 10;
  
  // +10 if role provided
  if (role && role.trim().length > 1) score += 10;
  
  // +10 if JD length > 800 chars
  if (text && text.length > 800) score += 10;
  
  // Cap at 100
  return Math.min(score, 100);
};

/**
 * Generate a 7-day preparation plan based on skills
 */
const generatePlan = (extractedSkills) => {
  const allSkills = Object.values(extractedSkills).flat();
  const hasWeb = allSkills.some(s => ['React', 'Node.js', 'HTML', 'CSS', 'Vue', 'Angular'].includes(s));
  const hasData = allSkills.some(s => ['SQL', 'MongoDB', 'PostgreSQL'].includes(s));
  
  // Base plan structure
  const plan = {
    Day1_2: "Basics + Core CS Context",
    Day3_4: "DSA + Coding Practice",
    Day5: "Project + Resume Alignment",
    Day6: "Mock Interview Questions",
    Day7: "Revision + Weak Areas"
  };

  const detailedPlan = [];
  
  detailedPlan.push({
    day: "Day 1-2",
    focus: "Basics & Core CS",
    tasks: [
      "Brush up on OOP principles (Poly, Encap, Inherith)",
      "Review OS concepts (Process vs Thread, Deadlock)",
      "Database Normalization & ACID properties check"
    ]
  });

  detailedPlan.push({
    day: "Day 3-4",
    focus: "DSA Strategy",
    tasks: [
      "Solve 5 problems on Arrays/Strings",
      "Practice Linked List reversals",
      "Review Sorting/Searching algorithms",
      "Time Complexity analysis"
    ]
  });

  detailedPlan.push({
    day: "Day 5",
    focus: "Project & Tech Stack",
    tasks: [
      "Deep dive into Resume Projects",
      hasWeb ? "Review React Hooks / Node Event Loop" : "Review your primary language features",
      hasData ? "Practice complex SQL queries (Joins)" : "Review Basic SQL",
      "System Design basics (if applicable)"
    ]
  });

  detailedPlan.push({
    day: "Day 6",
    focus: "Mock & Behavioral",
    tasks: [
      "Prepare for 'Tell me about yourself'",
      "Research company values",
      "Mock interview with a friend",
      "Prepare questions for the interviewer"
    ]
  });

  detailedPlan.push({
    day: "Day 7",
    focus: "Final Polish",
    tasks: [
      "Revise weak topics from the week",
      "Rest and Mental Prep",
      "Check formula sheets/Cheat sheets"
    ]
  });

  return detailedPlan;
};

/**
 * Generate 4-round checklist
 */
const generateChecklist = (extractedSkills) => {
  const round1 = [
    "Quantitative Aptitude (Time/Work, PL)",
    "Logical Reasoning (Puzzles)",
    "Verbal Ability check",
    "Basic output guessing"
  ];

  const round2 = [
    "Array/String manipulation",
    "Linked List basics",
    "Stack/Queue implementation",
    "Basic Tree traversals",
    "OOPs concepts application"
  ];

  const round3 = [
    "Project Architecture explanation",
    "Tech Stack deep dive",
    "Database Schema design discussion",
    "Code optimization scenarios",
    "Handling edge cases"
  ];

  const round4 = [
    "Why this company?",
    "Strengths & Weaknesses",
    "Salary negotiation prep",
    "Career goals alignment",
    "Conflict resolution examples"
  ];

  return {
    "Round 1: Aptitude / Basics": round1,
    "Round 2: DSA + Core CS": round2,
    "Round 3: Tech Interview": round3,
    "Round 4: Managerial / HR": round4
  };
};

/**
 * Generate potential interview questions
 */
const generateQuestions = (extractedSkills) => {
  const questions = [
    "Tell me about yourself.",
    "Walk me through your resume."
  ];

  const allSkills = Object.values(extractedSkills).flat();
  
  if (allSkills.some(s => s.toLowerCase().includes('react'))) {
    questions.push("Explain the Virtual DOM and how React handles updates.");
    questions.push("What are Hooks? rules of hooks?");
  } else if (allSkills.some(s => s.toLowerCase().includes('angular'))) {
    questions.push("Explain Dependency Injection in Angular.");
  }

  if (allSkills.some(s => s.toLowerCase().includes('sql'))) {
     questions.push("Explain Indexing and when to use it.");
     questions.push("Difference between clustered and non-clustered index?");
  }

  if (allSkills.some(s => s.toLowerCase().includes('java'))) {
    questions.push("Explain the difference between final, finally, and finalize.");
    questions.push("How does Garbage Collection work?");
  }

  if (allSkills.every(s => !['react', 'angular', 'sql', 'java'].some(k => s.toLowerCase().includes(k)))) {
      questions.push("Talk about your favorite project.");
      questions.push("How do you handle a difficult team member?");
  }
  
  // Fillers
  const fillers = [
    "What is your biggest weakness?",
    "Where do you see yourself in 5 years?",
    "Describe a challenging bug you fixed.",
    "How would you optimize a slow database query?",
    "Explain OOP concepts to a 5-year old."
  ];

  let i = 0;
  while (questions.length < 10 && i < fillers.length) {
    questions.push(fillers[i++]);
  }

  return questions.slice(0, 10);
};

// Main entry point logic wrapper
export const analyzeJobDescription = (text, company, role) => {
  const extractedSkills = extractSkills(text);
  const score = calculateScore(extractedSkills, company, role, text);
  const plan = generatePlan(extractedSkills);
  const checklist = generateChecklist(extractedSkills);
  const questions = generateQuestions(extractedSkills);
  
  return {
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
    company: company || "Unknown Company",
    role: role || "Unknown Role",
    jdText: text,
    extractedSkills,
    plan,
    checklist,
    questions,
    readinessScore: score
  };
};
