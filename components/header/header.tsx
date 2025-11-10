"use client";
import React, { useContext } from "react";
import "./header.css";
import { ColorContext } from "@/app/tictactoe/square/ColorContext";



const header = () => {
   const { color } = useContext(ColorContext);
  return (
    <div className="mainHeader" style={{ backgroundColor: color }}>
      <center>
        <img src={"/logo.png"} className="mr-3 h-6 sm:h-9" alt="logo" />
        My Sample App
      </center>
    </div>
  );
};

export default header;
