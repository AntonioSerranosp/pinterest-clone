const {Schema, model} = require('mongoose');
const ImageSchema = new Schema({
    title: {type: String},
    description: {type: String},
    path: {type: String},
    originalname: {type: String},
    mimetype: {type: String},
    size: {type: Number},
    created_at: {type: Date, default: Date.now()
    }
});
module.exports =  model('Image', ImageSchema);
