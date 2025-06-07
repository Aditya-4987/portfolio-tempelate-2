import { useEffect, useState } from "react";

const Index = () => {
  const [progress, setProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showMain, setShowMain] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

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

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Helper function for card hover effects
  const cardHoverClass =
    "transform transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:-translate-y-2 cursor-pointer group";
  const buttonHoverClass =
    "relative overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-lg transform hover:-translate-y-1";

  return (
    <>
      {/* Google Fonts */}
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
        {/* Floating Background Elements */}
        <div className="fixed inset-0 pointer-events-none z-0">
          <div
            className="absolute w-96 h-96 rounded-full opacity-5 animate-pulse"
            style={{
              backgroundColor: "rgb(216, 207, 188)",
              left: `${mousePosition.x * 0.02}%`,
              top: `${mousePosition.y * 0.02}%`,
              transform: "translate(-50%, -50%)",
            }}
          />
          <div
            className="absolute w-64 h-64 rounded-full opacity-10"
            style={{
              backgroundColor: "rgb(86, 84, 73)",
              right: `${mousePosition.x * 0.01}%`,
              bottom: `${mousePosition.y * 0.01}%`,
              transform: "translate(50%, 50%)",
            }}
          />
        </div>

        {/* Animated Progress Bar */}
        <div
          className="fixed top-0 left-0 h-1 z-50 transition-all duration-500 ease-out shadow-lg"
          style={{
            backgroundColor: "rgb(216, 207, 188)",
            width: `${progress}%`,
            boxShadow: `0 0 20px rgb(216, 207, 188)`,
          }}
        />

        {/* Loading Screen */}
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
                      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent rounded-xl" />
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

        {/* Main Portfolio Content */}
        <div
          className={`w-full p-[14px] min-h-screen transition-all duration-1000 ${
            showMain ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="grid grid-cols-12 gap-[14px] min-h-screen relative z-10">
            {/* Header Section */}
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
              <div className="flex space-x-8">
                {["ABOUT", "WORK", "CONTACT"].map((item) => (
                  <button
                    key={item}
                    className={`text-sm tracking-wider font-medium ${buttonHoverClass} group`}
                    style={{ color: "rgb(216, 207, 188)" }}
                  >
                    <span className="relative z-10">{item}</span>
                    <div className="absolute inset-0 bg-white/10 transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100 origin-left rounded"></div>
                  </button>
                ))}
              </div>
            </div>

            {/* Main Content Grid */}
            <div className="col-span-12 grid grid-cols-12 gap-[14px] pb-[14px]">
              {/* Hero Section */}
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

                {/* Floating Graphics */}
                <svg
                  className="absolute top-1/2 right-8 w-6 h-6 opacity-20 group-hover:opacity-40 transition-opacity duration-300"
                  fill="currentColor"
                  style={{ color: "rgb(216, 207, 188)" }}
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              </div>

              {/* Profile Card */}
              <div
                className={`col-span-12 md:col-span-4 h-80 rounded-2xl p-6 flex flex-col items-center justify-center text-center relative overflow-hidden ${cardHoverClass}`}
                style={{ backgroundColor: "rgb(45, 46, 40)" }}
              >
                {/* Decorative Background Pattern */}
                <div className="absolute inset-0 opacity-5">
                  <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-transparent via-white/10 to-transparent"></div>
                </div>

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

              {/* About Section */}
              <div
                className={`col-span-12 md:col-span-6 h-60 rounded-2xl p-6 relative overflow-hidden ${cardHoverClass}`}
                style={{ backgroundColor: "rgb(35, 36, 30)" }}
              >
                {/* Decorative Quote Mark */}
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
                <p
                  className="text-sm leading-relaxed opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ color: "rgb(216, 207, 188)" }}
                >
                  I'm a passionate creative developer with over 5 years of
                  experience in crafting digital experiences. I specialize in
                  React, Next.js, and modern web technologies, bringing ideas to
                  life through clean code and beautiful design.
                </p>
              </div>

              {/* Skills Section */}
              <div
                className={`col-span-12 md:col-span-3 h-60 rounded-2xl p-6 relative overflow-hidden ${cardHoverClass}`}
                style={{ backgroundColor: "rgb(55, 56, 50)" }}
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
                <div className="space-y-3">
                  {[
                    "React",
                    "Next.js",
                    "TypeScript",
                    "Tailwind CSS",
                    "Framer Motion",
                  ].map((skill, index) => (
                    <div
                      key={skill}
                      className="flex items-center text-sm opacity-80 group-hover:opacity-100 transition-all duration-300 hover:translate-x-2"
                      style={{
                        color: "rgb(216, 207, 188)",
                        animationDelay: `${index * 0.1}s`,
                      }}
                    >
                      <div className="w-2 h-2 rounded-full mr-3 bg-current opacity-60"></div>
                      {skill}
                    </div>
                  ))}
                </div>

                {/* Progress Bars */}
                <div className="absolute bottom-4 left-6 right-6">
                  <div
                    className="text-xs opacity-60 mb-2"
                    style={{ color: "rgb(216, 207, 188)" }}
                  >
                    Proficiency
                  </div>
                  <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-amber-400 to-amber-600 rounded-full group-hover:animate-pulse"
                      style={{ width: "92%" }}
                    ></div>
                  </div>
                </div>
              </div>

              {/* Location */}
              <div
                className={`col-span-12 md:col-span-3 h-60 rounded-2xl p-6 flex flex-col justify-center text-center relative overflow-hidden ${cardHoverClass}`}
                style={{ backgroundColor: "rgb(65, 66, 60)" }}
              >
                {/* Floating Animation */}
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

                {/* Time Zone */}
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

              {/* Projects Preview */}
              <div
                className={`col-span-12 md:col-span-8 h-60 rounded-2xl p-6 relative overflow-hidden ${cardHoverClass}`}
                style={{ backgroundColor: "rgb(75, 76, 70)" }}
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
                <div className="grid grid-cols-3 gap-4 h-32">
                  {[
                    { name: "E-commerce Platform", tech: "React & Node.js" },
                    { name: "Design System", tech: "Figma & Storybook" },
                    { name: "Mobile App", tech: "React Native" },
                  ].map((project, i) => (
                    <div
                      key={i}
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
                          {project.tech}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* See More Button */}
                <div className="absolute bottom-4 right-6">
                  <button
                    className="text-xs opacity-60 hover:opacity-100 transition-all duration-300 hover:underline"
                    style={{ color: "rgb(216, 207, 188)" }}
                  >
                    View All Projects →
                  </button>
                </div>
              </div>

              {/* Contact */}
              <div
                className={`col-span-12 md:col-span-4 h-60 rounded-2xl p-6 flex flex-col justify-center relative overflow-hidden ${cardHoverClass}`}
                style={{ backgroundColor: "rgb(25, 26, 20)" }}
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
                <div className="space-y-4">
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
                </div>

                {/* Response Time */}
                <div
                  className="mt-4 text-xs opacity-50 group-hover:opacity-70 transition-opacity duration-300"
                  style={{ color: "rgb(216, 207, 188)" }}
                >
                  Usually responds within 24h
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
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
