// src/Pages/Hm.tsx
import React from "react";

const HomePage: React.FC = () => {
  return (
    <div className="container mx-auto max-w-3xl px-6 py-10 font-sans">
      <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
        Hello, I'm Arineh Abrahamian 👋
      </h1>

      <h2 className="mt-2 text-lg sm:text-xl text-gray-600">
        Frontend Developer | React | TypeScript
      </h2>

      <p className="mt-4 text-base leading-7 text-gray-700">
        Welcome to my resume website! I'm passionate about creating beautiful,
        responsive, and accessible web experiences.
      </p>

      <a
        href="/resume.pdf"
        download
        className="mt-6 inline-flex items-center rounded-md bg-blue-600 px-4 py-2 text-white shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Download Resume
      </a>
    </div>
  );
};

export default HomePage;
