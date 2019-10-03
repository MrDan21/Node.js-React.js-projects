import React, {useState, Fragment} from 'react';
import Swal from 'sweetalert2';
import axiosClient from '../../config/axios';
import {withRouter} from 'react-router-dom';

function Create({history}) {

    const [product, saveProduct] = useState({
        name: '',
        price: ''
    });

    const [file, saveFile] = useState('');

    const addProduct = async e => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name', product.name);
        formData.append('price', product.price);
        formData.append('image', file);

        try {
            const res = await axiosClient.post('/products', formData, {
                headers: {
                   'Content-Type': 'multipart/form-data' 
                }
            });

            if(res.status === 200) {
                Swal.fire('Added');
            }

            history.push('/products');
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

    return (
        <Fragment>
            <h2>Nuevo Producto</h2>
            <form 
                onSubmit={addProduct}    
            >
                <legend>Llena todos los campos</legend>

                <div className="campo">
                    <label>Nombre:</label>
                    <input 
                        type="text" 
                        placeholder="Nombre Producto" 
                        name="name"
                        onChange={readProductInformation} 
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
                    />
                </div>

                <div className="campo">
                    <label>Imagen:</label>
                    <input 
                        type="file"  
                        name="image"
                        onChange={readFile}
                    />
                </div>

                <div className="enviar">
                    <input type="submit" className="btn btn-azul" value="Agregar Producto" />
                </div>
            </form>
        </Fragment>
    )
}

export default withRouter(Create);