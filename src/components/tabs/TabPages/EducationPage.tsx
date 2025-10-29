import React from "react";
import { Link } from "react-router-dom";

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
      {/* Header row with Back button + title */}
      <div className="flex items-center justify-between mb-6">
        <Link
          to="/"
          className="text-sm font-medium px-3 py-2 rounded-md border"
          style={{
            color: CoffeeRose.mocha,
            borderColor: CoffeeRose.rosewd,
            backgroundColor: CoffeeRose.cream,
          }}
        >
          ← Back
        </Link>

        <h1
          className="text-2xl font-semibold"
          style={{ color: CoffeeRose.mocha }}
        >
          Education
        </h1>

        {/* spacer to balance flex so title stays centered */}
        <div className="w-[60px]" />
      </div>

      {/* Glendale Community College */}
      <div
        className="rounded-lg p-4 mb-4"
        style={{
          backgroundColor: CoffeeRose.cream,
          border: `1px solid ${CoffeeRose.rosewd}`,
        }}
      >
        <p style={{ color: CoffeeRose.cocoa }}>
          A.A. in Computer Science —{" "}
          <span style={{ color: CoffeeRose.dusty }}>
            Glendale Community College
          </span>
        </p>
        <p
          className="text-sm opacity-80"
          style={{ color: CoffeeRose.mocha }}
        >
          2014 – 2016
        </p>
      </div>

      {/* Cal Poly Pomona */}
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
