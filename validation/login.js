const reg = require('./regex');
const ifEmpty = require('./checkForEmpty');

module.exports = function validateLoginInput(user){
    let errors = {};

    let data = {...user}

    data.email = ifEmpty(data.email) ? data.email : "";
    data.password = ifEmpty(data.password) ? data.password : "";

    if (reg.test(data.email)){
        errors.email = "Invalid Email";
    }
    if (data.password = ""){
        errors.password = "No password provided"
    }

    return{
        errors,
        isValid: ifEmpty(errors)
    };
};