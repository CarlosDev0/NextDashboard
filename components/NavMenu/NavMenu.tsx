"use client";
import Link from "next/dist/client/link";
import { useState } from "react";
import "./NavMenu.css";

//export default function NewEmpleado() {
const NavMenu = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <nav>
      <div
        className="menu"
        onClick={() => {
          setMenuOpen(!menuOpen);
        }}
      ></div>
      <ul>
        <ul className={menuOpen ? "pen" : ""}></ul>
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/empleado/lista/getlista">Employee List</Link>
        </li>
        <li>
          <Link href="/buttons">Buttons</Link>
        </li>
        <li>
          <Link href="/empleado/Registrar/newEmpleado">New Employee</Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavMenu;
