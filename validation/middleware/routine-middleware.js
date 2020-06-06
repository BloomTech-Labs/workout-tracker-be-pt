const routineRegistration = require('../routine');

module.exports = (req, res, next) =>{
    console.log(req.body)
    const routine = req.body
    const { error, isValid } = routineRegistration(routine);

    //return 400 error if entries are invalid
    if(isValid){
        res.status(400).json(error);
    } else {
        next();
    }
}