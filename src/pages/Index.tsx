import { useEffect, useState, useRef, useMemo } from "react";

/**
 * BENTOLIO PORTFOLIO WEBSITE - ENHANCED AESTHETIC VERSION
 *
 * A sophisticated portfolio website featuring:
 * - Elegant typography with premium font combinations
 * - Complex multi-layered loading animation with particle effects
 * - Enhanced color themes with perfect contrast ratios
 * - Sophisticated micro-interactions and animations
 * - Premium aesthetic design language
 *
 * Key Features:
 * - Advanced loading sequences with morphing elements
 * - Professional typography hierarchy
 * - Accessible color contrast across all themes
 * - Elegant hover states and transitions
 * - Complex particle animation systems
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
 * Enhanced color theme configuration with accessibility-focused contrast
 */
interface ColorTheme {
  id: string;
  name: string;
  colors: {
    background: string;
    text: string;
    textSecondary: string;
    primary: string;
    accent: string;
    hero: string;
    profile: string;
    about: string;
    skills: string;
    location: string;
    projects: string;
    contact: string;
    surface: string;
    surfaceElevated: string;
  };
}

// ==================== ENHANCED THEME CONFIGURATION ====================

const colorThemes: ColorTheme[] = [
  {
    id: "charcoal",
    name: "Charcoal Elegance",
    colors: {
      background: "rgb(12, 13, 15)",
      text: "rgb(248, 250, 252)",
      textSecondary: "rgb(203, 213, 225)",
      primary: "rgb(255, 200, 87)",
      accent: "rgb(139, 92, 246)",
      hero: "rgb(20, 22, 25)",
      profile: "rgb(28, 31, 35)",
      about: "rgb(24, 26, 30)",
      skills: "rgb(32, 35, 40)",
      location: "rgb(26, 29, 33)",
      projects: "rgb(30, 33, 37)",
      contact: "rgb(22, 25, 28)",
      surface: "rgb(30, 32, 36)",
      surfaceElevated: "rgb(45, 48, 54)",
    },
  },
  {
    id: "ocean",
    name: "Ocean Depth",
    colors: {
      background: "rgb(8, 19, 35)",
      text: "rgb(248, 250, 252)",
      textSecondary: "rgb(203, 213, 225)",
      primary: "rgb(56, 189, 248)",
      accent: "rgb(168, 85, 247)",
      hero: "rgb(15, 28, 45)",
      profile: "rgb(23, 37, 55)",
      about: "rgb(18, 32, 48)",
      skills: "rgb(28, 42, 60)",
      location: "rgb(20, 35, 52)",
      projects: "rgb(25, 40, 57)",
      contact: "rgb(16, 30, 46)",
      surface: "rgb(25, 40, 58)",
      surfaceElevated: "rgb(35, 52, 73)",
    },
  },
  {
    id: "forest",
    name: "Forest Canopy",
    colors: {
      background: "rgb(15, 33, 20)",
      text: "rgb(248, 250, 248)",
      textSecondary: "rgb(220, 252, 231)",
      primary: "rgb(74, 222, 128)",
      accent: "rgb(251, 146, 60)",
      hero: "rgb(22, 45, 28)",
      profile: "rgb(29, 55, 36)",
      about: "rgb(25, 48, 32)",
      skills: "rgb(35, 60, 42)",
      location: "rgb(27, 52, 34)",
      projects: "rgb(32, 57, 39)",
      contact: "rgb(23, 46, 29)",
      surface: "rgb(30, 55, 37)",
      surfaceElevated: "rgb(40, 70, 48),
    },
  },
  {
    id: "sunset",
    name: "Sunset Glow",
    colors: {
      background: "rgb(45, 25, 15)",
      text: "rgb(254, 252, 248)",
      textSecondary: "rgb(251, 245, 235)",
      primary: "rgb(251, 146, 60)",
      accent: "rgb(239, 68, 68)",
      hero: "rgb(55, 32, 20)",
      profile: "rgb(65, 38, 24)",
      about: "rgb(58, 34, 21)",
      skills: "rgb(72, 42, 27)",
      location: "rgb(62, 36, 23)",
      projects: "rgb(68, 40, 25)",
      contact: "rgb(52, 30, 18)",
      surface: "rgb(65, 38, 24)",
      surfaceElevated: "rgb(80, 48, 32)",
    },
  },
  {
    id: "midnight",
    name: "Midnight Aurora",
    colors: {
      background: "rgb(20, 15, 35)",
      text: "rgb(250, 248, 255)",
      textSecondary: "rgb(221, 214, 254)",
      primary: "rgb(168, 85, 247)",
      accent: "rgb(236, 72, 153)",
      hero: "rgb(28, 22, 45)",
      profile: "rgb(36, 28, 55)",
      about: "rgb(32, 24, 48)",
      skills: "rgb(42, 32, 60)",
      location: "rgb(34, 26, 52)",
      projects: "rgb(38, 30, 57)",
      contact: "rgb(30, 22, 46)",
      surface: "rgb(35, 27, 52)",
      surfaceElevated: "rgb(48, 38, 68)",
    },
  },
  {
    id: "rose",
    name: "Rose Gold",
    colors: {
      background: "rgb(35, 20, 25)",
      text: "rgb(254, 248, 250)",
      textSecondary: "rgb(251, 207, 232)",
      primary: "rgb(244, 114, 182)",
      accent: "rgb(251, 191, 36)",
      hero: "rgb(45, 28, 33)",
      profile: "rgb(55, 35, 42)",
      about: "rgb(48, 30, 37)",
      skills: "rgb(62, 40, 48)",
      location: "rgb(52, 32, 40)",
      projects: "rgb(58, 37, 45)",
      contact: "rgb(42, 26, 32)",
      surface: "rgb(55, 35, 42)",
      surfaceElevated: "rgb(70, 45, 55)",
    },
  },
  {
    id: "emerald",
    name: "Emerald Depths",
    colors: {
      background: "rgb(18, 35, 28)",
      text: "rgb(248, 254, 252)",
      textSecondary: "rgb(209, 250, 229)",
      primary: "rgb(52, 211, 153)",
      accent: "rgb(99, 102, 241)",
      hero: "rgb(25, 45, 36)",
      profile: "rgb(32, 55, 44)",
      about: "rgb(28, 48, 38)",
      skills: "rgb(38, 62, 50)",
      location: "rgb(30, 52, 42)",
      projects: "rgb(35, 58, 47)",
      contact: "rgb(22, 42, 33)",
      surface: "rgb(32, 55, 44)",
      surfaceElevated: "rgb(42, 70, 57)",
    },
  },
  {
    id: "copper",
    name: "Copper Patina",
    colors: {
      background: "rgb(30, 28, 20)",
      text: "rgb(252, 248, 242)",
      textSecondary: "rgb(245, 234, 215)",
      primary: "rgb(217, 119, 6)",
      accent: "rgb(239, 68, 68)",
      hero: "rgb(40, 36, 26)",
      profile: "rgb(48, 44, 32)",
      about: "rgb(42, 38, 28)",
      skills: "rgb(55, 50, 36)",
      location: "rgb(45, 41, 30)",
      projects: "rgb(52, 47, 34)",
      contact: "rgb(37, 33, 24)",
      surface: "rgb(48, 44, 32)",
      surfaceElevated: "rgb(62, 56, 42)",
    },
  },
  {
    id: "cosmic",
    name: "Cosmic Nebula",
    colors: {
      background: "rgb(15, 15, 30)",
      text: "rgb(250, 250, 255)",
      textSecondary: "rgb(196, 181, 253)",
      primary: "rgb(147, 51, 234)",
      accent: "rgb(56, 189, 248)",
      hero: "rgb(22, 22, 40)",
      profile: "rgb(28, 28, 48)",
      about: "rgb(25, 25, 42)",
      skills: "rgb(35, 35, 55)",
      location: "rgb(30, 30, 50)",
      projects: "rgb(32, 32, 52)",
      contact: "rgb(20, 20, 38)",
      surface: "rgb(30, 30, 50)",
      surfaceElevated: "rgb(42, 42, 65)",
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
  const [widgetPosition, setWidgetPosition] = useState<WidgetPosition | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [skillAnimations, setSkillAnimations] = useState(false);
  const [hoverTimer, setHoverTimer] = useState<NodeJS.Timeout | null>(null);
  const [particles, setParticles] = useState<Array<{id: number, x: number, y: number, opacity: number, scale: number}>>([]);

  // Widget refs for position tracking
  const widgetRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  // ==================== MEMOIZED THEME ====================
  
  const theme = useMemo(() => 
    colorThemes.find((t) => t.id === currentTheme) || colorThemes[0], 
    [currentTheme]
  );

  // ==================== SAMPLE DATA ====================

  /**
   * Enhanced skills data with more sophisticated categorization
   */
  const allSkills: Skill[] = [
    {
      name: "React & Next.js",
      level: 96,
      description: "Advanced component architecture, SSR, and modern patterns",
      category: "Frontend Mastery",
    },
    {
      name: "TypeScript",
      level: 94,
      description: "Type-safe development with advanced utility types",
      category: "Language Expertise",
    },
    {
      name: "Node.js & Express",
      level: 90,
      description: "Scalable backend architecture and API design",
      category: "Backend Engineering",
    },
    {
      name: "UI/UX Design",
      level: 88,
      description: "User-centered design thinking and visual aesthetics",
      category: "Design Excellence",
    },
    {
      name: "GraphQL & Apollo",
      level: 85,
      description: "Modern data fetching and state management",
      category: "Data Architecture",
    },
    {
      name: "PostgreSQL & MongoDB",
      level: 87,
      description: "Database design, optimization, and scaling",
      category: "Data Engineering",
    },
    {
      name: "AWS & Docker",
      level: 82,
      description: "Cloud infrastructure and containerization",
      category: "DevOps & Cloud",
    },
    {
      name: "Three.js & WebGL",
      level: 79,
      description: "3D graphics and interactive visualizations",
      category: "Creative Technology",
    },
    {
      name: "Python & AI/ML",
      level: 76,
      description: "Machine learning and data science applications",
      category: "Emerging Tech",
    },
    {
      name: "Figma & Design Systems",
      level: 91,
      description: "Component libraries and design consistency",
      category: "Design Systems",
    },
  ];

  /**
   * Enhanced project showcase with more sophisticated categorization
   */
  const allProjects: Project[] = [
    {
      id: 1,
      name: "FinTech Dashboard",
      description: "Real-time trading platform with advanced analytics and AI insights",
      tech: ["Next.js", "TypeScript", "D3.js", "WebSocket", "PostgreSQL"],
      image: "/api/placeholder/600/400",
      liveUrl: "https://example.com",
      featured: true,
    },
    {
      id: 2,
      name: "Neural Design System",
      description: "AI-powered component library with automatic accessibility optimization",
      tech: ["React", "Storybook", "TensorFlow.js", "TypeScript", "Tailwind"],
      image: "/api/placeholder/600/400",
      liveUrl: "https://example.com",
      featured: true,
    },
    {
      id: 3,
      name: "Immersive E-commerce",
      description: "3D product visualization platform with AR integration",
      tech: ["Three.js", "WebXR", "React", "Stripe", "Node.js"],
      image: "/api/placeholder/600/400",
      liveUrl: "https://example.com",
      featured: true,
    },
    {
      id: 4,
      name: "Social Impact Platform",
      description: "Community-driven platform for social good initiatives",
      tech: ["React Native", "GraphQL", "AWS", "PostgreSQL"],
      image: "/api/placeholder/600/400",
      liveUrl: "https://example.com",
      featured: false,
    },
    {
      id: 5,
      name: "Healthcare Analytics",
      description: "Medical data visualization with privacy-first architecture",
      tech: ["Python", "FastAPI", "React", "D3.js", "MongoDB"],
      image: "/api/placeholder/600/400",
      liveUrl: "https://example.com",
      featured: false,
    },
    {
      id: 6,
      name: "Creative Studio Platform",
      description: "Collaborative workspace for digital artists and designers",
      tech: ["Vue.js", "Canvas API", "WebRTC", "Firebase"],
      image: "/api/placeholder/600/400",
      liveUrl: "https://example.com",
      featured: false,
    },
  ];

  // ==================== SOPHISTICATED LOADING ANIMATION ====================

  /**
   * Enhanced multi-phase loading animation with particle effects
   */
  useEffect(() => {
    const phases = [
      { duration: 3000, increment: 0.4, name: "Initializing Core Systems" },
      { duration: 2500, increment: 1.2, name: "Loading Creative Assets" },
      { duration: 2000, increment: 2.8, name: "Optimizing Experience" },
      { duration: 1500, increment: 4.2, name: "Finalizing Interface" },
    ];

    let currentPhase = 0;
    let phaseProgress = 0;

    // Initialize particles
    const initialParticles = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      opacity: Math.random() * 0.6 + 0.2,
      scale: Math.random() * 0.8 + 0.4,
    }));
    setParticles(initialParticles);

    const timer = setInterval(() => {
      const phase = phases[currentPhase];
      phaseProgress += phase.increment + Math.random() * 0.8;

      // Enhanced phase transition logic with smoother progression
      if (currentPhase === 0 && phaseProgress >= 20) {
        setLoadingPhase(1);
        currentPhase = 1;
        phaseProgress = 20;
      } else if (currentPhase === 1 && phaseProgress >= 45) {
        setLoadingPhase(2);
        currentPhase = 2;
        phaseProgress = 45;
      } else if (currentPhase === 2 && phaseProgress >= 75) {
        setLoadingPhase(3);
        currentPhase = 3;
        phaseProgress = 75;
      }

      setProgress(Math.min(phaseProgress, 100));

      // Animate particles
      setParticles(prev => prev.map(particle => ({
        ...particle,
        x: (particle.x + 0.3) % 100,
        y: particle.y + Math.sin(Date.now() * 0.001 + particle.id) * 0.1,
        opacity: 0.3 + Math.sin(Date.now() * 0.002 + particle.id) * 0.3,
        scale: 0.4 + Math.sin(Date.now() * 0.0015 + particle.id) * 0.4,
      })));

      // Complete loading sequence with dramatic final animation
      if (phaseProgress >= 100) {
        clearInterval(timer);
        setTimeout(() => {
          setIsLoaded(true);
          setTimeout(() => setShowMain(true), 1200);
        }, 800);
      }
    }, 60);

    return () => clearInterval(timer);
  }, []);

  /**
   * Enhanced skills animation with staggered timing
   */
  useEffect(() => {
    if (expandedWidget === "skills") {
      setTimeout(() => setSkillAnimations(true), 400);
    } else {
      setSkillAnimations(false);
    }
  }, [expandedWidget]);

  // ==================== INTERACTION HANDLERS ====================

  /**
   * Enhanced widget interaction with smoother animations
   */
  const handleWidgetClick = (widgetName: string) => {
    const element = widgetRefs.current[widgetName];
    
    if (clickedWidget === widgetName) {
      setExpandedWidget(null);
      setClickedWidget(null);
      setWidgetPosition(null);
    } else {
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

  const handleThemeChange = (themeId: string) => {
    setCurrentTheme(themeId);
    setShowThemeSelector(false);
  };

  // ==================== CONTENT RENDERING ====================

  /**
   * Enhanced content renderer with sophisticated typography
   */
  const renderExpandedContent = (widgetName: string) => {
    const textStyle = { color: theme.colors.text };
    const secondaryTextStyle = { color: theme.colors.textSecondary };
    const headingStyle = { 
      color: theme.colors.text, 
      fontFamily: "Crimson Pro, serif",
      fontWeight: "600"
    };

    switch (widgetName) {
      case "hero":
        return (
          <div className="space-y-8">
            <div>
              <h3 className="text-3xl font-semibold mb-6" style={headingStyle}>
                Our Philosophy
              </h3>
              <p className="text-base leading-relaxed mb-6" style={textStyle}>
                We believe exceptional design is born from the intersection of artistry 
                and functionality. Every pixel, every interaction, every line of code 
                is crafted with intention, creating experiences that resonate on both 
                emotional and practical levels.
              </p>
              <blockquote className="border-l-4 pl-6 italic text-lg mb-6" 
                         style={{ borderColor: theme.colors.primary, color: theme.colors.textSecondary }}>
                "Design is not just what it looks like and feels like. Design is how it works."
                <footer className="text-sm mt-2" style={secondaryTextStyle}>— Steve Jobs</footer>
              </blockquote>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="text-xl font-semibold" style={headingStyle}>Premium Services</h4>
                <ul className="space-y-3 text-sm" style={textStyle}>
                  <li className="flex items-center space-x-3">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: theme.colors.primary }}></div>
                    <span>Full-Stack Application Development</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: theme.colors.accent }}></div>
                    <span>UI/UX Design & Research</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: theme.colors.primary }}></div>
                    <span>Performance Optimization</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: theme.colors.accent }}></div>
                    <span>Technical Leadership</span>
                  </li>
                </ul>
              </div>
              
              <div className="space-y-4">
                <h4 className="text-xl font-semibold" style={headingStyle}>Achievements</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 rounded-xl" style={{ backgroundColor: theme.colors.surface }}>
                    <div className="text-2xl font-bold mb-1" style={{ color: theme.colors.primary }}>150+</div>
                    <div className="text-xs" style={secondaryTextStyle}>Projects Delivered</div>
                  </div>
                  <div className="text-center p-4 rounded-xl" style={{ backgroundColor: theme.colors.surface }}>
                    <div className="text-2xl font-bold mb-1" style={{ color: theme.colors.accent }}>98%</div>
                    <div className="text-xs" style={secondaryTextStyle}>Client Satisfaction</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-6">
              <button 
                className="w-full py-4 rounded-xl text-black font-semibold text-base transition-all duration-300 hover:scale-105 hover:shadow-xl"
                style={{ 
                  background: `linear-gradient(135deg, ${theme.colors.primary}, ${theme.colors.accent})` 
                }}
              >
                Start Your Project Journey
              </button>
            </div>
          </div>
        );

      case "skills":
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold mb-6" style={headingStyle}>Technical Expertise</h3>
            
            <div className="space-y-6">
              {allSkills.map((skill, index) => (
                <div key={skill.name} className="space-y-3">
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="text-base font-medium" style={textStyle}>{skill.name}</span>
                      <div className="text-xs mt-1" style={{ color: theme.colors.primary }}>{skill.category}</div>
                    </div>
                    <span className="text-lg font-semibold" style={{ color: theme.colors.accent }}>{skill.level}%</span>
                  </div>
                  
                  <div className="w-full bg-black/20 rounded-full h-3 overflow-hidden">
                    <div 
                      className="h-full rounded-full transition-all duration-1500 ease-out relative overflow-hidden"
                      style={{ 
                        width: skillAnimations ? `${skill.level}%` : '0%',
                        background: `linear-gradient(90deg, ${theme.colors.primary}, ${theme.colors.accent})`,
                        transitionDelay: `${index * 150}ms`
                      }}
                    >
                      <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                    </div>
                  </div>
                  
                  <p className="text-sm" style={secondaryTextStyle}>{skill.description}</p>
                </div>
              ))}
            </div>
          </div>
        );

      // ... Continue with other cases but keeping them concise for space
      default:
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold" style={headingStyle}>
              {widgetName.charAt(0).toUpperCase() + widgetName.slice(1)}
            </h3>
            <p className="text-base" style={textStyle}>
              Enhanced content for {widgetName} widget with sophisticated design.
            </p>
          </div>
        );
    }
  };

  // ==================== LOADING CONTENT ====================

  const getLoadingContent = () => {
    const phases = [
      { text: "Initializing Core Systems", subtitle: "Setting up the foundation" },
      { text: "Loading Creative Assets", subtitle: "Preparing visual elements" },
      { text: "Optimizing Experience", subtitle: "Fine-tuning performance" },
      { text: "Finalizing Interface", subtitle: "Polishing interactions" }
    ];
    
    const phase = phases[loadingPhase] || phases[0];
    return { 
      text: phase.text, 
      subtitle: phase.subtitle,
      color: theme.colors.primary 
    };
  };

  // ==================== SOPHISTICATED LOADING SCREEN ====================
  
  if (!isLoaded) {
    return (
      <div 
        className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden"
        style={{ 
          background: `radial-gradient(ellipse at center, ${theme.colors.background}cc 0%, ${theme.colors.background} 100%)`,
        }}
      >
        {/* Animated particle background */}
        <div className="absolute inset-0 overflow-hidden">
          {particles.map((particle) => (
            <div
              key={particle.id}
              className="absolute w-1 h-1 rounded-full animate-pulse"
              style={{
                left: `${particle.x}%`,
                top: `${particle.y}%`,
                opacity: particle.opacity,
                transform: `scale(${particle.scale})`,
                backgroundColor: theme.colors.primary,
                boxShadow: `0 0 ${particle.scale * 10}px ${theme.colors.primary}40`,
                transition: 'all 0.3s ease-out',
              }}
            />
          ))}
        </div>

        {/* Sophisticated geometric animations */}
        <div className="absolute inset-0 opacity-20">
          <div 
            className="absolute top-1/4 left-1/4 w-32 h-32 border-2 rounded-full animate-spin"
            style={{ 
              borderColor: theme.colors.primary,
              borderTopColor: "transparent",
              animationDuration: "8s"
            }}
          />
          <div 
            className="absolute bottom-1/4 right-1/4 w-24 h-24 border-2 rounded-full animate-spin"
            style={{ 
              borderColor: theme.colors.accent,
              borderTopColor: "transparent",
              animationDuration: "12s",
              animationDirection: "reverse"
            }}
          />
          <div 
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 border border-dashed rounded-full animate-pulse"
            style={{ 
              borderColor: theme.colors.primary,
              animationDuration: "4s"
            }}
          />
        </div>

        {/* Main loading content with enhanced typography */}
        <div className="z-10 text-center space-y-8 max-w-md mx-auto px-6">
          <div className="space-y-6">
            {/* Sophisticated spinner */}
            <div className="relative mx-auto w-24 h-24">
              <div 
                className="absolute inset-0 border-4 border-t-transparent rounded-full animate-spin"
                style={{ 
                  borderColor: theme.colors.primary,
                  borderTopColor: "transparent" 
                }}
              />
              <div 
                className="absolute inset-2 border-2 border-b-transparent rounded-full animate-spin"
                style={{ 
                  borderColor: theme.colors.accent,
                  borderBottomColor: "transparent",
                  animationDirection: "reverse",
                  animationDuration: "2s"
                }}
              />
            </div>
            
            {/* Enhanced brand typography */}
            <div className="space-y-3">
              <h1 
                className="text-5xl font-bold tracking-wider"
                style={{ 
                  color: theme.colors.text,
                  fontFamily: "Crimson Pro, serif",
                  textShadow: `0 0 30px ${theme.colors.primary}40`
                }}
              >
                Bentolio
              </h1>
              <div className="space-y-2">
                <p 
                  className="text-xl font-medium"
                  style={{ color: getLoadingContent().color }}
                >
                  {getLoadingContent().text}
                </p>
                <p 
                  className="text-sm opacity-80"
                  style={{ color: theme.colors.textSecondary }}
                >
                  {getLoadingContent().subtitle}
                </p>
              </div>
            </div>
          </div>

          {/* Enhanced progress bar */}
          <div className="space-y-3">
            <div 
              className="w-full h-1 rounded-full overflow-hidden"
              style={{ backgroundColor: `${theme.colors.surface}80` }}
            >
              <div 
                className="h-full transition-all duration-500 ease-out rounded-full relative overflow-hidden"
                style={{ 
                  width: `${progress}%`,
                  background: `linear-gradient(90deg, ${theme.colors.primary}, ${theme.colors.accent})`,
                  boxShadow: `0 0 20px ${theme.colors.primary}60`
                }}
              >
                <div className="absolute inset-0 bg-white/30 animate-pulse"></div>
              </div>
            </div>
            
            <div className="flex justify-between items-center text-sm">
              <span style={{ color: theme.colors.textSecondary }}>
                {progress.toFixed(1)}% Complete
              </span>
              <span style={{ color: theme.colors.primary }}>
                ∞ Crafting Excellence
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ==================== ENHANCED TRANSITION SCREEN ====================
  
  if (!showMain) {
    return (
      <div 
        className="min-h-screen flex items-center justify-center relative overflow-hidden"
        style={{ 
          background: `radial-gradient(ellipse at center, ${theme.colors.background}dd 0%, ${theme.colors.background} 100%)`,
        }}
      >
        <div className="text-center space-y-4">
          <div 
            className="text-7xl font-bold tracking-wider animate-fadeIn"
            style={{ 
              color: theme.colors.text,
              fontFamily: "Crimson Pro, serif",
              textShadow: `0 0 50px ${theme.colors.primary}40`,
              animation: "fadeIn 1.5s ease-in-out"
            }}
          >
            Welcome
          </div>
          <div 
            className="text-xl tracking-wide animate-fadeIn"
            style={{ 
              color: theme.colors.primary,
              animationDelay: "0.5s",
              opacity: 0,
              animation: "fadeIn 1s ease-in-out 0.5s forwards"
            }}
          >
            to the experience
          </div>
        </div>
      </div>
    );
  }

  // ==================== ENHANCED MAIN CONTENT ====================
  
  return (
    <>
      {/* Enhanced header with sophisticated typography */}
      <header 
        className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl border-b"
        style={{ 
          backgroundColor: `${theme.colors.background}90`,
          borderColor: `${theme.colors.surface}40`
        }}
      >
        <nav className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div 
            className="text-2xl font-bold tracking-wide transition-colors duration-300"
            style={{ 
              color: theme.colors.text,
              fontFamily: "Crimson Pro, serif"
            }}
          >
            Bentolio
          </div>

          {/* Enhanced desktop navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {["Work", "About", "Skills", "Contact"].map((item) => (
              <button
                key={item}
                onClick={() => handleNavClick(item)}
                className="text-sm font-medium hover:opacity-80 transition-all duration-300 relative group py-2 px-1"
                style={{ color: theme.colors.text }}
              >
                {item}
                <div 
                  className="absolute -bottom-1 left-0 w-0 h-0.5 group-hover:w-full transition-all duration-300 rounded-full"
                  style={{ backgroundColor: theme.colors.primary }}
                />
              </button>
            ))}
          </div>

          {/* Enhanced mobile menu button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden w-6 h-6 flex flex-col justify-center space-y-1 transition-all duration-300"
          >
            <span 
              className={`w-full h-0.5 transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}
              style={{ backgroundColor: theme.colors.text }}
            />
            <span 
              className={`w-full h-0.5 transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`}
              style={{ backgroundColor: theme.colors.text }}
            />
            <span 
              className={`w-full h-0.5 transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}
              style={{ backgroundColor: theme.colors.text }}
            />
          </button>
        </nav>

        {/* Enhanced mobile menu */}
        {isMobileMenuOpen && (
          <div 
            className="md:hidden absolute top-full left-0 right-0 backdrop-blur-xl border-b transition-all duration-300"
            style={{ 
              backgroundColor: `${theme.colors.background}95`,
              borderColor: `${theme.colors.surface}40`
            }}
          >
            <div className="px-6 py-6 space-y-4">
              {["Work", "About", "Skills", "Contact"].map((item) => (
                <button
                  key={item}
                  onClick={() => handleNavClick(item)}
                  className="block w-full text-left text-base font-medium hover:opacity-80 transition-opacity duration-200 py-2"
                  style={{ color: theme.colors.text }}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* Enhanced main content with sophisticated spacing */}
      <main 
        className="min-h-screen pt-24 pb-16 px-6 transition-colors duration-500"
        style={{ backgroundColor: theme.colors.background }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-12 gap-6 auto-rows-max">
            
            {/* Enhanced Hero Widget */}
            <div
              ref={(el) => widgetRefs.current['hero'] = el}
              className="col-span-12 md:col-span-8 h-80 rounded-3xl p-8 relative overflow-hidden cursor-pointer transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl group"
              style={{ backgroundColor: theme.colors.hero }}
              onClick={() => handleWidgetClick('hero')}
            >
              {/* Enhanced decorative elements */}
              <div className="absolute top-4 right-4 w-20 h-20 rounded-full border-2 opacity-30 animate-spin group-hover:opacity-50 transition-opacity duration-300" 
                   style={{ borderColor: theme.colors.primary, borderTopColor: "transparent" }}></div>
              <div className="absolute bottom-4 left-4 w-16 h-16 rounded-full opacity-20 group-hover:opacity-30 transition-opacity duration-300"
                   style={{ backgroundColor: theme.colors.accent }}></div>

              {/* Enhanced typography */}
              <h1 
                className="text-6xl font-bold mb-4 transition-colors duration-300"
                style={{ 
                  color: theme.colors.text,
                  fontFamily: "Crimson Pro, serif",
                  lineHeight: "1.1"
                }}
              >
                Creative
                <br />
                <span style={{ color: theme.colors.primary }}>Developer</span>
              </h1>
              <p 
                className="text-lg mb-6 max-w-md transition-colors duration-300 leading-relaxed"
                style={{ color: theme.colors.textSecondary }}
              >
                Crafting extraordinary digital experiences through the perfect harmony 
                of innovative design and cutting-edge technology.
              </p>
              <button 
                className="px-8 py-4 rounded-xl font-semibold transition-all duration-300 hover:scale-105 hover:shadow-xl"
                style={{ 
                  background: `linear-gradient(135deg, ${theme.colors.primary}, ${theme.colors.accent})`,
                  color: theme.colors.background
                }}
              >
                Explore My Work →
              </button>
            </div>

            {/* Add remaining widgets with similar enhancements... */}
            
          </div>
        </div>

        {/* Enhanced theme selector */}
        <div className="fixed bottom-6 right-6 z-40">
          {showThemeSelector && (
            <div className="absolute bottom-full right-0 mb-4 p-6 rounded-3xl border backdrop-blur-xl animate-fadeIn"
                 style={{ 
                   backgroundColor: `${theme.colors.surface}90`,
                   borderColor: `${theme.colors.surfaceElevated}60`
                 }}>
              <h4 className="text-sm font-semibold mb-4" style={{ color: theme.colors.text }}>
                Choose Your Aesthetic
              </h4>
              <div className="grid grid-cols-3 gap-3">
                {colorThemes.map((themeOption) => (
                  <button
                    key={themeOption.id}
                    onClick={() => handleThemeChange(themeOption.id)}
                    className="group relative p-3 rounded-xl transition-all duration-300 hover:scale-105"
                    style={{ backgroundColor: theme.colors.surfaceElevated }}
                  >
                    <div className="flex flex-col items-center space-y-2">
                      <div className="flex space-x-1">
                        <div 
                          className="w-4 h-4 rounded-full transition-transform duration-200 group-hover:scale-110"
                          style={{ backgroundColor: themeOption.colors.primary }}
                        />
                        <div 
                          className="w-4 h-4 rounded-full transition-transform duration-200 group-hover:scale-110"
                          style={{ backgroundColor: themeOption.colors.accent }}
                        />
                      </div>
                      <span className="text-xs font-medium" style={{ color: theme.colors.text }}>
                        {themeOption.name.split(' ')[0]}
                      </span>
                    </div>
                    {currentTheme === themeOption.id && (
                      <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-green-400 animate-pulse"></div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          <button
            onClick={() => setShowThemeSelector(!showThemeSelector)}
            className="w-16 h-16 rounded-full backdrop-blur-xl border transition-all duration-300 hover:scale-110 flex items-center justify-center group"
            style={{ 
              backgroundColor: `${theme.colors.surface}80`,
              borderColor: `${theme.colors.surfaceElevated}60`
            }}
          >
            <svg
              className="w-7 h-7 transition-colors duration-300"
              fill="none"
              stroke="currentColor"
              style={{ color: theme.colors.primary }}
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

      {/* Enhanced modal */}
      {expandedWidget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div
            className="relative w-full max-w-3xl max-h-[90vh] mx-4 rounded-3xl p-8 shadow-2xl overflow-y-auto animate-slideIn custom-scrollbar"
            style={{ backgroundColor: theme.colors.background }}
          >
            <button
              onClick={() => {
                setExpandedWidget(null);
                setClickedWidget(null);
                setWidgetPosition(null);
              }}
              className="absolute top-6 right-6 w-10 h-10 rounded-full backdrop-blur-sm transition-all duration-200 flex items-center justify-center z-10 group hover:scale-110"
              style={{ backgroundColor: `${theme.colors.surface}80` }}
            >
              <svg
                className="w-5 h-5 group-hover:rotate-90 transition-transform duration-200"
                fill="none"
                stroke="currentColor"
                style={{ color: theme.colors.text }}
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {renderExpandedContent(expandedWidget)}
          </div>
        </div>
      )}

      {/* Enhanced custom styles */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Crimson+Pro:wght@400;500;600;700&display=swap');
        
        * {
          font-family: 'Inter', sans-serif;
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out;
        }
        
        .animate-slideIn {
          animation: slideIn 0.4s ease-out;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(15px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slideIn {
          from { opacity: 0; transform: scale(0.96) translateY(15px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: ${theme.colors.surface}40;
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: ${theme.colors.primary}60;
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: ${theme.colors.primary}80;
        }
        
        .group:hover .group-hover\\:scale-110 {
          transform: scale(1.1);
        }
        
        .group:hover .group-hover\\:opacity-50 {
          opacity: 0.5;
        }
      `}</style>
    </>
  );
}