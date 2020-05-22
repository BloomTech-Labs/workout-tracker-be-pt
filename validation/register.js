const reg = require('./regex');
const ifEmpty = require('./checkForEmpty');

module.exports = function checkRegistrationFields(user){
    //catches errors
    let error = {};

    let data = {...user}

    data.email = ifEmpty(data.email) ? data.email : "";
    data.password = ifEmpty(data.password) ? data.password : "";
    data.username = ifEmpty(data.username) ? data.username : "";

    if (reg.test(data.email)){
        error.email = "Invalid Email"
    }
    if (data.password = ""){
        error.password = "Password is required";
    }
    if (data.username = ""){
        error.username = "Username is required";
    }

    return {
        error,
        isValid: ifEmpty(error)
    };    
};