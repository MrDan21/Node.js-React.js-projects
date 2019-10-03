import React, { useEffect, useState, Fragment } from 'react';
import axiosClient from '../../config/axios';
import { Link } from 'react-router-dom';
import Client from '../../components/clients/Client';
import Spinner from '../../components/layout/Spinner';

function Index() {

    const [clients, saveClients] = useState([]);

    useEffect( () => {
        let isCancelled = false;
        const getClients = async () => {
            const clientsQuery = await axiosClient.get('/clients');
            if(!isCancelled) {
                saveClients(clientsQuery.data);
            }
        }
        getClients();
        return () => {
            isCancelled = true;
        };
    }, [clients]);

    if(!clients.length) return <Spinner />

    return (
        <Fragment>
            <h2>Clients</h2>
            <Link to={'/clients/create'} className="btn btn-verde nvo-cliente"> <i className="fas fa-plus-circle"></i>
                Nuevo Cliente
            </Link>
            <ul className="listado-clientes">
                {clients.map(client => (
                    <Client key={client._id} client={client} />
                ))}
            </ul>
        </Fragment>
    )
}

export default Index;