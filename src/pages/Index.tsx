import { useEffect, useState, useRef, useMemo } from "react";

// ==================== TYPE DEFINITIONS ====================

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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // ==================== MEMOIZED THEME ====================

  const theme = useMemo(
    () => colorThemes.find((t) => t.id === currentTheme) || colorThemes[0],
    [currentTheme],
  );

  // ==================== LOADING EFFECT ====================

  useEffect(() => {
    const phases = [
      { duration: 2000, increment: 0.5 },
      { duration: 1500, increment: 1.5 },
      { duration: 1000, increment: 3 },
    ];

    let currentPhase = 0;
    let phaseProgress = 0;

    const timer = setInterval(() => {
      const phase = phases[currentPhase];
      phaseProgress += phase.increment + Math.random() * 1;

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

  // ==================== EVENT HANDLERS ====================

  const handleThemeChange = (themeId: string) => {
    setCurrentTheme(themeId);
    setShowThemeSelector(false);
  };

  const handleWidgetClick = (widgetName: string) => {
    setExpandedWidget(expandedWidget === widgetName ? null : widgetName);
  };

  const closeModal = () => {
    setExpandedWidget(null);
  };

  // ==================== RENDER FUNCTIONS ====================

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

  const renderExpandedContent = (widgetName: string) => {
    const textColor = { color: theme.colors.text };

    switch (widgetName) {
      case "hero":
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-medium mb-4" style={textColor}>
              Our Mission
            </h3>
            <p className="text-sm opacity-80 leading-relaxed" style={textColor}>
              We believe in creating digital experiences that not only look
              beautiful but solve real problems and create meaningful
              connections between brands and their audiences.
            </p>
            <div className="border-l-2 border-amber-500/30 pl-4">
              <h4 className="font-medium mb-3" style={textColor}>
                Our Services
              </h4>
              <ul className="space-y-2 text-sm opacity-80" style={textColor}>
                <li>• Full-stack Web Development</li>
                <li>• UI/UX Design & Prototyping</li>
                <li>• Mobile App Development</li>
                <li>• Design System Creation</li>
                <li>• Performance Optimization</li>
              </ul>
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
              <div className="text-lg font-medium mb-1" style={textColor}>
                John Doe
              </div>
              <div className="text-xs opacity-70 mb-3" style={textColor}>
                Senior Creative Developer
              </div>
            </div>
            <p className="text-sm opacity-80" style={textColor}>
              Passionate about crafting exceptional digital experiences with
              over 8 years of experience in full-stack development and design.
            </p>
          </div>
        );

      default:
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-medium" style={textColor}>
              {widgetName.charAt(0).toUpperCase() + widgetName.slice(1)}
            </h3>
            <p className="text-sm opacity-80" style={textColor}>
              Detailed content for {widgetName} widget.
            </p>
          </div>
        );
    }
  };

  // ==================== LOADING SCREEN ====================

  if (!isLoaded) {
    return (
      <div
        className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden"
        style={{ backgroundColor: theme.colors.background }}
      >
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
              className="text-4xl font-bold mb-4"
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
              className="h-full transition-all duration-300 ease-out rounded-full"
              style={{
                width: `${progress}%`,
                backgroundColor: theme.colors.primary,
              }}
            />
          </div>
        </div>
      </div>
    );
  }

  // ==================== MAIN CONTENT ====================

  if (!showMain) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ backgroundColor: `${theme.colors.background}dd` }}
      >
        <div
          className="text-6xl font-bold animate-fadeIn"
          style={{ color: theme.colors.text }}
        >
          Welcome
        </div>
      </div>
    );
  }

  return (
    <>
      {/* ==================== HEADER ==================== */}
      <header
        className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b border-white/10"
        style={{ backgroundColor: `${theme.colors.background}95` }}
      >
        <nav className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div
            className="text-xl font-bold"
            style={{ color: theme.colors.text }}
          >
            Bentolio
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {["Work", "About", "Skills", "Contact"].map((item) => (
              <button
                key={item}
                onClick={() => handleWidgetClick(item.toLowerCase())}
                className="text-sm hover:opacity-80 transition-opacity duration-200"
                style={{ color: theme.colors.text }}
              >
                {item}
              </button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden w-6 h-6 flex flex-col justify-center space-y-1"
          >
            <span
              className="w-full h-0.5 transition-all duration-300"
              style={{ backgroundColor: theme.colors.text }}
            />
            <span
              className="w-full h-0.5 transition-all duration-300"
              style={{ backgroundColor: theme.colors.text }}
            />
            <span
              className="w-full h-0.5 transition-all duration-300"
              style={{ backgroundColor: theme.colors.text }}
            />
          </button>
        </nav>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div
            className="md:hidden absolute top-full left-0 right-0 border-b border-white/10 backdrop-blur-md"
            style={{ backgroundColor: theme.colors.background }}
          >
            <div className="px-6 py-4 space-y-4">
              {["Work", "About", "Skills", "Contact"].map((item) => (
                <button
                  key={item}
                  onClick={() => {
                    handleWidgetClick(item.toLowerCase());
                    setIsMobileMenuOpen(false);
                  }}
                  className="block w-full text-left text-sm hover:opacity-80 transition-opacity duration-200"
                  style={{ color: theme.colors.text }}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* ==================== MAIN CONTENT GRID ==================== */}
      <main
        className="min-h-screen pt-24 pb-16 px-6"
        style={{ backgroundColor: theme.colors.background }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-12 gap-6 auto-rows-max">
            {/* Hero Widget */}
            <div
              className="col-span-12 md:col-span-8 h-80 rounded-2xl p-8 relative overflow-hidden cursor-pointer transition-all duration-300 hover:scale-105"
              style={{ backgroundColor: theme.colors.hero }}
              onClick={() => handleWidgetClick("hero")}
            >
              <div className="absolute top-4 right-4 w-20 h-20 rounded-full border-2 border-white/10 animate-spin" />
              <div className="absolute bottom-4 left-4 w-16 h-16 rounded-full bg-white/5" />

              <h1
                className="text-5xl font-bold mb-4"
                style={{ color: theme.colors.text }}
              >
                Creative
                <br />
                Developer
              </h1>
              <p
                className="text-lg opacity-80 mb-6 max-w-md"
                style={{ color: theme.colors.text }}
              >
                Crafting exceptional digital experiences through innovative
                design and cutting-edge technology.
              </p>
              <button
                className="px-6 py-3 bg-white/20 backdrop-blur-sm rounded-lg hover:bg-white/30 transition-all duration-300"
                style={{ color: theme.colors.text }}
              >
                View Work
              </button>
            </div>

            {/* Profile Widget */}
            <div
              className="col-span-12 md:col-span-4 h-80 rounded-2xl p-6 relative overflow-hidden cursor-pointer transition-all duration-300 hover:scale-105"
              style={{ backgroundColor: theme.colors.profile }}
              onClick={() => handleWidgetClick("profile")}
            >
              <div className="w-24 h-24 bg-gradient-to-br from-amber-200 to-amber-600 rounded-full flex items-center justify-center mb-4">
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
                style={{ color: theme.colors.text }}
              >
                John Doe
              </h3>
              <p
                className="text-sm opacity-80"
                style={{ color: theme.colors.text }}
              >
                Senior Creative Developer with expertise in React, TypeScript,
                and modern web technologies.
              </p>
            </div>

            {/* Other Widgets */}
            {[
              {
                name: "about",
                title: "About Me",
                span: "col-span-12 md:col-span-6",
                height: "h-60",
              },
              {
                name: "skills",
                title: "Skills",
                span: "col-span-12 md:col-span-3",
                height: "h-60",
              },
              {
                name: "location",
                title: "Location",
                span: "col-span-12 md:col-span-3",
                height: "h-60",
              },
              {
                name: "projects",
                title: "Recent Work",
                span: "col-span-12 md:col-span-8",
                height: "h-60",
              },
              {
                name: "contact",
                title: "Contact",
                span: "col-span-12 md:col-span-4",
                height: "h-60",
              },
            ].map((widget) => (
              <div
                key={widget.name}
                className={`${widget.span} ${widget.height} rounded-2xl p-6 relative overflow-hidden cursor-pointer transition-all duration-300 hover:scale-105`}
                style={{
                  backgroundColor:
                    theme.colors[widget.name as keyof typeof theme.colors],
                }}
                onClick={() => handleWidgetClick(widget.name)}
              >
                <h3
                  className="text-xl font-medium mb-4"
                  style={{ color: theme.colors.text }}
                >
                  {widget.title}
                </h3>
                <p
                  className="text-sm opacity-80"
                  style={{ color: theme.colors.text }}
                >
                  Click to explore {widget.title.toLowerCase()}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Theme Selector */}
        <div className="fixed bottom-6 right-6 z-40">
          {showThemeSelector && (
            <div className="absolute bottom-full right-0 mb-4 p-4 bg-black/80 backdrop-blur-md rounded-2xl border border-white/20">
              <div className="space-y-3">
                {colorThemes.map((themeOption) => (
                  <button
                    key={themeOption.id}
                    onClick={() => handleThemeChange(themeOption.id)}
                    className="flex items-center space-x-3 w-full p-2 rounded-lg hover:bg-white/10 transition-colors duration-200"
                  >
                    <div className="flex space-x-1">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: themeOption.colors.hero }}
                      />
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: themeOption.colors.primary }}
                      />
                    </div>
                    <span className="text-sm text-white">
                      {themeOption.name}
                    </span>
                    {currentTheme === themeOption.id && (
                      <div className="ml-auto w-2 h-2 rounded-full bg-green-400" />
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div
            className="relative w-full max-w-2xl max-h-[90vh] mx-4 rounded-2xl p-8 shadow-2xl overflow-y-auto"
            style={{ backgroundColor: theme.colors.background }}
          >
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/20 hover:bg-black/40 transition-colors duration-200 flex items-center justify-center z-10"
            >
              <svg
                className="w-4 h-4"
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

      {/* ==================== STYLES ==================== */}
      <style>{`
        .animate-fadeIn {
          animation: fadeIn 1s ease-in-out;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
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
}
