import React from "react";
import { Link } from "react-router-dom";
import { CoffeeRose } from "../theme";

const HoverEducationPanel: React.FC = () => {
  return (
    <div>
      <h3
        className="text-lg font-semibold mb-2"
        style={{ color: CoffeeRose.mocha }}
      >
        Education
      </h3>

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

      <div className="text-sm text-right mt-4">
        <Link
          to="/education"
          style={{ color: CoffeeRose.dusty }}
          className="underline"
        >
          View full education →
        </Link>
      </div>
    </div>
  );
};

export default HoverEducationPanel;
