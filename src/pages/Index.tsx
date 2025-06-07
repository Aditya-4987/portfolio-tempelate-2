import { useEffect, useState } from "react";

const Index = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        return prev + Math.random() * 2;
      });
    }, 100);

    return () => clearInterval(timer);
  }, []);

  return (
    <div
      className="min-h-screen w-full overflow-hidden"
      style={{ backgroundColor: "rgb(17, 18, 13)" }}
    >
      {/* Progress Bar */}
      <div
        className="fixed top-0 left-0 h-0.5 z-50 transition-all duration-300 ease-out"
        style={{
          backgroundColor: "rgb(216, 207, 188)",
          width: `${progress}%`,
        }}
      />

      {/* Main Grid Container */}
      <div className="w-full p-[14px] min-h-[700px] max-h-[1050px] h-[800px]">
        <div className="grid grid-cols-12 grid-rows-10 gap-[14px] h-full">
          {/* Header Spacer - Full width, 1 row */}
          <div className="col-span-12 row-span-1" />

          {/* Left Section - 8 columns, 9 rows */}
          <div className="col-span-8 row-span-9 grid grid-cols-8 grid-rows-9 gap-[14px]">
            {/* Empty space top-left - 5 columns, 5 rows */}
            <div className="col-span-5 row-span-5" />

            {/* Portrait Container - 3 columns, 5 rows */}
            <div className="col-span-3 row-span-5 flex items-center justify-center">
              <div
                className="w-full max-w-[420px] aspect-[400/450] rounded-2xl flex items-center justify-center p-[21px]"
                style={{ backgroundColor: "rgb(86, 84, 73)" }}
              >
                {/* Portrait Image Placeholder */}
                <div className="w-full h-full bg-white/10 rounded-xl flex items-center justify-center">
                  <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center">
                    <svg
                      className="w-12 h-12 text-white/40"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Empty space bottom-left - 4 columns, 4 rows */}
            <div className="col-span-4 row-span-4" />

            {/* Empty space bottom-right - 4 columns, 4 rows */}
            <div className="col-span-4 row-span-4" />
          </div>

          {/* Right Section - 4 columns, 9 rows */}
          <div className="col-span-4 row-span-9 grid grid-cols-4 grid-rows-9 gap-[14px]">
            {/* Large empty space - 4 columns, 8 rows */}
            <div className="col-span-4 row-span-8" />

            {/* Small empty space - 4 columns, 1 row */}
            <div className="col-span-4 row-span-1" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
