const bycript = require('bcryptjs');

const hashPassword = (password) => {
    const salt = bycript.genSaltSync();
    return bycript.hashSync(password, salt);
}

const comparePassword = async (raw, hash) => {
    console.log(`raw: ${raw} hash: ${hash} ${bycript.compare(raw, hash)}`)
    return await bycript.compare(raw, hash);
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