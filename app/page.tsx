import AcmeLogo from "@/app/ui/acme-logo";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { lusitana } from "@/app/ui/fonts";
import Image from "next/image";
import "./ui/global.css";
//import { Provider} from '@react-redux';
import { store } from "./redux/counter/store";

export default function Page() {
  return (
    <main className="flex flex-col items-center justify-center px-4 py-10 text-center">
      <h1 className="text-4xl font-bold mb-4">
        👋 Hello, I'm Carlos Alberto Sanchez
      </h1>

      <p className="text-lg max-w-2xl mb-6">
        Welcome to my personal sample application. This project was built to
        demonstrate my knowledge and skills as a full-stack developer using
        modern web technologies. It’s intended as a live portfolio to accompany
        my resume and provide potential employers with a practical showcase of
        my work.
      </p>

      <section className="bg-white shadow-lg rounded-xl p-6 w-full max-w-3xl mb-6 text-left">
        <h2 className="text-2xl font-semibold mb-2">🧠 About the Project</h2>
        <ul className="list-disc pl-5 space-y-1">
          <li>
            <strong>Frontend:</strong> Built with React and Next.js, deployed on{" "}
            <a
              href="https://vercel.com"
              target="_blank"
              className="text-blue-600 underline"
            >
              Vercel
            </a>
            .
          </li>
          <li>
            <strong>URL:</strong>{" "}
            <a
              href="https://nextdashboard-gules.vercel.app/"
              target="_blank"
              className="text-blue-600 underline"
            >
              https://nextdashboard-gules.vercel.app/
            </a>
          </li>
          <li>
            <strong>Backend:</strong> Developed with ASP.NET Core (.NET), hosted
            on{" "}
            <a
              href="https://render.com"
              target="_blank"
              className="text-blue-600 underline"
            >
              Render.com
            </a>{" "}
            using Docker.
          </li>
          <li>
            <strong>Backend URL:</strong>{" "}
            <a
              href="https://apiempleados-kt3g.onrender.com"
              target="_blank"
              className="text-blue-600 underline"
            >
              https://apiempleados-kt3g.onrender.com
            </a>
          </li>
          <li>
            <strong>Database:</strong> Hosted in Microsoft Azure.
          </li>
        </ul>
      </section>

      <section className="bg-white shadow-lg rounded-xl p-6 w-full max-w-3xl text-left">
        <h2 className="text-2xl font-semibold mb-2">👨‍💻 Features</h2>
        <ul className="list-disc pl-5 space-y-1">
          <li>The React application uses ReactRedux to handle states</li>
          <li>Employee list view with key information</li>
          <li>Detailed view for each employee</li>
          <li>Clean, responsive UI for desktop and mobile</li>
          <li>Backend API (C#) integration with real-time data fetching</li>
          <li>Sample full-stack architecture for demonstration purposes</li>
          <li>Tic-Tac shows the use of useContext</li>
          <li>Tasks shows the use of useRef, useEffect, useReducer and custom Hook to store in Local Storage</li>
          <li>
            Changes are uploaded into GitHub Development branch and merged into
            main branch{" "}
          </li>
        </ul>
      </section>
    </main>
  );
}
