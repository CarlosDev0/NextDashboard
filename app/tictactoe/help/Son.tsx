import React, { useContext } from "react";
import { ColorContext } from "../square/page";

function Son() {
  const { color } = useContext(ColorContext);
  return (
    <div
      className="mt-6 p-6 rounded-lg shadow-md transition-all duration-300"
      style={{ backgroundColor: color }}
    >
      <h2 className="text-2xl font-bold text-white text-center">
        I am the 'Son' Component
      </h2>
      <p className="text-white text-center mt-2">
        My background color is controlled by the context. The current color is{" "}
        <span className="font-bold">{color}</span>.
      </p>
    </div>
  );
}

export default Son;
