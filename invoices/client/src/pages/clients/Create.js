import React, { Fragment, useState } from 'react';
import axiosClient from '../../config/axios';
import { withRouter } from 'react-router-dom';
import Swal from 'sweetalert2';

function Create({history}) {
    const [client, saveClient] = useState({
        name: '',
        last_name: '',
        company: '',
        email: '',
        phone_number: ''
    });

    const handleChange = e => {
        saveClient({
            ...client,
            [e.target.name] : e.target.value
        })
    }

    const validateClient = () => {
        const {name, last_name, company, email, phone_number} = client;

        let status = !name.length || !last_name || !company.length || !email.length || !phone_number.length;

        return status;
    }

    const handleSubmit = e => {
        e.preventDefault();

        axiosClient.post('/clients', client)
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
                    'Client added!',
                    'success'
                )
            }
            history.push('/');
        });
    }

    return (
        <Fragment>
            <h2>New Client</h2>
            <form onSubmit={handleSubmit}>
                <legend>Llena todos los campos</legend>

                <div className="campo">
                    <label>Nombre:</label>
                    <input type="text" placeholder="Nombre Cliente" name="name" onChange={handleChange} />
                </div>

                <div className="campo">
                    <label>Apellido:</label>
                    <input type="text" placeholder="Apellido Cliente" name="last_name" onChange={handleChange} />
                </div>
            
                <div className="campo">
                    <label>Empresa:</label>
                    <input type="text" placeholder="Empresa Cliente" name="company" onChange={handleChange} />
                </div>

                <div className="campo">
                    <label>Email:</label>
                    <input type="email" placeholder="Email Cliente" name="email" onChange={handleChange} />
                </div>

                <div className="campo">
                    <label>Teléfono:</label>
                    <input type="tel" placeholder="Teléfono Cliente" name="phone_number" onChange={handleChange} />
                </div>

                <div className="enviar">
                    <input 
                        type="submit" 
                        className="btn btn-azul" 
                        value="Agregar Cliente" 
                        onChange={handleChange}
                        disabled={validateClient()} 
                    />
                </div>

            </form>
        </Fragment>
    )
}

export default withRouter(Create);