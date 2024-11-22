import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/dashboard.css';

const Dashboard = () => {
    const [clientes, setClientes] = useState([]);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [newCliente, setNewCliente] = useState({
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
    const [clienteIdToUpdate, setClienteIdToUpdate] = useState(null);
    const [clienteToUpdate, setClienteToUpdate] = useState({});
    const [clienteIdToDelete, setClienteIdToDelete] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchClientes();
    }, []);

    const fetchClientes = async () => {
        try {
            const response = await axios.get('http://localhost:5000/clientes');
            setClientes(response.data);
        } catch (error) {
            console.error('Error fetching clientes:', error);
        }
    };

    const validateCurp = (curp) => {
        return curp.length === 18;
    }

    const handleCreateCliente = async () => {
        if (!validateCurp(newCliente.curp)) {
            setError('El CURP debe tener exactamente 18 caracteres.');
            return;
        }
        try {
            await axios.post('http://localhost:5000/clientes', newCliente, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            setShowCreateModal(false);
            fetchClientes();
        } catch (error) {
            console.error('Error creating cliente:', error);
        }
    };

    const handleUpdateCliente = async () => {
        if (!validateCurp(clienteToUpdate.curp)) {
            setError('El CURP debe tener exactamente 18 caracteres.');
            return;
        }
        try {
            await axios.put(`http://localhost:5000/clientes/${clienteIdToUpdate}`, clienteToUpdate, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            setShowUpdateModal(false);
            fetchClientes();
        } catch (error) {
            console.error('Error updating cliente:', error);
        }
    };

    const handleDeleteCliente = async () => {
        try {
            await axios.delete(`http://localhost:5000/clientes/${clienteIdToDelete}`);
            setShowDeleteModal(false);
            fetchClientes();
        } catch (error) {
            console.error('Error deleting cliente:', error);
        }
    };

    const handleClienteSelect = (event) => {
        const selectedId = event.target.value;
        setClienteIdToUpdate(selectedId);
        const cliente = clientes.find(c => c.id === parseInt(selectedId));
        setClienteToUpdate(cliente || {});
    };

    const handleClienteSelectForDelete = (event) => {
        setClienteIdToDelete(event.target.value);
    };

    // Define etiquetas para los formularios
    const formLabels = {
        expediente: 'Expediente',
        tipoRegistro: 'Tipo Registro',
        denominacion: 'Denominación',
        fechaIngresoSolicitud: 'Fecha Ingreso Solicitud',
        fechaPublicacionSolicitud: 'Fecha Publicación Solicitud',
        archivoFonetico: 'Archivo Fonético',
        concesion: 'Concesión',
        vigencia: 'Vigencia',
        observaciones: 'Observaciones',
        email: 'Email',
        telefono: 'Teléfono',
        fechaNacimiento: 'Fecha Nacimiento',
        edad: 'Edad',
        curp: 'CURP',
        localidad: 'Localidad',
        origen: 'Origen'
    };

    return (
        <div>
            <h1>Dashboard de Clientes</h1>
            <div className="button-group">
                <button className="button-create" onClick={() => setShowCreateModal(true)}>Crear</button>
                <button className="button-edit" onClick={() => setShowUpdateModal(true)}>Editar</button>
                <button className="button-delete" onClick={() => setShowDeleteModal(true)}>Eliminar</button>
            </div>

            <div className="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Expediente</th>
                            <th>Tipo Registro</th>
                            <th>Denominación</th>
                            <th>Fecha Ingreso Solicitud</th>
                            <th>Fecha Publicación Solicitud</th>
                            <th>Archivo Fonético</th>
                            <th>Concesión</th>
                            <th>Vigencia</th>
                            <th>Observaciones</th>
                            <th>Email</th>
                            <th>Teléfono</th>
                            <th>Fecha Nacimiento</th>
                            <th>Edad</th>
                            <th>CURP</th>
                            <th>Localidad</th>
                            <th>Origen</th>
                        </tr>
                    </thead>

                    <tbody>
                        {clientes.map(cliente => (
                            <tr key={cliente.id}>
                                <td>{cliente.id}</td>
                                <td>{cliente.expediente}</td>
                                <td>{cliente.tipoRegistro}</td>
                                <td>{cliente.denominacion}</td>
                                <td>{new Date(cliente.fechaIngresoSolicitud).toLocaleDateString()}</td>
                                <td>{new Date(cliente.fechaPublicacionSolicitud).toLocaleDateString()}</td>
                                <td>{cliente.archivoFonetico}</td>
                                <td>{cliente.concesion}</td>
                                <td>{cliente.vigencia}</td>
                                <td>{cliente.observaciones}</td>
                                <td>{cliente.email}</td>
                                <td>{cliente.telefono}</td>
                                <td>{new Date(cliente.fechaNacimiento).toLocaleDateString()}</td>
                                <td>{cliente.edad}</td>
                                <td>{cliente.curp}</td>
                                <td>{cliente.localidad}</td>
                                <td>{cliente.origen}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Modal para crear un cliente */}
            {showCreateModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h2>Crear Cliente</h2>
                        <form>
                            {Object.keys(newCliente).map(key => (
                                <div key={key}>
                                    <label>{formLabels[key]}</label>
                                    <input
                                        type={key === 'fechaIngresoSolicitud' || key === 'fechaPublicacionSolicitud' || key === 'fechaNacimiento' ? 'date' : (key === 'edad' ? 'number' : 'text')}
                                        value={newCliente[key]}
                                        onChange={(e) => setNewCliente({ ...newCliente, [key]: e.target.value })}
                                    />
                                </div>
                            ))}
                            {error && <p style={{ color: 'red' }}>{error}</p>}
                            <button type="button" onClick={handleCreateCliente}>Guardar</button>
                            <button type="button" onClick={() => setShowCreateModal(false)}>Cancelar</button>
                        </form>
                    </div>
                </div>
            )}

            {/* Modal para actualizar un cliente */}
            {showUpdateModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h2>Editar Cliente</h2>
                        <form>
                            <div>
                                <label>Selecciona el Cliente</label>
                                <select onChange={handleClienteSelect} value={clienteIdToUpdate || ''}>
                                    <option value="">Selecciona Cliente</option>
                                    {clientes.map(cliente => (
                                        <option key={cliente.id} value={cliente.id}>
                                            {cliente.expediente}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            {Object.keys(clienteToUpdate).map(key => (
                                key !== 'id' && (
                                    <div key={key}>
                                        <label>{formLabels[key]}</label>
                                        <input
                                            type={key === 'fechaIngresoSolicitud' || key === 'fechaPublicacionSolicitud' || key === 'fechaNacimiento' ? 'date' : (key === 'edad' ? 'number' : 'text')}
                                            value={clienteToUpdate[key] || ''}
                                            onChange={(e) => setClienteToUpdate({ ...clienteToUpdate, [key]: e.target.value })}
                                        />
                                    </div>
                                )
                            ))}
                            {error && <p style={{ color: 'red' }}>{error}</p>}
                            <button type='button' onClick={handleUpdateCliente}>Guardar</button>
                            <button type='button' onClick={() => setShowUpdateModal(false)}>Cancelar</button>
                        </form>
                    </div>
                </div>
            )}

            {/* Modal para eliminar un cliente */}
            {showDeleteModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h2>Eliminar Cliente</h2>
                        <form>
                            <div>
                                <label>Selecciona el Cliente</label>
                                <select onChange={handleClienteSelectForDelete} value={clienteIdToDelete || ''}>
                                    <option value="">Selecciona Cliente</option>
                                    {clientes.map(cliente => (
                                        <option key={cliente.id} value={cliente.id}>
                                            {cliente.expediente}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            {error && <p style={{ color: 'red' }}>{error}</p>}
                            <button type='button' onClick={handleDeleteCliente}>Eliminar</button>
                            <button type='button' onClick={() => setShowDeleteModal(false)}>Cancelar</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );

};

export default Dashboard;
