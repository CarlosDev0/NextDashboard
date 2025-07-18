import React, { useEffect, useState } from "react";
import "./DetalleEmpleado.css";
import { DetailEmpleadoDto } from "@/app/api/dto/detailEmpleadoDto";
import { getDetailEmpleado } from "@/app/api/get-detail-empleado";
import SvgComponent from "../svg/Empty";

type DetailEmployeeProp = {
  idEmpleado: string;
};
export default function DetalleEmpleado({ idEmpleado }: DetailEmployeeProp) {
  const [selectedOCList, setSelectedOC] = useState<DetailEmpleadoDto[]>([]);
  //fetch data from server.
  useEffect(() => {
    const fetchData = async () => {
      try {
        const currentDetail = await getDetailEmpleado(idEmpleado);
        setSelectedOC(currentDetail);
      } catch (error) {
        return null;
      }
    };
    fetchData();
  }, [idEmpleado]);
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-GB").format(date); // "en-GB" outputs "dd/mm/yyyy"
  };
  return (
    <div className="component-container">
      <center>
        <h4 className="title-info">DETAIL EMPLOYEE</h4>
      </center>
      <div className="detail"></div>
      <div className="wcCard">
        <div className="at-rw">
          <div className="content-main">
            <div
              hidden={!(selectedOCList.length > 0)} //hidden={!selectedOC || !(selectedOC?.idEmpleado == empleado.cedula)}
            >
              <div>
                <table
                  className="table table-striped"
                  aria-labelledby="tabelLabel"
                >
                  <thead>
                    <tr>
                      <th>Id</th>
                      <th>Start</th>
                      <th>End</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedOCList?.map((selectedOC) => (
                      <tr key={selectedOC?.idRegistro}>
                        <td>{selectedOC?.idRegistro}</td>
                        <td>{formatDate(selectedOC?.inicio.toString())}</td>
                        <td>{formatDate(selectedOC?.fin.toString())}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <span></span>
            <div hidden={!(selectedOCList.length == 0)}>
              <SvgComponent />
              <p>No records</p>
            </div>
            <div hidden={selectedOCList.length == 0}>
              Total records: {selectedOCList.length}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
