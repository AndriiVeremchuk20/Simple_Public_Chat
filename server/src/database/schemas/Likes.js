const { Schema, SchemaTypes, model } = require('mongoose');

const LikesSchema = Schema({
    user: {
        type: SchemaTypes.ObjectId,
        required: true,
        ref: "users",
    },
    post: {
        type: SchemaTypes.ObjectId,
        required: true,
        ref: "posts",
    },
});

module.exports = model('likes', LikesSchema);
