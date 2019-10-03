import React, { useEffect, useState, Fragment } from 'react';
import {Link} from 'react-router-dom';
import axiosClient from '../../config/axios';
import Product from '../../components/products/Product';
import Spinner from '../../components/layout/Spinner';

function Index() {

    const [products, saveProducts] = useState([]);

    const getProducts = async () => {
        const productsQuery = await axiosClient.get('/products');
        saveProducts(productsQuery.data);
    }

    useEffect( () => {
        getProducts();
        console.log('e');
    }, [products])

    if(!products.length) return <Spinner />

    return (
        <Fragment>
            <h2>Products</h2>

            <Link to={"/products/create"} className="btn btn-verde nvo-cliente"> <i className="fas fa-plus-circle"></i>
                Nuevo Producto
            </Link>

            <ul className="listado-productos">
                { products.map(product => (
                    <Product 
                        key={product._id}
                        product={product} 
                    />
                )) }
            </ul>
        </Fragment>
    )
}

export default Index;