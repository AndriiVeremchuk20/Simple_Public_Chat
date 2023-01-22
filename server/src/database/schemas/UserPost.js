const { Schema, SchemaTypes, model } = require('mongoose');

const UserPostShema = Schema({
    postedBy:{
        type: SchemaTypes.ObjectId,
        required: true,
        ref: 'users',
    },
    text:{
        type: SchemaTypes.String,
        required: true,
    },
    createdAt: {
        type: SchemaTypes.Date,
        required: true,
        default: new Date(),
    },
});

module.exports = model('posts', UserPostShema);