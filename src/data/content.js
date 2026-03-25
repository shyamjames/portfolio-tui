module.exports = {
  name: "Shyam James",
  tagline: "MCA Student | Web Developer | Python | Django | Linux",
  welcome: "Welcome to my terminal portfolio.\nAlways learning, always shipping.\nUse your keyboard to navigate through my work.",
  
  projects: [
    {
      id: "icswhmh",
      name: "11th Intl Conference on Social Work",
      shortDesc: "Official conference website",
      description: "Collaborated on the conceptualization, development, and deployment of the official website for the 11th International Conference on Social Work in Health and Mental Health.",
      tags: ["Web Development", "Deployment"],
      url: "https://icswhmh.com"
    },
    {
      id: "spam-recognition",
      name: "Email Spam Recognition System",
      shortDesc: "Hybrid spam detection model",
      description: "Developed a hybrid spam detection model utilizing a Naive Bayes Classifier for text categorization and a Genetic Algorithm for feature selection/optimization.\n\nBuilt a full-stack Django web app providing a real-time dashboard for email analysis. Integrated API communication between an Android frontend and Python backend.",
      tags: ["Python", "Django", "Machine Learning", "Android SDK"],
      url: "https://github.com/shyamjames"
    },
    {
      id: "dotfiles",
      name: "dotfiles-black-minimal",
      shortDesc: "Personal Arch Linux + Hyprland config",
      description: "A minimal, high-contrast, off-black Hyprland configuration designed for focus and aesthetic consistency. Managed by GNU stow. I use Arch Btw! :)",
      tags: ["Linux", "Hyprland", "Shell", "GNU Stow"],
      url: "https://github.com/shyamjames/dotfiles-black-minimal"
    },
    {
      id: "sys-monitor",
      name: "SystemResourceMonitor",
      shortDesc: "Java Swing desktop application",
      description: "A Java Swing desktop application that monitors live system resource usage (CPU, memory, disk I/O) and displays the top running processes.",
      tags: ["Java", "Swing", "Desktop App"],
      url: "https://github.com/shyamjames/SystemResourceMonitor"
    },
    {
      id: "ai-web-helper",
      name: "AI-Web-Helper",
      shortDesc: "Modular AI integration project",
      description: "A Python library which uses Google Gemini for AI Assistance. Features a modular AI integration project with a reusable Python helper library and Flask interface.",
      tags: ["Python", "Flask", "AI", "Gemini"],
      url: "https://github.com/shyamjames/AI-Web-Helper"
    }
  ],
  
  bio: "I'm an MCA student passionate about building end-to-end web applications and solving real-world technical challenges. With hands-on experience in Django for backend development and Linux for deployment & system tinkering, I love turning ideas into functional, scalable solutions.\n\nI'm a natural problem-solver—diagnosing bugs, optimizing code, and exploring new tools excites me the most. I thrive on exploring new tech, building projects, and turning complex problems into elegant solutions. Always learning, always shipping.\n\nExperience:\n• Web Developer @ RlabZ (Dec 2025 - Present)\n• Website Administrator @ Christuraj Hostel Palai (Jan 2022 - Mar 2024)\n• Full Stack Developer Intern @ Corezone Solutions (Feb 2024)",
  
  skills: {
    "Languages": ["Python", "Java", "JavaScript", "PHP", "SQL"],
    "Web/Frameworks": ["Django", "Web Development", "Android SDK", "User Experience (UX)"],
    "Tools & Systems": ["Linux", "Docker", "Git", "GitHub", "cPanel", "RDBMS"],
    "Topics & Security": ["Agentic Workflows", "RAG", "SQL Injection", "SEIM", "Sniffer", "Security Mindset"],
    "Spoken Languages": ["Malayalam (Native)", "English (Professional)", "Hindi (Elementary)"]
  },
  
  contact: {
    message: "Open to internships, collaborations, and cool conversations. Let's connect and build something awesome!",
    methods: [
      { text: "GitHub", target: "github.com/shyamjames", icon: "🐙" },
      { text: "Bio", target: "shyamjames.github.io (placeholder)", icon: "⧉" },
      { text: "Location", target: "Ernakulam, Kerala, India", icon: "📍" }
    ],
    // The fingerprint will be populated at runtime by the server
    fingerprintLine: "Host Fingerprint: "
  }
};
