module.exports = {
  name: "Your Name",
  tagline: "building things for the web",
  welcome: "Welcome to my terminal portfolio.\nFeel free to explore my projects and background.\nEverything is navigable via your keyboard.",
  
  projects: [
    {
      id: "project-1",
      name: "Terminal Portfolio",
      shortDesc: "SSH-accessible TUI portfolio",
      description: "A fully functional terminal user interface served directly over SSH.\n\nBuilt entirely in Node.js without requiring clients to install anything beyond a standard SSH client. Uses blessed for UI rendering and handles window resize events seamlessly.\n\nProvides a unique, developer-focused way to present a portfolio.",
      tags: ["Node.js", "ssh2", "blessed", "TUI"],
      url: "https://github.com/yourusername/portfolio-tui"
    },
    {
      id: "project-2",
      name: "Ozone Dashboard",
      shortDesc: "Real-time analytics dashboard",
      description: "A high-performance analytics dashboard processing millions of events per day.\n\nFeatures a custom WebGL visualization engine for rendering large datasets in the browser without dropping frames. Backend built with Go and PostgreSQL.\n\nUsed by over 500 enterprise customers.",
      tags: ["React", "WebGL", "Go", "Postgres"],
      url: "https://example.com/ozone"
    },
    {
      id: "project-3",
      name: "Nexus API",
      shortDesc: "GraphQL federation gateway",
      description: "A federated GraphQL gateway that consolidates 15 different microservices into a single, cohesive graph.\n\nIncludes built-in rate limiting, query complexity analysis, and distributed tracing. Reduced integration time for frontend teams by 40%.",
      tags: ["TypeScript", "GraphQL", "Redis", "Apollo"],
      url: "https://github.com/yourusername/nexus-api"
    }
  ],
  
  bio: "I'm a software engineer specializing in backend systems and developer tools. I love building things that live in the terminal and push the boundaries of what's possible on the web.\n\nWhen I'm not coding, you can find me hiking, reading sci-fi, or tinkering with vintage keyboards.",
  
  skills: {
    "Languages": ["JavaScript/TypeScript", "Go", "Python", "Rust", "SQL"],
    "Frameworks": ["React", "Node.js", "Express", "Next.js", "Tailwind"],
    "Tools": ["Git", "Docker", "Linux", "AWS", "PostgreSQL", "Redis"]
  },
  
  contact: {
    message: "Don't be a stranger! Feel free to reach out.",
    methods: [
      { text: "Email", target: "hello@example.com", icon: "✉" },
      { text: "GitHub", target: "github.com/yourusername", icon: "🐙" },
      { text: "LinkedIn", target: "linkedin.com/in/yourusername", icon: "⧉" },
      { text: "Twitter", target: "@yourusername", icon: "𝕏" }
    ],
    // The fingerprint will be populated at runtime by the server
    fingerprintLine: "SSH Host Fingerprint: "
  }
};
