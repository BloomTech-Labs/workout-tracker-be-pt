const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

const {generateToken, verifyToken} = require('../../utilities/jwt');
//import model
const Users = require('../models/userModel');

//GET ALL USERS
router.get('/org', (req, res) => {
    Users.getUsers()
        .then(user => {
            res.status(200).json(user);
        })
        .catch(err => {
            res.status(500).json({
                message: "Failed to retrieve users"
            });
        });
});

//GET USER BY ID
router.get('/:id', (req, res) => {
    const id = req.params.id
    console.log(req.params.id)
    Users.getUserById(id)
        .then(users => {
            const user = users[0];
            if(user){
                res.status(200).json(user);
            } else {
                res.status(404).json({
                    message: 'Could not find user with given id.'
                });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                message: 'Failed to get user'
            });
        });
});

//UPDATE USER
//returns empty object - not working properly
router.put('/:userId', (req, res) => {
    const updatedUser = req.body;
   Users.findBy(req.params.id, updatedUser)
        .then(user => {
            if(user) {
                res.status(200).json(user);
            } else {
                res.status(404).json({
                    message: 'Could not find user with given id'
                });
            }
        })
        .catch(err => {
            res.status(500).json({
                message: err
            });
        });
});

//DELETE USER
router.delete('/:userId', (req, res) => {
    const { userId } = req.params;
        Users.deleteUser(userId)
        .then(user => {
            res.status(200).json({
                message: 'User deleted'
            })
        })
        .catch(err => {
            res.status(500).json({err})
        })
})

module.exports = router;