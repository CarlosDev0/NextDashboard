import React from "react";

export const ColorContext = React.createContext({
  color: "darkcyan",
  setColor: (string: string) => {}, //Default empty function
});
