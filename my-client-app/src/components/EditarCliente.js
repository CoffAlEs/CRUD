// src/components/EditarCliente.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles/editarcliente.css';

const EditarCliente = () => {
    const { id } = useParams();
    const [cliente, setCliente] = useState(null);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCliente = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/clientes/${id}`);
                setCliente(response.data);
            } catch (error) {
                console.error('Error fetching cliente:', error);
            }
        };
        fetchCliente();
    }, [id]);

    const validateCurp = (curp) => {
        return curp.length === 18;
    };

    const handleEditCliente = async () => {
        if (!validateCurp(cliente.curp)) {
            setError('El CURP debe tener exactamente 18 caracteres.');
            return;
        }
        try {
            await axios.put(`http://localhost:5000/clientes/${id}`, cliente, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            navigate('/dashboard');
        } catch (error) {
            console.error('Error editing cliente:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCliente({ ...cliente, [name]: value });
    };

    if (!cliente) {
        return <div>Cargando...</div>;
    }

    return (
        <div className="edit-cliente">
            <h2>Editar Cliente</h2>
            <form>
                {Object.keys(cliente).map(key => (
                    <div key={key} className="form-group">
                        <label>{key}</label>
                        <input
                            name={key}
                            type={key === 'fechaIngresoSolicitud' || key === 'fechaPublicacionSolicitud' || key === 'fechaNacimiento' ? 'date' : (key === 'edad' ? 'number' : 'text')}
                            value={cliente[key]}
                            onChange={handleChange}
                        />
                    </div>
                ))}
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <button type="button" onClick={handleEditCliente}>Guardar</button>
                <button type="button" onClick={() => navigate('/dashboard')}>Cancelar</button>
            </form>
        </div>
    );
};

export default EditarCliente;
