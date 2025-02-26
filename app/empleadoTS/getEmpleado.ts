import { ListEndpoints } from "../api/consts";

interface ApiResponse<T> {
  response: Response;
  data: T;
}
interface Empleado {
  idEmpleado: number;
  nombre: string;
  cedula: string;
  estado: boolean;
}
const GetEmpleado = async (): Promise<Empleado[]> => {
  let token =
    "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiIxIiwidW5pcXVlX25hbWUiOiJjYXJsb3MiLCJuYmYiOjE3MzU2NTQ2MjUsImV4cCI6MTczNTc0MTAyNSwiaWF0IjoxNzM1NjU0NjI1fQ.WDA5VxSEhjpTNDHViOvDi42c-4dkfvDWiZjslol8FZV5lqt40lgERgl6an-TRileLS_YGplPzb7vunDFVTEl6g";
  //let url = "http://localhost:5178/api/Empleado/getEmpleados";
  // let url = "https://apiempleados-kt3g.onrender.com/api/Empleado/getEmpleados";
  let url =
    "https://apiempleados-kt3g.onrender.com/api" +
    `${ListEndpoints.Empleados.ListEmpleados}`;
  const config: RequestInit = {
    headers: {
      Authorization: `Bearer ${token}`,
      mode: "cors",
      "Access-Control-Allow-Origin": "*", // Use cautiously
    } as HeadersInit,
  };
  //console.log(url);
  let { response, data } = await originalRequest<Empleado[]>(url, config);
  //   console.log("After request");
  return data;
};

const originalRequest = async <T>(
  url: string,
  config: RequestInit
): Promise<ApiResponse<T>> => {
  const response = await fetch(url, config);
  const data: T = await response.json();
  return { response, data };
};

export default GetEmpleado;
