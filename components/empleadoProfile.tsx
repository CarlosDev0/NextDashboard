import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { empleadoTemplate } from "./componentsDto";
import { getDetailEmpleado } from "@/app/api/get-detail-empleado";
import { DetailEmpleadoDto } from "@/app/api/dto/detailEmpleadoDto";
/*import FormField from "./form/FormField";*/
/*import { Grid } from "semantic-ui-react";*/

const EmpleadoProfile = ({
  empleado,
  setSelected,
}: {
  empleado: empleadoTemplate;
  setSelected: (idEmpleado: string) => void;
}) => {
  if (!empleado || !empleado.cedula) {
    return <p>Invalid employee data</p>; // Handle cases where empleado is undefined
  }
  const [selectedOCList, setSelectedOC] = useState<DetailEmpleadoDto[]>([]);

  // let forecasts = [];
  // const obj = {
  //   date: "1",
  //   temperaturec: "200",
  //   temperaturef: "300",
  //   summary: "high",
  // };
  // forecasts.push(obj);
  useEffect(() => {
    if (selectedOCList) {
      const timer = setTimeout(() => {
        setSelectedOC([]);
      }, 10000);
      return () => clearTimeout(timer);
    }
  }, [selectedOCList]);
  async function showDetails(idEmpleado: string) {
    console.log("empleadoProfile.tsx L35: " + idEmpleado);
    //fetch data from server.
    try {
      const currentDetail = await getDetailEmpleado(idEmpleado);
      setSelectedOC(currentDetail);
    } catch (error) {
      return null;
    }

    // const objSelected: IPurchaseOrder = {
    //   createdDate: "99",
    //   name: 8,
    //   description: "j",
    //   id: "71776428",
    // };
    // setSelectedOC(objSelected);

    // if (currentDetail.idEmpleado) {
    //   //if (cedula != objSelected.id) {
    //   alert("No details available for current user");
    // }
  }

  let id = empleado.cedula.slice(-1);
  const url =
    "" + "https://rickandmortyapi.com/api/character/avatar/" + id + ".jpeg";

  return (
    <>
      <div className="profile">
        <div className="info">
          <div className="picFrame">
            <img className="pic" src={url} alt="{empleado.nombre}" />
          </div>

          <div className="basicData">
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
            onClick={() => setSelected(empleado.idEmpleado)} //onClick={() => showDetails(empleado.idEmpleado)}
          >
            Details
          </button>
        </div>
      </div>
    </>
  );
};

export default EmpleadoProfile;

export interface IPurchaseOrder {
  createdDate: string;
  name: number;
  id: string;
  description: string;
}
