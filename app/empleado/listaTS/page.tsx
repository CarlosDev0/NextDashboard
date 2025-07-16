"use client";
import { useEffect, useState, useRef } from "react";
import "./listaTS.css";
import GetEmpleado from "../empleadoTS/getEmpleado";
import ListEmpleados from "../../../components/listEmpleados";
import Search from "../../../components/search/Search";
import DetalleEmpleado from "@/components/detalleempleado/DetalleEmpleado";
import { Empleado } from "@/app/utils/interfaces/interfaces";

export default function GetLista() {
  const [allData, setAllData] = useState<Empleado[]>([]); // original
  const [filteredData, setFilteredData] = useState<Empleado[]>([]);
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
      try {
        const employees = await GetEmpleado();
        setAllData(employees);
        setFilteredData(employees);
      } catch (error) {
        setError((error as Error).message); // Type assertion for error
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []); //[] Runs only on the first render

  if (loading) {
    return (
      <main className="main-container">
        <p className="loading">Loading employees...</p>
      </main>
    );
  }
  if (error) {
    return (
      <main className="main-container">
        <p className="error">Error loading data: {error}</p>
      </main>
    );
  }

  const filterEmpleados = () => {
    const filteredEmpleados = allData.filter((empleado) =>
      keyword === ""
        ? true
        : empleado.nombre.toLowerCase().includes(keyword.toLowerCase())
    );
    setFilteredData(filteredEmpleados);
  };

  return (
    <div className="page-layout">
      <aside className="left-panel">
        <h3>Description</h3>
        <h4>
          This module hit the API (developed using .NET) to get the employee
          list.
        </h4>
        <h4>The API has an authentication using Jason web Token.</h4>
        <h4>
          When the user click on Detail, a new request is sent to the API.
        </h4>
      </aside>

      <main className="main-container">
        <header>
          <h1 className="heading">Employee List</h1>
          <h3>
            This module fetch records from the backend to show a list. You can
            use the Details to hit the backend.
          </h3>
        </header>
        <div className="description">
          <span>
            The backend API build with .NET is getting records from the Azure
            Database
          </span>
          <ul className="ratings">{/* Placeholder for future content */}</ul>
        </div>
        <div className="App">
          <Search
            setKeyword={setKeyword}
            keyword={keyword}
            filterEmpleados={filterEmpleados}
          />
          <ListEmpleados
            empleados={filteredData}
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
