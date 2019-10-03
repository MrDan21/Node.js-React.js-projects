const Invoice = require('../models/Invoice');

exports.index = async(req, res, next) => {
    try {
        const invoices = await Invoice.find({}).populate('client').populate({
            path: 'products.product',
            model: 'products'
        });
        res.json(invoices);    
    } catch (error) {
        console.log(error);
        next();
    }
}

exports.store = async(req, res, next) => {
    const invoice = new Invoice(req.body);

    try {
        await invoice.save();
        res.json({message: 'added'});
    } catch (error) {
        console.log(error);
        next();    
    }
}

exports.show = async(req, res, next) => {
    const invoice = await Invoice.findById(req.params.id).populate('client').populate({
        path: 'products.product',
        model: 'products'
    });

    if(!invoice) {
        res.json({message: 'Invoice does not exist'});
        next();
    }

    res.json(invoice);
}

exports.update = async(req, res, next) => {
    try {
        const invoice = await Invoice.findOneAndUpdate({_id : req.params.id}, 
        req.body, {
            new: true
        });
        res.json(invoice);
    } catch (error) {
        console.log(error);
        next();
    }
}

exports.destroy = async(req, res, next) => {
    try {
        await Invoice.findOneAndDelete({ _id: req.params.id });
        res.json({message: 'deleted'});
    } catch (error) {
        console.log(error);
        next();
    }
}