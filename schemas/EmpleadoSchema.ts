import * as z from 'zod'

export const EmpleadoSchema = z.object({
    nombre: z.string().min(3, { message: 'Nombre empleado must be 3 or more characters long' }).max(200,
        { message: "Nombre empleado must be 200 or fewer characters long" }),
    Cedula: z.string(),
    password: z.string(),
    username: z.string()
})
export type EmpleadoSchemaType = z.infer<typeof EmpleadoSchema> 