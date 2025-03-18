import axiosServices from "../utils/axios";
import { ListEndpoints } from "./consts";
import { DetailEmpleadoDto } from "./dto/detailEmpleadoDto";

export const getDetailEmpleado = async (
  idEmpleado: string
): Promise<DetailEmpleadoDto[]> => {
  const res = await axiosServices.get<DetailEmpleadoDto[]>(
    `${ListEndpoints.Empleados.GetDetailEmpleado}?idEmployee=${idEmpleado}`
  );

  return res.data;
};
