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
 * Color theme definition with all necessary color values
 */
interface ColorTheme {
  id: string;
  name: string;
  colors: {
    background: string;
    primary: string;
    secondary: string;
    accent: string;
    text: string;
    hero: string;
    profile: string;
    about: string;
    skills: string;
    location: string;
    projects: string;
    contact: string;
  };
}

// ==================== MAIN COMPONENT ====================

const Index = () => {
  // ==================== STATE MANAGEMENT ====================

  /**
   * Loading animation states
   * - progress: 0-100 loading percentage
   * - isLoaded: when loading completes
   * - showMain: when to reveal main content
   * - loadingPhase: current loading phase (0: init, 1: building, 2: finalizing)
   */
  const [progress, setProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showMain, setShowMain] = useState(false);
  const [loadingPhase, setLoadingPhase] = useState(0);

  /**
   * Widget expansion states
   * - expandedWidget: currently expanded widget name
   * - clickedWidget: widget expanded via click (persists until manually closed)
   * - hoverTimer: timer for hover delay management
   * - skillAnimations: trigger for skill progress bar animations
   * - widgetPosition: original position of expanding widget
   * - showBlur: controls background blur effect
   */
  const [expandedWidget, setExpandedWidget] = useState<string | null>(null);
  const [clickedWidget, setClickedWidget] = useState<string | null>(null);
  const [hoverTimer, setHoverTimer] = useState<NodeJS.Timeout | null>(null);
  const [skillAnimations, setSkillAnimations] = useState(false);
  const [widgetPosition, setWidgetPosition] = useState<WidgetPosition | null>(
    null,
  );
  const [showBlur, setShowBlur] = useState(false);

  /**
   * Color theme states
   * - currentTheme: active theme ID
   * - showThemeSelector: theme picker visibility
   */
  const [currentTheme, setCurrentTheme] = useState<string>("default");
  const [showThemeSelector, setShowThemeSelector] = useState(false);

  /**
   * Mobile navigation states
   * - showMobileMenu: mobile menu visibility
   */
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  /**
   * Widget DOM element references for position calculations
   */
  const widgetRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  // ==================== COLOR THEME DEFINITIONS ====================

  /**
   * Five carefully crafted color themes
   * Each theme maintains consistent contrast and visual hierarchy
   */
  const colorThemes: ColorTheme[] = [
    {
      id: "default",
      name: "Charcoal",
      colors: {
        background: "rgb(17, 18, 13)",
        primary: "rgb(216, 207, 188)",
        secondary: "rgb(180, 170, 150)",
        accent: "rgb(150, 140, 120)",
        text: "rgb(216, 207, 188)",
        hero: "rgb(86, 84, 73)",
        profile: "rgb(45, 46, 40)",
        about: "rgb(35, 36, 30)",
        skills: "rgb(55, 56, 50)",
        location: "rgb(65, 66, 60)",
        projects: "rgb(75, 76, 70)",
        contact: "rgb(25, 26, 20)",
      },
    },
    {
      id: "ocean",
      name: "Ocean",
      colors: {
        background: "rgb(12, 20, 31)",
        primary: "rgb(176, 196, 222)",
        secondary: "rgb(135, 160, 190)",
        accent: "rgb(100, 130, 165)",
        text: "rgb(176, 196, 222)",
        hero: "rgb(52, 73, 94)",
        profile: "rgb(34, 47, 62)",
        about: "rgb(24, 37, 52)",
        skills: "rgb(39, 55, 70)",
        location: "rgb(44, 62, 80)",
        projects: "rgb(58, 80, 107)",
        contact: "rgb(19, 30, 45)",
      },
    },
    {
      id: "forest",
      name: "Forest",
      colors: {
        background: "rgb(18, 25, 15)",
        primary: "rgb(190, 207, 165)",
        secondary: "rgb(155, 175, 135)",
        accent: "rgb(125, 145, 110)",
        text: "rgb(190, 207, 165)",
        hero: "rgb(76, 84, 65)",
        profile: "rgb(45, 52, 38)",
        about: "rgb(35, 42, 28)",
        skills: "rgb(55, 62, 48)",
        location: "rgb(65, 72, 58)",
        projects: "rgb(85, 95, 75)",
        contact: "rgb(25, 32, 20)",
      },
    },
    {
      id: "sunset",
      name: "Sunset",
      colors: {
        background: "rgb(25, 15, 18)",
        primary: "rgb(207, 165, 190)",
        secondary: "rgb(175, 135, 155)",
        accent: "rgb(145, 110, 125)",
        text: "rgb(207, 165, 190)",
        hero: "rgb(84, 65, 76)",
        profile: "rgb(52, 38, 45)",
        about: "rgb(42, 28, 35)",
        skills: "rgb(62, 48, 55)",
        location: "rgb(72, 58, 65)",
        projects: "rgb(95, 75, 85)",
        contact: "rgb(32, 20, 25)",
      },
    },
    {
      id: "midnight",
      name: "Midnight",
      colors: {
        background: "rgb(8, 8, 15)",
        primary: "rgb(165, 165, 207)",
        secondary: "rgb(135, 135, 175)",
        accent: "rgb(110, 110, 145)",
        text: "rgb(165, 165, 207)",
        hero: "rgb(48, 48, 84)",
        profile: "rgb(32, 32, 52)",
        about: "rgb(22, 22, 42)",
        skills: "rgb(38, 38, 62)",
        location: "rgb(44, 44, 72)",
        projects: "rgb(58, 58, 95)",
        contact: "rgb(18, 18, 32)",
      },
    },
  ];

  /**
   * Get current active theme or fallback to default (memoized to prevent re-renders)
   */
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
      name: "Next.js",
      level: 90,
      description: "Full-stack development with SSR/SSG",
      category: "Framework",
    },
    {
      name: "TypeScript",
      level: 88,
      description: "Type-safe development and complex types",
      category: "Language",
    },
    {
      name: "Tailwind CSS",
      level: 92,
      description: "Utility-first CSS framework mastery",
      category: "Styling",
    },
    {
      name: "Framer Motion",
      level: 85,
      description: "Advanced animations and interactions",
      category: "Animation",
    },
    {
      name: "Node.js",
      level: 83,
      description: "Backend development and API design",
      category: "Backend",
    },
    {
      name: "GraphQL",
      level: 80,
      description: "Query language and API development",
      category: "Backend",
    },
    {
      name: "Docker",
      level: 75,
      description: "Containerization and deployment",
      category: "DevOps",
    },
    {
      name: "AWS",
      level: 78,
      description: "Cloud services and infrastructure",
      category: "Cloud",
    },
    {
      name: "Figma",
      level: 90,
      description: "UI/UX design and prototyping",
      category: "Design",
    },
  ];

  /**
   * Project portfolio with diverse technology stacks
   * Featured projects show in main grid, others in expanded view
   */
  const allProjects: Project[] = [
    {
      id: 1,
      name: "E-commerce Platform",
      description:
        "Full-stack e-commerce solution with payment integration, inventory management, and admin dashboard. Built with modern technologies and scalable architecture.",
      tech: ["React", "Node.js", "PostgreSQL", "Stripe", "AWS"],
      image: "/api/placeholder/300/200",
      liveUrl: "https://ecommerce-demo.com",
      featured: true,
    },
    {
      id: 2,
      name: "Design System",
      description:
        "Comprehensive design system with reusable components, documentation, and design tokens. Used across multiple products.",
      tech: ["React", "Storybook", "Figma", "TypeScript", "Chromatic"],
      image: "/api/placeholder/300/200",
      liveUrl: "https://design-system-demo.com",
      featured: true,
    },
    {
      id: 3,
      name: "Mobile Fitness App",
      description:
        "Cross-platform mobile application for fitness tracking with real-time data sync and social features.",
      tech: ["React Native", "Firebase", "Redux", "Expo"],
      image: "/api/placeholder/300/200",
      liveUrl: "https://fitness-app-demo.com",
      featured: true,
    },
    {
      id: 4,
      name: "Analytics Dashboard",
      description:
        "Real-time analytics dashboard with interactive charts, data visualization, and automated reporting.",
      tech: ["React", "D3.js", "Python", "FastAPI", "WebSocket"],
      image: "/api/placeholder/300/200",
      liveUrl: "https://analytics-demo.com",
      featured: false,
    },
    {
      id: 5,
      name: "Social Media Platform",
      description:
        "Social networking platform with real-time messaging, content sharing, and community features.",
      tech: ["Next.js", "Socket.io", "MongoDB", "Redis", "Docker"],
      image: "/api/placeholder/300/200",
      liveUrl: "https://social-demo.com",
      featured: false,
    },
    {
      id: 6,
      name: "AI Chat Assistant",
      description:
        "Intelligent chat assistant powered by machine learning for customer support and automation.",
      tech: ["Python", "TensorFlow", "React", "WebSocket", "OpenAI"],
      image: "/api/placeholder/300/200",
      liveUrl: "https://ai-chat-demo.com",
      featured: false,
    },
  ];

  // ==================== EFFECTS & LIFECYCLE ====================

  /**
   * Sophisticated multi-phase loading animation
   * Creates a professional loading experience with smooth transitions
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

  /**
   * Sequential blur effect
   * Applies blur only after widget expansion animation completes
   */
  useEffect(() => {
    if (expandedWidget) {
      const timer = setTimeout(() => {
        setShowBlur(true);
      }, 600); // Wait for expansion animation (500ms) + buffer
      return () => clearTimeout(timer);
    } else {
      setShowBlur(false);
    }
  }, [expandedWidget]);

  /**
   * Cleanup timers on unmount to prevent memory leaks
   */
  useEffect(() => {
    return () => {
      if (hoverTimer) clearTimeout(hoverTimer);
    };
  }, [hoverTimer]);

  // ==================== HELPER FUNCTIONS ====================

  /**
   * IMPROVED WIDGET INTERACTION HANDLER
   *
   * Manages hover and click interactions with enhanced stability:
   * - Prevents premature collapse during mouse movement
   * - Maintains proper state between hover and click modes
   * - Implements protective delays for better UX
   *
   * @param widgetName - The widget identifier
   * @param action - The interaction type (hover/leave/click)
   */
  const handleWidgetInteraction = (
    widgetName: string,
    action: "hover" | "leave" | "click",
  ) => {
    if (action === "click") {
      // Click handling: toggle or set expansion
      if (clickedWidget === widgetName) {
        // Close if clicking the same widget
        setClickedWidget(null);
        setExpandedWidget(null);
        setWidgetPosition(null);
        if (hoverTimer) {
          clearTimeout(hoverTimer);
          setHoverTimer(null);
        }
      } else {
        // Expand new widget
        const element = widgetRefs.current[widgetName];
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
        // Clear any hover timers
        if (hoverTimer) {
          clearTimeout(hoverTimer);
          setHoverTimer(null);
        }
      }
    } else if (action === "hover") {
      // Hover handling: only if no widget is clicked and none currently expanded
      if (!clickedWidget && !expandedWidget) {
        // Clear any existing timer
        if (hoverTimer) clearTimeout(hoverTimer);

        // Set new hover timer
        const timer = setTimeout(() => {
          const element = widgetRefs.current[widgetName];
          if (element) {
            const rect = element.getBoundingClientRect();
            setWidgetPosition({
              top: rect.top,
              left: rect.left,
              width: rect.width,
              height: rect.height,
            });
          }
          setExpandedWidget(widgetName);
        }, 1000); // 1 second hover delay

        setHoverTimer(timer);
      }
    } else if (action === "leave") {
      // Leave handling: only collapse hover-expanded widgets
      if (!clickedWidget && expandedWidget === widgetName) {
        // Clear hover timer if widget is still expanding
        if (hoverTimer) {
          clearTimeout(hoverTimer);
          setHoverTimer(null);
        }

        // Only collapse if widget was expanded via hover
        if (expandedWidget === widgetName) {
          const timer = setTimeout(() => {
            setExpandedWidget(null);
            setWidgetPosition(null);
          }, 200); // Reduced delay for immediate response
          setHoverTimer(timer);
        }
      }
    }
  };

  /**
   * Navigation click handler
   * Maps navigation items to corresponding widgets and closes mobile menu
   */
  const handleNavClick = (section: string) => {
    const widgetMap: { [key: string]: string } = {
      ABOUT: "about",
      WORK: "projects",
      CONTACT: "contact",
    };

    const targetWidget = widgetMap[section];
    if (targetWidget) {
      const element = widgetRefs.current[targetWidget];
      if (element) {
        const rect = element.getBoundingClientRect();
        setWidgetPosition({
          top: rect.top,
          left: rect.left,
          width: rect.width,
          height: rect.height,
        });
      }
      setClickedWidget(targetWidget);
      setExpandedWidget(targetWidget);
    }

    // Close mobile menu after navigation
    setShowMobileMenu(false);
  };

  /**
   * Theme change handler with smooth transitions
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

  /**
   * Get the first 5 skills with fade effect on the last one
   * Used for the collapsed skills widget display
   */
  const getVisibleSkills = () => {
    const skills = allSkills.slice(0, 5);
    return skills.map((skill, index) => ({
      ...skill,
      opacity: index === 4 ? 0.3 : 1, // Fade effect creates "see more" hint
    }));
  };

  /**
   * Filter projects to show only featured ones in main grid
   */
  const getFeaturedProjects = () =>
    allProjects.filter((project) => project.featured);

  /**
   * Standard card hover classes for consistent animations
   */
  const cardHoverClass =
    "transform transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:-translate-y-2 cursor-pointer group";

  // ==================== LOADING PHASE CONTENT ====================

  /**
   * SIMPLIFIED WIDGET INTERACTION HANDLER
   *
   * Manages click-only interactions for widget expansion:
   * - Click to expand widget with detailed content
   * - Click again to close expanded widget
   * - Only one widget can be expanded at a time
   *
   * @param widgetName - The widget identifier
   */
  const handleWidgetClick = (widgetName: string) => {
    if (clickedWidget === widgetName) {
      // Close if clicking the same widget
      setClickedWidget(null);
      setExpandedWidget(null);
      setWidgetPosition(null);
    } else {
      // Expand new widget
      const element = widgetRefs.current[widgetName];
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

  // ==================== REUSABLE COMPONENTS ====================

  /**
   * Professional contact form component
   * Styled to match the current theme
   */
  const ContactForm = () => (
    <div className="space-y-4 mt-4">
      <div>
        <label
          className="block text-xs font-medium mb-2 opacity-80"
          style={{ color: theme.colors.text }}
        >
          Name
        </label>
        <input
          type="text"
          className="w-full px-3 py-2 bg-white/10 rounded-lg border border-white/20 text-sm focus:outline-none focus:border-white/40 transition-colors"
          style={{ color: theme.colors.text }}
          placeholder="Your name"
        />
      </div>
      <div>
        <label
          className="block text-xs font-medium mb-2 opacity-80"
          style={{ color: theme.colors.text }}
        >
          Email
        </label>
        <input
          type="email"
          className="w-full px-3 py-2 bg-white/10 rounded-lg border border-white/20 text-sm focus:outline-none focus:border-white/40 transition-colors"
          style={{ color: theme.colors.text }}
          placeholder="your@email.com"
        />
      </div>
      <div>
        <label
          className="block text-xs font-medium mb-2 opacity-80"
          style={{ color: theme.colors.text }}
        >
          Message
        </label>
        <textarea
          rows={3}
          className="w-full px-3 py-2 bg-white/10 rounded-lg border border-white/20 text-sm focus:outline-none focus:border-white/40 transition-colors resize-none"
          style={{ color: theme.colors.text }}
          placeholder="Your message..."
        />
      </div>
      <button className="w-full py-2 bg-gradient-to-r from-amber-500 to-amber-600 text-black text-sm font-medium rounded-lg hover:from-amber-400 hover:to-amber-500 transition-all duration-300">
        Send Message
      </button>
    </div>
  );

  /**
   * EXPANDED WIDGET CONTENT RENDERER
   *
   * Renders detailed content for each widget type
   * Content is specifically sized to minimize empty space
   */
  const renderExpandedContent = (widgetName: string) => {
    switch (widgetName) {
      case "hero":
        return (
          <div className="space-y-6">
            <div>
              <h3
                className="text-2xl font-medium mb-4"
                style={{
                  color: theme.colors.text,
                  fontFamily: "Playfair Display, serif",
                }}
              >
                Our Mission
              </h3>
              <p
                className="text-sm opacity-80 leading-relaxed mb-4"
                style={{ color: theme.colors.text }}
              >
                We believe in creating digital experiences that not only look
                beautiful but solve real problems and create meaningful
                connections between brands and their audiences.
              </p>
            </div>

            <div className="border-l-2 border-amber-500/30 pl-4">
              <h4
                className="font-medium mb-3"
                style={{ color: theme.colors.text }}
              >
                Our Services
              </h4>
              <ul
                className="space-y-2 text-sm opacity-80"
                style={{ color: theme.colors.text }}
              >
                <li>• Full-stack Web Development</li>
                <li>• UI/UX Design & Prototyping</li>
                <li>• Mobile App Development</li>
                <li>• Design System Creation</li>
                <li>• Performance Optimization</li>
              </ul>
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
              <div className="w-20 h-20 bg-gradient-to-br from-amber-200 to-amber-600 rounded-full flex items-center justify-center mx-auto mb-3">
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
              <div
                className="text-lg font-medium mb-1"
                style={{ color: theme.colors.text }}
              >
                John Doe
              </div>
              <div
                className="text-xs opacity-70 mb-3"
                style={{ color: theme.colors.text }}
              >
                Senior Creative Developer
              </div>
            </div>

            <div className="border-l-2 border-amber-500/30 pl-4">
              <h4
                className="font-medium mb-2"
                style={{ color: theme.colors.text }}
              >
                Achievements
              </h4>
              <ul
                className="space-y-1 text-xs opacity-80"
                style={{ color: theme.colors.text }}
              >
                <li>🏆 Awwwards Site of the Day (2023)</li>
                <li>🎖️ CSS Design Awards Winner</li>
                <li>📜 Google Developer Expert</li>
                <li>🌟 10+ successful product launches</li>
              </ul>
            </div>

            <div className="border-l-2 border-amber-500/30 pl-4">
              <h4
                className="font-medium mb-2"
                style={{ color: theme.colors.text }}
              >
                Certifications
              </h4>
              <ul
                className="space-y-1 text-xs opacity-80"
                style={{ color: theme.colors.text }}
              >
                <li>• AWS Solutions Architect</li>
                <li>• Google UX Design Certificate</li>
                <li>• React Advanced Patterns</li>
              </ul>
            </div>

            <button className="w-full py-2 bg-gradient-to-r from-amber-500 to-amber-600 text-black text-sm font-medium rounded-lg hover:from-amber-400 hover:to-amber-500 transition-all duration-300">
              Download Resume
            </button>
          </div>
        );

      case "about":
        return (
          <div className="space-y-4">
            <h3
              className="text-xl font-medium mb-4"
              style={{
                color: theme.colors.text,
                fontFamily: "Playfair Display, serif",
              }}
            >
              About Me
            </h3>
            <p
              className="text-sm opacity-80 leading-relaxed"
              style={{ color: theme.colors.text }}
            >
              I'm a passionate creative developer with over 5 years of
              experience in crafting digital experiences that bridge the gap
              between design and technology.
            </p>

            <div className="border-l-2 border-amber-500/30 pl-4">
              <h4
                className="font-medium mb-2"
                style={{ color: theme.colors.text }}
              >
                Experience Timeline
              </h4>
              <div
                className="space-y-2 text-xs opacity-80"
                style={{ color: theme.colors.text }}
              >
                <div className="flex justify-between">
                  <span>Senior Frontend Developer</span>
                  <span>2023-Present</span>
                </div>
                <div className="text-xs opacity-60">
                  TechCorp - Leading innovation team
                </div>

                <div className="flex justify-between mt-2">
                  <span>Full Stack Developer</span>
                  <span>2021-2023</span>
                </div>
                <div className="text-xs opacity-60">
                  StartupXYZ - Built MVP to 100k+ users
                </div>
              </div>
            </div>

            <div className="border-l-2 border-amber-500/30 pl-4">
              <h4
                className="font-medium mb-2"
                style={{ color: theme.colors.text }}
              >
                Philosophy
              </h4>
              <p
                className="text-xs opacity-80 leading-relaxed"
                style={{ color: theme.colors.text }}
              >
                I believe great software isn't just about code—it's about
                understanding users, solving real problems, and creating
                experiences that feel intuitive and delightful.
              </p>
            </div>
          </div>
        );

      case "skills":
        return (
          <div className="space-y-4">
            <h3
              className="text-xl font-medium mb-4"
              style={{
                color: theme.colors.text,
                fontFamily: "Playfair Display, serif",
              }}
            >
              Skills & Expertise
            </h3>
            {/* Optimized container height to eliminate empty space */}
            <div className="space-y-3 max-h-72 overflow-y-auto custom-scrollbar">
              {allSkills.map((skill, index) => (
                <div
                  key={skill.name}
                  className="border-l-2 border-amber-500/20 pl-3 pb-2"
                >
                  <div className="flex justify-between items-center mb-1">
                    <span
                      className="text-sm font-medium"
                      style={{ color: theme.colors.text }}
                    >
                      {skill.name}
                    </span>
                    <span
                      className="text-xs opacity-60"
                      style={{ color: theme.colors.text }}
                    >
                      {skill.level}%
                    </span>
                  </div>

                  {/* Animated Progress Bar */}
                  <div className="w-full h-1 bg-white/10 rounded-full mb-1 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-amber-400 to-amber-600 rounded-full transition-all duration-1000 ease-out"
                      style={{
                        width: skillAnimations ? `${skill.level}%` : "0%",
                        transitionDelay: `${index * 100}ms`,
                      }}
                    ></div>
                  </div>

                  <div
                    className="text-xs opacity-70"
                    style={{ color: theme.colors.text }}
                  >
                    {skill.description}
                  </div>
                  <div
                    className="text-xs opacity-50 mt-1"
                    style={{ color: theme.colors.text }}
                  >
                    {skill.category}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case "location":
        return (
          <div className="space-y-4">
            <h3
              className="text-xl font-medium mb-4"
              style={{
                color: theme.colors.text,
                fontFamily: "Playfair Display, serif",
              }}
            >
              Location & Availability
            </h3>
            <div className="text-center">
              <div className="text-4xl mb-2">🌍</div>
              <div className="font-medium" style={{ color: theme.colors.text }}>
                San Francisco, California
              </div>
              <div
                className="text-xs opacity-70"
                style={{ color: theme.colors.text }}
              >
                United States
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="text-center p-3 bg-white/5 rounded-lg">
                <div
                  className="text-xs opacity-70 mb-1"
                  style={{ color: theme.colors.text }}
                >
                  Local Time
                </div>
                <div
                  className="font-medium text-xs"
                  style={{ color: theme.colors.text }}
                >
                  {new Date().toLocaleTimeString("en-US", {
                    timeZone: "America/Los_Angeles",
                    hour12: true,
                  })}
                </div>
              </div>
              <div className="text-center p-3 bg-white/5 rounded-lg">
                <div
                  className="text-xs opacity-70 mb-1"
                  style={{ color: theme.colors.text }}
                >
                  Time Zone
                </div>
                <div
                  className="font-medium text-xs"
                  style={{ color: theme.colors.text }}
                >
                  UTC-8
                </div>
              </div>
            </div>

            <div className="border-l-2 border-amber-500/30 pl-4">
              <h4
                className="font-medium mb-2"
                style={{ color: theme.colors.text }}
              >
                Work Preferences
              </h4>
              <ul
                className="space-y-1 text-xs opacity-80"
                style={{ color: theme.colors.text }}
              >
                <li>🏠 Remote work available</li>
                <li>🤝 On-site meetings in SF Bay Area</li>
                <li>✈️ Travel for projects worldwide</li>
                <li>🕐 Flexible working hours</li>
              </ul>
            </div>
          </div>
        );

      case "projects":
        return (
          <div className="space-y-4">
            <h3
              className="text-xl font-medium mb-4"
              style={{
                color: theme.colors.text,
                fontFamily: "Playfair Display, serif",
              }}
            >
              All Projects
            </h3>
            {/* Optimized grid height to show all projects without empty space */}
            <div className="grid grid-cols-2 gap-4 max-h-96 overflow-y-auto custom-scrollbar">
              {allProjects.map((project) => (
                <div
                  key={project.id}
                  className="bg-white/5 rounded-lg p-4 hover:bg-white/10 transition-colors duration-300"
                >
                  <div className="w-full h-16 bg-gradient-to-r from-amber-400/20 to-amber-600/20 rounded mb-3"></div>
                  <h4
                    className="text-sm font-medium mb-2"
                    style={{ color: theme.colors.text }}
                  >
                    {project.name}
                  </h4>
                  <p
                    className="text-xs opacity-70 mb-3 leading-relaxed"
                    style={{ color: theme.colors.text }}
                  >
                    {project.description.slice(0, 80)}...
                  </p>
                  <div className="flex flex-wrap gap-1 mb-3">
                    {project.tech.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className="text-xs px-2 py-1 bg-white/10 rounded"
                        style={{ color: theme.colors.text }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <button
                    className="w-full py-2 bg-gradient-to-r from-amber-500/20 to-amber-600/20 text-xs font-medium rounded hover:from-amber-500/40 hover:to-amber-600/40 transition-all duration-300"
                    style={{ color: theme.colors.text }}
                  >
                    Visit Project →
                  </button>
                </div>
              ))}
            </div>
          </div>
        );

      case "contact":
        return (
          <div className="space-y-4">
            <h3
              className="text-xl font-medium mb-4"
              style={{
                color: theme.colors.text,
                fontFamily: "Playfair Display, serif",
              }}
            >
              Get In Touch
            </h3>
            <ContactForm />

            <div className="mt-6 pt-4 border-t border-white/10">
              <h4
                className="text-sm font-medium mb-3"
                style={{ color: theme.colors.text }}
              >
                Other ways to reach me
              </h4>
              <div
                className="space-y-2 text-xs"
                style={{ color: theme.colors.text }}
              >
                <div className="flex items-center opacity-80">
                  <span className="mr-3">📧</span>
                  hello@johndoe.dev
                </div>
                <div className="flex items-center opacity-80">
                  <span className="mr-3">📱</span>
                  +1 (555) 123-4567
                </div>
                <div className="flex items-center opacity-80">
                  <span className="mr-3">💼</span>
                  linkedin.com/in/johndoe
                </div>
                <div className="flex items-center opacity-80">
                  <span className="mr-3">🐙</span>
                  github.com/johndoe
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  // ==================== MAIN RENDER ====================

  return (
    <>
      {/* Google Fonts Import for Professional Typography */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin="anonymous"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:wght@400;500;600;700&display=swap"
        rel="stylesheet"
      />

      {/* Main Application Container */}
      <div
        className="min-h-screen w-full overflow-hidden relative transition-colors duration-700"
        style={{
          backgroundColor: theme.colors.background,
          fontFamily: "Inter, system-ui, sans-serif",
        }}
      >
        {/* ==================== LOADING PROGRESS BAR ==================== */}
        <div className="fixed top-0 left-0 w-full h-1 z-50 bg-black/20">
          <div
            className="h-full transition-all duration-300 ease-out relative overflow-hidden"
            style={{
              background: `linear-gradient(90deg, ${theme.colors.primary} 0%, ${theme.colors.secondary} 50%, ${theme.colors.accent} 100%)`,
              width: `${progress}%`,
              boxShadow: `0 0 20px ${theme.colors.primary}`,
            }}
          >
            {/* Animated shimmer effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
          </div>
        </div>

        {/* ==================== SOPHISTICATED LOADING SCREEN ==================== */}
        <div
          className={`fixed inset-0 z-40 transition-all duration-1000 ${
            showMain ? "opacity-0 pointer-events-none" : "opacity-100"
          }`}
          style={{ backgroundColor: theme.colors.background }}
        >
          {/* Geometric Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-1/4 left-1/4 w-32 h-32 border border-white rotate-45 animate-pulse"></div>
            <div
              className="absolute top-3/4 right-1/4 w-24 h-24 border border-white rounded-full animate-pulse"
              style={{ animationDelay: "0.5s" }}
            ></div>
            <div
              className="absolute bottom-1/4 left-1/3 w-16 h-16 border border-white rotate-12 animate-pulse"
              style={{ animationDelay: "1s" }}
            ></div>
          </div>

          {/* Main Loading Content */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              {/* Morphing Logo */}
              <div className="mb-8 relative">
                <div
                  className={`text-6xl font-light tracking-wider transition-all duration-1000 ${
                    loadingPhase >= 1
                      ? "scale-110 opacity-90"
                      : "scale-100 opacity-100"
                  }`}
                  style={{
                    color: getLoadingContent().color,
                    fontFamily: "Playfair Display, serif",
                  }}
                >
                  BENTOLIO
                </div>

                {/* Animated progress underline */}
                <div
                  className="absolute bottom-0 left-1/2 transform -translate-x-1/2 h-0.5 transition-all duration-1000"
                  style={{
                    backgroundColor: getLoadingContent().color,
                    width: `${progress}%`,
                  }}
                ></div>
              </div>

              {/* Phase indicator */}
              <div className="mb-6">
                <div
                  className="text-sm tracking-widest transition-all duration-500"
                  style={{ color: getLoadingContent().color }}
                >
                  {getLoadingContent().text}
                </div>
              </div>

              {/* Sophisticated loading dots */}
              <div className="flex items-center justify-center space-x-2">
                {Array.from({ length: getLoadingContent().dots }).map(
                  (_, i) => (
                    <div
                      key={i}
                      className="w-2 h-2 rounded-full animate-bounce"
                      style={{
                        backgroundColor: getLoadingContent().color,
                        animationDelay: `${i * 0.15}s`,
                      }}
                    ></div>
                  ),
                )}
              </div>

              {/* Progress percentage */}
              <div className="mt-6">
                <div
                  className="text-xs tracking-wider opacity-60"
                  style={{ color: getLoadingContent().color }}
                >
                  {Math.round(progress)}%
                </div>
              </div>

              {/* Particle effects */}
              <div className="absolute inset-0 pointer-events-none">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-1 h-1 rounded-full animate-pulse"
                    style={{
                      backgroundColor: getLoadingContent().color,
                      top: `${20 + i * 10}%`,
                      left: `${10 + i * 15}%`,
                      animationDelay: `${i * 0.3}s`,
                    }}
                  ></div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ==================== RESPONSIVE HEADER (ALWAYS UNBLURRED) ==================== */}
        <div
          className={`fixed top-0 left-0 right-0 h-20 flex items-center justify-between px-6 backdrop-blur-sm z-50 transition-colors duration-700`}
          style={{ backgroundColor: `${theme.colors.background}dd` }}
        >
          {/* Brand Logo */}
          <div
            className="text-3xl font-light tracking-wide relative group"
            style={{
              color: theme.colors.text,
              fontFamily: "Playfair Display, serif",
            }}
          >
            BENTOLIO
            {/* Animated underline on hover */}
            <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-current transition-all duration-300 group-hover:w-full"></div>
          </div>

          {/* Desktop Navigation Menu - Hidden on mobile */}
          <div className="hidden md:flex space-x-8">
            {["ABOUT", "WORK", "CONTACT"].map((item) => (
              <button
                key={item}
                onClick={() => handleNavClick(item)}
                className="text-sm tracking-wider font-medium relative overflow-hidden transition-all duration-300 hover:scale-105 group"
                style={{ color: theme.colors.text }}
              >
                <span className="relative z-10">{item}</span>
                {/* Hover background effect */}
                <div className="absolute inset-0 bg-white/10 transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100 origin-left rounded"></div>
              </button>
            ))}
          </div>

          {/* Mobile Menu Button - Shown only on mobile */}
          <button
            onClick={() => setShowMobileMenu(!showMobileMenu)}
            className="md:hidden w-10 h-10 flex items-center justify-center rounded-lg transition-colors duration-200 hover:bg-white/10"
            style={{ color: theme.colors.text }}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {showMobileMenu ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* ==================== MOBILE NAVIGATION MENU ==================== */}
        {showMobileMenu && (
          <div className="fixed inset-0 z-40 md:hidden">
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              onClick={() => setShowMobileMenu(false)}
            />

            {/* Mobile Menu Panel */}
            <div
              className="absolute top-20 left-4 right-4 rounded-2xl p-6 shadow-2xl border border-white/10"
              style={{ backgroundColor: theme.colors.background }}
            >
              <div className="space-y-4">
                {["ABOUT", "WORK", "CONTACT"].map((item) => (
                  <button
                    key={item}
                    onClick={() => handleNavClick(item)}
                    className="w-full text-left text-lg tracking-wider font-medium py-3 px-4 rounded-lg transition-all duration-300 hover:bg-white/10"
                    style={{ color: theme.colors.text }}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ==================== MAIN PORTFOLIO CONTENT ==================== */}
        <div
          className={`w-full p-[14px] min-h-screen pt-28 transition-all duration-1000 ${
            showMain ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          } ${showBlur ? "blur-sm" : "blur-0"}`}
        >
          <div className="grid grid-cols-12 gap-[14px] min-h-screen relative z-10">
            {/* ==================== BENTO GRID LAYOUT ==================== */}
            <div className="col-span-12 grid grid-cols-12 gap-[14px] pb-[14px]">
              {/* HERO SECTION - Large feature card */}
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
                  className="text-6xl md:text-8xl font-light mb-4 group-hover:scale-105 transition-transform duration-300"
                  style={{
                    color: theme.colors.text,
                    fontFamily: "Playfair Display, serif",
                  }}
                >
                  Creative
                </h1>
                <h1
                  className="text-6xl md:text-8xl font-light mb-6 group-hover:scale-105 transition-transform duration-300"
                  style={{
                    color: theme.colors.text,
                    fontFamily: "Playfair Display, serif",
                  }}
                >
                  Developer
                </h1>
                <p
                  className="text-lg opacity-80 max-w-md group-hover:opacity-100 transition-opacity duration-300"
                  style={{ color: theme.colors.text }}
                >
                  Crafting digital experiences through innovative design and
                  development
                </p>

                {/* Star decoration */}
                <svg
                  className="absolute top-1/2 right-8 w-6 h-6 opacity-20 group-hover:opacity-40 transition-opacity duration-300"
                  fill="currentColor"
                  style={{ color: theme.colors.text }}
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              </div>

              {/* PROFILE CARD - Personal information */}
              <div
                ref={(el) => (widgetRefs.current["profile"] = el)}
                className={`col-span-12 md:col-span-4 h-80 rounded-2xl p-6 flex flex-col items-center justify-center text-center relative overflow-hidden cursor-pointer transition-all duration-300 ${cardHoverClass}`}
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

                {/* Profile Info */}
                <h3
                  className="text-xl font-medium mb-2"
                  style={{
                    color: theme.colors.text,
                    fontFamily: "Playfair Display, serif",
                  }}
                >
                  John Doe
                </h3>
                <p
                  className="text-sm opacity-70 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ color: theme.colors.text }}
                >
                  UI/UX Designer & Developer
                </p>

                {/* Availability Status */}
                <div className="flex items-center mt-4 opacity-60 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse mr-2"></div>
                  <span
                    className="text-xs"
                    style={{ color: theme.colors.text }}
                  >
                    Available for work
                  </span>
                </div>
              </div>

              {/* ABOUT SECTION - Personal story */}
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
                >
                  <path d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z" />
                </svg>

                <h3
                  className="text-2xl font-light mb-4"
                  style={{
                    color: theme.colors.text,
                    fontFamily: "Playfair Display, serif",
                  }}
                >
                  About Me
                </h3>
                <p
                  className="text-sm leading-relaxed opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ color: theme.colors.text }}
                >
                  I'm a passionate creative developer with over 5 years of
                  experience in crafting digital experiences. I specialize in
                  React, Next.js, and modern web technologies.
                </p>
              </div>

              {/* SKILLS SECTION - Technical expertise */}
              <div
                ref={(el) => (widgetRefs.current["skills"] = el)}
                className={`col-span-12 md:col-span-3 h-60 rounded-2xl p-6 relative overflow-hidden cursor-pointer transition-all duration-300 ${cardHoverClass}`}
                style={{ backgroundColor: theme.colors.skills }}
                onClick={() => handleWidgetClick("skills")}
              >
                <h3
                  className="text-xl font-light mb-4"
                  style={{
                    color: theme.colors.text,
                    fontFamily: "Playfair Display, serif",
                  }}
                >
                  Skills
                </h3>

                {/* Skills list with fade effect */}
                <div className="space-y-3 relative">
                  {getVisibleSkills().map((skill, index) => (
                    <div
                      key={skill.name}
                      className="flex items-center text-sm group-hover:translate-x-2 transition-all duration-300"
                      style={{
                        color: theme.colors.text,
                        opacity: skill.opacity,
                      }}
                    >
                      <div className="w-2 h-2 rounded-full mr-3 bg-current opacity-60"></div>
                      {skill.name}
                    </div>
                  ))}

                  {/* Gradient fade effect at bottom */}
                  <div
                    className="absolute bottom-0 left-0 right-0 h-8 pointer-events-none"
                    style={{
                      background: `linear-gradient(to bottom, transparent, ${theme.colors.skills})`,
                    }}
                  />
                </div>
              </div>

              {/* LOCATION CARD - Geographic info */}
              <div
                ref={(el) => (widgetRefs.current["location"] = el)}
                className={`col-span-12 md:col-span-3 h-60 rounded-2xl p-6 flex flex-col justify-center text-center relative overflow-hidden cursor-pointer transition-all duration-300 ${cardHoverClass}`}
                style={{ backgroundColor: theme.colors.location }}
                onClick={() => handleWidgetClick("location")}
              >
                <div className="text-5xl mb-4 group-hover:animate-bounce transition-all duration-300">
                  🌍
                </div>
                <h3
                  className="text-lg font-light mb-2"
                  style={{
                    color: theme.colors.text,
                    fontFamily: "Playfair Display, serif",
                  }}
                >
                  Based in
                </h3>
                <p
                  className="text-sm opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ color: theme.colors.text }}
                >
                  San Francisco, CA
                </p>
                <div
                  className="mt-3 text-xs opacity-60 group-hover:opacity-80 transition-opacity duration-300"
                  style={{ color: theme.colors.text }}
                >
                  UTC-8 (PST)
                </div>

                {/* Decorative dots */}
                <div className="absolute top-2 right-2 w-3 h-3 rounded-full bg-white/20 animate-pulse"></div>
                <div className="absolute bottom-2 left-2 w-2 h-2 rounded-full bg-white/10"></div>
              </div>

              {/* PROJECTS SECTION - Portfolio showcase */}
              <div
                ref={(el) => (widgetRefs.current["projects"] = el)}
                className={`col-span-12 md:col-span-8 h-60 rounded-2xl p-6 relative overflow-hidden cursor-pointer transition-all duration-300 ${cardHoverClass}`}
                style={{ backgroundColor: theme.colors.projects }}
                onClick={() => handleWidgetClick("projects")}
              >
                <h3
                  className="text-2xl font-light mb-4"
                  style={{
                    color: theme.colors.text,
                    fontFamily: "Playfair Display, serif",
                  }}
                >
                  Recent Work
                </h3>

                {/* Featured projects grid */}
                <div className="grid grid-cols-3 gap-4 h-32">
                  {getFeaturedProjects().map((project, i) => (
                    <div
                      key={project.id}
                      className="bg-white/10 rounded-lg hover:bg-white/20 transition-all duration-300 cursor-pointer p-4 flex flex-col justify-between group/project hover:scale-105"
                    >
                      <div className="w-full h-8 bg-gradient-to-r from-amber-400/20 to-amber-600/20 rounded mb-2 group-hover/project:from-amber-400/40 group-hover/project:to-amber-600/40 transition-all duration-300"></div>
                      <div>
                        <div
                          className="text-xs font-medium opacity-80 group-hover/project:opacity-100 transition-opacity duration-300"
                          style={{ color: theme.colors.text }}
                        >
                          {project.name}
                        </div>
                        <div
                          className="text-xs opacity-60 group-hover/project:opacity-80 transition-opacity duration-300"
                          style={{ color: theme.colors.text }}
                        >
                          {project.tech.slice(0, 2).join(", ")}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* CONTACT SECTION - Communication channels */}
              <div
                ref={(el) => (widgetRefs.current["contact"] = el)}
                className={`col-span-12 md:col-span-4 h-60 rounded-2xl p-6 flex flex-col justify-center relative overflow-hidden cursor-pointer transition-all duration-300 ${cardHoverClass}`}
                style={{ backgroundColor: theme.colors.contact }}
                onMouseEnter={() => handleWidgetInteraction("contact", "hover")}
                onMouseLeave={() => handleWidgetInteraction("contact", "leave")}
                onClick={() => handleWidgetInteraction("contact", "click")}
              >
                {/* Email icon decoration */}
                <svg
                  className="absolute top-4 right-4 w-6 h-6 opacity-20 group-hover:opacity-40 transition-opacity duration-300"
                  fill="none"
                  stroke="currentColor"
                  style={{ color: theme.colors.text }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 002 2v10a2 2 0 002 2z"
                  />
                </svg>

                <h3
                  className="text-xl font-light mb-4"
                  style={{
                    color: theme.colors.text,
                    fontFamily: "Playfair Display, serif",
                  }}
                >
                  Let's Connect
                </h3>

                <div className="space-y-4">
                  <a
                    href="#"
                    className="block text-sm opacity-80 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-2 group/email"
                    style={{ color: theme.colors.text }}
                  >
                    <span className="group-hover/email:underline">
                      hello@johndoe.dev
                    </span>
                  </a>

                  {/* Social links */}
                  <div className="flex space-x-6">
                    {[
                      { name: "Twitter", icon: "🐦" },
                      { name: "GitHub", icon: "💻" },
                      { name: "LinkedIn", icon: "💼" },
                    ].map((social) => (
                      <a
                        key={social.name}
                        href="#"
                        className="text-xs opacity-60 group-hover:opacity-100 transition-all duration-300 hover:scale-110 hover:-translate-y-1 flex items-center space-x-1"
                        style={{ color: theme.colors.text }}
                      >
                        <span>{social.icon}</span>
                        <span>{social.name}</span>
                      </a>
                    ))}
                  </div>
                </div>

                <div
                  className="mt-4 text-xs opacity-50 group-hover:opacity-70 transition-opacity duration-300"
                  style={{ color: theme.colors.text }}
                >
                  Usually responds within 24h
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ==================== COLOR THEME SWITCHER ==================== */}
        <div className="fixed bottom-6 right-6 z-50">
          {/* Theme Selection Panel */}
          {showThemeSelector && (
            <div className="absolute bottom-16 right-0 bg-black/80 backdrop-blur-md rounded-2xl p-4 min-w-64 border border-white/10">
              <h3 className="text-sm font-medium mb-3 text-white">
                Choose Theme
              </h3>
              <div className="grid grid-cols-1 gap-2">
                {colorThemes.map((themeOption) => (
                  <button
                    key={themeOption.id}
                    onClick={() => handleThemeChange(themeOption.id)}
                    className={`flex items-center space-x-3 p-3 rounded-lg transition-all duration-200 hover:bg-white/10 ${
                      currentTheme === themeOption.id ? "bg-white/20" : ""
                    }`}
                  >
                    {/* Theme color preview */}
                    <div className="flex space-x-1">
                      <div
                        className="w-4 h-4 rounded-full"
                        style={{
                          backgroundColor: themeOption.colors.background,
                        }}
                      />
                      <div
                        className="w-4 h-4 rounded-full"
                        style={{ backgroundColor: themeOption.colors.hero }}
                      />
                      <div
                        className="w-4 h-4 rounded-full"
                        style={{ backgroundColor: themeOption.colors.primary }}
                      />
                    </div>
                    <span className="text-sm text-white">
                      {themeOption.name}
                    </span>
                    {/* Active indicator */}
                    {currentTheme === themeOption.id && (
                      <div className="ml-auto w-2 h-2 rounded-full bg-green-400"></div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Theme Switcher Button */}
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

        {/* ==================== SIMPLE EXPANSION MODAL ==================== */}
        {expandedWidget && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div
              className="relative w-full max-w-2xl max-h-[90vh] mx-4 rounded-2xl p-8 shadow-2xl overflow-y-auto"
              style={{ backgroundColor: theme.colors.background }}
            >
              {/* Close Button */}
              <button
                onClick={() => {
                  setExpandedWidget(null);
                  setClickedWidget(null);
                  setWidgetPosition(null);
                }}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/20 hover:bg-black/40 transition-colors duration-200 flex items-center justify-center z-10"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  style={{ color: theme.colors.text }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>

              {/* Expanded Content */}
              {renderExpandedContent(expandedWidget)}
            </div>
          </div>
        )}
      </div>

      {/* ==================== DYNAMIC THEME STYLES ==================== */}
      <style>{`
        :root {
          --theme-background: ${theme.colors.background};
          --theme-text: ${theme.colors.text};
          --theme-primary: ${theme.colors.primary};
          --theme-hero: ${theme.colors.hero};
          --theme-profile: ${theme.colors.profile};
          --theme-about: ${theme.colors.about};
          --theme-skills: ${theme.colors.skills};
          --theme-location: ${theme.colors.location};
          --theme-projects: ${theme.colors.projects};
          --theme-contact: ${theme.colors.contact};
        }

        .theme-text { color: var(--theme-text); }
        .theme-bg { background-color: var(--theme-background); }
        .playfair { font-family: "Playfair Display", serif; }

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
      `}</style>
    </>
  );
};

export default Index;
