const jwt = require('jsonwebtoken');
const {jwtSecret, jwtPublic} = require('./secrets');

function generateToken(user){
    console.log(jwtSecret);
    const payload = {
        subject: user.id,
        email: user.email
    };

    const options = {
        issuer: 'Workout Tracker',
        subject: user.username,
        audience: 'WorkoutTracker.com',
        expiresIn: '24h',
        algorithm: 'RS256'
    };

    return jwt.sign(payload, jwtSecret, options);
}

function verifyToken(user, token){

    const verifyOptions = {
        issuer: 'Workout Tracker',
        subject: user.id,
        audience: 'WorkoutTracker.com',
        maxAge: '24h',
        algorithm: ["RS256"]
    }

    return jwt.verify(token, jwtPublic, verifyOptions);
}

module.exports = {
    generateToken,
    verifyToken
}