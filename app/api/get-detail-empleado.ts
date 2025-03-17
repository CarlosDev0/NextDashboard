import axiosServices from "../utils/axios";
import { ListEndpoints } from "./consts";
import { DetailEmpleadoDto } from "./dto/detailEmpleadoDto";

export const getDetailEmpleado = async (
  idEmpleado: string
): Promise<DetailEmpleadoDto> => {
  // let token =
  //   "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiIxIiwidW5pcXVlX25hbWUiOiJjYXJsb3MiLCJuYmYiOjE3MzU2NTQ2MjUsImV4cCI6MTczNTc0MTAyNSwiaWF0IjoxNzM1NjU0NjI1fQ.WDA5VxSEhjpTNDHViOvDi42c-4dkfvDWiZjslol8FZV5lqt40lgERgl6an-TRileLS_YGplPzb7vunDFVTEl6g";
  // let url = "http://localhost:5178/api/Empleado/getEmpleados";
  // let url = "https://apiempleados-kt3g.onrender.com/api/Empleado/getEmpleados";
  //let url = "https://apiempleados-kt3g.onrender.com/api";
  //   let url = "http://localhost:5178/api";
  //   url = url + `${ListEndpoints.Empleados.GetDetailEmpleado}`;
  const res = await axiosServices.get<DetailEmpleadoDto>(
    `${ListEndpoints.Empleados.GetDetailEmpleado}?idEmployee=${idEmpleado}`
  );

  return res.data;
};
