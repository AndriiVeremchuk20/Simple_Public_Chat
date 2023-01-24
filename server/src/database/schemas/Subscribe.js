const { Schema, SchemaTypes, model } = require('mongoose');

const SubscribeSchema = Schema({
    subscribed: {
        type: SchemaTypes.ObjectId,
        require: true,
        ref: 'users',
    },
    to: {
        type: SchemaTypes.ObjectId,
        require: true,
        ref: 'users',
    }
})

module.exports = model("subscriptions", SubscribeSchema);
