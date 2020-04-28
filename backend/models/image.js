const mongoose = require('mongoose');
const {Schema} = mongoose;

const imageSchema = new Schema({
    filename: {type: String},
    path: {type: String},
    public_id:{type: String},
    originalname: {type: String},
    mimetype: {type: String},
    size: { type: Number},
    created_at: {type: Date, default: Date.now()},
    autor:{
        id:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        username: String
    }
})

module.exports = mongoose.model('Image', imageSchema);