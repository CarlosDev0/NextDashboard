"use client";
import { useEffect, useState, useRef } from "react";
import "./getListaTSX.css";
// import GetEmpleado from "../../../app/empleado/getEmpleado";
import GetEmpleado from "../../empleadoTS/getEmpleado";
import ListEmpleados from "../../../components/listEmpleados";
import Search from "../../../components/Search";

// Define type for Empleado (Adjust based on actual API response)
interface Empleado {
  idEmpleado: number;
  nombre: string;
  cedula: string;
  estado: boolean;
}

export default function GetLista() {
  const [data, setData] = useState<Empleado[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [keyword, setKeyword] = useState<string>("");
  const hasFetched = useRef<boolean>(false); // 🛑 Prevents double fetching

  useEffect(() => {
    if (hasFetched.current) return; // If already fetched, exit
    hasFetched.current = true;

    const fetchData = async () => {
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
  }, []);

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
    <div className="App">
      <div className="main-container">
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
          <ListEmpleados empleados={data} />
        </div>
      </div>
    </div>
  );
}
