import { useEffect, useState } from "react";

const Index = () => {
  const [progress, setProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showMain, setShowMain] = useState(false);

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

  return (
    <div
      className="min-h-screen w-full overflow-hidden relative"
      style={{ backgroundColor: "rgb(17, 18, 13)" }}
    >
      {/* Progress Bar */}
      <div
        className="fixed top-0 left-0 h-0.5 z-50 transition-all duration-500 ease-out"
        style={{
          backgroundColor: "rgb(216, 207, 188)",
          width: `${progress}%`,
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
                  style={{ backgroundColor: "rgb(86, 84, 73)" }}
                >
                  <div className="w-full h-full rounded-xl flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-amber-100/20 to-amber-800/30 rounded-xl" />
                    <div className="relative z-10 w-32 h-32 bg-gradient-to-br from-amber-200 to-amber-600 rounded-full flex items-center justify-center shadow-2xl">
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
                className="text-4xl font-light tracking-wider mb-4"
                style={{ color: "rgb(216, 207, 188)" }}
              >
                BENTOLIO
              </div>
              <div
                className="text-sm tracking-widest opacity-60"
                style={{ color: "rgb(216, 207, 188)" }}
              >
                LOADING...
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
        <div className="grid grid-cols-12 gap-[14px] min-h-screen">
          {/* Header Section */}
          <div className="col-span-12 h-20 flex items-center justify-between px-6">
            <div
              className="text-2xl font-light tracking-wide"
              style={{ color: "rgb(216, 207, 188)" }}
            >
              BENTOLIO
            </div>
            <div className="flex space-x-6">
              <button
                className="text-sm tracking-wider hover:opacity-70 transition-opacity"
                style={{ color: "rgb(216, 207, 188)" }}
              >
                ABOUT
              </button>
              <button
                className="text-sm tracking-wider hover:opacity-70 transition-opacity"
                style={{ color: "rgb(216, 207, 188)" }}
              >
                WORK
              </button>
              <button
                className="text-sm tracking-wider hover:opacity-70 transition-opacity"
                style={{ color: "rgb(216, 207, 188)" }}
              >
                CONTACT
              </button>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="col-span-12 grid grid-cols-12 gap-[14px] pb-[14px]">
            {/* Hero Section */}
            <div
              className="col-span-12 md:col-span-8 h-80 rounded-2xl p-8 flex flex-col justify-center"
              style={{ backgroundColor: "rgb(86, 84, 73)" }}
            >
              <h1
                className="text-6xl md:text-8xl font-light mb-4"
                style={{ color: "rgb(216, 207, 188)" }}
              >
                Creative
              </h1>
              <h1
                className="text-6xl md:text-8xl font-light mb-6"
                style={{ color: "rgb(216, 207, 188)" }}
              >
                Developer
              </h1>
              <p
                className="text-lg opacity-80 max-w-md"
                style={{ color: "rgb(216, 207, 188)" }}
              >
                Crafting digital experiences through innovative design and
                development
              </p>
            </div>

            {/* Profile Card */}
            <div
              className="col-span-12 md:col-span-4 h-80 rounded-2xl p-6 flex flex-col items-center justify-center text-center"
              style={{ backgroundColor: "rgb(45, 46, 40)" }}
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
                style={{ color: "rgb(216, 207, 188)" }}
              >
                John Doe
              </h3>
              <p
                className="text-sm opacity-70"
                style={{ color: "rgb(216, 207, 188)" }}
              >
                UI/UX Designer & Developer
              </p>
            </div>

            {/* About Section */}
            <div
              className="col-span-12 md:col-span-6 h-60 rounded-2xl p-6"
              style={{ backgroundColor: "rgb(35, 36, 30)" }}
            >
              <h3
                className="text-2xl font-light mb-4"
                style={{ color: "rgb(216, 207, 188)" }}
              >
                About Me
              </h3>
              <p
                className="text-sm leading-relaxed opacity-80"
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
              className="col-span-12 md:col-span-3 h-60 rounded-2xl p-6"
              style={{ backgroundColor: "rgb(55, 56, 50)" }}
            >
              <h3
                className="text-xl font-light mb-4"
                style={{ color: "rgb(216, 207, 188)" }}
              >
                Skills
              </h3>
              <div className="space-y-2">
                {[
                  "React",
                  "Next.js",
                  "TypeScript",
                  "Tailwind CSS",
                  "Framer Motion",
                ].map((skill) => (
                  <div
                    key={skill}
                    className="text-sm opacity-80"
                    style={{ color: "rgb(216, 207, 188)" }}
                  >
                    {skill}
                  </div>
                ))}
              </div>
            </div>

            {/* Location */}
            <div
              className="col-span-12 md:col-span-3 h-60 rounded-2xl p-6 flex flex-col justify-center text-center"
              style={{ backgroundColor: "rgb(65, 66, 60)" }}
            >
              <div className="text-4xl mb-2">🌍</div>
              <h3
                className="text-lg font-light mb-2"
                style={{ color: "rgb(216, 207, 188)" }}
              >
                Based in
              </h3>
              <p
                className="text-sm opacity-80"
                style={{ color: "rgb(216, 207, 188)" }}
              >
                San Francisco, CA
              </p>
            </div>

            {/* Projects Preview */}
            <div
              className="col-span-12 md:col-span-8 h-60 rounded-2xl p-6"
              style={{ backgroundColor: "rgb(75, 76, 70)" }}
            >
              <h3
                className="text-2xl font-light mb-4"
                style={{ color: "rgb(216, 207, 188)" }}
              >
                Recent Work
              </h3>
              <div className="grid grid-cols-3 gap-4 h-32">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="bg-white/10 rounded-lg hover:bg-white/20 transition-colors cursor-pointer"
                  />
                ))}
              </div>
            </div>

            {/* Contact */}
            <div
              className="col-span-12 md:col-span-4 h-60 rounded-2xl p-6 flex flex-col justify-center"
              style={{ backgroundColor: "rgb(25, 26, 20)" }}
            >
              <h3
                className="text-xl font-light mb-4"
                style={{ color: "rgb(216, 207, 188)" }}
              >
                Let's Connect
              </h3>
              <div className="space-y-3">
                <a
                  href="#"
                  className="block text-sm opacity-80 hover:opacity-100 transition-opacity"
                  style={{ color: "rgb(216, 207, 188)" }}
                >
                  hello@johndoe.dev
                </a>
                <div className="flex space-x-4">
                  {["Twitter", "GitHub", "LinkedIn"].map((social) => (
                    <a
                      key={social}
                      href="#"
                      className="text-xs opacity-60 hover:opacity-100 transition-opacity"
                      style={{ color: "rgb(216, 207, 188)" }}
                    >
                      {social}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
