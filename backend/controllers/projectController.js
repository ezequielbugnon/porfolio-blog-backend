const Project = require('../models/project');
const User = require('../models/user');
const cloudinary = require('cloudinary');
require('dotenv').config();

cloudinary.config({
    cloud_name:	process.env.CLOUD_NAME,
    api_key:	process.env.API_KEY,
    api_secret: process.env.API_SECRET
});

const projectController = {};

projectController.getProjects = async (req, res) =>{

     const project =  await Project.find({}).populate("image");
     return res.status(200).json(project);
}

projectController.createProject = async (req, res) =>{
      
           let result = await contenido(req);
            
            const project = new Project(result);
            const  response = await project.save();
            if(response){
                res.status(200).json(project);
            }else{
                res.status(400).json({
                    "mensaje": "no guardado"
                })
            }
      
    
    }

projectController.getProject = async (req, res) =>{
    try{
        const project = await Project.findById(req.params.id).populate("image");
        if(project){
            res.status(200).json(project)
        }else{
            res.status(401).json(project)
        }
    }catch(error){
        res.status(400).json({
            'message': 'error',
            'error': error
    });
    }
   
}

projectController.editProject = async(req, res) =>{
   
        let editentrada = await contenido(req);
  
        await Project.findOneAndUpdate({_id: req.params.id}, editentrada);
        res.status(200).json(editentrada)
 
  
}

projectController.deleteProject = async(req, res) =>{
    try{
        await Project.findOneAndDelete(req.params.id);
        res.status(200).json({
            "message": "Registro eliminado"
        })

   }catch(e){
       res.status(401).json({
           "message": "Registro no eliminado",
           "error": e
       })
   }
}





let contenido = async (req) => {
    const {title, content, url } =req.body //falta validar
    const user = await User.findById(req.userId, { password:0 });
    if(title && content && url && user){
        let autor = {
            id: user._id,
            username: user.name
        }

        let entrada = {
            title, content, url, autor
        };
        return entrada;
    }   
}

module.exports = projectController;