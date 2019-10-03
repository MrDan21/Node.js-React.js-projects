import React from 'react';
import {Link} from 'react-router-dom';
import Swal from 'sweetalert2';
import axiosClient from '../../config/axios';

function Product({product}) {

    const {_id, name, price, image} = product;

    const deleteProduct = id => {
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
                axiosClient.delete(`/products/${id}`)
                .then(res => {
                    if(res.status === 200) {
                        Swal.fire(
                            'Deleted!',
                            'Your file has been deleted.',
                            'success'
                        )
                    }
                });
            }
        })
    }

    return (
        <li className="producto">
            <div className="info-producto">
                <p className="nombre">{name}</p>
                <p className="precio">{price}</p>
                <img src={`http://localhost:5000/${image}`} />
            </div>
            <div className="acciones">
                <Link to={`/products/edit/${_id}`} className="btn btn-azul">
                    <i className="fas fa-pen-alt"></i>
                    Editar Producto
                </Link>

                <button 
                    type="button" 
                    className="btn btn-rojo btn-eliminar"
                    onClick={() => deleteProduct(_id)}
                >
                    <i className="fas fa-times"></i>
                    Eliminar Cliente
                </button>
            </div>
        </li>
    )
}

export default Product;