import "./listEmpleados.css";
import EmpleadoProfile from "./employeeProfile/empleadoProfile";
import { Empleado } from "@/app/utils/interfaces/interfaces";

type ListEmpleadosProps = {
  empleados: Empleado[];
  setSelectedIdEmployee: (id: string) => void;
};
const ListEmpleados = ({
  empleados,
  setSelectedIdEmployee,
}: ListEmpleadosProps) => {
  return (
    <div>
      <h2></h2>
      <div>
        {empleados &&
          empleados.map((empleado) => (
            <EmpleadoProfile
              key={empleado.idEmpleado}
              empleado={empleado}
              setSelected={setSelectedIdEmployee}
            />
          ))}
      </div>
    </div>
  );
};

export default ListEmpleados;
