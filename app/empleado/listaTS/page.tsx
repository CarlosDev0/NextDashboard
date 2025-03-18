"use client";
import { useEffect, useState, useRef } from "react";
import "./listaTS.css";
// import GetEmpleado from "../../../app/empleado/getEmpleado";
import GetEmpleado from "../empleadoTS/getEmpleado";
import ListEmpleados from "../../../components/listEmpleados";
import Search from "../../../components/Search";
import DetalleEmpleado from "@/components/detalleempleado/DetalleEmpleado";
import { Empleado } from "@/app/utils/interfaces/interfaces";

// Define type for Empleado (Adjust based on actual API response)

export default function GetLista() {
  const [data, setData] = useState<Empleado[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [keyword, setKeyword] = useState<string>("");
  const hasFetched = useRef<boolean>(false); // 🛑 Prevents double fetching
  const [selectedIdEmployee, setSelectedIdEmployee] = useState<string | null>(
    null
  );

  useEffect(() => {
    if (hasFetched.current) return; // If already fetched, exit
    hasFetched.current = true;

    const fetchData = async () => {
      console.log("listaTS l30");
      try {
        const employees = await GetEmpleado();
        setData(employees);
      } catch (error) {
        setError((error as Error).message); // Type assertion for error
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []); //[] Runs only on the first render

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const filterEmpleados = () => {
    const filteredEmpleados = data.filter((empleado) =>
      keyword === ""
        ? true
        : empleado.nombre.toLowerCase().includes(keyword.toLowerCase())
    );
    setData(filteredEmpleados);
  };

  return (
    <div className="page-layout">
      <aside className="left-panel">
        <h3>Left Panel</h3>
      </aside>

      <main className="main-container">
        <header>
          <h1 className="heading">Employee List</h1>
          <h3>A Simple Employee List with React and Next.js</h3>
        </header>
        <div className="nombre01">
          <span>You need to run ApiEmpleados on .NET</span>
          <ul className="ratings">{/* Placeholder for future content */}</ul>
        </div>
        <div className="App">
          <Search
            setKeyword={setKeyword}
            keyword={keyword}
            filterEmpleados={filterEmpleados}
          />
          <ListEmpleados
            empleados={data}
            setSelectedIdEmployee={setSelectedIdEmployee}
          />
        </div>
      </main>

      <aside className="right-panel">
        <div className="info-box">
          <DetalleEmpleado idEmpleado={selectedIdEmployee || ""} />
        </div>
        <div className="info-box">
          <h3>Company Updates</h3>
          <p>Latest news and updates about employees...</p>
        </div>
      </aside>
    </div>
  );
}
