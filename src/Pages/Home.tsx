import React from "react";

const Hm: React.FC = () => {
  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>Hello, I'm Arineh Abrahamian 👋</h1>
      <h2>Frontend Developer | React | TypeScript</h2>
      <p>
        Welcome to my resume website! I'm passionate about creating beautiful,
        responsive, and accessible web experiences.
      </p>
      <a
        href="/resume.pdf"
        download
        style={{
          marginTop: "1rem",
          display: "inline-block",
          padding: "0.5rem 1rem",
          backgroundColor: "#007bff",
          color: "#fff",
          textDecoration: "none",
          borderRadius: "4px",
        }}
      >
        Download Resume
      </a>
    </div>
  );
};

export default Hm;
