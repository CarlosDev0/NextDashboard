let GetEmpleado = async () => {
    let token = 'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiIxIiwidW5pcXVlX25hbWUiOiJjYXJsb3MiLCJuYmYiOjE3MzU2NTQ2MjUsImV4cCI6MTczNTc0MTAyNSwiaWF0IjoxNzM1NjU0NjI1fQ.WDA5VxSEhjpTNDHViOvDi42c-4dkfvDWiZjslol8FZV5lqt40lgERgl6an-TRileLS_YGplPzb7vunDFVTEl6g';
    let url = "http://localhost:5178/api/Empleado/getEmpleados";
    let config = {};
    config['headers'] = {
        Authorization: `Bearer ${token}`,
        mode: 'cors',
        crossOrigin: 'use-credentials'
    }
    console.log('Before request');
    let { response, data } = await originalRequest(url, config)
    console.log('After request');
    return data;
};

let originalRequest = async (url, config) => {
    let response = await fetch(url, config)
    let data = await response.json();
    return {response,data}
}
export default GetEmpleado;