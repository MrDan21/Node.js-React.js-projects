import React, {useState, useEffect, Fragment} from 'react';
import axiosClient from '../../config/axios';
import SearchProduct from '../../components/invoices/SearchProduct';
import ProductQuantity from '../../components/invoices/ProductQuantity';
import Swal from 'sweetalert2';
import {withRouter} from 'react-router-dom';

function Create(props) {

    const { id } = props.match.params;

    const [client, saveClient] = useState({});
    const [search, saveSearch] = useState('');
    const [products, saveProducts] = useState([]);
    const [total, saveTotal] = useState(0);

    useEffect(() => {
        const getClient = async () => {
            const res = await axiosClient.get(`/clients/${id}`);
            saveClient(res.data);
        }
        getClient();
        updateTotal();
    }, [products]);

    const searchProduct = async e => {
        e.preventDefault();
        
        const searchResult = await axiosClient.post(`/products/search/${search}`);

        if(searchResult.data[0]) {
            let productResult = searchResult.data[0];
            productResult.product = searchResult.data[0]._id;
            productResult.quantity = 0;

            saveProducts([...products, productResult]);
        } else {
            Swal.fire({
                type: 'error',
                title: 'Ops... Error!!',
                text: 'No results'
            })
        }
    }

    const readSearchData = e => {
        saveSearch(e.target.value); 
    }

    const decreaseProducts = i => {
        const allProducts = [...products];
        if(allProducts[i].quantity === 0) return;
        allProducts[i].quantity--;
        saveProducts(allProducts);
    }

    const increaseProducts = i => {
        const allProducts = [...products];
        allProducts[i].quantity++;
        saveProducts(allProducts);
    }

    const deleteProductInvoice = id => {
        const allProducts = products.filter(product => product._id !== id);
        saveProducts(allProducts);
    }

    const updateTotal = () => {
        if(products.length === 0) {
            saveTotal(0);
            return;
        }
        let newTotal = 0;
        products.map(product => newTotal += (product.quantity * product.price) );
        saveTotal(newTotal);

    }

    const makeAnInvoice = async e => {
        e.preventDefault();
        const invoice = {
            "client": id,
            "products": products,
            "total": total
        };
        const res = await axiosClient.post('/invoices', invoice);
        if(res.status === 200) {
            Swal.fire({
                type: 'success',
                title: 'Added',
                text: 'Congratulations.'
            })
        } else {
            Swal.fire({
                type: 'error',
                title: 'Ops... Error!!',
                text: 'try again'
            })
        }
        props.history.push('/invoices');
    }

    return (
        <Fragment>
            <h2>Nuevo Pedido</h2>

            <div className="ficha-cliente">
                <h3>Datos de Cliente</h3>
                <p>Name: {client.name} {client.last_name}</p>
            </div>

            <SearchProduct searchProduct={searchProduct} readSearchData={readSearchData} />

            <ul className="resumen">
                {products.map((product, index) => (
                    <ProductQuantity 
                        key={product._id} 
                        product={product}
                        decreaseProducts={decreaseProducts}
                        increaseProducts={increaseProducts}
                        deleteProductInvoice={deleteProductInvoice}
                        index={index}
                    />
                ))}
            </ul>
            <p className="total">Total a pagar: <span>$ {total}</span></p>
            { total > 0 ? (
                <form onSubmit={makeAnInvoice}>
                    <input type="submit" className="btn btn-verde btn-block" value="Realizar pedido" />
                </form>
            ) : null}
        </Fragment>
    )
}

export default withRouter(Create);