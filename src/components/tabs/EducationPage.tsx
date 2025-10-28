import React from "react";

const CoffeeRose = {
  cream:  "#FFF8F0",
  rosewd: "#D4A59A",
  mocha:  "#6B3E2E",
  dusty:  "#A76D63",
  cocoa:  "#7B4B3A",
};

const EducationPage: React.FC = () => {
  return (
    <main className="w-full px-8 py-8 max-w-4xl mx-auto">
      <h1
        className="text-2xl font-semibold mb-6"
        style={{ color: CoffeeRose.mocha }}
      >
        Education
      </h1>

      <div
        className="rounded-lg p-4"
        style={{
          backgroundColor: CoffeeRose.cream,
          border: `1px solid ${CoffeeRose.rosewd}`,
        }}
      >
        <p style={{ color: CoffeeRose.cocoa }}>
          B.S. in Computer Science —{" "}
          <span style={{ color: CoffeeRose.dusty }}>
            California State Polytechnic University, Pomona
          </span>
        </p>
        <p
          className="text-sm opacity-80"
          style={{ color: CoffeeRose.mocha }}
        >
          2016 – 2020
        </p>
      </div>
    </main>
  );
};

export default EducationPage;
