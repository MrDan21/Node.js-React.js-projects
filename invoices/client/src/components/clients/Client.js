import React from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import axiosClient from '../../config/axios';

function Client({client}) {
    const {_id, name, last_name, company, email, phone_number} = client;

    const deleteClient = id => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.value) {
                axiosClient.delete(`/clients/${id}`)
                .then(res => {
                    Swal.fire(
                        'Deleted!',
                        'Your file has been deleted.',
                        'success'
                    )
                })
            }
        })
    }

    return (
        <li className="cliente">
            <div className="info-cliente">
                <p className="nombre">{name} {last_name}</p>
                <p className="empresa">{company}</p>
                <p>{email}</p>
                <p>Tel: {phone_number}</p>
            </div>
            <div className="acciones">
                <Link to={`/clients/edit/${_id}`} className="btn btn-azul">
                    <i className="fas fa-pen-alt"></i>
                    Edit Client
                </Link>
                <Link to={`/invoices/create/${_id}`} className="btn btn-amarillo">
                    <i className="fas fa-plus"></i>
                    New Invoice
                </Link>
                <button 
                    type="button" 
                    className="btn btn-rojo btn-eliminar"
                    onClick={() => deleteClient(_id)}>
                    <i className="fas fa-times"></i>
                    Delete Client
                </button>
            </div>
        </li>
    )
}

export default Client;