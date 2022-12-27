const bycript = require('bcryptjs');

const hashPassword = (password) => {
    const salt = bycript.genSaltSync();
    return bycript.hashSync(password, salt);
}

const comparePassword = (raw, hash) => {
    return bycript.compare(raw, hash);
}

module.exports = {
    hashPassword, 
    comparePassword
}

/*
const bycript = require('bcryptjs');

const hashPassword = (password) => {
    const salt = bycript.genSaltSync();
    return bycript.hashSync(password, salt);
}

const comparePassword = (raw, hash) =>{
    return bycript.compare(raw, hash);
}

module.exports = { 
    hashPassword,
    comparePassword,
}

*/