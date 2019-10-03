const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const invoiceSchema = new Schema({
    client: {
        type: Schema.ObjectId,
        ref: 'clients'
    },
    products: [{
        product: {
            type: Schema.ObjectId,
            ref: 'products'
        },
        quantity: Number
    }],
    total: {
        type: Number
    }
});

module.exports = mongoose.model('invoices', invoiceSchema);