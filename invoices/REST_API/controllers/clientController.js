const Client = require('../models/Client');

exports.store = async (req, res, next) => {
    const client = new Client(req.body);

    try {
        await client.save();
        res.json({ message: 'Correctly'});
    } catch (error) {
        res.send(error);
        next();
    }
}

exports.index = async (req, res, next) => {
    try {
        const clients = await Client.find({});
        res.json(clients);
    } catch (error) {
        console.log(error);
        next();
    }
}

exports.show = async (req, res, next) => {
    const client = await Client.findById(req.params.id);

    if(!client) {
        res.json({message: 'Client does not exist'});
        next();
    }

    res.json(client);
}

exports.update = async(req, res, next) => {
    try {
        const client = await Client.findOneAndUpdate({_id : req.params.id}, 
        req.body, {
            new: true
        });
        res.json(client);
    } catch (error) {
        console.log(error);
        next();
    }
}

exports.destroy = async(req, res, next) => {
    try {
        await Client.findOneAndDelete({ _id: req.params.id });
        res.json({message: 'deleted'});
    } catch (error) {
        console.log(error);
        next();
    }
}