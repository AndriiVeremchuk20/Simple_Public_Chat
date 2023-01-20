const {Schema, SchemaTypes, model} = require('mongoose');

const RolesSchema = Schema({
    value:{
        type: SchemaTypes.String,
        required: true,
        unique: true,
    },
});

module.exports = model('roles', RolesSchema);
