import React, {Fragment} from 'react';

function SearchProduct(props) {
    return (
        <Fragment>
         <form onSubmit={props.searchProduct} >
                <legend>Busca un Producto y agrega una cantidad</legend>
                <div className="campo">
                    <label>Productos:</label>
                    <input type="text" placeholder="Nombre Productos" name="productos" onChange={props.readSearchData}  />
                </div>
                <input type="submit" className="btn btn-azul btn-block" value="Search product" />
            </form>
        </Fragment>
    )
}

export default SearchProduct;