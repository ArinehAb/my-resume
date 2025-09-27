import React from "react";

const SelfIntroduction: React.FC = () => {
  return (
    <div className="w-full min-h-[40vh] bg-gradient-to-br from-[#FFF8F0] to-[#F5E1DC] font-sans flex items-center border-b border-[#EBDDCB]">
      <div className="container mx-auto max-w-8xl flex items-center">
        {/* Profile Picture */}
        <div className="flex-shrink-0">
          <img
            src="/me.jpeg"
            alt="Profile"
            className="w-96 h-90 rounded-full border-4 border-[#D4A59A] shadow-2xl object-cover"
          />
        </div>

        <div className="ml-16">
          <h1 className="text-6xl font-extrabold tracking-tight text-[#6B3E2E]">
            Hello, I'm{" "}
            <span className="text-[#A76D63]">Arineh Abrahamian</span>
          </h1>

          <h2 className="mt-6 text-3xl text-[#7B4B3A]">Software Engineer</h2>

          <p className="mt-6 text-lg leading-relaxed text-[#3E2723] max-w-3xl italic">
            Believes in the positive influence of teamwork, encourages knowledge
            sharing, and welcomes partnerships. Eager to develop skills while
            working with a team of professionals for a forward-thinking company
            and have an opportunity to influence future technology.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SelfIntroduction;
