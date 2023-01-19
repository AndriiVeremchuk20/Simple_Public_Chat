const { Schema, SchemaTypes, model } = require('mongoose');

const UserPostShema = Schema({
    user:{
        type: {},
        required: true,
        ref: 'user',
    },
    text:{
        type: SchemaTypes.String,
        required: true,
    },
    likes: {
        type: SchemaTypes.Number,
        required: true,
        default: 0,
    },
    createdAt: {
        type: SchemaTypes.Date,
        required: true,
        default: new Date(),
    },
});

module.exports = model('posts', UserPostShema);