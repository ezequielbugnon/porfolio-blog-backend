const Project = require('../models/project');
const User = require('../models/user');
const cloudinary = require('cloudinary');
const Image = require('../models/image');
const Entrada = require('../models/entrada');
const fs = require('fs-extra');
require('dotenv').config();

cloudinary.config({
    cloud_name:	process.env.CLOUD_NAME,
    api_key:	process.env.API_KEY,
    api_secret: process.env.API_SECRET
});

const imageController = {}

imageController.imageCreate = async(req, res) =>{
    const user = await User.findById(req.userId, { password:0 });
    
    if(user){
        let autor = {
            id: user._id,
            username: user.name
         }; //falta una condicion para hacerlo funcion
        const result = await cloudinary.uploader.upload(req.file.path);

            if(result){        
            const image = new Image({filename: req.file.filename, path: result.url, public_id: result.public_id, originalname: req.file.originalname, mimetype: req.file.mimetype,size: req.file.size,autor});
            let img = await image.save();
            fs.unlink(req.file.path);
               
            if(img){
                   await pushImage(req, img);
                    res.status(200).json({"message": "imagen guardada", "image": img});
                }
            }else{
                res.status(401).json({"message": "imagen no guardada"});
            }
        }
    }

imageController.deleteImage = async (req, res) =>{
    try {
        const result = await Image.findById(req.params.id)
        cloudinary.uploader.destroy(result.public_id);
        await Image.findByIdAndDelete(req.params.id); 
        res.status(200).json({'message': 'registro eliminado'});
    } catch (error) {
        res.status(401).json({'message': 'registro no eliminado'});
    }
   

}

imageController.getImage = async(req, res) =>{
   const result = await Image.findById(req.params.id);
   if(result){
       res.status(200).json({result});
   }else{
        res.status(400).json({'message': 'error'});
   }

}

imageController.editImage = async(req, res) =>{
    const user = await User.findById(req.userId, { password:0 });
     
    if(user){
        let autor = {
            id: user._id,
            username: user.name
         };
        const result =  await cloudinary.uploader.upload(req.file.path);
        const destroy = await cloudinary.uploader.destroy(req.body.public_id);
        await destroyed(req);
        
        if(result && destroy){        
            const image = {filename: req.file.filename, path: result.url, public_id: result.public_id, originalname: req.file.originalname, mimetype: req.file.mimetype,size: req.file.size,autor};
            const img = await Image.findByIdAndUpdate({_id: req.params.id}, image);
               
            if(img && destroy){
                    await pushImage(req, img);
                    
                    res.status(200).json({"message": "imagen guardada"});
                }
            }else{
                res.status(401).json({"message": "imagen no guardada"});
            }
        }
}

let pushImage = async (req, img) =>{
    const project = req.headers['project'];
    const entrada = req.headers['entrada'];
    if(project){
         result = await Project.findById(project);
        if(result){
         result.image.push(img);

         result.save();
        }

    }else{
         result = await Entrada.findById(entrada);
         if(result){
         result.image.push(img);
         result.save();
         }
    }
    
}

let destroyed = async (req) =>{
    const project = req.headers['project'];
    const entrada = req.headers['entrada'];
    if(project){
         result = await Project.findById(project);
        if(result){
         result.image.pop(req.params.id);

         result.save();
        }

    }else{
         result = await Entrada.findById(entrada);
         if(result){
         result.image.pop(req.params.id);
         result.save();
         }
    }
}



module.exports = imageController;