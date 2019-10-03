import React, {Fragment, useState, useEffect} from 'react';
import Swal from 'sweetalert2';
import axiosClient from '../../config/axios';
import {withRouter} from 'react-router-dom';
import Spinner from '../../components/layout/Spinner';

function Edit(props) {

    const { id } = props.match.params;

    const [product, saveProduct] = useState({
        name: '',
        price: '',
        image: ''
    });

    const [file, saveFile] = useState('');

    const getProducts = async () => {
        const productsQuery = await axiosClient.get(`/products/${id}`);
        saveProduct(productsQuery.data);
    }

    useEffect(() => {
        getProducts();
    }, [])

    const handleSubmit = async e => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', product.name);
        formData.append('price', product.price);
        formData.append('image', file);

        try {
            const res = await axiosClient.put(`/products/${id}`, formData, {
                headers: {
                   'Content-Type': 'multipart/form-data' 
                }
            });

            if(res.status === 200) {
                Swal.fire(
                    'Edited',
                    '',
                    'success'
                );
            }

            props.history.push('/products');
        } catch (error) {
            Swal.fire({
                type: 'error',
                title: 'Ops... Error!!',
                text: 'try already'
            })
        }
    }

    const readProductInformation = e => {
        saveProduct({
            ...product,
            [e.target.name] : e.target.value
        })
        console.log(product);
    }

    const readFile = e => {
        saveFile(e.target.files[0]);
    }

    const { name, price, image } = product;

    if(!name) return <Spinner />

    return (
        <Fragment>
            <h2>Editar Producto</h2>
            <form
                onSubmit={handleSubmit}
            >
                <legend>Llena todos los campos</legend>

                <div className="campo">
                    <label>Nombre:</label>
                    <input 
                        type="text" 
                        placeholder="Nombre Producto" 
                        name="name"
                        onChange={readProductInformation}
                        defaultValue={name}
                    />
                </div>

                <div className="campo">
                    <label>Precio:</label>
                    <input 
                        type="number" 
                        name="price" 
                        min="0.00" 
                        step="0.01" 
                        placeholder="Precio"
                        onChange={readProductInformation}
                        defaultValue={price}
                    />
                </div>

                <div className="campo">
                    <label>Imagen:</label>
                    { image ? (
                        <img src={`http://localhost:5000/${image}`} alt="image" width="300" />
                    ) : null }
                    <input 
                        type="file"  
                        name="image"
                        onChange={readFile}
                    />
                </div>

                <div className="enviar">
                    <input type="submit" className="btn btn-azul" value="Editar Producto" />
                </div>
            </form>
        </Fragment>
    )
}
export default withRouter(Edit);