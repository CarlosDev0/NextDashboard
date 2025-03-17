import { ListEndpoints } from "../../api/consts";

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
  const baseURL = process.env.NEXT_PUBLIC_API_URL;
  const tokenAPI = process.env.NEXT_PUBLIC_API_KEY;

  const url = baseURL + `${ListEndpoints.Empleados.ListEmpleados}`;
  const config: RequestInit = {
    headers: {
      Authorization: `Bearer ${tokenAPI}`,
      mode: "cors",
      "Access-Control-Allow-Origin": "*", // Use cautiously
    } as HeadersInit,
  };
  let { response, data } = await originalRequest<Empleado[]>(url, config);

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
