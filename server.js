//import express and body-parser
const express = require('express');
const bodyParser = require('body-parser');

//set server constant to use express
const server = express();

//use body-parser for bodies with UTF-8 encoding
server.use(
    bodyParser.urlencoded({
        extended: true
    })
);

//parse json with body-parser
server.use(bodyParser.json());

//import Routes
const mainRoutes = require('./api/routes/mainRoute');
const registrationRoute = require('./api/routes/registrationRoute');
const userRoutes = require('./api/routes/userRoutes');
const restricted = require('./validation/middleware/restricted-middlware');

//set routes here
//main route
server.use('/', mainRoutes);

//registration
server.use('/api', registrationRoute)

//user routes
server.use('/api/users', restricted, userRoutes);

//set the port here
const port = process.env.PORT || 3000;

//return the HTTP server
server.listen(port, () => console.log(`Server is listening on port ${port}`));