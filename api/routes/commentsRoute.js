const express = require('express');
const Comments = require('../models/commentModel');
const restricted = require('../../validation/middleware/restricted-middlware');
const router = express.Router();

// Get a diet food entry by id
router.get('/get/:id', (req, res) => {
    const { id } = req.params;

    Comments.getAllByEntityId(id)
        .then(response =>{
            res.status(200).json({message: response});
        })
        .catch(err =>{
            console.log(err);
            res.status(500).json({message: "problem getting comments"})
        })
});

router.get('/number/:id', (req, res) =>{
    const { id } = req.params

    Comments.getNumberOfComments(id)
        .then(response =>{
            res.status(200).json({message: response})
        })
        .catch(err =>{
            console.log(err);
            res.status(500).json({message: "problem getting number of comments"})
        })
})

router.get('/users/:id', (req, res) =>{
    const id = req.params.id;

    Comments.getAllByUserId(id)
    .then(response =>{
        res.status(200).json({message: response})
    })
    .catch(err =>{
        console.log(err);
        res.status(500).json({message: "problem getting comments"})
    })
})

router.post('/:id', restricted, (req, res) => {
    const { id } = req.params;
    const user_id = req.userId;
    const body = req.body;

    Comments.add(user_id, id, body.comment_data)
    .then(response =>{
        res.status(200).json({message: response})
    })
    .catch(err =>{
        console.log(err);
        res.status(500).json({message: "Problem adding comment to database"})
    })
});

router.delete('/:id', restricted, (req, res) => {
    const { id } = req.params;
    const user_id = req.userId;

    Comments.remove(id, user_id)
    .then(response =>{
        res.status(200).json({message: response});
    })
    .catch(err =>{
        console.log(err);
        res.status(500).json({message: "Problem removing comment from db"})
    })
});

module.exports = router;