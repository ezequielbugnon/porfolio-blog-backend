const Entrada = require('../models/entrada');


const crud = {}


crud.show  = async (req, res) =>{
    const entrada = await Entrada.find().populate('image');
    res.status(200).json({entrada});

}



module.exports = crud;
