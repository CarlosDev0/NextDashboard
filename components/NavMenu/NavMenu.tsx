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
      <ul className={"pen"}>
        {/* === Career Links (Contact, My Portfolio, CV/Resume) === */}
        <li className="liNav">
          <Link className="linkNav" href="/">
            Home
          </Link>
        </li>
        <li className="liNav">
          <Link className="linkNav" href="/portfolio">
            My Portfolio
          </Link>
        </li>
        <li className="liNav">
          <Link className="linkNav" href="/contact">
            Contact
          </Link>
        </li>
        <li className="liNav">
          <Link className="linkNav career-link" href="/CV_5-Carlos_Sanchez.pdf" target="_blank"
          rel="noopener noreferrer" download>
            Download CV
          </Link>
        </li>
        {/* === SEPARATOR to split the two sections === */}
        <li className="liNav separator"></li>
        {/* === SKILL SECTION LABEL === */}
        <li className="liNav skill-label">
          <span>Skill Examples:</span>
        </li>
        <li className="liNav">
          <Link className="linkNav" href="/tasks">
            Tasks
          </Link>
        </li>
        <li className="liNav">
          <Link className="linkNav" href="/statustransaction">
            Status Transaction
          </Link>
        </li>
        <li className="liNav">
          <Link className="linkNav" href="/assessment">
            Assessment
          </Link>
        </li>
        <li className="liNav">
          <Link className="linkNav" href="/email">
            Email
          </Link>
        </li>
        {/* <li className="liNav">
          <Link className="linkNav" href="/whatsapp">
            WhatsApp
          </Link>
        </li> */}
        <li className="liNav">
          <Link className="linkNav" href="/tictactoe/square">
            Tic-tac-toe
          </Link>
        </li>
        <li className="liNav">
          <Link className="linkNav" href="/empleado/listaTS">
            Employee List
          </Link>
        </li>
        <li className="liNav">
          <Link className="linkNav" href="/empleado/newEmployee">
            New Employee
          </Link>
        </li>
        {/* <li className="liNav">
          <Link className="linkNav" href="/optimization">
            Optimization
          </Link>
        </li> */}
      </ul>
    </nav>
  );
};

export default NavMenu;
