import { useEffect, useState } from "react";

/**
 * Enhanced Bentolio Portfolio Website
 * Features expandable widgets with detailed content on hover
 * Clean, elegant design with smooth animations
 */

// Types for better code organization
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

const Index = () => {
  // ==================== STATE MANAGEMENT ====================
  const [progress, setProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showMain, setShowMain] = useState(false);

  // Widget expansion states
  const [expandedWidget, setExpandedWidget] = useState<string | null>(null);
  const [hoverTimer, setHoverTimer] = useState<NodeJS.Timeout | null>(null);

  // ==================== DATA STRUCTURES ====================

  // Skills data with detailed information
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

  // Projects data with comprehensive details
  const allProjects: Project[] = [
    {
      id: 1,
      name: "E-commerce Platform",
      description:
        "Full-stack e-commerce solution with payment integration, inventory management, and admin dashboard.",
      tech: ["React", "Node.js", "PostgreSQL", "Stripe"],
      image: "/api/placeholder/300/200",
      liveUrl: "https://ecommerce-demo.com",
      featured: true,
    },
    {
      id: 2,
      name: "Design System",
      description:
        "Comprehensive design system with reusable components, documentation, and design tokens.",
      tech: ["React", "Storybook", "Figma", "TypeScript"],
      image: "/api/placeholder/300/200",
      liveUrl: "https://design-system-demo.com",
      featured: true,
    },
    {
      id: 3,
      name: "Mobile App",
      description:
        "Cross-platform mobile application for fitness tracking with real-time data sync.",
      tech: ["React Native", "Firebase", "Redux"],
      image: "/api/placeholder/300/200",
      liveUrl: "https://fitness-app-demo.com",
      featured: true,
    },
    {
      id: 4,
      name: "Analytics Dashboard",
      description:
        "Real-time analytics dashboard with interactive charts and data visualization.",
      tech: ["React", "D3.js", "Python", "FastAPI"],
      image: "/api/placeholder/300/200",
      liveUrl: "https://analytics-demo.com",
      featured: false,
    },
    {
      id: 5,
      name: "Social Media Platform",
      description:
        "Social networking platform with real-time messaging and content sharing.",
      tech: ["Next.js", "Socket.io", "MongoDB", "Redis"],
      image: "/api/placeholder/300/200",
      liveUrl: "https://social-demo.com",
      featured: false,
    },
    {
      id: 6,
      name: "AI Chat Assistant",
      description:
        "Intelligent chat assistant powered by machine learning for customer support.",
      tech: ["Python", "TensorFlow", "React", "WebSocket"],
      image: "/api/placeholder/300/200",
      liveUrl: "https://ai-chat-demo.com",
      featured: false,
    },
  ];

  // ==================== EFFECTS ====================

  // Loading progress simulation
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            setIsLoaded(true);
            setTimeout(() => setShowMain(true), 800);
          }, 500);
          return 100;
        }
        return prev + Math.random() * 3;
      });
    }, 150);

    return () => clearInterval(timer);
  }, []);

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (hoverTimer) clearTimeout(hoverTimer);
    };
  }, [hoverTimer]);

  // ==================== HELPER FUNCTIONS ====================

  // Handle widget hover with delay
  const handleWidgetHover = (widgetName: string, isEntering: boolean) => {
    if (hoverTimer) clearTimeout(hoverTimer);

    if (isEntering) {
      const timer = setTimeout(() => {
        setExpandedWidget(widgetName);
      }, 1500); // 1.5 second delay
      setHoverTimer(timer);
    } else {
      const timer = setTimeout(() => {
        setExpandedWidget(null);
      }, 300); // Small delay before hiding
      setHoverTimer(timer);
    }
  };

  // Get visible skills (first 5 with fade effect)
  const getVisibleSkills = () => {
    const skills = allSkills.slice(0, 5);
    return skills.map((skill, index) => ({
      ...skill,
      opacity: index === 4 ? 0.3 : 1, // Fade effect on last skill
    }));
  };

  // Get featured projects
  const getFeaturedProjects = () =>
    allProjects.filter((project) => project.featured);

  // CSS Classes for consistency
  const cardHoverClass =
    "transform transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:-translate-y-2 cursor-pointer group";

  // ==================== RENDER METHODS ====================

  // Contact Form Component
  const ContactForm = () => (
    <div className="space-y-4 mt-4">
      <div>
        <label
          className="block text-xs font-medium mb-2 opacity-80"
          style={{ color: "rgb(216, 207, 188)" }}
        >
          Name
        </label>
        <input
          type="text"
          className="w-full px-3 py-2 bg-white/10 rounded-lg border border-white/20 text-sm focus:outline-none focus:border-white/40 transition-colors"
          style={{ color: "rgb(216, 207, 188)" }}
          placeholder="Your name"
        />
      </div>
      <div>
        <label
          className="block text-xs font-medium mb-2 opacity-80"
          style={{ color: "rgb(216, 207, 188)" }}
        >
          Email
        </label>
        <input
          type="email"
          className="w-full px-3 py-2 bg-white/10 rounded-lg border border-white/20 text-sm focus:outline-none focus:border-white/40 transition-colors"
          style={{ color: "rgb(216, 207, 188)" }}
          placeholder="your@email.com"
        />
      </div>
      <div>
        <label
          className="block text-xs font-medium mb-2 opacity-80"
          style={{ color: "rgb(216, 207, 188)" }}
        >
          Message
        </label>
        <textarea
          rows={3}
          className="w-full px-3 py-2 bg-white/10 rounded-lg border border-white/20 text-sm focus:outline-none focus:border-white/40 transition-colors resize-none"
          style={{ color: "rgb(216, 207, 188)" }}
          placeholder="Your message..."
        />
      </div>
      <button className="w-full py-2 bg-gradient-to-r from-amber-500 to-amber-600 text-black text-sm font-medium rounded-lg hover:from-amber-400 hover:to-amber-500 transition-all duration-300">
        Send Message
      </button>
    </div>
  );

  return (
    <>
      {/* Google Fonts Import */}
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

      <div
        className="min-h-screen w-full overflow-hidden relative"
        style={{
          backgroundColor: "rgb(17, 18, 13)",
          fontFamily: "Inter, system-ui, sans-serif",
        }}
      >
        {/* ==================== PROGRESS BAR ==================== */}
        <div
          className="fixed top-0 left-0 h-1 z-50 transition-all duration-500 ease-out shadow-lg"
          style={{
            backgroundColor: "rgb(216, 207, 188)",
            width: `${progress}%`,
            boxShadow: `0 0 20px rgb(216, 207, 188)`,
          }}
        />

        {/* ==================== LOADING SCREEN ==================== */}
        <div
          className={`fixed inset-0 z-40 transition-all duration-1000 ${
            showMain ? "opacity-0 pointer-events-none" : "opacity-100"
          }`}
          style={{ backgroundColor: "rgb(17, 18, 13)" }}
        >
          <div className="w-full p-[14px] min-h-[700px] max-h-[1050px] h-screen">
            <div className="grid grid-cols-12 grid-rows-10 gap-[14px] h-full">
              <div className="col-span-12 row-span-1" />

              <div className="col-span-8 row-span-9 grid grid-cols-8 grid-rows-9 gap-[14px]">
                <div className="col-span-5 row-span-5" />

                {/* Loading Avatar */}
                <div className="col-span-3 row-span-5 flex items-center justify-center">
                  <div
                    className={`w-full max-w-[420px] aspect-[400/450] rounded-2xl flex items-center justify-center p-[21px] transition-all duration-1000 ${
                      isLoaded ? "scale-100 opacity-100" : "scale-95 opacity-90"
                    }`}
                    style={{
                      backgroundColor: "rgb(86, 84, 73)",
                      boxShadow: isLoaded
                        ? "0 20px 60px rgba(216, 207, 188, 0.2)"
                        : "none",
                    }}
                  >
                    <div className="w-full h-full rounded-xl flex items-center justify-center relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-amber-100/20 to-amber-800/30 rounded-xl" />
                      <div className="relative z-10 w-32 h-32 bg-gradient-to-br from-amber-200 to-amber-600 rounded-full flex items-center justify-center shadow-2xl animate-pulse">
                        <div className="w-28 h-28 bg-gradient-to-br from-white to-gray-100 rounded-full flex items-center justify-center">
                          <svg
                            className="w-16 h-16 text-gray-600"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-span-4 row-span-4" />
                <div className="col-span-4 row-span-4" />
              </div>

              <div className="col-span-4 row-span-9 grid grid-cols-4 grid-rows-9 gap-[14px]">
                <div className="col-span-4 row-span-8" />
                <div className="col-span-4 row-span-1" />
              </div>
            </div>
          </div>

          {/* Loading Text */}
          {!isLoaded && (
            <div className="fixed inset-0 flex items-center justify-center z-50">
              <div className="text-center">
                <div
                  className="text-5xl font-light tracking-wider mb-4 animate-pulse"
                  style={{
                    color: "rgb(216, 207, 188)",
                    fontFamily: "Playfair Display, serif",
                  }}
                >
                  BENTOLIO
                </div>
                <div className="flex items-center justify-center space-x-2">
                  <div
                    className="w-2 h-2 rounded-full animate-bounce"
                    style={{ backgroundColor: "rgb(216, 207, 188)" }}
                  ></div>
                  <div
                    className="w-2 h-2 rounded-full animate-bounce"
                    style={{
                      backgroundColor: "rgb(216, 207, 188)",
                      animationDelay: "0.1s",
                    }}
                  ></div>
                  <div
                    className="w-2 h-2 rounded-full animate-bounce"
                    style={{
                      backgroundColor: "rgb(216, 207, 188)",
                      animationDelay: "0.2s",
                    }}
                  ></div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* ==================== MAIN PORTFOLIO CONTENT ==================== */}
        <div
          className={`w-full p-[14px] min-h-screen transition-all duration-1000 ${
            showMain ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="grid grid-cols-12 gap-[14px] min-h-screen relative z-10">
            {/* ==================== HEADER SECTION ==================== */}
            <div className="col-span-12 h-20 flex items-center justify-between px-6 backdrop-blur-sm">
              <div
                className="text-3xl font-light tracking-wide relative group"
                style={{
                  color: "rgb(216, 207, 188)",
                  fontFamily: "Playfair Display, serif",
                }}
              >
                BENTOLIO
                <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-current transition-all duration-300 group-hover:w-full"></div>
              </div>

              {/* Navigation */}
              <div className="flex space-x-8">
                {["ABOUT", "WORK", "CONTACT"].map((item) => (
                  <button
                    key={item}
                    className="text-sm tracking-wider font-medium relative overflow-hidden transition-all duration-300 hover:scale-105 group"
                    style={{ color: "rgb(216, 207, 188)" }}
                  >
                    <span className="relative z-10">{item}</span>
                    <div className="absolute inset-0 bg-white/10 transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100 origin-left rounded"></div>
                  </button>
                ))}
              </div>
            </div>

            {/* ==================== MAIN CONTENT GRID ==================== */}
            <div className="col-span-12 grid grid-cols-12 gap-[14px] pb-[14px]">
              {/* ==================== HERO SECTION ==================== */}
              <div
                className={`col-span-12 md:col-span-8 h-80 rounded-2xl p-8 flex flex-col justify-center relative overflow-hidden ${cardHoverClass}`}
                style={{ backgroundColor: "rgb(86, 84, 73)" }}
              >
                {/* Decorative Elements */}
                <div className="absolute top-4 right-4 w-20 h-20 rounded-full border-2 border-white/10 animate-spin"></div>
                <div className="absolute bottom-4 left-4 w-16 h-16 rounded-full bg-white/5"></div>

                <h1
                  className="text-6xl md:text-8xl font-light mb-4 group-hover:scale-105 transition-transform duration-300"
                  style={{
                    color: "rgb(216, 207, 188)",
                    fontFamily: "Playfair Display, serif",
                  }}
                >
                  Creative
                </h1>
                <h1
                  className="text-6xl md:text-8xl font-light mb-6 group-hover:scale-105 transition-transform duration-300"
                  style={{
                    color: "rgb(216, 207, 188)",
                    fontFamily: "Playfair Display, serif",
                  }}
                >
                  Developer
                </h1>
                <p
                  className="text-lg opacity-80 max-w-md group-hover:opacity-100 transition-opacity duration-300"
                  style={{ color: "rgb(216, 207, 188)" }}
                >
                  Crafting digital experiences through innovative design and
                  development
                </p>

                {/* Floating Star Icon */}
                <svg
                  className="absolute top-1/2 right-8 w-6 h-6 opacity-20 group-hover:opacity-40 transition-opacity duration-300"
                  fill="currentColor"
                  style={{ color: "rgb(216, 207, 188)" }}
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              </div>

              {/* ==================== PROFILE CARD ==================== */}
              <div
                className={`col-span-12 md:col-span-4 h-80 rounded-2xl p-6 flex flex-col items-center justify-center text-center relative overflow-hidden ${cardHoverClass}`}
                style={{ backgroundColor: "rgb(45, 46, 40)" }}
              >
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
                  className="text-xl font-medium mb-2"
                  style={{
                    color: "rgb(216, 207, 188)",
                    fontFamily: "Playfair Display, serif",
                  }}
                >
                  John Doe
                </h3>
                <p
                  className="text-sm opacity-70 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ color: "rgb(216, 207, 188)" }}
                >
                  UI/UX Designer & Developer
                </p>

                {/* Status Indicator */}
                <div className="flex items-center mt-4 opacity-60 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse mr-2"></div>
                  <span
                    className="text-xs"
                    style={{ color: "rgb(216, 207, 188)" }}
                  >
                    Available for work
                  </span>
                </div>
              </div>

              {/* ==================== EXPANDABLE ABOUT SECTION ==================== */}
              <div
                className={`col-span-12 md:col-span-6 rounded-2xl p-6 relative overflow-hidden transition-all duration-500 ${cardHoverClass}`}
                style={{
                  backgroundColor: "rgb(35, 36, 30)",
                  height: expandedWidget === "about" ? "400px" : "240px",
                }}
                onMouseEnter={() => handleWidgetHover("about", true)}
                onMouseLeave={() => handleWidgetHover("about", false)}
              >
                {/* Quote Mark Decoration */}
                <svg
                  className="absolute top-4 right-4 w-8 h-8 opacity-20 group-hover:opacity-40 transition-opacity duration-300"
                  fill="currentColor"
                  style={{ color: "rgb(216, 207, 188)" }}
                >
                  <path d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z" />
                </svg>

                <h3
                  className="text-2xl font-light mb-4"
                  style={{
                    color: "rgb(216, 207, 188)",
                    fontFamily: "Playfair Display, serif",
                  }}
                >
                  About Me
                </h3>

                {/* Basic Content */}
                <p
                  className="text-sm leading-relaxed opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ color: "rgb(216, 207, 188)" }}
                >
                  I'm a passionate creative developer with over 5 years of
                  experience in crafting digital experiences.
                </p>

                {/* Expanded Content */}
                <div
                  className={`transition-all duration-500 ${expandedWidget === "about" ? "opacity-100 max-h-96" : "opacity-0 max-h-0"} overflow-hidden`}
                >
                  <div className="mt-4 space-y-4">
                    <div className="border-l-2 border-amber-500/30 pl-4">
                      <h4
                        className="text-sm font-medium mb-2"
                        style={{ color: "rgb(216, 207, 188)" }}
                      >
                        Experience Timeline
                      </h4>
                      <div
                        className="space-y-2 text-xs"
                        style={{ color: "rgb(216, 207, 188)" }}
                      >
                        <div className="opacity-80">
                          2023-Present: Senior Frontend Developer at TechCorp
                        </div>
                        <div className="opacity-80">
                          2021-2023: Full Stack Developer at StartupXYZ
                        </div>
                        <div className="opacity-80">
                          2019-2021: Frontend Developer at DesignStudio
                        </div>
                      </div>
                    </div>

                    <div className="border-l-2 border-amber-500/30 pl-4">
                      <h4
                        className="text-sm font-medium mb-2"
                        style={{ color: "rgb(216, 207, 188)" }}
                      >
                        Philosophy
                      </h4>
                      <p
                        className="text-xs opacity-80 leading-relaxed"
                        style={{ color: "rgb(216, 207, 188)" }}
                      >
                        I believe in creating intuitive, accessible, and
                        performant web experiences that solve real problems and
                        delight users.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* ==================== EXPANDABLE SKILLS SECTION ==================== */}
              <div
                className={`col-span-12 md:col-span-3 rounded-2xl p-6 relative overflow-hidden transition-all duration-500 ${cardHoverClass}`}
                style={{
                  backgroundColor: "rgb(55, 56, 50)",
                  height: expandedWidget === "skills" ? "400px" : "240px",
                }}
                onMouseEnter={() => handleWidgetHover("skills", true)}
                onMouseLeave={() => handleWidgetHover("skills", false)}
              >
                <h3
                  className="text-xl font-light mb-4"
                  style={{
                    color: "rgb(216, 207, 188)",
                    fontFamily: "Playfair Display, serif",
                  }}
                >
                  Skills
                </h3>

                {/* Basic Skills View (5 skills with fade) */}
                <div
                  className={`space-y-3 transition-all duration-500 ${expandedWidget === "skills" ? "opacity-0 max-h-0" : "opacity-100 max-h-40"} overflow-hidden`}
                >
                  {getVisibleSkills().map((skill, index) => (
                    <div
                      key={skill.name}
                      className="flex items-center text-sm transition-all duration-300 hover:translate-x-2"
                      style={{
                        color: "rgb(216, 207, 188)",
                        opacity: skill.opacity,
                      }}
                    >
                      <div className="w-2 h-2 rounded-full mr-3 bg-current opacity-60"></div>
                      {skill.name}
                    </div>
                  ))}
                  {/* Fade indicator */}
                  <div
                    className="text-xs opacity-40 text-center mt-4"
                    style={{ color: "rgb(216, 207, 188)" }}
                  >
                    Hover to see more...
                  </div>
                </div>

                {/* Expanded Skills View */}
                <div
                  className={`transition-all duration-500 ${expandedWidget === "skills" ? "opacity-100 max-h-96" : "opacity-0 max-h-0"} overflow-hidden`}
                >
                  <div className="space-y-3 max-h-80 overflow-y-auto custom-scrollbar">
                    {allSkills.map((skill) => (
                      <div
                        key={skill.name}
                        className="border-l-2 border-amber-500/20 pl-3 pb-2"
                      >
                        <div className="flex justify-between items-center mb-1">
                          <span
                            className="text-sm font-medium"
                            style={{ color: "rgb(216, 207, 188)" }}
                          >
                            {skill.name}
                          </span>
                          <span
                            className="text-xs opacity-60"
                            style={{ color: "rgb(216, 207, 188)" }}
                          >
                            {skill.level}%
                          </span>
                        </div>
                        <div className="w-full h-1 bg-white/10 rounded-full mb-1">
                          <div
                            className="h-full bg-gradient-to-r from-amber-400 to-amber-600 rounded-full transition-all duration-1000"
                            style={{ width: `${skill.level}%` }}
                          ></div>
                        </div>
                        <div
                          className="text-xs opacity-70"
                          style={{ color: "rgb(216, 207, 188)" }}
                        >
                          {skill.description}
                        </div>
                        <div
                          className="text-xs opacity-50 mt-1"
                          style={{ color: "rgb(216, 207, 188)" }}
                        >
                          {skill.category}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* ==================== LOCATION CARD ==================== */}
              <div
                className={`col-span-12 md:col-span-3 h-60 rounded-2xl p-6 flex flex-col justify-center text-center relative overflow-hidden ${cardHoverClass}`}
                style={{ backgroundColor: "rgb(65, 66, 60)" }}
              >
                <div className="text-5xl mb-4 group-hover:animate-bounce transition-all duration-300">
                  🌍
                </div>
                <h3
                  className="text-lg font-light mb-2"
                  style={{
                    color: "rgb(216, 207, 188)",
                    fontFamily: "Playfair Display, serif",
                  }}
                >
                  Based in
                </h3>
                <p
                  className="text-sm opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ color: "rgb(216, 207, 188)" }}
                >
                  San Francisco, CA
                </p>
                <div
                  className="mt-3 text-xs opacity-60 group-hover:opacity-80 transition-opacity duration-300"
                  style={{ color: "rgb(216, 207, 188)" }}
                >
                  UTC-8 (PST)
                </div>

                {/* Decorative Elements */}
                <div className="absolute top-2 right-2 w-3 h-3 rounded-full bg-white/20 animate-pulse"></div>
                <div className="absolute bottom-2 left-2 w-2 h-2 rounded-full bg-white/10"></div>
              </div>

              {/* ==================== EXPANDABLE PROJECTS SECTION ==================== */}
              <div
                className={`col-span-12 md:col-span-8 rounded-2xl p-6 relative overflow-hidden transition-all duration-500 ${cardHoverClass}`}
                style={{
                  backgroundColor: "rgb(75, 76, 70)",
                  height: expandedWidget === "projects" ? "500px" : "240px",
                }}
                onMouseEnter={() => handleWidgetHover("projects", true)}
                onMouseLeave={() => handleWidgetHover("projects", false)}
              >
                <h3
                  className="text-2xl font-light mb-4"
                  style={{
                    color: "rgb(216, 207, 188)",
                    fontFamily: "Playfair Display, serif",
                  }}
                >
                  Recent Work
                </h3>

                {/* Basic Projects View */}
                <div
                  className={`transition-all duration-500 ${expandedWidget === "projects" ? "opacity-0 max-h-0" : "opacity-100 max-h-40"} overflow-hidden`}
                >
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
                            style={{ color: "rgb(216, 207, 188)" }}
                          >
                            {project.name}
                          </div>
                          <div
                            className="text-xs opacity-60 group-hover/project:opacity-80 transition-opacity duration-300"
                            style={{ color: "rgb(216, 207, 188)" }}
                          >
                            {project.tech.slice(0, 2).join(", ")}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div
                    className="text-xs opacity-40 text-center mt-4"
                    style={{ color: "rgb(216, 207, 188)" }}
                  >
                    Hover to explore all projects...
                  </div>
                </div>

                {/* Expanded Projects View */}
                <div
                  className={`transition-all duration-500 ${expandedWidget === "projects" ? "opacity-100 max-h-96" : "opacity-0 max-h-0"} overflow-hidden`}
                >
                  <div className="grid grid-cols-2 gap-4 max-h-80 overflow-y-auto custom-scrollbar">
                    {allProjects.map((project) => (
                      <div
                        key={project.id}
                        className="bg-white/10 rounded-lg p-4 hover:bg-white/20 transition-all duration-300 cursor-pointer group/project"
                      >
                        <div className="w-full h-20 bg-gradient-to-r from-amber-400/20 to-amber-600/20 rounded mb-3 group-hover/project:from-amber-400/40 group-hover/project:to-amber-600/40 transition-all duration-300"></div>
                        <h4
                          className="text-sm font-medium mb-2 group-hover/project:text-amber-300 transition-colors duration-300"
                          style={{ color: "rgb(216, 207, 188)" }}
                        >
                          {project.name}
                        </h4>
                        <p
                          className="text-xs opacity-70 mb-3 leading-relaxed"
                          style={{ color: "rgb(216, 207, 188)" }}
                        >
                          {project.description}
                        </p>
                        <div className="flex flex-wrap gap-1 mb-3">
                          {project.tech.map((tech) => (
                            <span
                              key={tech}
                              className="text-xs px-2 py-1 bg-white/10 rounded"
                              style={{ color: "rgb(216, 207, 188)" }}
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                        <button
                          className="w-full py-2 bg-gradient-to-r from-amber-500/20 to-amber-600/20 text-xs font-medium rounded hover:from-amber-500/40 hover:to-amber-600/40 transition-all duration-300"
                          style={{ color: "rgb(216, 207, 188)" }}
                        >
                          Visit Project →
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* ==================== EXPANDABLE CONTACT SECTION ==================== */}
              <div
                className={`col-span-12 md:col-span-4 rounded-2xl p-6 relative overflow-hidden transition-all duration-500 ${cardHoverClass}`}
                style={{
                  backgroundColor: "rgb(25, 26, 20)",
                  height: expandedWidget === "contact" ? "500px" : "240px",
                }}
                onMouseEnter={() => handleWidgetHover("contact", true)}
                onMouseLeave={() => handleWidgetHover("contact", false)}
              >
                {/* Email Icon */}
                <svg
                  className="absolute top-4 right-4 w-6 h-6 opacity-20 group-hover:opacity-40 transition-opacity duration-300"
                  fill="none"
                  stroke="currentColor"
                  style={{ color: "rgb(216, 207, 188)" }}
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
                    color: "rgb(216, 207, 188)",
                    fontFamily: "Playfair Display, serif",
                  }}
                >
                  Let's Connect
                </h3>

                {/* Basic Contact View */}
                <div
                  className={`space-y-4 transition-all duration-500 ${expandedWidget === "contact" ? "opacity-0 max-h-0" : "opacity-100 max-h-40"} overflow-hidden`}
                >
                  <a
                    href="#"
                    className="block text-sm opacity-80 hover:opacity-100 transition-all duration-300 hover:translate-x-2 group/email"
                    style={{ color: "rgb(216, 207, 188)" }}
                  >
                    <span className="group-hover/email:underline">
                      hello@johndoe.dev
                    </span>
                  </a>
                  <div className="flex space-x-6">
                    {[
                      { name: "Twitter", icon: "🐦" },
                      { name: "GitHub", icon: "💻" },
                      { name: "LinkedIn", icon: "💼" },
                    ].map((social) => (
                      <a
                        key={social.name}
                        href="#"
                        className="text-xs opacity-60 hover:opacity-100 transition-all duration-300 hover:scale-110 hover:-translate-y-1 flex items-center space-x-1"
                        style={{ color: "rgb(216, 207, 188)" }}
                      >
                        <span>{social.icon}</span>
                        <span>{social.name}</span>
                      </a>
                    ))}
                  </div>
                  <div
                    className="mt-4 text-xs opacity-50"
                    style={{ color: "rgb(216, 207, 188)" }}
                  >
                    Usually responds within 24h
                  </div>
                  <div
                    className="text-xs opacity-40 text-center mt-4"
                    style={{ color: "rgb(216, 207, 188)" }}
                  >
                    Hover for contact form...
                  </div>
                </div>

                {/* Expanded Contact View with Form */}
                <div
                  className={`transition-all duration-500 ${expandedWidget === "contact" ? "opacity-100 max-h-96" : "opacity-0 max-h-0"} overflow-hidden`}
                >
                  <ContactForm />

                  {/* Alternative Contact Methods */}
                  <div className="mt-6 pt-4 border-t border-white/10">
                    <h4
                      className="text-sm font-medium mb-3"
                      style={{ color: "rgb(216, 207, 188)" }}
                    >
                      Other ways to reach me
                    </h4>
                    <div
                      className="space-y-2 text-xs"
                      style={{ color: "rgb(216, 207, 188)" }}
                    >
                      <div className="flex items-center opacity-80">
                        <span className="mr-2">📧</span>
                        hello@johndoe.dev
                      </div>
                      <div className="flex items-center opacity-80">
                        <span className="mr-2">📱</span>
                        +1 (555) 123-4567
                      </div>
                      <div className="flex items-center opacity-80">
                        <span className="mr-2">💼</span>
                        LinkedIn: /in/johndoe
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ==================== CUSTOM STYLES ==================== */}
      <style jsx>{`
        /* Custom scrollbar for expanded sections */
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

        /* Animation keyframes */
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </>
  );
};

export default Index;
