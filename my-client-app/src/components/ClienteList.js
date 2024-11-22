import React, { useEffect, useState } from 'react';
import { getClientes } from '../services/api';
//import axios from 'axios';
import { Link } from 'react-router-dom';
import '../styles/styles.css';

function ClienteList() {
    const [clientes, setClientes] = useState([]);

    useEffect(() => {
        const fetchClientes = async () => {
            try {
                const clientesData = await getClientes();
                setClientes(clientesData);
            } catch (error) {
                console.error('Error al obtener los clientes', error);
            }
            /*try {
                const response = await axios.get('http://localhost:3000/clientes', {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });
                setClientes(response.data);
            } catch (error) {
                console.error('Error al obtener los clientes', error);
            }*/
        };

        fetchClientes();
    }, []);

    return (
        <div>
            <h2>Lista de Clientes</h2>
            <ul>
                {clientes.map(cliente => (
                    <li key={cliente.id}>
                        {cliente.denominacion}
                        <Link to={`/clientes/${cliente.id}`}>Editar</Link>
                    </li>
                ))}
            </ul>
        </div>
        /*<div>
            <h2>Lista de Clientes</h2>
            <ul>
                {clientes.map(cliente => (
                    <li key={cliente.id}>
                        {cliente.denominacion}
                        <Link to={`/clientes/${cliente.id}`}>Editar</Link>
                    </li>
                ))}
            </ul>
        </div>*/
    );
}

export default ClienteList;
