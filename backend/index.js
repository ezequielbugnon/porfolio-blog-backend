const express = require('express');
        app = express();
        morgan = require('morgan');
        verify = require('../backend/middleware/verify');
        multer = require('multer'); 
        path = require('path');
        uuid = require('uuid');
       cors = require('cors');
require('dotenv').config();

        

app.set('port', 3000 || process.env.PORT);
require('./database');


app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//storge imagenes
const storage = multer.diskStorage({
    destination: path.join(__dirname, 'public/img/uploads'),
    filename: (req, file , cb, filename) =>{
        
        cb(null, uuid() + path.extname(file.originalname));
    }
});

app.use(cors());



app.use(multer({storage}).single('image'))

app.use('/api-porfolio', require('./routes/user'));
app.use('/api-porfolio', require('./routes/entrada'));
app.use('/api-porfolio', require('./routes/project'));


app.listen(app.get('port'), () =>{
    console.log('server on port');
});

