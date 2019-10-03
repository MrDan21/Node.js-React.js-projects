const express = require('express');
const router = express.Router();

const clientController = require('../controllers/clientController');
const productController = require('../controllers/productController');
const invoiceController = require('../controllers/invoiceController');

module.exports = function() {
    //clientes
    router.post('/clients', clientController.store);
    router.get('/clients', clientController.index);
    router.get('/clients/:id', clientController.show);
    router.put('/clients/:id', clientController.update);
    router.delete('/clients/:id', clientController.destroy);

    //products
    router.post('/products', 
        productController.uploadImage,
        productController.store);
    router.get('/products', productController.index);
    router.get('/products/:id', productController.show);
    router.put('/products/:id', 
        productController.uploadImage,
        productController.update);
    router.delete('/products/:id', productController.destroy);
    router.post('/products/search/:query', productController.search);


    //invoices
    router.post('/invoices', invoiceController.store);
    router.get('/invoices', invoiceController.index);
    router.get('/invoices/:id', invoiceController.show);
    router.put('/invoices/:id', invoiceController.update);
    router.delete('/invoices/:id', invoiceController.destroy);

    return router;
}