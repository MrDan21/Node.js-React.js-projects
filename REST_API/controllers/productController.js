const Product = require('../models/Product');

const multer = require('multer');
const shortid = require('shortid');

const multerConfiguration = {
    storage: fileStorage = multer.diskStorage({
        destination: (req, file, cb) => {
          cb(null, __dirname+'../../uploads')
        },
        filename: (req, file, cb) => {
            const extension = file.mimetype.split('/')[1];
            cb(null, `${shortid.generate()}.${extension}`);
        }
    }),
    fileFilter(req, file, cb) {
        if( file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
            cb(null, true);
        } else {
            cb(new Error('Invalid format'));
        }
    },
}

const upload = multer(multerConfiguration).single('image');

exports.uploadImage = (req, res, next) => {
    upload(req, res, function(error) {
        if(error) {
            res.json({message: error});
        }

        return next();
    })
}

exports.store = async(req, res, next) => {
    const product = new Product(req.body);

    try {

        if(req.file.filename) {
            product.image = req.file.filename;
        }

        await product.save();
        res.json({message: 'added'});
    } catch (error) {
        console.log(error);
        next();    
    }
}

exports.index = async(req, res , next) => {
    try {
        const products = await Product.find({});
        res.json(products);    
    } catch (error) {
        console.log(error);
        next();
    }
}

exports.show = async(req, res, next) => {
    const product = await Product.findById(req.params.id);

    if(!product) {
        res.json({message: 'Product does not exist'});
        next();
    }

    res.json(product);
}

exports.update = async(req, res, next) => {
    try {
        const newProduct = req.body;

        if(req.file) {
            newProduct.image = req.file.filename;
        } else {
            const oldProduct = await Product.findById(req.params.id);
            newProduct.image = oldProduct.image;
        }

        const product = await Product.findOneAndUpdate({_id: req.params.id},
        newProduct, {
            new: true
        });
        res.json(product);
    } catch (error) {
        console.log(error);
        next();
    }
}

exports.destroy = async(req, res, next) => {
    try {
        await Product.findOneAndDelete({ _id: req.params.id });
        res.json({message: 'deleted'});
    } catch (error) {
        console.log(error);
        next();
    }
}

exports.search = async(req, res, next) => {
    try {
        const { query } = req.params;
        const product = await Product.find({ name: new RegExp(query, 'i') });
        res.json(product);
    } catch(error) {
        console.log(error);
        next();
    }
}