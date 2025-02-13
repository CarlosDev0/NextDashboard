'use server';
import { EmpleadoSchema, EmpleadoSchemaType } from "../../schemas/EmpleadoSchema";


export const createPost = async (values: EmpleadoSchemaType) => {
    let token = 'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiIxIiwidW5pcXVlX25hbWUiOiJjYXJsb3MiLCJuYmYiOjE3MzU2NTQ2MjUsImV4cCI6MTczNTc0MTAyNSwiaWF0IjoxNzM1NjU0NjI1fQ.WDA5VxSEhjpTNDHViOvDi42c-4dkfvDWiZjslol8FZV5lqt40lgERgl6an-TRileLS_YGplPzb7vunDFVTEl6g';
    console.log(values);
    let originalRequest = async (url: string | URL | Request) => {
        let response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify({
                body: values,
                userId: 1
            }),
            headers: {
                'Content-type': 'application/json',
                 Authorization: `Bearer ${token}`,
                mode: 'cors',
                crossOrigin: 'use-credentials'
            } 
        });
        let data = await response.json();
        return { response, data };
    };
    const validatedFields = EmpleadoSchema.safeParse(values);
    if (!validatedFields.success) {
        return { error: 'Invalid fields' };
    }
    const { nombre } = validatedFields.data;
    try {
        //let token = 'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiIxIiwidW5pcXVlX25hbWUiOiJjYXJsb3MiLCJuYmYiOjE3MzU2NTQ2MjUsImV4cCI6MTczNTc0MTAyNSwiaWF0IjoxNzM1NjU0NjI1fQ.WDA5VxSEhjpTNDHViOvDi42c-4dkfvDWiZjslol8FZV5lqt40lgERgl6an-TRileLS_YGplPzb7vunDFVTEl6g';
        let url = "http://localhost:5178/api/User/Register";
        //let config = {};
        //config = {
        //    Authorization: `Bearer ${token}`,
        //    mode: 'cors',
        //    crossOrigin: 'use-credentials'
        //};
        console.log('Before request__879');
        let { response, data } = await originalRequest(url);

    } catch (error) {
    }

    console.log('values:', values);
};
