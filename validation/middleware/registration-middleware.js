const validateRegistration = require('../register');

module.exports = (req, res, next) =>{
    console.log(req.body)
    const user = req.body
    const { error, isValid } = validateRegistration(user);

    //return 400 error if entries are invalid
    if(isValid){
        res.status(400).json(error);
    } else {
        next();
    }
}