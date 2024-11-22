import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getClienteById, createCliente, updateCliente } from '../services/api';
import '../styles/styles.css';


function ClienteForm() {
    const [cliente, setCliente] = useState({
        expediente: '',
        tipoRegistro: '',
        denominacion: '',
        fechaIngresoSolicitud: '',
        fechaPublicacionSolicitud: '',
        archivoFonetico: '',
        concesion: '',
        vigencia: '',
        observaciones: '',
        email: '',
        telefono: '',
        fechaNacimiento: '',
        edad: 0,
        curp: '',
        localidad: '',
        origen: ''
    });

    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        if (id) {
            // Si el id está presente, cargar los datos del cliente
            const fetchCliente = async () => {
                try {
                    const clienteData = await getClienteById(id);
                    setCliente(clienteData);
                } catch (error) {
                    console.error('Error al obtener el cliente', error);
                }
            };

            fetchCliente();
        }
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCliente({
            ...cliente,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (id) {
                await updateCliente(id, cliente);
            } else {
                await createCliente(cliente);
            }
            navigate('/dashboard');
        } catch (error) {
            console.error('Error al guardar el cliente', error);
        }
    };

    const renderInputField = (key, type) => (
        <div className="form-group" key={key}>
            <label className="form-label">{key.charAt(0).toUpperCase() + key.slice(1)}</label>
            <input
                type={type}
                name={key}
                value={cliente[key]}
                onChange={handleChange}
                className="form-input"
                required={key !== 'observaciones'}
            />
        </div>
    );

    return (
        <div className="form-container">
            <h2 className="form-title">{id ? 'Editar Cliente' : 'Agregar Cliente'}</h2>
            <form onSubmit={handleSubmit} className="client-form">
                {Object.keys(cliente).map((key) => {
                    if (key === 'fechaIngresoSolicitud' || key === 'fechaPublicacionSolicitud' || key === 'fechaNacimiento') {
                        return renderInputField(key, 'date');
                    }
                    return renderInputField(key, key === 'email' ? 'email' : 'text');
                })}
                <button type="submit" className="form-button">{id ? 'Actualizar' : 'Guardar'}</button>
            </form>
        </div>
    );
}

export default ClienteForm;
