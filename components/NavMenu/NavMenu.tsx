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
      {/* <ul> */}
      <ul className={"pen"}>
        {/* <ul className={menuOpen ? "pen" : ""}> */}
        {/* </ul> */}
        <li className="liNav">
          <Link className="linkNav" href="/">
            Home
          </Link>
        </li>
        <li className="liNav">
          {/* <Link href="/empleado/lista/getlista">Employee List</Link> */}
          {/* <Link href="/app/listaTS/getLista">Employee List</Link> */}
          <Link className="linkNav" href="/empleado/listaTS">
            Employee List
          </Link>
        </li>
        {/* <li className="liNav">
          <Link className="linkNav" href="/buttons">
            Buttons
          </Link>
        </li> */}
        <li className="liNav">
          <Link className="linkNav" href="/empleado/newEmployee">
            New Employee
          </Link>
        </li>
        <li className="liNav">
          <Link className="linkNav" href="/contact">
            Contact
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
          <Link className="linkNav" href="/tasks">
            Tasks
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavMenu;
