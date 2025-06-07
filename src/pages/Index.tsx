import { useEffect, useState, useRef, useMemo } from "react";

// ==================== MINIMAL COMPONENT FOR DEBUGGING ====================

export default function Index() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Simple loading effect
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-4xl font-bold mb-8">Bentolio Portfolio</h1>
      <p className="text-lg">
        Minimal version to test for infinite re-render issues.
      </p>
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-2">Hero Section</h2>
          <p>Content placeholder</p>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-2">Profile Section</h2>
          <p>Content placeholder</p>
        </div>
      </div>
    </div>
  );
}
