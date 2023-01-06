const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    username:{
        type: mongoose.SchemaTypes.String,
        required: true,
        unique: true,
    },
    email:{
        type: mongoose.SchemaTypes.String,
        required: true,
    },
    avatarUrl: {
      type: mongoose.SchemaTypes.String,
      required: false,  
    },
    password:{
        type: mongoose.SchemaTypes.String,
        required: true,
    },
    createdAt: {
        type: mongoose.SchemaTypes.Date,
        required: true,
        default: new Date(),
    },
});

module.exports = mongoose.model('user', UserSchema);
