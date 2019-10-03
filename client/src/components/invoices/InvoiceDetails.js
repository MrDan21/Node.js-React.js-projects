import React, {Fragment} from 'react';

function InvoiceDetails({invoice}) {

    const {client} = invoice;

    return (
        <Fragment>
            <li className="pedido">
                <div className="info-pedido">
                    <p className="id">ID: 0192019201291201</p>
                    <p className="nombre">Cliente: { client.name } { client.last_name }</p>

                    <div className="articulos-pedido">
                        <p className="productos">Artículos Pedido: </p>
                        <ul>
                            {invoice.products.map(articles => (
                                <li>
                                    <p>Name: {articles.product.name}</p>
                                    <p>Price: ${articles.product.price}</p>
                                    <p>Quantity: {articles.quantity}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <p className="total">Total: ${invoice.total} </p>
                </div>
                <div className="acciones">
                    <button type="button" className="btn btn-rojo btn-eliminar">
                        <i className="fas fa-times"></i>
                        Eliminar Pedido
                    </button>
                </div>
            </li>
        </Fragment>
    )
}

export default InvoiceDetails;