'use server'
import { useState } from "react";
import { EmpleadoSchema, EmpleadoSchemaType } from "../../schemas/EmpleadoSchema"

export const createEmployee = async (values) => {
    /*const [error, setError] = useState(null);*/

    let originalRequest = async (url, values) => {
        let token = 'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiIxIiwidW5pcXVlX25hbWUiOiJjYXJsb3MiLCJuYmYiOjE3MzU2NTQ2MjUsImV4cCI6MTczNTc0MTAyNSwiaWF0IjoxNzM1NjU0NjI1fQ.WDA5VxSEhjpTNDHViOvDi42c-4dkfvDWiZjslol8FZV5lqt40lgERgl6an-TRileLS_YGplPzb7vunDFVTEl6g';
        let response = await fetch(url, {
            method: "POST",
            mode: "cors",
            cache: "no-cache",
            credentials: "same-origin",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            redirect: "follow",
            referrerPolicy: "no-referrer",
            body: JSON.stringify({
                nombre: values.nombre,
                cedula: values.Cedula,
                password: values.password,
                username: values.username
            })
        })
        let data = await response.json();
        /*console.log('Before request_6');*/
        /*return { response, data }*/
        return { success: 'Employee Created' };
    }
    const validatedFields = EmpleadoSchema.safeParse(values)
    if (!validatedFields.success) {
        return {error: 'Invalid fields'}
    }
    const { nombre } = validatedFields.data
    try {
        let url = "http://localhost:5178/api/User/Register";
        console.log('Before request_5');
        let { response, data } = await originalRequest(url, values)
        return { success: 'Employee Created' };
    } catch (error) {
        
        console.log('POST request failed:', error);
        return { error: 'Server error!' };
    }
    
    console.log('values:', values);
}