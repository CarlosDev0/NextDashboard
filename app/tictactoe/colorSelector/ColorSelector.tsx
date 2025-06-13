import React, { useContext } from "react";
import { ColorContext } from "../square/page";

function ColorSelector() {
  // 2. Access the `setColor` function from the context.
  const { setColor } = useContext(ColorContext);
  const colors = ["#3b82f6", "#22c55e", "#ef4444", "#f97316", "#8b5cf6"];

  return (
    <div className="mt-6 p-4 bg-gray-100 rounded-lg shadow-inner">
      <h3 className="text-lg font-semibold text-gray-700 text-center mb-3">
        Change Context Color
      </h3>
      <div className="flex justify-center gap-3">
        {colors.map((c) => (
          <button
            key={c}
            onClick={() => setColor(c)}
            className="w-12 h-12 rounded-full shadow-md transition-transform transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800"
            style={{ backgroundColor: c }}
            aria-label={`Set color to ${c}`}
          />
        ))}
      </div>
    </div>
  );
}

export default ColorSelector;
