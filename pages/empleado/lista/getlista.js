'use client';
import { useEffect, useState } from 'react';
import './getlista.css';
import GetEmpleado from '../../../app/empleado/getEmpleado'
import ListEmpleados from '../../../components/listEmpleados';
import Search from '../../../components/Search';
export default function GetLista() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [keyword, setKeyword] = useState("");


    useEffect(
        () => {
        const fetchData = async () => {
            try {
                const employees = await GetEmpleado();
                setData(employees);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [keyword]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    const filterEmpleados = () => {
        const filteredEmpleados = data.filter(empleado => {
            if (keyword === "") {
                return empleado
            }
            const newEmpleado = empleado.nombre.toLowerCase().includes(keyword.toLowerCase());
            return newEmpleado
        });
        setData(filteredEmpleados)
    }

    return (
        <div className="App">
            <div className="main-container">
                <header>
                  <h1 className="heading">Employee List</h1>
                  <h3> A Simple Employee list with React and Nextjs</h3>
                </header>
                <div className="nombre01">
                    <span>You need to run ApiEmpleados on .NET</span>
                    <ul className="ratings">
                        
                        {/*/<span className="small-half">10</span>*/}
                    </ul>
                </div>
                <div className="App">
                    <Search setKeyword={setKeyword} keyword={keyword} filterEmpleados={filterEmpleados } />
                    <ListEmpleados empleados={data} />
                </div>
                {/*<ul>*/}
                {/*    {data && data.map((post) => (*/}
                {/*        <li key={post.idEmpleado}>{post.nombre}</li>*/}
                {/*    ))}*/}
                {/*</ul>*/}
            </div>
        </div>
    );
}