import React from "react";

export const ColorContext = React.createContext({
  color: "gray",
  setColor: (string: string) => {}, //Default empty function
});
