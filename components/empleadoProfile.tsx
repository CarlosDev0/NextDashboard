import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { empleadoTemplate } from "./componentsDto";
/*import FormField from "./form/FormField";*/
/*import { Grid } from "semantic-ui-react";*/

const EmpleadoProfile = ({ empleado }: { empleado: empleadoTemplate }) => {
  if (!empleado || !empleado.cedula) {
    return <p>Invalid employee data</p>; // Handle cases where empleado is undefined
  }
  const [selectedOC, setSelectedOC] = useState<IPurchaseOrder | undefined>(
    undefined
  );

  let forecasts = [];
  const obj = {
    date: "1",
    temperaturec: "200",
    temperaturef: "300",
    summary: "high",
  };
  forecasts.push(obj);
  useEffect(() => {
    if (selectedOC) {
      const timer = setTimeout(() => {
        setSelectedOC(undefined);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [selectedOC]);
  function showDetails(cedula: string) {
    //fetch data from server.
    const objSelected: IPurchaseOrder = {
      createdDate: "99",
      name: 8,
      description: "j",
      id: "71776428",
    };

    setSelectedOC(objSelected);

    if (cedula != objSelected.id) {
      alert("No details available for current user");
    }
  }

  let id = empleado.cedula.slice(-1);
  const url =
    "" + "https://rickandmortyapi.com/api/character/avatar/" + id + ".jpeg";

  return (
    <div className="profile">
      <div className="info">
        <div className="picFrame">
          <img className="pic" src={url} alt="{empleado.nombre}" />
        </div>

        <div>
          <h2>{empleado.nombre}</h2>
          <p className="status-species">
            <span className="status">{empleado.cedula}</span>
          </p>
          <p className="gender">
            <span className="desc">{empleado.cedula}</span>
          </p>
        </div>
      </div>
      <div className="detail">
        <button
          className="buttonDetail"
          type="submit"
          onClick={() => showDetails(empleado.cedula)}
        >
          Details
        </button>
        <div hidden={!selectedOC || !(selectedOC?.id == empleado.cedula)}>
          <div>
            <table className="table table-striped" aria-labelledby="tabelLabel">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Temp. (C)</th>
                  <th>Temp. (F)</th>
                  <th>Summary</th>
                </tr>
              </thead>
              <tbody>
                {forecasts.map((forecast) => (
                  <tr key={forecast.date}>
                    <td>{forecast.date}</td>
                    <td>{forecast.temperaturec}</td>
                    <td>{forecast.temperaturef}</td>
                    <td>{forecast.summary}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmpleadoProfile;

export interface IPurchaseOrder {
  createdDate: string;
  name: number;
  id: string;
  description: string;
}
