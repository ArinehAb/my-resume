import React from "react";

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 font-sans">
      <div className="container mx-auto max-w-3xl px-6 py-16 text-center">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-blue-700 drop-shadow-md">
          Hello, I'm <span className="text-pink-600">Arineh Abrahamian</span> 👋
        </h1>

        <h2 className="mt-4 text-lg sm:text-xl text-gray-600">
          Frontend Developer <span className="text-gray-400">|</span> React{" "}
          <span className="text-gray-400">|</span> TypeScript
        </h2>

        <p className="mt-6 text-base sm:text-lg leading-7 text-gray-700">
          Welcome to my resume website! I'm passionate about creating{" "}
          <span className="font-semibold text-indigo-600">
            beautiful, responsive, and accessible
          </span>{" "}
          web experiences.
        </p>

        <div className="mt-8 flex justify-center gap-4">
          <a
            href="/resume.pdf"
            download
            className="inline-flex items-center rounded-md bg-blue-600 px-6 py-3 text-lg text-white shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all"
          >
            Download Resume
          </a>
          <button className="inline-flex items-center rounded-md border border-gray-300 bg-white px-6 py-3 text-lg text-gray-700 shadow hover:bg-gray-50 focus:outline-none focus:ring-4 focus:ring-gray-200 transition-all">
            Contact Me
          </button>
        </div>

        {/* Diagnostic boxes to confirm Tailwind grid */}
        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-lg bg-pink-200 p-6 shadow">Box 1</div>
          <div className="rounded-lg bg-green-200 p-6 shadow">Box 2</div>
          <div className="rounded-lg bg-yellow-200 p-6 shadow">Box 3</div>
        </div>

        {/* Spinner to confirm animations */}
        <div className="mt-10 flex justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
