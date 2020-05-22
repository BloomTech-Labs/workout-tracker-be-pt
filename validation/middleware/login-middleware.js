const validateLoginInput = require("../login");

module.exports = (req, res, next) =>{
    const { error, isValid } = validateLoginInput(req.body);

    //return 400 error if entries are invalid
    if (isValid){
        res.status(400).json(error);
    } else {
        next();
    }
}