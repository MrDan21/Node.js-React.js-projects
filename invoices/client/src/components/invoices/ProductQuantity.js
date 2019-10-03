import React from 'react'

function ProductQuantity(props) {

    const {product, decreaseProducts, increaseProducts, deleteProductInvoice, index} = props;

    return (
        <li>
            <div className="texto-producto">
                <p className="nombre">{product.name}</p>
                <p className="precio">${product.price}</p>
            </div>
            <div className="acciones">
                <div className="contenedor-cantidad">
                    <i className="fas fa-minus" onClick={() => decreaseProducts(index)}></i>
                    <p>{product.quantity}</p>
                    <i className="fas fa-plus" onClick={() => increaseProducts(index)}></i>
                </div>
                <button type="button" className="btn btn-rojo" onClick={() => deleteProductInvoice(product._id)}>
                    <i className="fas fa-minus-circle"></i>
                        Eliminar Producto
                </button>
            </div>
        </li>
    )
}

export default ProductQuantity;