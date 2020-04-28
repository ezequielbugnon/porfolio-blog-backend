const mongoose = require('mongoose');
const {Schema} = mongoose;


const projectSchema = new Schema({
    title:{type: String, required: true},
    content:{type: String, required: true},
    url:{type: String, required: true},
    created_at: {type: Date, default: Date.now()},
    autor:{
        id:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        username: String
    },
    image:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Image'
        }
    ]
})

module.exports = mongoose.model('Project', projectSchema);