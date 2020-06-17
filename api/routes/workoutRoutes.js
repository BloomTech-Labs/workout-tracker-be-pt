const express = require('express');
const router = express.Router();
const workoutMiddleware = require('../../validation/middleware/workout-middleware');

//import model
const workouts = require('../models/workoutModel');

// Gets all public workouts for a logged in user, toggle true/false
router.get('/public', (req, res) => {
    workouts.getPublicWorkouts()
        .then(workout => {
            res.status(200).json({ message: workout })
        })
        .catch(err => {
            res.status(500).json({ message: 'Error retrieving workouts', err })
        })
})

router.get('/', (req, res) =>{
    const id = req.userId;
    
    workouts.getWorkoutsByUser(id)
        .then(blah =>{
            res.status(200).json({message: blah})
        })
        .catch(err =>{
            res.status(500).json({message: err})
        })
})

router.get('/:id', (req,res) =>{
    const user_id = req.userId;
    const id = req.params.id
    workouts.getWorkoutById(id, user_id)
        .then(work =>{
            if(work){
                res.status(200).json({message: work})
            } else {
                res.status(401).json({message: "Workout with given id and userId does not exist"})
            }
        })
        .catch(err =>{
            res.status(500).json({message: err})
        })
})

router.post('/', workoutMiddleware, (req, res) =>{
    const workout = req.body;
    workout.user_id = req.userId;

    workouts.addWorkout(workout)
        .then(work =>{
            res.status(200).json({message: work})  
        })
        .catch(err =>{
            console.log(err);
            res.status(500).json({message: err})
        })
})

router.put('/:id', (req, res) =>{
    const workout = req.body;
    const id = req.params.id
    workout.user_id = req.userId;

    workouts.editWorkout(workout, id)
        .then(work =>{
            res.status(200).json({message: work})
        })
        .catch(err =>{
            res.status(500).json({message: err})
        })
})

router.delete('/:id', (req, res) =>{
    const id = req.params.id
    const user_id = req.userId;

    workouts.deleteWorkout(user_id, id)
        .then(work =>{
            res.status(200).json({message: work})
        })
        .catch(err =>{
            res.status(500).json({message: err})
        })
})

module.exports = router;