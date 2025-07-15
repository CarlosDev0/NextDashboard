"use client";
import { useRouter } from "next/navigation";
import "./contact.css";

export default function Contact() {
  const router = useRouter();
  const handleClick = () => {
    router.push("/");
  };
  return (
    <div className="contact-container">
      <h2>📬 Contact Me</h2>
      <ul className="contact-list">
        <li>
          <strong>Name:</strong> Carlos Sánchez
        </li>
        <li>
          <strong>Email:</strong>{" "}
          <a href="mailto:carlossam@gmail.com">carlossan@gmail.com</a>
        </li>
        <li>
          <strong>GitHub:</strong>{" "}
          <a
            href="https://github.com/CarlosDev0"
            target="_blank"
            rel="noopener noreferrer"
          >
            github.com/CarlosDev0
          </a>
        </li>
      </ul>
    </div>
  );
}
