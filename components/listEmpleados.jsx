import './listEmpleados.css';
import EmpleadoProfile from './empleadoProfile';

const ListEmpleados = ({ empleados }) => {
	console.log(empleados);
	return (
		<>
			<div>
				<h2></h2>
				<div>
					{empleados && empleados.map((empleado) => (
						<EmpleadoProfile key={empleado.idEmpleado} empleado={empleado} />
					))}
				</div>
			</div>
		</>
	);
}

export default ListEmpleados;