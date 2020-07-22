const express = require('express');
const router = express.Router();
const workoutMiddleware = require('../../validation/middleware/workout-middleware');

//import model
const entity = require('../models/entityModel');

//const user_id = req.userId;
//const id = req.params.id

router.get('/', (req, res) => { 
    entity.getPublic().then(response =>{
        res.status(200).json({message: response})
    })
    .catch(err =>{
        console.log(err);
    })
})

module.exports = router;