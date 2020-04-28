const mongoose = require('mongoose');

const connexion = async () =>{
    try{    
        await mongoose.connect('mongodb://localhost/porfolio-angular',{
            useNewUrlParser: true, useUnifiedTopology:true, useFindAndModify: false
        });
    
        console.info(`Connected to database on Worker process: ${process.pid}`)

    }catch{
        console.error(`Connection error: ${error.stack} on Worker process: ${process.pid}`)
        process.exit(1)
    }
     
}

connexion();