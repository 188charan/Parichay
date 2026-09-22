/**
 * Tech stack organized into interactive categories (no giant flat grid).
 */

export interface SkillCategory {
  id: string;
  title: string;
  items: string[];
}

export const skillCategories: SkillCategory[] = [
  {
    id: "languages",
    title: "Languages",
    items: ["JavaScript ES6+", "Python", "C++", "C#"],
  },
  {
    id: "frontend",
    title: "Frontend",
    items: ["React.js", "SvelteKit", "HTML5", "CSS3", "Tailwind CSS", "Chart.js"],
  },
  {
    id: "backend",
    title: "Backend",
    items: ["Node.js", "Express.js", "Django", "Flask"],
  },
  {
    id: "databases",
    title: "Databases",
    items: ["MySQL", "MongoDB"],
  },
  {
    id: "ai",
    title: "AI & LLM",
    items: [
      "GPT-4 Vision",
      "OpenAI / Azure",
      "Multi-Agent Orchestration",
      "Prompt Engineering",
      "TensorFlow",
      "OpenCV",
      "LangChain-style pipelines",
    ],
  },
  {
    id: "systems",
    title: "Systems",
    items: [
      "Linux",
      "Cron Jobs",
      "REST API Design",
      "API Security",
      "RBAC",
      "Scalable Architecture",
    ],
  },
  {
    id: "devops",
    title: "DevOps",
    items: [
      "Docker",
      "docker-compose",
      "Multi-node Deployment",
      "Artifact-based Release Pipeline",
    ],
  },
  {
    id: "fintech",
    title: "Fintech",
    items: [
      "M2P Banking APIs",
      "Card Lifecycle Management",
      "VISA / RuPay",
      "Twilio",
      "Payment Workflows",
    ],
  },
  {
    id: "tools",
    title: "Developer Tools",
    items: [
      "Git",
      "GitHub",
      "Postman",
      "VS Code",
      "GitHub Copilot",
      "pdf-lib",
    ],
  },
  {
    id: "core-cs",
    title: "Core CS",
    items: ["DSA", "System Design", "OOP", "DBMS"],
  },
];
