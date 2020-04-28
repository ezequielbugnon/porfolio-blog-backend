const mongoose = require('mongoose');
const {Schema} = mongoose;
const bcrypt = require('bcrypt');

const userSchema = new Schema({

    name:{ type: String, required: true},
    apellido:{type: String, required: true},
    email:{ type: String, required: true},
    password: { type: String, required: true},
    created_at: {type: Date, default: Date.now()}

})

userSchema.methods.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
};


userSchema.methods.comparePassword =  async function (password){
    let match = await bcrypt.compare(password, this.password);
    return match;
    
};

module.exports = mongoose.model('User', userSchema);

