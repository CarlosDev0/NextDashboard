"use client";
import React, { useState } from "react";
import { ColorContext } from "../square/ColorContext";


export default function ColorProvider({ children }: { children: React.ReactNode }) {
  //const { color, setColor } = useContext(ColorContext);
  const [color, setColor] = useState("darkcyan");

  return (
    <ColorContext.Provider value={{ color, setColor }}>
      {children}
    </ColorContext.Provider>
  );
}
