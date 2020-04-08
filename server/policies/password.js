const bcrypt = require('bcrypt');
const pass = {};

pass.encryptPassword = async (US_PASS) => {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(US_PASS, salt);
    return hash;
};

pass.machPassword = async (US_PASS, savePassword) => {
    try{
        return await bcrypt.compare(US_PASS, savePassword);
    } catch(e){
        console.log(e);
    }
};

module.exports = pass;
