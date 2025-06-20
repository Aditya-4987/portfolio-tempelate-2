import { useEffect, useState, useRef, useMemo } from "react";

/**
 * BENTOLIO PORTFOLIO WEBSITE - ENHANCED AESTHETIC VERSION
 *
 * A sophisticated portfolio website featuring:
 * - Elegant theme-aware loading animation with morphing elements
 * - Smooth page transitions with fade and scale effects
 * - Redesigned theme selector with elegant card layout
 * - Enhanced hero widget with refined aesthetics
 * - Premium design language throughout
 */

// ==================== TYPE DEFINITIONS ====================

interface Skill {
  name: string;
  level: number;
  description: string;
  category: string;
}

interface Project {
  id: number;
  name: string;
  description: string;
  tech: string[];
  image: string;
  liveUrl: string;
  featured: boolean;
}

interface WidgetPosition {
  top: number;
  left: number;
  width: number;
  height: number;
}

interface ColorTheme {
  id: string;
  name: string;
  description: string;
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
    description: "Sophisticated dark theme with warm accents",
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
    description: "Deep blue tones inspired by ocean depths",
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
    description: "Rich greens reminiscent of forest canopies",
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
      surfaceElevated: "rgb(40, 70, 48)",
    },
  },
  {
    id: "sunset",
    name: "Sunset Glow",
    description: "Warm oranges and reds of golden hour",
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
    description: "Mystical purples with aurora-like accents",
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
    description: "Luxurious rose gold with warm undertones",
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
    description: "Deep emerald with sophisticated jewel tones",
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
    description: "Warm metallic copper with earthy patina",
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
    description: "Deep space purples with nebula-inspired hues",
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
  {
    id: "lavender",
    name: "Lavender Dreams",
    description: "Soft lavender with ethereal purple undertones",
    colors: {
      background: "rgb(25, 20, 35)",
      text: "rgb(252, 248, 255)",
      textSecondary: "rgb(221, 214, 254)",
      primary: "rgb(196, 181, 253)",
      accent: "rgb(251, 146, 60)",
      hero: "rgb(35, 28, 48)",
      profile: "rgb(42, 34, 58)",
      about: "rgb(38, 30, 52)",
      skills: "rgb(48, 38, 65)",
      location: "rgb(40, 32, 55)",
      projects: "rgb(45, 36, 62)",
      contact: "rgb(32, 25, 45)",
      surface: "rgb(42, 34, 58)",
      surfaceElevated: "rgb(55, 45, 75)",
    },
  },
  {
    id: "amber",
    name: "Amber Sunset",
    description: "Warm amber glow with golden sunset hues",
    colors: {
      background: "rgb(35, 28, 18)",
      text: "rgb(255, 252, 245)",
      textSecondary: "rgb(254, 243, 199)",
      primary: "rgb(245, 158, 11)",
      accent: "rgb(239, 68, 68)",
      hero: "rgb(45, 36, 24)",
      profile: "rgb(55, 44, 30)",
      about: "rgb(48, 38, 26)",
      skills: "rgb(62, 50, 34)",
      location: "rgb(52, 42, 28)",
      projects: "rgb(58, 46, 32)",
      contact: "rgb(42, 33, 22)",
      surface: "rgb(55, 44, 30)",
      surfaceElevated: "rgb(70, 56, 38)",
    },
  },
  {
    id: "sage",
    name: "Sage Harmony",
    description: "Muted sage green with calming earth tones",
    colors: {
      background: "rgb(22, 32, 28)",
      text: "rgb(248, 252, 250)",
      textSecondary: "rgb(209, 250, 229)",
      primary: "rgb(134, 239, 172)",
      accent: "rgb(251, 146, 60)",
      hero: "rgb(30, 42, 36)",
      profile: "rgb(38, 52, 45)",
      about: "rgb(34, 46, 40)",
      skills: "rgb(45, 60, 52)",
      location: "rgb(36, 50, 43)",
      projects: "rgb(42, 56, 48)",
      contact: "rgb(28, 40, 34)",
      surface: "rgb(38, 52, 45)",
      surfaceElevated: "rgb(50, 68, 58)",
    },
  },
  {
    id: "steel",
    name: "Steel Blue",
    description: "Sophisticated steel blue with metallic accents",
    colors: {
      background: "rgb(18, 25, 35)",
      text: "rgb(248, 250, 252)",
      textSecondary: "rgb(203, 213, 225)",
      primary: "rgb(125, 211, 252)",
      accent: "rgb(168, 85, 247)",
      hero: "rgb(25, 35, 48)",
      profile: "rgb(32, 45, 62)",
      about: "rgb(28, 40, 55)",
      skills: "rgb(38, 52, 70)",
      location: "rgb(30, 42, 58)",
      projects: "rgb(35, 48, 65)",
      contact: "rgb(22, 32, 45)",
      surface: "rgb(32, 45, 62)",
      surfaceElevated: "rgb(42, 58, 80)",
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
  const [loadingElements, setLoadingElements] = useState<
    Array<{ id: number; scale: number; opacity: number; rotate: number }>
  >([]);
  const [autoThemeSwitch, setAutoThemeSwitch] = useState(true); // 1. Add this state

  const widgetRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const particleCanvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<any[]>([]);

  // ==================== MEMOIZED THEME ====================

  const theme = useMemo(
    () => colorThemes.find((t) => t.id === currentTheme) || colorThemes[0],
    [currentTheme],
  );

  // ==================== SAMPLE DATA ====================

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

  const allProjects: Project[] = [
    {
      id: 1,
      name: "FinTech Dashboard",
      description:
        "Real-time trading platform with advanced analytics and AI insights",
      tech: ["Next.js", "TypeScript", "D3.js", "WebSocket", "PostgreSQL"],
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=600&q=80", // Stock: finance/analytics
      liveUrl: "https://example.com",
      featured: true,
    },
    {
      id: 2,
      name: "Neural Design System",
      description:
        "AI-powered component library with automatic accessibility optimization",
      tech: ["React", "Storybook", "TensorFlow.js", "TypeScript", "Tailwind"],
      image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80", // Stock: abstract/ai
      liveUrl: "https://example.com",
      featured: true,
    },
    {
      id: 3,
      name: "Immersive E-commerce",
      description: "3D product visualization platform with AR integration",
      tech: ["Three.js", "WebXR", "React", "Stripe", "Node.js"],
      image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=600&q=80", // Stock: e-commerce/3d
      liveUrl: "https://example.com",
      featured: true,
    },
    {
      id: 4,
      name: "Social Impact Platform",
      description: "Community-driven platform for social good initiatives",
      tech: ["React Native", "GraphQL", "AWS", "PostgreSQL"],
      image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80", // Stock: community/social
      liveUrl: "https://example.com",
      featured: false,
    },
    {
      id: 5,
      name: "Healthcare Analytics",
      description: "Medical data visualization with privacy-first architecture",
      tech: ["Python", "FastAPI", "React", "D3.js", "MongoDB"],
      image: "https://images.unsplash.com/photo-1663363913215-9db927aa77ea?auto=format&fit=crop&w=600&q=80", // New stock: healthcare/analytics
      liveUrl: "https://example.com",
      featured: false,
      
    },
    {
      id: 6,
      name: "Creative Studio Platform",
      description: "Collaborative workspace for digital artists and designers",
      tech: ["Vue.js", "Canvas API", "WebRTC", "Firebase"],
      image: "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=600&q=80", // New stock: creative/design
      liveUrl: "https://example.com",
      featured: false,
    },
  ];

  // ==================== ELEGANT LOADING ANIMATION ====================

  useEffect(() => {
    const phases = [
      {
        duration: 3000,
        increment: 0.6,
        name: "Initializing Experience",
        subtitle: "Preparing the canvas",
      },
      {
        duration: 2500,
        increment: 1.4,
        name: "Loading Aesthetics",
        subtitle: "Crafting visual harmony",
      },
      {
        duration: 2000,
        increment: 2.6,
        name: "Optimizing Interface",
        subtitle: "Fine-tuning interactions",
      },
      {
        duration: 1500,
        increment: 3.8,
        name: "Finalizing Elegance",
        subtitle: "Polishing perfection",
      },
    ];

    let currentPhase = 0;
    let phaseProgress = 0;

    // Initialize elegant loading elements
    const initialElements = Array.from({ length: 6 }, (_, i) => ({
      id: i,
      scale: 0.8 + Math.random() * 0.4,
      opacity: 0.6 + Math.random() * 0.4,
      rotate: Math.random() * 360,
    }));
    setLoadingElements(initialElements);

    const timer = setInterval(() => {
      const phase = phases[currentPhase];
      phaseProgress += phase.increment + Math.random() * 0.6;

      if (currentPhase === 0 && phaseProgress >= 22) {
        setLoadingPhase(1);
        currentPhase = 1;
        phaseProgress = 22;
      } else if (currentPhase === 1 && phaseProgress >= 48) {
        setLoadingPhase(2);
        currentPhase = 2;
        phaseProgress = 48;
      } else if (currentPhase === 2 && phaseProgress >= 78) {
        setLoadingPhase(3);
        currentPhase = 3;
        phaseProgress = 78;
      }

      setProgress(Math.min(phaseProgress, 100));

      // Animate loading elements
      setLoadingElements((prev) =>
        prev.map((element) => ({
          ...element,
          scale: 0.6 + 0.4 * Math.sin(Date.now() * 0.002 + element.id),
          opacity: 0.4 + 0.4 * Math.sin(Date.now() * 0.003 + element.id),
          rotate: element.rotate + 0.5,
        })),
      );

      if (phaseProgress >= 100) {
        clearInterval(timer);
        setTimeout(() => {
          setIsLoaded(true);
          setTimeout(() => setShowMain(true), 1000);
        }, 600);
      }
    }, 80);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (expandedWidget === "skills") {
      setTimeout(() => setSkillAnimations(true), 400);
    } else {
      setSkillAnimations(false);
    }
  }, [expandedWidget]);

  useEffect(() => {
    const canvas = particleCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.scale(dpr, dpr);

    // Lower particle count for performance
    const PARTICLE_COUNT = Math.floor((width * height) / 4000);

    // Only create particles if not already created or if count changed (e.g. resize)
    if (
      !particlesRef.current.length ||
      particlesRef.current.length !== PARTICLE_COUNT
    ) {
      particlesRef.current = Array.from({ length: PARTICLE_COUNT }).map(() => {
        const angle = Math.random() * Math.PI * 2;
        const speed = 0.13 + Math.random() * 0.13;
        return {
          x: Math.random() * width,
          y: Math.random() * height,
          r: 1.2 + Math.random() * 1.2,
          dx: Math.cos(angle) * speed,
          dy: Math.sin(angle) * speed,
          color: Math.random() > 0.5 ? theme.colors.primary : theme.colors.accent,
          alpha: 0.10 + Math.random() * 0.13,
          targetColor: null,
          colorLerp: 0,
        };
      });
    } else {
      // Smoothly transition color/alpha on theme change
      particlesRef.current.forEach((p) => {
        const newColor = Math.random() > 0.5 ? theme.colors.primary : theme.colors.accent;
        if (p.color !== newColor) {
          p.targetColor = newColor;
          p.colorLerp = 0;
        }
        p.alpha = 0.10 + Math.random() * 0.13;
      });
    }

    let mouse = { x: width / 2, y: height / 2 };

    function lerpColor(a: string, b: string, t: number) {
      // Simple RGB lerp
      const parse = (c: string) => c.match(/\d+/g)?.map(Number) || [0,0,0];
      const ca = parse(a), cb = parse(b);
      return `rgb(${ca.map((v, i) => Math.round(v + (cb[i] - v) * t)).join(",")})`;
    }

    function draw() {
      ctx.clearRect(0, 0, width, height);
      for (const p of particlesRef.current) {
        // Color transition
        if (p.targetColor) {
          p.colorLerp += 0.07;
          p.color = lerpColor(p.color, p.targetColor, p.colorLerp);
          if (p.colorLerp >= 1) {
            p.color = p.targetColor;
            p.targetColor = null;
            p.colorLerp = 0;
          }
        }
        ctx.globalAlpha = p.alpha;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, 2 * Math.PI);
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.shadowBlur = 0;
      }
      ctx.globalAlpha = 1;
    }

    let animId: number;
    function animate() {
      for (const p of particlesRef.current) {
        // Repulsion
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 160) {
          const repel = (160 - dist) / 160 * 2.5;
          p.x += (dx / dist) * repel;
          p.y += (dy / dist) * repel;
        }
        // Normal movement
        p.x += p.dx;
        p.y += p.dy;
        // Wrap around edges
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;
      }
      draw();
      animId = requestAnimationFrame(animate);
    }

    animate();

    function handleResize() {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
      particlesRef.current = [];
    }
    function handleMouse(e: MouseEvent) {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    }
    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouse);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouse);
      cancelAnimationFrame(animId);
    };
  }, [theme.colors.primary, theme.colors.accent]);

  // ==================== INTERACTION HANDLERS ====================

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

  // Utility to pick a random theme (not the current one)
  const pickRandomTheme = () => {
    const otherThemes = colorThemes.filter((t) => t.id !== currentTheme);
    const random = otherThemes[Math.floor(Math.random() * otherThemes.length)];
    return random.id;
  };

  // Wrap all button/widget click handlers
  const handleAnyClick = (originalHandler?: (...args: any[]) => void) => (...args: any[]) => {
    if (autoThemeSwitch && colorThemes.length > 1) {
      setCurrentTheme(pickRandomTheme());
    }
    if (originalHandler) originalHandler(...args);
  };

  // ==================== CONTENT RENDERING ====================

  const renderExpandedContent = (widgetName: string) => {
    const textStyle = { color: theme.colors.text };
    const secondaryTextStyle = { color: theme.colors.textSecondary };
    const headingStyle = {
      color: theme.colors.text,
      fontFamily: "Crimson Pro, serif",
      fontWeight: "600",
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
                We believe exceptional design is born from the intersection of
                artistry and functionality. Every pixel, every interaction,
                every line of code is crafted with intention, creating
                experiences that resonate on both emotional and practical
                levels.
              </p>
              <blockquote
                className="border-l-4 pl-6 italic text-lg mb-6"
                style={{
                  borderColor: theme.colors.primary,
                  color: theme.colors.textSecondary,
                }}
              >
                "Design is not just what it looks like and feels like. Design is
                how it works."
                <footer className="text-sm mt-2" style={secondaryTextStyle}>
                  — Steve Jobs
                </footer>
              </blockquote>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="text-xl font-semibold" style={headingStyle}>
                  Premium Services
                </h4>
                <ul className="space-y-3 text-sm" style={textStyle}>
                  <li className="flex items-center space-x-3">
                    <div
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: theme.colors.primary }}
                    ></div>
                    <span>Full-Stack Application Development</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <div
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: theme.colors.accent }}
                    ></div>
                    <span>UI/UX Design & Research</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <div
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: theme.colors.primary }}
                    ></div>
                    <span>Performance Optimization</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <div
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: theme.colors.accent }}
                    ></div>
                    <span>Technical Leadership</span>
                  </li>
                </ul>
              </div>

              <div className="space-y-4">
                <h4 className="text-xl font-semibold" style={headingStyle}>
                  Achievements
                </h4>
                <div className="grid grid-cols-2 gap-4">
                  <div
                    className="text-center p-4 rounded-xl"
                    style={{ backgroundColor: theme.colors.surface }}
                  >
                    <div
                      className="text-2xl font-bold mb-1"
                      style={{ color: theme.colors.primary }}
                    >
                      150+
                    </div>
                    <div className="text-xs" style={secondaryTextStyle}>
                      Projects Delivered
                    </div>
                  </div>
                  <div
                    className="text-center p-4 rounded-xl"
                    style={{ backgroundColor: theme.colors.surface }}
                  >
                    <div
                      className="text-2xl font-bold mb-1"
                      style={{ color: theme.colors.accent }}
                    >
                      98%
                    </div>
                    <div className="text-xs" style={secondaryTextStyle}>
                      Client Satisfaction
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-6">
              <button
                className="w-full py-4 rounded-xl text-black font-semibold text-base transition-all duration-300 hover:scale-105 hover:shadow-xl"
                style={{
                  background: `linear-gradient(135deg, ${theme.colors.primary}, ${theme.colors.accent})`,
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
            <h3 className="text-2xl font-semibold mb-6" style={headingStyle}>
              Technical Expertise
            </h3>

            <div className="space-y-6">
              {allSkills.map((skill, index) => (
                <div key={skill.name} className="space-y-3">
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="text-base font-medium" style={textStyle}>
                        {skill.name}
                      </span>
                      <div
                        className="text-xs mt-1"
                        style={{ color: theme.colors.primary }}
                      >
                        {skill.category}
                      </div>
                    </div>
                    <span
                      className="text-lg font-semibold"
                      style={{ color: theme.colors.accent }}
                    >
                      {skill.level}%
                    </span>
                  </div>

                  <div className="w-full bg-black/20 rounded-full h-3 overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-1500 ease-out relative overflow-hidden"
                      style={{
                        width: skillAnimations ? `${skill.level}%` : "0%",
                        background: `linear-gradient(90deg, ${theme.colors.primary}, ${theme.colors.accent})`,
                        transitionDelay: `${index * 150}ms`,
                      }}
                    >
                      <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                    </div>
                  </div>

                  <p className="text-sm" style={secondaryTextStyle}>
                    {skill.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        );

      case "profile":
        return (
          <div className="space-y-8">
            <div>
              <h3 className="text-3xl font-semibold mb-6" style={headingStyle}>
                Professional Profile
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div
                  className="text-center p-6 rounded-xl"
                  style={{ backgroundColor: theme.colors.surface }}
                >
                  <div
                    className="text-3xl font-bold mb-2"
                    style={{ color: theme.colors.primary }}
                  >
                    8+
                  </div>
                  <div className="text-sm" style={secondaryTextStyle}>
                    Years Experience
                  </div>
                </div>
                <div
                  className="text-center p-6 rounded-xl"
                  style={{ backgroundColor: theme.colors.surface }}
                >
                  <div
                    className="text-3xl font-bold mb-2"
                    style={{ color: theme.colors.accent }}
                  >
                    150+
                  </div>
                  <div className="text-sm" style={secondaryTextStyle}>
                    Projects Completed
                  </div>
                </div>
                <div
                  className="text-center p-6 rounded-xl"
                  style={{ backgroundColor: theme.colors.surface }}
                >
                  <div
                    className="text-3xl font-bold mb-2"
                    style={{ color: theme.colors.primary }}
                  >
                    98%
                  </div>
                  <div className="text-sm" style={secondaryTextStyle}>
                    Client Satisfaction
                  </div>
                </div>
              </div>

              <p className="text-base leading-relaxed mb-6" style={textStyle}>
                Senior Full-Stack Developer and Creative Technologist with
                expertise in building scalable web applications, modern user
                interfaces, and innovative digital experiences. Passionate about
                bridging the gap between design and technology to create
                meaningful, user-centric solutions.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h4 className="text-xl font-semibold" style={headingStyle}>
                    Core Expertise
                  </h4>
                  <ul className="space-y-3 text-sm" style={textStyle}>
                    <li className="flex items-center space-x-3">
                      <div
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: theme.colors.primary }}
                      ></div>
                      <span>React, Next.js & Modern JavaScript</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <div
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: theme.colors.accent }}
                      ></div>
                      <span>Node.js & Full-Stack Development</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <div
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: theme.colors.primary }}
                      ></div>
                      <span>UI/UX Design & Prototyping</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <div
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: theme.colors.accent }}
                      ></div>
                      <span>Cloud Architecture & DevOps</span>
                    </li>
                  </ul>
                </div>

                <div className="space-y-4">
                  <h4 className="text-xl font-semibold" style={headingStyle}>
                    Certifications
                  </h4>
                  <div className="space-y-3 text-sm">
                    <div
                      className="flex justify-between items-center p-3 rounded-lg"
                      style={{ backgroundColor: theme.colors.surface }}
                    >
                      <div>
                        <div className="font-medium" style={textStyle}>
                          AWS Solutions Architect
                        </div>
                        <div className="text-xs" style={secondaryTextStyle}>
                          Amazon Web Services
                        </div>
                      </div>
                      <div
                        className="text-xs"
                        style={{ color: theme.colors.primary }}
                      >
                        2023
                      </div>
                    </div>
                    <div
                      className="flex justify-between items-center p-3 rounded-lg"
                      style={{ backgroundColor: theme.colors.surface }}
                    >
                      <div>
                        <div className="font-medium" style={textStyle}>
                          Google UX Design
                        </div>
                        <div className="text-xs" style={secondaryTextStyle}>
                          Google Career Certificate
                        </div>
                      </div>
                      <div
                        className="text-xs"
                        style={{ color: theme.colors.primary }}
                      >
                        2022
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-6">
              <button
                className="w-full py-4 rounded-xl text-black font-semibold text-base transition-all duration-300 hover:scale-105 hover:shadow-xl"
                style={{
                  background: `linear-gradient(135deg, ${theme.colors.primary}, ${theme.colors.accent})`,
                }}
              >
                Download Resume
              </button>
            </div>
          </div>
        );

      case "about":
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold mb-6" style={headingStyle}>
              About Me
            </h3>
            <p className="text-base leading-relaxed mb-6" style={textStyle}>
              I'm a passionate creative developer with over 8 years of
              experience in crafting digital experiences that bridge the gap
              between design and technology. My journey started with a curiosity
              about how beautiful interfaces come to life through code.
            </p>

            <div className="space-y-6">
              <div>
                <h4 className="text-lg font-semibold mb-4" style={headingStyle}>
                  My Philosophy
                </h4>
                <p className="text-sm leading-relaxed mb-4" style={textStyle}>
                  I believe that great software is not just about clean code or
                  beautiful design—it's about creating experiences that feel
                  intuitive and meaningful to users. Every project is an
                  opportunity to solve real problems and make technology more
                  accessible and delightful.
                </p>
              </div>

              <div>
                <h4 className="text-lg font-semibold mb-4" style={headingStyle}>
                  Journey Timeline
                </h4>
                <div className="space-y-3 text-sm">
                  <div
                    className="flex justify-between items-start p-4 rounded-lg"
                    style={{ backgroundColor: theme.colors.surface }}
                  >
                    <div>
                      <div className="font-medium" style={textStyle}>
                        Senior Developer & Tech Lead
                      </div>
                      <div className="text-xs mt-1" style={secondaryTextStyle}>
                        Tech Innovators Inc. • Leading development teams and
                        architecting scalable solutions
                      </div>
                    </div>
                    <div
                      className="text-xs"
                      style={{ color: theme.colors.primary }}
                    >
                      2020 - Present
                    </div>
                  </div>
                  <div
                    className="flex justify-between items-start p-4 rounded-lg"
                    style={{ backgroundColor: theme.colors.surface }}
                  >
                    <div>
                      <div className="font-medium" style={textStyle}>
                        Full-Stack Developer
                      </div>
                      <div className="text-xs mt-1" style={secondaryTextStyle}>
                        Digital Solutions Co. • Built end-to-end web
                        applications and mobile solutions
                      </div>
                    </div>
                    <div
                      className="text-xs"
                      style={{ color: theme.colors.primary }}
                    >
                      2018 - 2020
                    </div>
                  </div>
                  <div
                    className="flex justify-between items-start p-4 rounded-lg"
                    style={{ backgroundColor: theme.colors.surface }}
                  >
                    <div>
                      <div className="font-medium" style={textStyle}>
                        Frontend Developer
                      </div>
                      <div className="text-xs mt-1" style={secondaryTextStyle}>
                        StartupTech • Focused on React development and user
                        interface design
                      </div>
                    </div>
                    <div
                      className="text-xs"
                      style={{ color: theme.colors.primary }}
                    >
                      2016 - 2018
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-lg font-semibold mb-4" style={headingStyle}>
                  When I'm Not Coding
                </h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center space-x-3">
                    <span className="text-lg">📸</span>
                    <span style={textStyle}>Photography</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-lg">🎸</span>
                    <span style={textStyle}>Music Production</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-lg">🥾</span>
                    <span style={textStyle}>Hiking</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-lg">📚</span>
                    <span style={textStyle}>Reading Tech Blogs</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case "location":
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold mb-6" style={headingStyle}>
              Location & Availability
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <h4
                    className="text-lg font-semibold mb-3"
                    style={headingStyle}
                  >
                    Current Location
                  </h4>
                  <div className="flex items-center space-x-3 mb-2">
                    <span className="text-2xl">🌉</span>
                    <div>
                      <div className="font-medium" style={textStyle}>
                        San Francisco, CA
                      </div>
                      <div className="text-sm" style={secondaryTextStyle}>
                        Pacific Standard Time (PST)
                      </div>
                    </div>
                  </div>
                  <div className="text-sm" style={secondaryTextStyle}>
                    Located in the heart of Silicon Valley, perfectly positioned
                    for tech collaboration
                  </div>
                </div>

                <div>
                  <h4
                    className="text-lg font-semibold mb-3"
                    style={headingStyle}
                  >
                    Work Preferences
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center space-x-3">
                      <div
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: theme.colors.primary }}
                      ></div>
                      <span style={textStyle}>Remote work worldwide</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: theme.colors.accent }}
                      ></div>
                      <span style={textStyle}>Hybrid collaborations</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: theme.colors.primary }}
                      ></div>
                      <span style={textStyle}>On-site consultations</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h4
                    className="text-lg font-semibold mb-3"
                    style={headingStyle}
                  >
                    Availability
                  </h4>
                  <div className="space-y-3">
                    <div
                      className="p-4 rounded-lg"
                      style={{ backgroundColor: theme.colors.surface }}
                    >
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium" style={textStyle}>
                          Freelance Projects
                        </span>
                        <span
                          className="text-xs px-2 py-1 rounded-full"
                          style={{
                            backgroundColor: theme.colors.primary,
                            color: theme.colors.background,
                          }}
                        >
                          Available
                        </span>
                      </div>
                      <div className="text-xs" style={secondaryTextStyle}>
                        Taking on new projects starting Q2 2024
                      </div>
                    </div>

                    <div
                      className="p-4 rounded-lg"
                      style={{ backgroundColor: theme.colors.surface }}
                    >
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium" style={textStyle}>
                          Consulting
                        </span>
                        <span
                          className="text-xs px-2 py-1 rounded-full"
                          style={{
                            backgroundColor: theme.colors.accent,
                            color: theme.colors.background,
                          }}
                        >
                          Open
                        </span>
                      </div>
                      <div className="text-xs" style={secondaryTextStyle}>
                        Available for technical consultations and code reviews
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4
                    className="text-lg font-semibold mb-3"
                    style={headingStyle}
                  >
                    Languages
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between items-center">
                      <span style={textStyle}>English</span>
                      <span style={{ color: theme.colors.primary }}>
                        Native
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span style={textStyle}>Spanish</span>
                      <span style={{ color: theme.colors.accent }}>
                        Conversational
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span style={textStyle}>Japanese</span>
                      <span style={{ color: theme.colors.primary }}>Basic</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-6">
              <button
                className="w-full py-4 rounded-xl text-black font-semibold text-base transition-all duration-300 hover:scale-105 hover:shadow-xl"
                style={{
                  background: `linear-gradient(135deg, ${theme.colors.primary}, ${theme.colors.accent})`,
                }}
              >
                Schedule a Meeting
              </button>
            </div>
          </div>
        );

      case "projects":
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold mb-6" style={headingStyle}>
              Featured Projects
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {allProjects.map((project) => (
                <div
                  key={project.id}
                  className="p-6 rounded-xl transition-all duration-300 hover:scale-105"
                  style={{ backgroundColor: theme.colors.surface }}
                >
                  {/* Show project image */}
                  <div
                    className="aspect-video rounded-lg mb-4 overflow-hidden flex items-center justify-center"
                    style={{
                      background: `linear-gradient(135deg, ${theme.colors.primary}20, ${theme.colors.accent}20)`,
                    }}
                  >
                    <img
                      src={project.image}
                      alt={project.name}
                      className="object-cover w-full h-full"
                      style={{ filter: "brightness(0.92)", transition: "filter 0.3s" }}
                    />
                  </div>

                  <h4 className="font-semibold mb-3" style={textStyle}>
                    {project.name}
                  </h4>
                  <p className="text-sm mb-4" style={secondaryTextStyle}>
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 rounded-full text-xs font-medium"
                        style={{
                          backgroundColor: theme.colors.surfaceElevated,
                          color: theme.colors.text,
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full block py-3 rounded-lg text-sm font-medium transition-all duration-300 hover:scale-105 text-center"
                    style={{
                      background: `linear-gradient(135deg, ${theme.colors.primary}, ${theme.colors.accent})`,
                      color: theme.colors.background,
                      textDecoration: "none",
                    }}
                  >
                    Visit Project →
                  </a>
                </div>
              ))}
            </div>
          </div>
        );

      case "contact":
        return (
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-semibold mb-6" style={headingStyle}>
                Get In Touch
              </h3>
              <p className="text-base mb-6" style={textStyle}>
                Ready to bring your ideas to life? Let's discuss your next
                project and create something amazing together.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Contact Form */}
              <div className="space-y-6">
                <h4 className="text-lg font-semibold" style={headingStyle}>
                  Send a Message
                </h4>

                <form className="space-y-4">
                  <div>
                    <label
                      className="block text-sm font-medium mb-2"
                      style={textStyle}
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 rounded-lg border transition-colors duration-200 focus:outline-none"
                      style={{
                        backgroundColor: theme.colors.surface,
                        borderColor: theme.colors.surfaceElevated,
                        color: theme.colors.text,
                      }}
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
                      className="w-full px-4 py-3 rounded-lg border transition-colors duration-200 focus:outline-none"
                      style={{
                        backgroundColor: theme.colors.surface,
                        borderColor: theme.colors.surfaceElevated,
                        color: theme.colors.text,
                      }}
                      placeholder="your@email.com"
                    />
                  </div>

                  <div>
                    <label
                      className="block text-sm font-medium mb-2"
                      style={textStyle}
                    >
                      Project Type
                    </label>
                    <select
                      className="w-full px-4 py-3 rounded-lg border transition-colors duration-200 focus:outline-none"
                      style={{
                        backgroundColor: theme.colors.surface,
                        borderColor: theme.colors.surfaceElevated,
                        color: theme.colors.text,
                      }}
                    >
                      <option>Web Development</option>
                      <option>Mobile App</option>
                      <option>UI/UX Design</option>
                      <option>Consulting</option>
                      <option>Other</option>
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
                      className="w-full px-4 py-3 rounded-lg border transition-colors duration-200 focus:outline-none resize-none"
                      style={{
                        backgroundColor: theme.colors.surface,
                        borderColor: theme.colors.surfaceElevated,
                        color: theme.colors.text,
                      }}
                      placeholder="Tell me about your project vision, timeline, and goals..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 rounded-lg font-semibold transition-all duration-300 hover:scale-105"
                    style={{
                      background: `linear-gradient(135deg, ${theme.colors.primary}, ${theme.colors.accent})`,
                      color: theme.colors.background,
                    }}
                  >
                    Send Message
                  </button>
                </form>
              </div>

              {/* Contact Information & Social Media */}
              <div className="space-y-6">
                <div>
                  <h4
                    className="text-lg font-semibold mb-4"
                    style={headingStyle}
                  >
                    Contact Information
                  </h4>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4">
                      <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center"
                        style={{ backgroundColor: theme.colors.surface }}
                      >
                        <span className="text-lg">📧</span>
                      </div>
                      <div>
                        <div className="font-medium text-sm" style={textStyle}>
                          Email
                        </div>
                        <div className="text-sm" style={secondaryTextStyle}>
                          hello@bentolio.dev
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4">
                      <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center"
                        style={{ backgroundColor: theme.colors.surface }}
                      >
                        <span className="text-lg">📱</span>
                      </div>
                      <div>
                        <div className="font-medium text-sm" style={textStyle}>
                          Phone
                        </div>
                        <div className="text-sm" style={secondaryTextStyle}>
                          +1 (555) 123-4567
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4">
                      <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center"
                        style={{ backgroundColor: theme.colors.surface }}
                      >
                        <span className="text-lg">💬</span>
                      </div>
                      <div>
                        <div className="font-medium text-sm" style={textStyle}>
                          Discord
                        </div>
                        <div className="text-sm" style={secondaryTextStyle}>
                          bentolio#1234
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4
                    className="text-lg font-semibold mb-4"
                    style={headingStyle}
                  >
                    Connect with Me
                  </h4>
                  <div className="grid grid-cols-2 gap-3">
                    <a
                      href="https://linkedin.com/in/bentolio"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-3 p-3 rounded-lg transition-all duration-300 hover:scale-105"
                      style={{ backgroundColor: theme.colors.surface }}
                    >
                      <div className="w-6 h-6 rounded bg-blue-600 flex items-center justify-center">
                        <span className="text-white text-xs font-bold">in</span>
                      </div>
                      <span className="text-sm font-medium" style={textStyle}>
                        LinkedIn
                      </span>
                    </a>

                    <a
                      href="https://github.com/bentolio"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-3 p-3 rounded-lg transition-all duration-300 hover:scale-105"
                      style={{ backgroundColor: theme.colors.surface }}
                    >
                      <div className="w-6 h-6 rounded bg-gray-800 flex items-center justify-center">
                        <span className="text-white text-xs">⚡</span>
                      </div>
                      <span className="text-sm font-medium" style={textStyle}>
                        GitHub
                      </span>
                    </a>

                    <a
                      href="https://twitter.com/bentolio"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-3 p-3 rounded-lg transition-all duration-300 hover:scale-105"
                      style={{ backgroundColor: theme.colors.surface }}
                    >
                      <div className="w-6 h-6 rounded bg-sky-500 flex items-center justify-center">
                        <span className="text-white text-xs">𝕏</span>
                      </div>
                      <span className="text-sm font-medium" style={textStyle}>
                        Twitter
                      </span>
                    </a>

                    <a
                      href="https://dribbble.com/bentolio"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-3 p-3 rounded-lg transition-all duration-300 hover:scale-105"
                      style={{ backgroundColor: theme.colors.surface }}
                    >
                      <div className="w-6 h-6 rounded bg-pink-500 flex items-center justify-center">
                        <span className="text-white text-xs">●</span>
                      </div>
                      <span className="text-sm font-medium" style={textStyle}>
                        Dribbble
                      </span>
                    </a>
                  </div>
                </div>

                <div
                  className="p-4 rounded-lg border-l-4"
                  style={{
                    backgroundColor: theme.colors.surface,
                    borderLeftColor: theme.colors.primary,
                  }}
                >
                  <div className="text-sm font-medium mb-2" style={textStyle}>
                    Response Time
                  </div>
                  <div className="text-xs" style={secondaryTextStyle}>
                    I typically respond to messages within 24 hours during
                    business days. For urgent matters, feel free to reach out on
                    LinkedIn or Twitter.
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold" style={headingStyle}>
              {widgetName.charAt(0).toUpperCase() + widgetName.slice(1)}
            </h3>
            <p className="text-base" style={textStyle}>
              Enhanced content for {widgetName} widget with sophisticated
              design.
            </p>
          </div>
        );
    }
  };

  const getLoadingContent = () => {
    const phases = [
      { text: "Initializing Experience", subtitle: "Preparing the canvas" },
      { text: "Loading Aesthetics", subtitle: "Crafting visual harmony" },
      { text: "Optimizing Interface", subtitle: "Fine-tuning interactions" },
      { text: "Finalizing Elegance", subtitle: "Polishing perfection" },
    ];

    const phase = phases[loadingPhase] || phases[0];
    return {
      text: phase.text,
      subtitle: phase.subtitle,
      color: theme.colors.primary,
    };
  };

  // ==================== ELEGANT LOADING SCREEN ====================

  if (!isLoaded) {
    return (
      <div
      className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden transition-all duration-1000"
      style={{
        background: `linear-gradient(135deg, ${theme.colors.background} 0%, ${theme.colors.surface} 100%)`,
      }}
    >
      {/* Elegant floating elements */}
      <div className="absolute inset-0 overflow-hidden">
        {loadingElements.map((element) => (
          <div
            key={element.id}
            className="absolute"
            style={{
              left: `${20 + element.id * 15}%`,
              top: `${25 + element.id * 8}%`,
              transform: `scale(${element.scale}) rotate(${element.rotate}deg)`,
              opacity: element.opacity,
              transition: "all 0.5s ease-out",
            }}
          >
            <div
              className="w-16 h-16 rounded-full border-2"
              style={{
                borderColor: `${theme.colors.primary}40`,
                background: `radial-gradient(circle at center, ${theme.colors.primary}10, transparent)`,
              }}
            />
          </div>
        ))}
      </div>

      {/* Elegant geometric background */}
      <div className="absolute inset-0 opacity-30">
        <div
          className="absolute top-1/3 left-1/3 w-40 h-40 rounded-full border"
          style={{
            borderColor: `${theme.colors.primary}20`,
            animation: "spin 20s linear infinite",
          }}
        />
        <div
          className="absolute bottom-1/3 right-1/3 w-32 h-32 rounded-full border"
          style={{
            borderColor: `${theme.colors.accent}20`,
            animation: "spin 15s linear infinite reverse",
          }}
        />
      </div>

      {/* Main content with elegant typography */}
      <div className="z-10 text-center space-y-10 max-w-lg mx-auto px-6">
        <div className="space-y-8">
          {/* Sophisticated logo area */}
          <div className="relative">
            <div
              className="w-20 h-20 mx-auto mb-6 rounded-full border-4 flex items-center justify-center relative overflow-hidden"
              style={{
                borderColor: theme.colors.primary,
                background: `radial-gradient(circle at center, ${theme.colors.primary}10, transparent)`,
              }}
            >
              <div
                className="absolute inset-0 rounded-full"
                style={{
                  background: `conic-gradient(from ${progress * 3.6}deg, ${theme.colors.primary}, ${theme.colors.accent}, ${theme.colors.primary})`,
                  padding: "4px",
                  animation: "spin 3s linear infinite",
                }}
              >
                <div
                  className="w-full h-full rounded-full"
                  style={{ backgroundColor: theme.colors.background }}
                />
              </div>
              <div
                className="relative z-10 text-xl font-bold"
                style={{
                  color: theme.colors.primary,
                  fontFamily: "Crimson Pro, serif",
                }}
              >
                B
              </div>
            </div>
          </div>

          {/* Enhanced brand typography */}
          <div className="space-y-4">
            <h1
              className="text-5xl font-bold tracking-wider"
              style={{
                color: theme.colors.text,
                fontFamily: "Crimson Pro, serif",
                textShadow: `0 0 40px ${theme.colors.primary}30`,
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

        {/* Enhanced progress section */}
        <div className="space-y-4">
          <div
            className="w-full h-2 rounded-full overflow-hidden"
            style={{ backgroundColor: `${theme.colors.surface}60` }}
          >
            <div
              className="h-full transition-all duration-700 ease-out rounded-full relative overflow-hidden"
              style={{
                width: `${progress}%`,
                background: `linear-gradient(90deg, ${theme.colors.primary}, ${theme.colors.accent})`,
                boxShadow: `0 0 20px ${theme.colors.primary}60`,
              }}
            >
              <div className="absolute inset-0 bg-white/10 animate-pulse"></div>
            </div>
          </div>

          <div className="flex justify-between items-center text-sm">
            <span style={{ color: theme.colors.textSecondary }}>
              {progress.toFixed(1)}% Complete
            </span>
            <span style={{ color: theme.colors.primary }}>
              Crafting Excellence
            </span>
          </div>
        </div>
      </div>
    </div>
    );
  }

  // ==================== ELEGANT TRANSITION SCREEN ====================

  if (!showMain) {
    return (
      <div
        className="min-h-screen flex items-center justify-center relative overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${theme.colors.background} 0%, ${theme.colors.surface}30 100%)`,
        }}
      >
        <div className="text-center space-y-6 animate-fadeIn">
          <div
            className="text-7xl font-bold tracking-wider"
            style={{
              color: theme.colors.text,
              fontFamily: "Crimson Pro, serif",
              textShadow: `0 0 60px ${theme.colors.primary}40`,
              animation: "fadeInScale 1.5s ease-in-out",
            }}
          >
            Welcome
          </div>
          <div
            className="text-xl tracking-wide"
            style={{
              color: theme.colors.primary,
              animation: "fadeInScale 1s ease-in-out 0.5s both",
            }}
          >
            to the experience
          </div>
        </div>
      </div>
    );
  }

  // ==================== MAIN CONTENT ====================

  return (
    <>
      <canvas
        ref={particleCanvasRef}
        className="fixed inset-0 w-full h-full pointer-events-none z-0"
        style={{
          position: "fixed",
          inset: 0,
          width: "100vw",
          height: "100vh",
          zIndex: 0,
          opacity: 0.9,
          transition: "background 0.5s",
        }}
        aria-hidden="true"
      />
      {/* Custom CSS for oscillating animation */}
      <style>{`
        @keyframes oscillate {
          0%,
          100% {
            transform: translate(0, 0);
          }
          50% {
            transform: translate(3px, -3px);
          }
        }
      `}</style>
      {/* Header */}
      <header
        className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl border-b"
        style={{
          backgroundColor: `${theme.colors.background}90`,
          borderColor: `${theme.colors.surface}40`,
        }}
      >
        <nav className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div
            className="text-2xl font-bold tracking-wide transition-colors duration-300"
            style={{
              color: theme.colors.text,
              fontFamily: "Crimson Pro, serif",
            }}
          >
            Bentolio
          </div>

          <div className="hidden md:flex items-center space-x-8">
            {["Work", "About", "Skills", "Contact"].map((item) => (
              <button
                key={item}
                onClick={handleAnyClick(() => handleNavClick(item))}
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

        {isMobileMenuOpen && (
          <div
            className="md:hidden absolute top-full left-0 right-0 backdrop-blur-xl border-b transition-all duration-300"
            style={{
              backgroundColor: `${theme.colors.background}95`,
              borderColor: `${theme.colors.surface}40`,
            }}
          >
            <div className="px-6 py-6 space-y-4">
              {["Work", "About", "Skills", "Contact"].map((item) => (
                <button
                  key={item}
                  onClick={handleAnyClick(() => handleNavClick(item))}
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

      {/* Main content */}
      <main
        className="min-h-screen pt-24 pb-16 px-6 transition-colors duration-500"
        style={{ backgroundColor: theme.colors.background }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-12 gap-6 auto-rows-max">
            {/* Enhanced Hero Widget */}
            <div
              ref={(el) => (widgetRefs.current["hero"] = el)}
              className="col-span-12 md:col-span-8 h-80 rounded-3xl p-8 relative overflow-hidden cursor-pointer transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl group"
              style={{ backgroundColor: theme.colors.hero }}
              onClick={handleAnyClick(() => handleWidgetClick("hero"))}
            >
              {/* Simple decorative circle */}
              <div
                className="absolute top-6 right-6 w-16 h-16 rounded-full opacity-30 group-hover:opacity-50 transition-opacity duration-300"
                style={{ backgroundColor: theme.colors.primary }}
              ></div>

              {/* Enhanced layout with button next to text */}
              <div className="flex flex-col md:flex-row md:items-end md:justify-between h-full">
                <div className="flex-1">
                  <h1
                    className="text-6xl font-bold mb-4 transition-colors duration-300"
                    style={{
                      color: theme.colors.text,
                      fontFamily: "Crimson Pro, serif",
                      lineHeight: "1.1",
                    }}
                  >
                    Creative
                    <br />
                    <span style={{ color: theme.colors.primary }}>
                      Developer
                    </span>
                  </h1>
                  <p
                    className="text-lg mb-6 max-w-md transition-colors duration-300 leading-relaxed"
                    style={{ color: theme.colors.textSecondary }}
                  >
                    Crafting extraordinary digital experiences through the
                    perfect harmony of innovative design and cutting-edge
                    technology.
                  </p>
                </div>

                {/* Button positioned next to text */}
                <div className="md:self-end">
                  <button
                    className="px-8 py-4 rounded-xl font-semibold transition-all duration-300 hover:scale-105 hover:shadow-xl whitespace-nowrap"
                    style={{
                      background: `linear-gradient(135deg, ${theme.colors.primary}, ${theme.colors.accent})`,
                      color: theme.colors.background,
                    }}
                  >
                    Explore My Work →
                  </button>
                </div>
              </div>
            </div>

            {/* Profile Widget */}
            <div
              ref={(el) => (widgetRefs.current["profile"] = el)}
              className="col-span-12 md:col-span-4 h-80 rounded-3xl p-6 relative overflow-hidden cursor-pointer transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl group"
              style={{ backgroundColor: theme.colors.profile }}
              onClick={handleAnyClick(() => handleWidgetClick("profile"))}
            >
              <div
                className="w-24 h-24 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-xl"
                style={{
                  background: `linear-gradient(135deg, ${theme.colors.primary}, ${theme.colors.accent})`,
                }}
              >
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
                className="text-xl font-semibold mb-2 transition-colors duration-300"
                style={{
                  color: theme.colors.text,
                  fontFamily: "Crimson Pro, serif",
                }}
              >
                John Doe
              </h3>
              <p
                className="text-sm transition-colors duration-300"
                style={{ color: theme.colors.textSecondary }}
              >
                Senior Creative Developer specializing in React, TypeScript, and
                modern web technologies.
              </p>

              <div className="absolute top-4 right-4">
                <div
                  className="w-3 h-3 rounded-full animate-pulse"
                  style={{ backgroundColor: theme.colors.accent }}
                ></div>
              </div>
            </div>

            {/* About Widget */}
            <div
              ref={(el) => (widgetRefs.current["about"] = el)}
              className="col-span-12 md:col-span-6 h-60 rounded-3xl p-6 relative overflow-hidden cursor-pointer transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl group"
              style={{ backgroundColor: theme.colors.about }}
              onClick={handleAnyClick(() => handleWidgetClick("about"))}
            >
              <svg
                className="absolute top-4 right-4 w-8 h-8 opacity-20 group-hover:opacity-40 transition-opacity duration-300"
                fill="none"
                style={{ color: theme.colors.text }}
                viewBox="0 0 24 24"
              >
                <path d="M14,17H17L19,13V7H13V13H16M6,17H9L11,13V7H5V13H8L6,17Z" />
              </svg>

              <h3
                className="text-xl font-semibold mb-3 transition-colors duration-300"
                style={{
                  color: theme.colors.text,
                  fontFamily: "Crimson Pro, serif",
                }}
              >
                About Me
              </h3>
              <p
                className="text-sm leading-relaxed transition-colors duration-300"
                style={{ color: theme.colors.textSecondary }}
              >
                Passionate about creating digital experiences that bridge design
                and technology. With over 8 years of experience, I help bring
                ideas to life through elegant code and thoughtful design
                decisions.
              </p>
            </div>

            {/* Skills Widget */}
            <div
              ref={(el) => (widgetRefs.current["skills"] = el)}
              className="col-span-12 md:col-span-3 h-60 rounded-3xl p-6 relative overflow-hidden cursor-pointer transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl group"
              style={{ backgroundColor: theme.colors.skills }}
              onClick={handleAnyClick(() => handleWidgetClick("skills"))}
            >
              <h3
                className="text-xl font-semibold mb-4 transition-colors duration-300"
                style={{
                  color: theme.colors.text,
                  fontFamily: "Crimson Pro, serif",
                }}
              >
                Skills
              </h3>

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
                      {skill.name.split(" ")[0]}
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
                            backgroundColor:
                              i < Math.floor(skill.level / 20)
                                ? theme.colors.primary
                                : theme.colors.text,
                            animationDelay: `${index * 100 + i * 50}ms`,
                          }}
                        />
                      ))}
                    </div>
                  </div>
                ))}

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
              className="col-span-12 md:col-span-3 h-60 rounded-3xl p-6 relative overflow-hidden cursor-pointer transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl group"
              style={{ backgroundColor: theme.colors.location }}
              onClick={handleAnyClick(() => handleWidgetClick("location"))}
            >
              <div className="text-5xl mb-4 transition-all duration-300">
                🌍
              </div>
              <h3
                className="text-lg font-semibold mb-2 transition-colors duration-300"
                style={{
                  color: theme.colors.text,
                  fontFamily: "Crimson Pro, serif",
                }}
              >
                Location
              </h3>
              <p
                className="text-sm transition-colors duration-300"
                style={{ color: theme.colors.textSecondary }}
              >
                San Francisco, CA
              </p>
              <p
                className="text-xs mt-2 transition-colors duration-300"
                style={{ color: theme.colors.textSecondary }}
              >
                Available for remote work worldwide
              </p>

              {/* Simple arrow pointing to top-right with oscillating animation */}
              <div className="absolute top-4 right-4">
                <div
                  className="w-8 h-8 flex items-center justify-center transition-all duration-300"
                  style={{ color: theme.colors.primary }}
                >
                  <svg
                    className="w-5 h-5 group-hover:animate-[oscillate_1s_ease-in-out_infinite]"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M7 17L17 7M17 7H10M17 7v7"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* Projects Widget */}
            <div
              ref={(el) => (widgetRefs.current["projects"] = el)}
              className="col-span-12 md:col-span-8 h-60 rounded-3xl p-6 relative overflow-hidden cursor-pointer transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl group"
              style={{ backgroundColor: theme.colors.projects }}
              onClick={handleAnyClick(() => handleWidgetClick("projects"))}
            >
              <h3
              className="text-2xl font-semibold mb-4 transition-colors duration-300"
              style={{
                color: theme.colors.text,
                fontFamily: "Crimson Pro, serif",
              }}
              >
              Recent Work
              </h3>

              <div className="grid grid-cols-3 gap-4 h-[90px]">
              {allProjects.slice(0, 3).map((project, index) => (
                <div
                key={project.id}
                className="relative rounded-xl overflow-hidden group hover:shadow-lg transition-all duration-300 flex flex-col justify-end"
                style={{
                  backgroundColor: theme.colors.surfaceElevated,
                  minHeight: 0,
                }}
                >
                {/* Blurred project image as background */}
                <div
                  className="absolute inset-0"
                  style={{
                  background: `url(${project.image}) center/cover no-repeat`,
                  filter: "blur(6px) brightness(0.7)",
                  opacity: 0.7,
                  zIndex: 1,
                  }}
                />
                {/* Overlay gradient */}
                <div
                  className="absolute inset-0"
                  style={{
                  background: `linear-gradient(135deg, ${theme.colors.primary}22 0%, ${theme.colors.accent}22 100%)`,
                  zIndex: 2,
                  }}
                />
                {/* Project info */}
                <div className="relative z-10 flex flex-col justify-end h-full p-3">
                  <div
                  className="font-semibold text-sm truncate"
                  style={{ color: theme.colors.text }}
                  >
                  {project.name}
                  </div>
                  <div
                  className="text-xs truncate"
                  style={{ color: theme.colors.textSecondary }}
                  >
                  {project.tech.slice(0, 2).join(", ")}
                  </div>
                </div>
                </div>
              ))}
              </div>

              {/* Decorative arrow */}
              <div className="absolute top-4 right-4">
              <div
                className="w-8 h-8 flex items-center justify-center transition-all duration-300"
                style={{ color: theme.colors.primary }}
              >
                <svg
                className="w-5 h-5 group-hover:animate-[oscillate_1s_ease-in-out_infinite]"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
                >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M7 17L17 7M17 7H10M17 7v7"
                />
              </svg>
              </div>
              </div>
            </div>

            {/* Contact Widget */}
            <div
              ref={(el) => (widgetRefs.current["contact"] = el)}
              className="col-span-12 md:col-span-4 h-60 rounded-3xl p-6 relative overflow-hidden cursor-pointer transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl group"
              style={{ backgroundColor: theme.colors.contact }}
              onClick={handleAnyClick(() => handleWidgetClick("contact"))}
            >
              <div className="text-4xl mb-4">✉️</div>
              <h3
                className="text-xl font-semibold mb-3 transition-colors duration-300"
                style={{
                  color: theme.colors.text,
                  fontFamily: "Crimson Pro, serif",
                }}
              >
                Get In Touch
              </h3>
              <p className="text-sm mb-4 transition-colors duration-300" style={{ color: theme.colors.textSecondary }}>
                Let's discuss your next project and create something amazing
                together.
              </p>

              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-xs">
                  <span>📧</span>
                  <span style={{ color: theme.colors.textSecondary }}>
                    hello@bentolio.dev
                  </span>
                </div>
                <div className="flex items-center space-x-2 text-xs">
                  <span>💼</span>
                  <span style={{ color: theme.colors.textSecondary }}>
                    LinkedIn
                  </span>
                </div>
              </div>

              {/* Simple arrow pointing to top-right with oscillating animation */}
              <div className="absolute top-4 right-4">
                <div
                  className="w-8 h-8 flex items-center justify-center transition-all duration-300"
                  style={{ color: theme.colors.primary }}
                >
                  <svg
                    className="w-5 h-5 group-hover:animate-[oscillate_1s_ease-in-out_infinite]"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M7 17L17 7M17 7H10M17 7v7"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Redesigned theme selector */}
        <div className="fixed bottom-6 right-6 z-40">
          {showThemeSelector && (
            <div
              className="absolute bottom-full right-0 mb-6 p-6 rounded-3xl border backdrop-blur-xl animate-fadeIn"
              style={{
                backgroundColor: `${theme.colors.background}95`,
                borderColor: `${theme.colors.surfaceElevated}60`,
                minWidth: "320px",
              }}
            >
              <div className="mb-6">
                <h4
                  className="text-lg font-semibold mb-2"
                  style={{
                    color: theme.colors.text,
                    fontFamily: "Crimson Pro, serif",
                  }}
                >
                  Theme Palette
                </h4>
                <p
                  className="text-xs"
                  style={{ color: theme.colors.textSecondary }}
                >
                  Choose your perfect aesthetic
                </p>
              </div>

              <div className="flex items-center mb-4">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={autoThemeSwitch}
                    onChange={() => setAutoThemeSwitch((v) => !v)}
                    className="form-checkbox h-5 w-5 text-primary rounded transition-all duration-200"
                    style={{ accentColor: theme.colors.primary }}
                  />
                  <span className="ml-2 text-sm" style={{ color: theme.colors.text }}>
                    Auto Theme Switch
                  </span>
                </label>
              </div>

              <div className="space-y-3 max-h-80 overflow-y-auto custom-scrollbar">
                {colorThemes.map((themeOption) => (
                  <button
                    key={themeOption.id}
                    onClick={() => handleThemeChange(themeOption.id)}
                    className={`w-full p-4 rounded-2xl transition-all duration-300 hover:scale-105 border-2 ${
                      currentTheme === themeOption.id ? "scale-105" : ""
                    }`}
                    style={{
                      backgroundColor: themeOption.colors.surface,
                      borderColor:
                        currentTheme === themeOption.id
                          ? theme.colors.primary
                          : "transparent",
                    }}
                  >
                    <div className="flex items-center space-x-4">
                      <div className="flex space-x-2">
                        <div
                          className="w-6 h-6 rounded-full shadow-md"
                          style={{
                            backgroundColor: themeOption.colors.primary,
                          }}
                        />
                        <div
                          className="w-6 h-6 rounded-full shadow-md"
                          style={{ backgroundColor: themeOption.colors.accent }}
                        />
                      </div>
                      <div className="flex-1 text-left">
                        <div
                          className="font-semibold text-sm"
                          style={{ color: themeOption.colors.text }}
                        >
                          {themeOption.name}
                        </div>
                        <div
                          className="text-xs mt-1"
                          style={{ color: themeOption.colors.textSecondary }}
                        >
                          {themeOption.description}
                        </div>
                      </div>
                      {currentTheme === themeOption.id && (
                        <div
                          className="w-3 h-3 rounded-full animate-pulse"
                          style={{ backgroundColor: theme.colors.primary }}
                        ></div>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          <button
            onClick={() => setShowThemeSelector(!showThemeSelector)}
            className="w-16 h-16 rounded-full backdrop-blur-xl border transition-all duration-300 hover:scale-110 flex items-center justify-center group shadow-lg"
            style={{
              backgroundColor: `${theme.colors.surface}90`,
              borderColor: `${theme.colors.surfaceElevated}60`,
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

      {/* Modal */}
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
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {renderExpandedContent(expandedWidget)}
          </div>
        </div>
      )}

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

        .animate-fadeInScale {
          animation: fadeInScale 0.5s ease-out;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(15px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes slideIn {
          from { opacity: 0; transform: scale(0.96) translateY(15px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }

        @keyframes fadeInScale {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
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
      `}</style>
    </>
  );
}
