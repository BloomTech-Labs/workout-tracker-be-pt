require('dotenv').config();

module.exports = {
    jwtSecret: JSON.parse(`"${process.env.JWT_SECRET}"`) || "Peanut_Butter_Jelly_Time",
    jwtPublic: JSON.parse(`"${process.env.JWT_PUBLIC}"`) || "Test"
};