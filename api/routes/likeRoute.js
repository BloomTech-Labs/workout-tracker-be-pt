const express = require('express');
const router = express.Router();
const likeDB = require('../models/likeModel.js');
const restricted = require('../../validation/middleware/restricted-middlware');

router.post('/:id', restricted, (req, res) => {
    const entity_id = req.params.id
    const user_id = req.userId;

    likeDB.addLike(entity_id, user_id)
    .then(id =>{
        res.status(201).json({message: id})
    })
    .catch(err =>{
        console.log(err);
        res.status(500).json({message: "There was an error adding ur like"})
    })
});

router.get('/:id', (req, res) => {
    const entity_id = req.params.id

    likeDB.getLikes(entity_id)
    .then(users =>{
        res.status(201).json({message: users})
    })
    .catch(err =>{
        res.status(500).json({message: "There was an error getting users for that entity"})
    })
});

router.delete('/:id', restricted, (req, res) =>{
    const entity_id = req.params.id
    const user_id = req.userId;

    likeDB.removeLikes(entity_id, user_id)
    .then(removed =>{
        res.status(201).json({message: removed})
    })
    .catch(err =>{
        res.status(500).json({message: "There was an error removing ur like from that entity"})
    })
});

module.exports = router;