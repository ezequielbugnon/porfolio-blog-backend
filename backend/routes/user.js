const router = require('express').Router();
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const verify = require('../middleware/verify');
require('dotenv').config();



router.post('/register', async(req, res) =>{

    try{
        const { name, apellido, email, password } = req.body;

        const user = new User({
            name, apellido, email, password
        })

        user.password = await user.encryptPassword(password);
        await user.save();
        //create token 
        const token = jwt.sign({ id: user.id}, process.env.CONFIG_SECRET,{
            expiresIn: 60 * 60 * 24 // expires in 24 hours
        });

        res.json({ auth: true, token });

    }catch (e){
        console.log(e)
        res.status(500).send('There was a problem registering your user');
    }


});

router.get('/me', verify,  async(req, res) =>{
    const user = await User.findById(req.userId, { password:0 });
    if(!user){
        return res.status(404).send("No user found.");
    }
    res.status(200).json(user);
});


router.post('/login', async (req, res) => {
    
    
    const user = await User.findOne({email: req.body.email})
    
    if(!user) {
        return res.status(404).send("The email doesn't exists")
    }
    const validPassword =  user.comparePassword(req.body.password, user.password);
    if (!validPassword) {
        return res.status(401).send({auth: false, token: null});
    }
    const token = jwt.sign({id: user._id}, process.env.CONFIG_SECRET, {
        expiresIn: 60 * 60 * 24
    });
    res.status(200).json({auth: true, token});
});

router.get('/logout', function(req, res) {
  res.status(200).send({ auth: false, token: null });
});




module.exports = router;