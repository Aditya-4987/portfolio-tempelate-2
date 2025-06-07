import { useEffect, useState, useRef, useMemo } from "react";

/**
 * BENTOLIO PORTFOLIO WEBSITE
 *
 * A sophisticated portfolio website featuring:
 * - Smart widget expansion system with hover and click interactions
 * - Dynamic color theme switching with 5 beautiful themes
 * - Intelligent directional growth that respects viewport boundaries
 * - Sequential blur effects for enhanced focus
 * - Comprehensive loading animation with multiple phases
 *
 * Key Features:
 * - Stable hover interactions with proper timer management
 * - Content-aware expansion sizing to eliminate empty spaces
 * - Header always stays visible and unblurred
 * - Smooth color transitions across all elements
 * - Professional animations and micro-interactions
 */

// ==================== TYPE DEFINITIONS ====================

/**
 * Skill data structure with proficiency levels and descriptions
 */
interface Skill {
  name: string;
  level: number;
  description: string;
  category: string;
}

/**
 * Project data structure with comprehensive project information
 */
interface Project {
  id: number;
  name: string;
  description: string;
  tech: string[];
  image: string;
  liveUrl: string;
  featured: boolean;
}

/**
 * Widget position tracking for expansion calculations
 */
interface WidgetPosition {
  top: number;
  left: number;
  width: number;
  height: number;
}

/**
 * Color theme configuration with comprehensive color palette
 */
interface ColorTheme {
  id: string;
  name: string;
  colors: {
    background: string;
    text: string;
    primary: string;
    hero: string;
    profile: string;
    about: string;
    skills: string;
    location: string;
    projects: string;
    contact: string;
  };
}

// ==================== THEME CONFIGURATION ====================

const colorThemes: ColorTheme[] = [
  {
    id: "charcoal",
    name: "Charcoal Night",
    colors: {
      background: "rgb(17, 18, 13)",
      text: "rgb(216, 207, 188)",
      primary: "rgb(216, 207, 188)",
      hero: "rgb(23, 25, 18)",
      profile: "rgb(30, 32, 24)",
      about: "rgb(26, 28, 20)",
      skills: "rgb(34, 36, 27)",
      location: "rgb(28, 30, 22)",
      projects: "rgb(32, 34, 25)",
      contact: "rgb(25, 27, 19)",
    },
  },
  {
    id: "ocean",
    name: "Ocean Blue",
    colors: {
      background: "rgb(15, 23, 42)",
      text: "rgb(226, 232, 240)",
      primary: "rgb(59, 130, 246)",
      hero: "rgb(30, 41, 59)",
      profile: "rgb(51, 65, 85)",
      about: "rgb(41, 50, 65)",
      skills: "rgb(71, 85, 105)",
      location: "rgb(45, 55, 72)",
      projects: "rgb(55, 65, 81)",
      contact: "rgb(37, 47, 63)",
    },
  },
  {
    id: "forest",
    name: "Forest Green",
    colors: {
      background: "rgb(20, 83, 45)",
      text: "rgb(240, 253, 244)",
      primary: "rgb(34, 197, 94)",
      hero: "rgb(22, 101, 52)",
      profile: "rgb(21, 128, 61)",
      about: "rgb(22, 163, 74)",
      skills: "rgb(34, 197, 94)",
      location: "rgb(74, 222, 128)",
      projects: "rgb(132, 204, 22)",
      contact: "rgb(163, 230, 53)",
    },
  },
  {
    id: "sunset",
    name: "Sunset Orange",
    colors: {
      background: "rgb(124, 45, 18)",
      text: "rgb(255, 251, 235)",
      primary: "rgb(251, 146, 60)",
      hero: "rgb(154, 52, 18)",
      profile: "rgb(194, 65, 12)",
      about: "rgb(234, 88, 12)",
      skills: "rgb(251, 146, 60)",
      location: "rgb(253, 186, 116)",
      projects: "rgb(254, 215, 170)",
      contact: "rgb(255, 237, 213)",
    },
  },
  {
    id: "midnight",
    name: "Midnight Purple",
    colors: {
      background: "rgb(88, 28, 135)",
      text: "rgb(250, 245, 255)",
      primary: "rgb(168, 85, 247)",
      hero: "rgb(107, 33, 168)",
      profile: "rgb(126, 34, 206)",
      about: "rgb(147, 51, 234)",
      skills: "rgb(168, 85, 247)",
      location: "rgb(196, 181, 253)",
      projects: "rgb(221, 214, 254)",
      contact: "rgb(237, 233, 254)",
    },
  },
];

export default function Index() {
  // ==================== STATE MANAGEMENT ====================

  const [isLoaded, setIsLoaded] = useState(false);
  const [showMain, setShowMain] = useState(false);
  const [progress, setProgress] = useState(0);
  const [loadingPhase, setLoadingPhase] = useState(0);
  const [currentTheme, setCurrentTheme] = useState("charcoal");
  const [showThemeSelector, setShowThemeSelector] = useState(false);
  const [expandedWidget, setExpandedWidget] = useState<string | null>(null);
  const [clickedWidget, setClickedWidget] = useState<string | null>(null);
  const [widgetPosition, setWidgetPosition] = useState<WidgetPosition | null>(
    null,
  );
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [skillAnimations, setSkillAnimations] = useState(false);
  const [hoverTimer, setHoverTimer] = useState<NodeJS.Timeout | null>(null);

  // Widget refs for position tracking
  const widgetRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  // ==================== MEMOIZED THEME ====================

  const theme = useMemo(
    () => colorThemes.find((t) => t.id === currentTheme) || colorThemes[0],
    [currentTheme],
  );

  // ==================== SAMPLE DATA ====================

  /**
   * Skills data with realistic proficiency levels and descriptions
   * Organized by category for better presentation
   */
  const allSkills: Skill[] = [
    {
      name: "React",
      level: 95,
      description: "Advanced component architecture and hooks",
      category: "Frontend",
    },
    {
      name: "TypeScript",
      level: 90,
      description: "Type-safe development and advanced patterns",
      category: "Language",
    },
    {
      name: "Node.js",
      level: 88,
      description: "Server-side development and API design",
      category: "Backend",
    },
    {
      name: "UI/UX Design",
      level: 85,
      description: "User-centered design and prototyping",
      category: "Design",
    },
    {
      name: "Next.js",
      level: 92,
      description: "Full-stack React framework expertise",
      category: "Frontend",
    },
    {
      name: "PostgreSQL",
      level: 82,
      description: "Database design and optimization",
      category: "Backend",
    },
    {
      name: "Figma",
      level: 88,
      description: "Design systems and collaboration",
      category: "Design",
    },
    {
      name: "GraphQL",
      level: 80,
      description: "API design and data fetching",
      category: "Backend",
    },
    {
      name: "Tailwind CSS",
      level: 94,
      description: "Utility-first CSS framework mastery",
      category: "Frontend",
    },
    {
      name: "AWS",
      level: 75,
      description: "Cloud infrastructure and deployment",
      category: "DevOps",
    },
  ];

  /**
   * Project showcase with detailed information and metadata
   * Features both highlighted and additional projects
   */
  const allProjects: Project[] = [
    {
      id: 1,
      name: "E-commerce Platform",
      description: "Full-stack Next.js application with Stripe integration",
      tech: ["Next.js", "TypeScript", "Stripe", "PostgreSQL"],
      image: "/api/placeholder/400/300",
      liveUrl: "https://example.com",
      featured: true,
    },
    {
      id: 2,
      name: "Design System",
      description: "Comprehensive component library for design consistency",
      tech: ["React", "Storybook", "Tailwind", "TypeScript"],
      image: "/api/placeholder/400/300",
      liveUrl: "https://example.com",
      featured: true,
    },
    {
      id: 3,
      name: "Analytics Dashboard",
      description: "Real-time data visualization with interactive charts",
      tech: ["React", "D3.js", "Node.js", "WebSocket"],
      image: "/api/placeholder/400/300",
      liveUrl: "https://example.com",
      featured: true,
    },
    {
      id: 4,
      name: "Mobile App",
      description: "Cross-platform mobile application with React Native",
      tech: ["React Native", "Expo", "Firebase"],
      image: "/api/placeholder/400/300",
      liveUrl: "https://example.com",
      featured: false,
    },
    {
      id: 5,
      name: "API Gateway",
      description: "Microservices architecture with GraphQL federation",
      tech: ["GraphQL", "Node.js", "Docker", "Kubernetes"],
      image: "/api/placeholder/400/300",
      liveUrl: "https://example.com",
      featured: false,
    },
    {
      id: 6,
      name: "Portfolio Website",
      description: "Interactive portfolio with advanced animations",
      tech: ["React", "Framer Motion", "Three.js"],
      image: "/api/placeholder/400/300",
      liveUrl: "https://example.com",
      featured: false,
    },
  ];

  // ==================== LOADING ANIMATION ====================

  /**
   * Sophisticated 3-phase loading animation with realistic progression
   * Each phase has different timing and visual characteristics
   */
  useEffect(() => {
    const phases = [
      { duration: 2000, increment: 0.5 }, // Initializing phase
      { duration: 1500, increment: 1.5 }, // Building phase
      { duration: 1000, increment: 3 }, // Finalizing phase
    ];

    let currentPhase = 0;
    let phaseProgress = 0;

    const timer = setInterval(() => {
      const phase = phases[currentPhase];
      phaseProgress += phase.increment + Math.random() * 1;

      // Phase transition logic
      if (currentPhase === 0 && phaseProgress >= 25) {
        setLoadingPhase(1);
        currentPhase = 1;
        phaseProgress = 25;
      } else if (currentPhase === 1 && phaseProgress >= 75) {
        setLoadingPhase(2);
        currentPhase = 2;
        phaseProgress = 75;
      }

      setProgress(Math.min(phaseProgress, 100));

      // Complete loading sequence
      if (phaseProgress >= 100) {
        clearInterval(timer);
        setTimeout(() => {
          setIsLoaded(true);
          setTimeout(() => setShowMain(true), 800);
        }, 500);
      }
    }, 50);

    return () => clearInterval(timer);
  }, []);

  /**
   * Skills animation trigger
   * Delays progress bar animations until after expansion completes
   */
  useEffect(() => {
    if (expandedWidget === "skills") {
      setTimeout(() => setSkillAnimations(true), 300);
    } else {
      setSkillAnimations(false);
    }
  }, [expandedWidget]);

  // ==================== SMART EXPANSION SYSTEM ====================

  /**
   * INTELLIGENT WIDGET INTERACTION HANDLER
   *
   * Manages click interactions with widget expansion:
   * - Click to expand/collapse widgets
   * - Tracks widget position for smart positioning
   * - Manages state consistency
   *
   * @param widgetName - The widget identifier
   */
  const handleWidgetClick = (widgetName: string) => {
    const element = widgetRefs.current[widgetName];

    if (clickedWidget === widgetName) {
      // Collapse if same widget clicked
      setExpandedWidget(null);
      setClickedWidget(null);
      setWidgetPosition(null);
    } else {
      // Expand new widget
      if (element) {
        const rect = element.getBoundingClientRect();
        setWidgetPosition({
          top: rect.top,
          left: rect.left,
          width: rect.width,
          height: rect.height,
        });
      }
      setClickedWidget(widgetName);
      setExpandedWidget(widgetName);
    }
  };

  /**
   * Navigation click handler
   * Maps navigation items to corresponding widgets and closes mobile menu
   */
  const handleNavClick = (item: string) => {
    const widgetMap: { [key: string]: string } = {
      Work: "projects",
      About: "about",
      Skills: "skills",
      Contact: "contact",
    };

    const widgetName = widgetMap[item] || item.toLowerCase();
    handleWidgetClick(widgetName);
    setIsMobileMenuOpen(false);
  };

  /**
   * Theme change handler with theme selector auto-close
   */
  const handleThemeChange = (themeId: string) => {
    setCurrentTheme(themeId);
    setShowThemeSelector(false);
  };

  /**
   * Check if a specific widget is currently expanded
   */
  const isWidgetExpanded = (widgetName: string) => {
    return expandedWidget === widgetName;
  };

  // ==================== CONTENT RENDERING ====================

  /**
   * COMPREHENSIVE EXPANDED CONTENT RENDERER
   *
   * Provides detailed, interactive content for each widget
   * with rich information and professional presentation
   */
  const renderExpandedContent = (widgetName: string) => {
    const textStyle = { color: theme.colors.text };
    const playfairStyle = {
      color: theme.colors.text,
      fontFamily: "Playfair Display, serif",
    };

    switch (widgetName) {
      case "hero":
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-medium mb-4" style={playfairStyle}>
                Our Mission
              </h3>
              <p
                className="text-sm opacity-80 leading-relaxed mb-4"
                style={textStyle}
              >
                We believe in creating digital experiences that not only look
                beautiful but solve real problems and create meaningful
                connections between brands and their audiences. Every project is
                an opportunity to push boundaries and deliver exceptional
                results.
              </p>
            </div>

            <div className="border-l-2 border-amber-500/30 pl-4">
              <h4 className="font-medium mb-3" style={textStyle}>
                Our Services
              </h4>
              <ul className="space-y-2 text-sm opacity-80" style={textStyle}>
                <li>• Full-stack Web Development</li>
                <li>• UI/UX Design & Prototyping</li>
                <li>• Mobile App Development</li>
                <li>• Design System Creation</li>
                <li>• Performance Optimization</li>
                <li>• Technical Consulting</li>
                <li>• API Development & Integration</li>
              </ul>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-6">
              <div className="text-center p-4 bg-white/5 rounded-lg">
                <div className="text-2xl font-bold mb-1" style={textStyle}>
                  50+
                </div>
                <div className="text-xs opacity-70" style={textStyle}>
                  Projects Completed
                </div>
              </div>
              <div className="text-center p-4 bg-white/5 rounded-lg">
                <div className="text-2xl font-bold mb-1" style={textStyle}>
                  8+
                </div>
                <div className="text-xs opacity-70" style={textStyle}>
                  Years Experience
                </div>
              </div>
            </div>

            <div className="pt-4">
              <button className="w-full py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-black text-sm font-medium rounded-lg hover:from-amber-400 hover:to-amber-500 transition-all duration-300">
                Start a Project
              </button>
            </div>
          </div>
        );

      case "profile":
        return (
          <div className="space-y-4">
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-amber-200 to-amber-600 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300 shadow-xl">
                <div className="w-16 h-16 bg-gradient-to-br from-white to-gray-100 rounded-full flex items-center justify-center">
                  <svg
                    className="w-10 h-10 text-gray-600"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                  </svg>
                </div>
              </div>
              <div className="text-lg font-medium mb-1" style={textStyle}>
                John Doe
              </div>
              <div className="text-xs opacity-70 mb-3" style={textStyle}>
                Senior Creative Developer
              </div>
            </div>

            <div className="border-l-2 border-amber-500/30 pl-4">
              <h4 className="font-medium mb-2" style={textStyle}>
                Achievements
              </h4>
              <ul className="space-y-1 text-sm opacity-80" style={textStyle}>
                <li>🏆 Best Web App - TechCrunch Awards 2023</li>
                <li>⭐ Featured on Product Hunt #1</li>
                <li>🎖️ Google Developer Expert</li>
                <li>📜 AWS Certified Solutions Architect</li>
              </ul>
            </div>

            <div className="border-l-2 border-blue-500/30 pl-4">
              <h4 className="font-medium mb-2" style={textStyle}>
                Certifications
              </h4>
              <ul className="space-y-1 text-sm opacity-80" style={textStyle}>
                <li>• React Advanced Patterns</li>
                <li>• TypeScript Deep Dive</li>
                <li>• AWS Cloud Practitioner</li>
                <li>• UX Design Fundamentals</li>
              </ul>
            </div>

            <div className="grid grid-cols-3 gap-3 mt-4">
              <div className="text-center p-3 bg-white/5 rounded-lg">
                <div className="text-lg font-bold mb-1" style={textStyle}>
                  4.9
                </div>
                <div className="text-xs opacity-70" style={textStyle}>
                  Rating
                </div>
              </div>
              <div className="text-center p-3 bg-white/5 rounded-lg">
                <div className="text-lg font-bold mb-1" style={textStyle}>
                  100%
                </div>
                <div className="text-xs opacity-70" style={textStyle}>
                  Success
                </div>
              </div>
              <div className="text-center p-3 bg-white/5 rounded-lg">
                <div className="text-lg font-bold mb-1" style={textStyle}>
                  24h
                </div>
                <div className="text-xs opacity-70" style={textStyle}>
                  Response
                </div>
              </div>
            </div>
          </div>
        );

      case "about":
        return (
          <div className="space-y-4">
            <div>
              <h3 className="text-xl font-medium mb-3" style={playfairStyle}>
                About Me
              </h3>
              <p
                className="text-sm opacity-80 leading-relaxed mb-4"
                style={textStyle}
              >
                I'm a passionate creative developer with over 8 years of
                experience in crafting digital experiences that bridge the gap
                between design and technology. My journey started with a
                curiosity about how beautiful interfaces come to life through
                code.
              </p>
            </div>

            <div className="border-l-2 border-green-500/30 pl-4">
              <h4 className="font-medium mb-3" style={textStyle}>
                Journey Timeline
              </h4>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="font-medium" style={textStyle}>
                      Senior Developer
                    </div>
                    <div className="text-xs opacity-70" style={textStyle}>
                      Tech Innovators Inc.
                    </div>
                  </div>
                  <div className="text-xs opacity-60" style={textStyle}>
                    2020 - Present
                  </div>
                </div>
                <div className="flex justify-between items-start">
                  <div>
                    <div className="font-medium" style={textStyle}>
                      Full-stack Developer
                    </div>
                    <div className="text-xs opacity-70" style={textStyle}>
                      Digital Solutions Co.
                    </div>
                  </div>
                  <div className="text-xs opacity-60" style={textStyle}>
                    2018 - 2020
                  </div>
                </div>
                <div className="flex justify-between items-start">
                  <div>
                    <div className="font-medium" style={textStyle}>
                      Frontend Developer
                    </div>
                    <div className="text-xs opacity-70" style={textStyle}>
                      StartUp Ventures
                    </div>
                  </div>
                  <div className="text-xs opacity-60" style={textStyle}>
                    2016 - 2018
                  </div>
                </div>
              </div>
            </div>

            <div className="border-l-2 border-purple-500/30 pl-4">
              <h4 className="font-medium mb-2" style={textStyle}>
                Philosophy
              </h4>
              <p className="text-sm opacity-80" style={textStyle}>
                "Great design is not just about making things look
                beautiful—it's about solving problems elegantly and creating
                experiences that users love and remember."
              </p>
            </div>
          </div>
        );

      case "skills":
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-medium mb-4" style={playfairStyle}>
              Technical Skills
            </h3>

            <div className="space-y-3">
              {allSkills.map((skill, index) => (
                <div key={skill.name} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium" style={textStyle}>
                      {skill.name}
                    </span>
                    <span className="text-xs opacity-70" style={textStyle}>
                      {skill.level}%
                    </span>
                  </div>

                  <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-amber-500 to-amber-600 rounded-full transition-all duration-1000 ease-out"
                      style={{
                        width: skillAnimations ? `${skill.level}%` : "0%",
                        transitionDelay: `${index * 100}ms`,
                      }}
                    />
                  </div>

                  <p className="text-xs opacity-60" style={textStyle}>
                    {skill.description}
                  </p>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-4 mt-6">
              <div className="text-center p-4 bg-white/5 rounded-lg">
                <div className="text-xl font-bold mb-1" style={textStyle}>
                  10+
                </div>
                <div className="text-xs opacity-70" style={textStyle}>
                  Technologies
                </div>
              </div>
              <div className="text-center p-4 bg-white/5 rounded-lg">
                <div className="text-xl font-bold mb-1" style={textStyle}>
                  5+
                </div>
                <div className="text-xs opacity-70" style={textStyle}>
                  Years Each
                </div>
              </div>
            </div>
          </div>
        );

      case "location":
        return (
          <div className="space-y-4">
            <div className="text-center">
              <div className="text-4xl mb-3">🌍</div>
              <h3 className="text-xl font-medium mb-2" style={playfairStyle}>
                Location & Availability
              </h3>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="text-lg">📍</div>
                  <div>
                    <div className="font-medium text-sm" style={textStyle}>
                      Based in
                    </div>
                    <div className="text-xs opacity-70" style={textStyle}>
                      San Francisco, CA
                    </div>
                  </div>
                </div>
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
              </div>

              <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="text-lg">🕐</div>
                  <div>
                    <div className="font-medium text-sm" style={textStyle}>
                      Local Time
                    </div>
                    <div className="text-xs opacity-70" style={textStyle}>
                      PST (UTC-8)
                    </div>
                  </div>
                </div>
                <div className="text-sm font-mono" style={textStyle}>
                  2:30 PM
                </div>
              </div>

              <div className="border-l-2 border-blue-500/30 pl-4">
                <h4 className="font-medium mb-2" style={textStyle}>
                  Work Preferences
                </h4>
                <ul className="space-y-1 text-sm opacity-80" style={textStyle}>
                  <li>🌐 Remote-first approach</li>
                  <li>🤝 Collaborative team environment</li>
                  <li>⚡ Agile development methodology</li>
                  <li>🔄 Flexible working hours</li>
                </ul>
              </div>

              <div className="border-l-2 border-green-500/30 pl-4">
                <h4 className="font-medium mb-2" style={textStyle}>
                  Languages
                </h4>
                <ul className="space-y-1 text-sm opacity-80" style={textStyle}>
                  <li>🇺🇸 English (Native)</li>
                  <li>🇪🇸 Spanish (Conversational)</li>
                  <li>💻 JavaScript (Fluent)</li>
                </ul>
              </div>
            </div>
          </div>
        );

      case "projects":
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-medium mb-4" style={playfairStyle}>
              Featured Projects
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {allProjects.map((project) => (
                <div
                  key={project.id}
                  className="p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors duration-200"
                >
                  <div className="aspect-video bg-gradient-to-br from-amber-500/20 to-amber-600/20 rounded-lg mb-3 flex items-center justify-center">
                    <div className="text-2xl opacity-50">🖼️</div>
                  </div>

                  <h4 className="font-medium mb-2" style={textStyle}>
                    {project.name}
                  </h4>
                  <p className="text-xs opacity-70 mb-3" style={textStyle}>
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-1 mb-3">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 bg-white/10 rounded text-xs"
                        style={textStyle}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <button
                    className="w-full py-2 bg-amber-500/20 hover:bg-amber-500/30 rounded text-xs font-medium transition-colors duration-200"
                    style={textStyle}
                  >
                    Visit Project →
                  </button>
                </div>
              ))}
            </div>

            <div className="text-center pt-4">
              <button className="px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-black text-sm font-medium rounded-lg hover:from-amber-400 hover:to-amber-500 transition-all duration-300">
                View All Projects
              </button>
            </div>
          </div>
        );

      case "contact":
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-medium mb-3" style={playfairStyle}>
                Get In Touch
              </h3>
              <p className="text-sm opacity-80" style={textStyle}>
                Ready to bring your ideas to life? Let's discuss your next
                project and create something amazing together.
              </p>
            </div>

            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label
                    className="block text-sm font-medium mb-2"
                    style={textStyle}
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg focus:border-amber-500 focus:outline-none transition-colors duration-200"
                    style={textStyle}
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label
                    className="block text-sm font-medium mb-2"
                    style={textStyle}
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg focus:border-amber-500 focus:outline-none transition-colors duration-200"
                    style={textStyle}
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div>
                <label
                  className="block text-sm font-medium mb-2"
                  style={textStyle}
                >
                  Project Type
                </label>
                <select
                  className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg focus:border-amber-500 focus:outline-none transition-colors duration-200"
                  style={textStyle}
                >
                  <option value="">Select project type</option>
                  <option value="web">Web Development</option>
                  <option value="mobile">Mobile App</option>
                  <option value="design">UI/UX Design</option>
                  <option value="consulting">Consulting</option>
                </select>
              </div>

              <div>
                <label
                  className="block text-sm font-medium mb-2"
                  style={textStyle}
                >
                  Message
                </label>
                <textarea
                  rows={4}
                  className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg focus:border-amber-500 focus:outline-none transition-colors duration-200 resize-none"
                  style={textStyle}
                  placeholder="Tell me about your project..."
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-black text-sm font-medium rounded-lg hover:from-amber-400 hover:to-amber-500 transition-all duration-300"
              >
                Send Message
              </button>
            </form>

            <div className="border-t border-white/10 pt-4">
              <h4 className="font-medium mb-3" style={textStyle}>
                Alternative Contact Methods
              </h4>
              <div className="space-y-2">
                <div className="flex items-center space-x-3 p-2 hover:bg-white/5 rounded-lg transition-colors duration-200">
                  <div className="text-sm">📧</div>
                  <div className="text-sm" style={textStyle}>
                    hello@johndoe.dev
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-2 hover:bg-white/5 rounded-lg transition-colors duration-200">
                  <div className="text-sm">📱</div>
                  <div className="text-sm" style={textStyle}>
                    +1 (555) 123-4567
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-2 hover:bg-white/5 rounded-lg transition-colors duration-200">
                  <div className="text-sm">💼</div>
                  <div className="text-sm" style={textStyle}>
                    linkedin.com/in/johndoe
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-medium" style={textStyle}>
              {widgetName.charAt(0).toUpperCase() + widgetName.slice(1)}
            </h3>
            <p className="text-sm opacity-80" style={textStyle}>
              Detailed content for {widgetName} widget.
            </p>
          </div>
        );
    }
  };

  // ==================== LOADING SCREEN CONTENT ====================

  const getLoadingContent = () => {
    switch (loadingPhase) {
      case 0:
        return { text: "Initializing...", color: theme.colors.primary };
      case 1:
        return { text: "Building Experience...", color: theme.colors.primary };
      case 2:
        return { text: "Almost Ready...", color: theme.colors.primary };
      default:
        return { text: "Loading...", color: theme.colors.primary };
    }
  };

  // ==================== CARD HOVER EFFECTS ====================

  const cardHoverClass =
    "hover:scale-105 hover:shadow-2xl transition-all duration-300 ease-out";

  // ==================== LOADING SCREEN ====================

  if (!isLoaded) {
    return (
      <div
        className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden"
        style={{ backgroundColor: theme.colors.background }}
      >
        {/* Animated Background Elements */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full animate-pulse"
            style={{
              backgroundColor: theme.colors.primary,
              animationDelay: "0.5s",
            }}
          />
          <div
            className="absolute bottom-1/4 right-1/4 w-24 h-24 rounded-full animate-pulse"
            style={{
              backgroundColor: theme.colors.primary,
              animationDelay: "1s",
            }}
          />
          <div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 border-2 rounded-full animate-spin"
            style={{
              borderColor: theme.colors.primary,
              borderTopColor: "transparent",
              animationDuration: "3s",
            }}
          />
        </div>

        <div className="z-10 text-center">
          <div className="mb-8">
            <div
              className="w-20 h-20 border-4 border-t-transparent rounded-full animate-spin mx-auto mb-6"
              style={{
                borderColor: theme.colors.primary,
                borderTopColor: "transparent",
              }}
            />
            <h1
              className="text-4xl font-bold mb-4 animate-pulse"
              style={{ color: getLoadingContent().color }}
            >
              Bentolio
            </h1>
            <p
              className="text-lg opacity-80"
              style={{ color: getLoadingContent().color }}
            >
              {getLoadingContent().text}
            </p>
          </div>

          <div className="w-80 bg-white/10 rounded-full h-2 overflow-hidden">
            <div
              className="h-full transition-all duration-300 ease-out rounded-full relative"
              style={{
                width: `${progress}%`,
                backgroundColor: theme.colors.primary,
              }}
            >
              <div className="absolute inset-0 bg-white/20 animate-pulse rounded-full" />
            </div>
          </div>

          <div
            className="mt-4 text-sm opacity-60"
            style={{ color: theme.colors.text }}
          >
            {progress.toFixed(0)}% Complete
          </div>
        </div>
      </div>
    );
  }

  // ==================== TRANSITION SCREEN ====================

  if (!showMain) {
    return (
      <div
        className="min-h-screen flex items-center justify-center transition-all duration-1000"
        style={{ backgroundColor: `${theme.colors.background}dd` }}
      >
        <div
          className="text-6xl font-bold animate-fadeIn"
          style={{
            color: theme.colors.text,
            animation: "fadeIn 1.5s ease-in-out",
          }}
        >
          Welcome
        </div>
      </div>
    );
  }

  // ==================== MAIN PORTFOLIO CONTENT ====================

  return (
    <>
      {/* ==================== HEADER NAVIGATION ==================== */}
      <header
        className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b border-white/10"
        style={{ backgroundColor: `${theme.colors.background}95` }}
      >
        <nav className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div
            className="text-xl font-bold transition-colors duration-300"
            style={{ color: theme.colors.text }}
          >
            Bentolio
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {["Work", "About", "Skills", "Contact"].map((item) => (
              <button
                key={item}
                onClick={() => handleNavClick(item)}
                className="text-sm hover:opacity-80 transition-all duration-200 relative group"
                style={{ color: theme.colors.text }}
              >
                {item}
                <div
                  className="absolute -bottom-1 left-0 w-0 h-0.5 group-hover:w-full transition-all duration-300"
                  style={{ backgroundColor: theme.colors.primary }}
                />
              </button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden w-6 h-6 flex flex-col justify-center space-y-1 transition-all duration-300"
          >
            <span
              className={`w-full h-0.5 transition-all duration-300 ${isMobileMenuOpen ? "rotate-45 translate-y-1.5" : ""}`}
              style={{ backgroundColor: theme.colors.text }}
            />
            <span
              className={`w-full h-0.5 transition-all duration-300 ${isMobileMenuOpen ? "opacity-0" : ""}`}
              style={{ backgroundColor: theme.colors.text }}
            />
            <span
              className={`w-full h-0.5 transition-all duration-300 ${isMobileMenuOpen ? "-rotate-45 -translate-y-1.5" : ""}`}
              style={{ backgroundColor: theme.colors.text }}
            />
          </button>
        </nav>

        {/* Mobile Menu Panel */}
        {isMobileMenuOpen && (
          <div
            className="md:hidden absolute top-full left-0 right-0 border-b border-white/10 backdrop-blur-md transition-all duration-300"
            style={{ backgroundColor: theme.colors.background }}
          >
            <div className="px-6 py-4 space-y-4">
              {["Work", "About", "Skills", "Contact"].map((item) => (
                <button
                  key={item}
                  onClick={() => handleNavClick(item)}
                  className="block w-full text-left text-sm hover:opacity-80 transition-opacity duration-200 py-2"
                  style={{ color: theme.colors.text }}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* ==================== MAIN BENTO GRID LAYOUT ==================== */}
      <main
        className="min-h-screen pt-24 pb-16 px-6 transition-colors duration-500"
        style={{ backgroundColor: theme.colors.background }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-12 gap-6 auto-rows-max">
            {/* Hero Widget - Main Showcase */}
            <div
              ref={(el) => (widgetRefs.current["hero"] = el)}
              className={`col-span-12 md:col-span-8 h-80 rounded-2xl p-8 relative overflow-hidden cursor-pointer transition-all duration-300 ${cardHoverClass}`}
              style={{ backgroundColor: theme.colors.hero }}
              onClick={() => handleWidgetClick("hero")}
            >
              {/* Decorative Elements */}
              <div className="absolute top-4 right-4 w-20 h-20 rounded-full border-2 border-white/10 animate-spin"></div>
              <div className="absolute bottom-4 left-4 w-16 h-16 rounded-full bg-white/5"></div>

              {/* Hero Text */}
              <h1
                className="text-5xl font-bold mb-4 transition-colors duration-300"
                style={{
                  color: theme.colors.text,
                  fontFamily: "Playfair Display, serif",
                }}
              >
                Creative
                <br />
                Developer
              </h1>
              <p
                className="text-lg opacity-80 mb-6 max-w-md transition-colors duration-300"
                style={{ color: theme.colors.text }}
              >
                Crafting exceptional digital experiences through innovative
                design and cutting-edge technology.
              </p>
              <button
                className="px-6 py-3 bg-white/20 backdrop-blur-sm rounded-lg hover:bg-white/30 transition-all duration-300 hover:scale-105"
                style={{ color: theme.colors.text }}
              >
                View Work →
              </button>
            </div>

            {/* Profile Widget */}
            <div
              ref={(el) => (widgetRefs.current["profile"] = el)}
              className={`col-span-12 md:col-span-4 h-80 rounded-2xl p-6 relative overflow-hidden cursor-pointer transition-all duration-300 ${cardHoverClass}`}
              style={{ backgroundColor: theme.colors.profile }}
              onClick={() => handleWidgetClick("profile")}
            >
              {/* Profile Avatar */}
              <div className="w-24 h-24 bg-gradient-to-br from-amber-200 to-amber-600 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-xl">
                <div className="w-20 h-20 bg-gradient-to-br from-white to-gray-100 rounded-full flex items-center justify-center">
                  <svg
                    className="w-12 h-12 text-gray-600"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                  </svg>
                </div>
              </div>
              <h3
                className="text-xl font-medium mb-2 transition-colors duration-300"
                style={{ color: theme.colors.text }}
              >
                John Doe
              </h3>
              <p
                className="text-sm opacity-80 transition-colors duration-300"
                style={{ color: theme.colors.text }}
              >
                Senior Creative Developer with expertise in React, TypeScript,
                and modern web technologies.
              </p>

              {/* Floating Elements */}
              <div className="absolute top-4 right-4">
                <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse"></div>
              </div>
            </div>

            {/* About Widget */}
            <div
              ref={(el) => (widgetRefs.current["about"] = el)}
              className={`col-span-12 md:col-span-6 h-60 rounded-2xl p-6 relative overflow-hidden cursor-pointer transition-all duration-300 ${cardHoverClass}`}
              style={{ backgroundColor: theme.colors.about }}
              onClick={() => handleWidgetClick("about")}
            >
              {/* Quote mark decoration */}
              <svg
                className="absolute top-4 right-4 w-8 h-8 opacity-20 group-hover:opacity-40 transition-opacity duration-300"
                fill="currentColor"
                style={{ color: theme.colors.text }}
                viewBox="0 0 24 24"
              >
                <path d="M14,17H17L19,13V7H13V13H16M6,17H9L11,13V7H5V13H8L6,17Z" />
              </svg>

              <h3
                className="text-xl font-medium mb-3 transition-colors duration-300"
                style={{
                  color: theme.colors.text,
                  fontFamily: "Playfair Display, serif",
                }}
              >
                About Me
              </h3>
              <p
                className="text-sm opacity-80 leading-relaxed transition-colors duration-300"
                style={{ color: theme.colors.text }}
              >
                Passionate about creating digital experiences that bridge design
                and technology. With over 8 years of experience, I help bring
                ideas to life through code.
              </p>
            </div>

            {/* Skills Widget */}
            <div
              ref={(el) => (widgetRefs.current["skills"] = el)}
              className={`col-span-12 md:col-span-3 h-60 rounded-2xl p-6 relative overflow-hidden cursor-pointer transition-all duration-300 ${cardHoverClass}`}
              style={{ backgroundColor: theme.colors.skills }}
              onClick={() => handleWidgetClick("skills")}
            >
              <h3
                className="text-xl font-light mb-4 transition-colors duration-300"
                style={{
                  color: theme.colors.text,
                  fontFamily: "Playfair Display, serif",
                }}
              >
                Skills
              </h3>

              {/* Display first 5 skills with fade effect */}
              <div className="space-y-3 relative">
                {allSkills.slice(0, 5).map((skill, index) => (
                  <div
                    key={skill.name}
                    className="flex justify-between items-center"
                  >
                    <span
                      className="text-sm font-medium transition-colors duration-300"
                      style={{ color: theme.colors.text }}
                    >
                      {skill.name}
                    </span>
                    <div className="flex space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <div
                          key={i}
                          className={`w-2 h-2 rounded-full transition-all duration-300 ${
                            i < Math.floor(skill.level / 20)
                              ? "opacity-100"
                              : "opacity-30"
                          }`}
                          style={{
                            backgroundColor: theme.colors.text,
                            animationDelay: `${index * 100 + i * 50}ms`,
                          }}
                        />
                      ))}
                    </div>
                  </div>
                ))}

                {/* Fade gradient overlay */}
                <div
                  className="absolute bottom-0 left-0 right-0 h-8 pointer-events-none"
                  style={{
                    background: `linear-gradient(transparent, ${theme.colors.skills})`,
                  }}
                />
              </div>
            </div>

            {/* Location Widget */}
            <div
              ref={(el) => (widgetRefs.current["location"] = el)}
              className={`col-span-12 md:col-span-3 h-60 rounded-2xl p-6 relative overflow-hidden cursor-pointer transition-all duration-300 ${cardHoverClass}`}
              style={{ backgroundColor: theme.colors.location }}
              onClick={() => handleWidgetClick("location")}
            >
              <div className="text-5xl mb-4 group-hover:animate-bounce transition-all duration-300">
                🌍
              </div>
              <h3
                className="text-lg font-light mb-2 transition-colors duration-300"
                style={{
                  color: theme.colors.text,
                  fontFamily: "Playfair Display, serif",
                }}
              >
                Location
              </h3>
              <p
                className="text-sm opacity-80 transition-colors duration-300"
                style={{ color: theme.colors.text }}
              >
                San Francisco, CA
              </p>
              <p
                className="text-xs opacity-60 mt-2 transition-colors duration-300"
                style={{ color: theme.colors.text }}
              >
                Available for remote work worldwide
              </p>

              {/* Animated location pin */}
              <div className="absolute bottom-4 right-4">
                <div className="w-3 h-3 rounded-full bg-red-400 animate-ping"></div>
              </div>
            </div>

            {/* Projects Widget */}
            <div
              ref={(el) => (widgetRefs.current["projects"] = el)}
              className={`col-span-12 md:col-span-8 h-60 rounded-2xl p-6 relative overflow-hidden cursor-pointer transition-all duration-300 ${cardHoverClass}`}
              style={{ backgroundColor: theme.colors.projects }}
              onClick={() => handleWidgetClick("projects")}
            >
              <h3
                className="text-2xl font-light mb-4 transition-colors duration-300"
                style={{
                  color: theme.colors.text,
                  fontFamily: "Playfair Display, serif",
                }}
              >
                Recent Work
              </h3>

              {/* Featured Projects Grid */}
              <div className="grid grid-cols-3 gap-4">
                {allProjects.slice(0, 3).map((project, index) => (
                  <div
                    key={project.id}
                    className="group relative aspect-square bg-white/10 rounded-lg overflow-hidden hover:bg-white/20 transition-all duration-300"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-amber-500/20 to-amber-600/10 group-hover:from-amber-500/30 group-hover:to-amber-600/20 transition-all duration-300" />
                    <div className="absolute bottom-2 left-2 right-2">
                      <h4
                        className="text-xs font-medium truncate transition-colors duration-300"
                        style={{ color: theme.colors.text }}
                      >
                        {project.name}
                      </h4>
                      <p
                        className="text-xs opacity-70 truncate transition-colors duration-300"
                        style={{ color: theme.colors.text }}
                      >
                        {project.tech[0]}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Floating decoration */}
              <div className="absolute top-4 right-4 w-6 h-6 border-2 border-white/20 rounded-full animate-pulse"></div>
            </div>

            {/* Contact Widget */}
            <div
              ref={(el) => (widgetRefs.current["contact"] = el)}
              className={`col-span-12 md:col-span-4 h-60 rounded-2xl p-6 relative overflow-hidden cursor-pointer transition-all duration-300 ${cardHoverClass}`}
              style={{ backgroundColor: theme.colors.contact }}
              onClick={() => handleWidgetClick("contact")}
            >
              <div className="text-4xl mb-4">✉️</div>
              <h3
                className="text-xl font-light mb-3 transition-colors duration-300"
                style={{
                  color: theme.colors.text,
                  fontFamily: "Playfair Display, serif",
                }}
              >
                Get In Touch
              </h3>
              <p
                className="text-sm opacity-80 mb-4 transition-colors duration-300"
                style={{ color: theme.colors.text }}
              >
                Let's discuss your next project and create something amazing
                together.
              </p>

              {/* Contact methods preview */}
              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-xs opacity-70">
                  <span>📧</span>
                  <span style={{ color: theme.colors.text }}>
                    hello@johndoe.dev
                  </span>
                </div>
                <div className="flex items-center space-x-2 text-xs opacity-70">
                  <span>💼</span>
                  <span style={{ color: theme.colors.text }}>LinkedIn</span>
                </div>
              </div>

              {/* Animated envelope */}
              <div className="absolute bottom-4 right-4">
                <div className="w-8 h-6 border-2 border-white/30 rounded-sm relative">
                  <div className="absolute inset-1 border border-white/20"></div>
                  <div className="absolute top-1 left-1 w-2 h-1 bg-white/20 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Theme Selector */}
        <div className="fixed bottom-6 right-6 z-40">
          {showThemeSelector && (
            <div className="absolute bottom-full right-0 mb-4 p-4 bg-black/80 backdrop-blur-md rounded-2xl border border-white/20 animate-fadeIn">
              <div className="space-y-3">
                {colorThemes.map((themeOption) => (
                  <button
                    key={themeOption.id}
                    onClick={() => handleThemeChange(themeOption.id)}
                    className="flex items-center space-x-3 w-full p-2 rounded-lg hover:bg-white/10 transition-all duration-200 group"
                  >
                    <div className="flex space-x-1">
                      <div
                        className="w-3 h-3 rounded-full transition-transform duration-200 group-hover:scale-110"
                        style={{ backgroundColor: themeOption.colors.hero }}
                      />
                      <div
                        className="w-3 h-3 rounded-full transition-transform duration-200 group-hover:scale-110"
                        style={{ backgroundColor: themeOption.colors.primary }}
                      />
                    </div>
                    <span className="text-sm text-white">
                      {themeOption.name}
                    </span>
                    {currentTheme === themeOption.id && (
                      <div className="ml-auto w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          <button
            onClick={() => setShowThemeSelector(!showThemeSelector)}
            className="w-14 h-14 rounded-full bg-black/60 backdrop-blur-md border border-white/20 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:bg-black/80"
          >
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z"
              />
            </svg>
          </button>
        </div>
      </main>

      {/* ==================== EXPANSION MODAL ==================== */}
      {expandedWidget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fadeIn">
          <div
            className="relative w-full max-w-2xl max-h-[90vh] mx-4 rounded-2xl p-8 shadow-2xl overflow-y-auto animate-slideIn custom-scrollbar"
            style={{ backgroundColor: theme.colors.background }}
          >
            {/* Close Button */}
            <button
              onClick={() => {
                setExpandedWidget(null);
                setClickedWidget(null);
                setWidgetPosition(null);
              }}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/20 hover:bg-black/40 transition-all duration-200 flex items-center justify-center z-10 group"
            >
              <svg
                className="w-4 h-4 group-hover:rotate-90 transition-transform duration-200"
                fill="none"
                stroke="currentColor"
                style={{ color: theme.colors.text }}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {/* Dynamic Expanded Content */}
            {renderExpandedContent(expandedWidget)}
          </div>
        </div>
      )}

      {/* ==================== CUSTOM STYLES ==================== */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:wght@400;500;600;700&display=swap');
        
        * {
          font-family: 'Inter', sans-serif;
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
        
        .animate-slideIn {
          animation: slideIn 0.3s ease-out;
        }
        
        @keyframes fadeIn {
          from { 
            opacity: 0; 
            transform: translateY(10px); 
          }
          to { 
            opacity: 1; 
            transform: translateY(0); 
          }
        }
        
        @keyframes slideIn {
          from { 
            opacity: 0; 
            transform: scale(0.95) translateY(10px); 
          }
          to { 
            opacity: 1; 
            transform: scale(1) translateY(0); 
          }
        }
        
        /* Custom scrollbar for expanded content */
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 2px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(216, 207, 188, 0.3);
          border-radius: 2px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(216, 207, 188, 0.5);
        }
        
        /* Smooth transitions for all interactive elements */
        button, a, div[role="button"] {
          transition: all 0.2s ease-out;
        }
        
        /* Enhanced hover effects */
        .group:hover .group-hover\\:scale-110 {
          transform: scale(1.1);
        }
        
        .group:hover .group-hover\\:opacity-40 {
          opacity: 0.4;
        }
        
        .group:hover .group-hover\\:animate-bounce {
          animation: bounce 1s infinite;
        }
      `}</style>
    </>
  );
}
