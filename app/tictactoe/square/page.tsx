"use client";
import React, { useState } from "react";
import Son from "../help/Son";
import styles from "./square.module.scss";
import ColorSelector from "../colorSelector/ColorSelector";

export const ColorContext = React.createContext({
  color: "gray",
  setColor: (string: string) => {}, //Default empty function
});

export default function Board() {
  // Create an array of 9 elements for 3x3 grid
  //_ is a placeholder for the current element (which is undefined here, so we ignore it).
  //i is the current index (from 0 to 8).
  //i + 1 turns the indices into numbers from 1 to 9.
  //This is the Array: [1, 2, 3, 4, 5, 6, 7, 8, 9]

  const [color, setColor] = useState("#3b82f6");
  const buttons = Array.from({ length: 9 }, (_, i) => i + 1);
  return (
    //Context.Provider component must have a value prop.
    //by passing the object {color, setColor} we allow child components to read and update
    <ColorContext.Provider value={{ color, setColor }}>
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 font-sans">
        <div className="w-full max-w-md mx-auto bg-white rounded-xl shadow-lg p-6">
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-4">
            React Context Demo
          </h1>

          {/* Grid Container */}
          <div className="grid grid-cols-3 gap-3">
            <div className={styles.gridContainer}>
              {buttons.map((num) => (
                <button
                  key={num}
                  className={styles.squareButton}
                  style={{ color: color }}
                >
                  {num}
                </button>
              ))}
            </div>
          </div>
          <div>
            {/* This component will change the context value */}
            <ColorSelector />
            <Son />
          </div>
        </div>
      </div>
    </ColorContext.Provider>
  );
}
