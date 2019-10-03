import React, { Fragment, useState, useEffect } from 'react';
import axiosClient from '../../config/axios';
import { withRouter } from 'react-router-dom';
import Swal from 'sweetalert2';

function Edit(props) {
    const { id } = props.match.params;

    const [client, dataClient] = useState({
        name: '',
        last_name: '',
        company: '',
        email: '',
        phone_number: ''
    });

    const getClient = async () => {
        const clientQuery = await axiosClient.get(`/clients/${id}`);

        dataClient(clientQuery.data);
    }

    useEffect( () => {
        getClient();
    }, []);


    const handleChange = e => {
        dataClient({
            ...client,
            [e.target.name] : e.target.value
        })
    }

    const handleSubmit = e => {
        e.preventDefault();
        axiosClient.put(`/clients/${id}`, client)
        .then(res => {
            if(res.data.code === 11000) {
                Swal.fire(
                    'Error',
                    'The client already exists',
                    'error'
                )
            } else {
                Swal.fire(
                    'Good job!',
                    'Client edited!',
                    'success'
                )
            }
            props.history.push('/');
        })
    }

    const validateClient = () => {
        const {name, last_name, company, email, phone_number} = client;

        let status = !name.length || !last_name || !company.length || !email.length || !phone_number.length;

        return status;
    }

    return (
        <Fragment>
            <h2>Edit Client</h2>
            <form
                onSubmit={handleSubmit}> 
                <legend>Llena todos los campos</legend>

                <div className="campo">
                    <label>Nombre:</label>
                    <input 
                        type="text" 
                        placeholder="Nombre Cliente" 
                        name="name" 
                        value={client.name}
                        onChange={handleChange} />
                </div>

                <div className="campo">
                    <label>Apellido:</label>
                    <input 
                        type="text" 
                        placeholder="Apellido Cliente" 
                        name="last_name"
                        value={client.last_name} 
                        onChange={handleChange} />
                </div>
            
                <div className="campo">
                    <label>Empresa:</label>
                    <input type="text" 
                        placeholder="Empresa Cliente" 
                        name="company" 
                        value={client.company}
                        onChange={handleChange} />
                </div>

                <div className="campo">
                    <label>Email:</label>
                    <input 
                        type="email" 
                        placeholder="Email Cliente" 
                        name="email" 
                        value={client.email}
                        onChange={handleChange} />
                </div>

                <div className="campo">
                    <label>Teléfono:</label>
                    <input 
                        type="tel" 
                        placeholder="Teléfono Cliente" 
                        name="phone_number" 
                        value={client.phone_number}
                        onChange={handleChange} />
                </div>

                <div className="enviar">
                    <input 
                        type="submit" 
                        className="btn btn-azul" 
                        value="Save Client" 
                        onChange={handleChange}
                        disabled={validateClient()} 
                    />
                </div>

            </form>
        </Fragment>
    )
}

export default withRouter(Edit);