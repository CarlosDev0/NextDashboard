"use client";
import React, { useEffect, useState } from "react";
import { MessageDto } from "../utils/interfaces/interfaces";

export default function page() {
  const [messages, setMessages] = useState<MessageDto[]>([]);

  useEffect(() => {
    fetch("https://apiempleados-kt3g.onrender.com/api/messages")
      .then((res) => res.json())
      .then((data) => setMessages(data));
  }, []);
  return (
    <ul>
      {messages.map((message, i) => (
        <li key={i}>
          <b>{message.from}</b>
          {message.text}
        </li>
      ))}
    </ul>
  );
}
