//import express
const express = require('express');

//import router middleware
const router = express.Router();

router.get('/', (req, res) => {
    res.status(200).json({message: 'IT LIVES!!'})
})

//export router
module.exports = router;