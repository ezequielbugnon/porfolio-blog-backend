const router = require('express').Router();
const User = require('../models/user');
const Entrada = require('../models/entrada');
const jwt = require('jsonwebtoken');
const verify = require('../middleware/verify');
const cloudinary = require('cloudinary');
const Image = require('../models/image');
const imageController = require('../controllers/imageController');

const crud = require('../controllers/crud');
require('dotenv').config();

//cloudinary config
cloudinary.config({
    cloud_name:	process.env.CLOUD_NAME,
    api_key:	process.env.API_KEY,
    api_secret: process.env.API_SECRET
});

router.get('/entrada', crud.show);

router.post('/entrada',verify, async (req, res) =>{
 
    try{
        const user = await User.findById(req.userId, { password:0 });
        const { title, content} = req.body;
        
    if(user && title && content){
                
        let autor = {
                id: user._id,
                username: user.name
        };

        let entrada = new Entrada({
                title, content, autor
        });
   
       await entrada.save();
            
     res.status(200).json(entrada);

       
    }else{

      res.status(401).json({
            "message": "hay campos vacios"
        });
    }

    } catch(e){
        res.json(e);
    }
});


router.get('/entrada/:id', async (req, res) =>{
    const entrada = await Entrada.findById(req.params.id).populate('image');
    res.status(200).json({
        entrada
    });
});

router.put('/entrada/edit/:id',verify, async (req, res) =>{
    try{
        const {title, content} = req.body;
        const user = await User.findById(req.userId, { password:0 });
        let autor = {
            id: user._id,
            username: user.name
        }
        let editentrada = {
            title, content, autor
        };
      
        await Entrada.findOneAndUpdate(req.param.id, editentrada);
        
        res.status(200).json(editentrada);
    }catch(e){
        res.status(401).json(e);
    }
});

router.delete('/entrada/delete/:id',verify, async(req, res) =>{
    try{
         await Entrada.findOneAndDelete(req.params.id);
         res.status(200).json({
             "message": "Registro eliminado"
         })

    }catch(e){
        res.status(401).json({
            "message": "Registro no eliminado",
            "error": e
        })
    }
});

router.post('/entrada/image', verify, imageController.imageCreate);



module.exports = router;