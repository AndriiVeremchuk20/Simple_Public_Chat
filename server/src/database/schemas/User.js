const {Schema, SchemaTypes, model} = require('mongoose');

const UserSchema = Schema({
    username:{
        type: SchemaTypes.String,
        required: true,
        unique: true,
    },
    email:{
        type: SchemaTypes.String,
        required: true,
    },
    avatarUrl: {
      type: SchemaTypes.String,
      required: false,  
    },
    password:{
        type: SchemaTypes.String,
        required: true,
    },
    createdAt: {
        type: SchemaTypes.Date,
        required: true,
        default: new Date(),
    },
    roles: [{type: SchemaTypes.String, ref: "roles", required: true}],
});

module.exports = model('users', UserSchema);
