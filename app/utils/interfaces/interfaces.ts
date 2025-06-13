export interface Empleado {
  idEmpleado: string;
  nombre: string;
  cedula: string;
  estado: boolean;
}

export interface ApiResponse<T> {
  response: Response;
  data: T;
}

export interface Question {
  id: number;
  description: string;
  correctAnswer: string;
}

export interface MessageDto {
  from: string;
  text: string;
  receivedat: Date;
}
