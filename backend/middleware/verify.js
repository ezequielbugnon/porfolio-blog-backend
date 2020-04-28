const jwt = require('jsonwebtoken');
require('dotenv').config();

async function verify(req, res , next){
    const token = req.headers['x-access-token'];
    if (!token) {
        return res.status(401).send({ auth: false, message: 'No token provided' });
    }
    // Decode the Tokenreq.userId = decoded.id;
    const decoded = await jwt.verify(token, process.env.CONFIG_SECRET);//porque el id fue guardado en sign
    
    req.userId = decoded.id;
    next();
}

module.exports = verify;