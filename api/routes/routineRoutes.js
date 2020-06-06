const express = require('express');
const router = express.Router();

//import model
const routines = require('../models/routineModel');
//middleware
const routineMiddleware = require('../../validation/middleware/routine-middleware');

router.get('/', (req, res) =>{
    const id = req.userId;

    routines.getRoutines(id)
        .then(work =>{
            res.status(200).json({message: work})  
        })
        .catch(err =>{
            console.log(err);
            res.status(500).json({message: err})
        })
})

router.get('/:id', (req, res) =>{
    const user_id = req.userId;
    const id = req.params.id

    routines.getRoutine(id, user_id)
        .then(routine =>{
            res.status(200).json({message: routine})
        })
        .catch(err =>{
            res.status(500).json({message: err})
        })
})

router.post('/', routineMiddleware, (req, res) =>{
    const routine = req.body;
    routine.user_id = req.userId;

    routines.addRoutine(routine)
        .then(work =>{
            res.status(200).json({message: work})  
        })
        .catch(err =>{
            console.log(err);
            res.status(500).json({message: err})
        })
})

router.post('/:id', (req, res) =>{
    const id = req.params.id;
    const user_id = req.userId;
    const connection = req.body;

    connection.routines_id = id;

    routines.addWorkoutToRoutine(connection, user_id)
        .then(routine =>{
            res.status(200).json({message: routine})
        })
        .catch(err =>{
            console.log(err);
            res.status(500).json({message: err})
        })
})

router.put('/:id', (req, res) =>{
    const routine = req.body;
    const id = req.params.id
    routine.user_id = req.userId;

    routines.editRoutine(id, routine)
        .then(response =>{
            res.status(200).json({message: response})
        })
        .catch(err =>{
            res.status(500).json({message: err})
        })
})

router.delete('/:id', (req, res) =>{
    const id = req.params.id
    const user_id = req.userId;

    routines.deleteRoutine(id, user_id)
        .then(routine =>{
            res.status(200).json({message: routine})
        })
        .catch(err =>{
            res.status(500).json({message: err})
        })
})

router.delete('/workout/:id', (req, res) =>{
    const {workout_id} = req.body;
    const user_id = req.userId;
    const id = req.params.id

    routines.deleteWorkoutInRoutine(id, user_id, workout_id)
        .then(del =>{
            res.status(200).json({message: del})
        })
        .catch(err =>{
            res.status(500).json({message: err})
        })
})

module.exports = router;