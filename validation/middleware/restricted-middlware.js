const {verifyToken} = require('../../utilities/jwt');

module.exports = (req, res, next) =>{
    const user = req.body;
    const token = req.headers.authorization;

    if(token && verifyToken(user, token)){
        next();
    } else {
        res.status(403).json({message: 'You need to login'})
    }
}