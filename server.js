//import express and body-parser
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

//set server constant to use express
const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

//import Routes
const mainRoutes = require('./api/routes/mainRoute');
const registrationRoute = require('./api/routes/registrationRoute');
const userRoutes = require('./api/routes/userRoutes');
const dietRoute = require('./api/routes/dietRoute');
const mealplanRoute = require('./api/routes/mealplanRoute')
const workoutRoutes = require('./api/routes/workoutRoutes');
const routineRoutes = require('./api/routes/routineRoutes');
const followRoutes = require('./api/routes/followRoute');
const likeRoutes = require('./api/routes/likeRoute');
const commentRoutes = require('./api/routes/commentsRoute');
const entityRoutes = require('./api/routes/entityRoute');
const restricted = require('./validation/middleware/restricted-middlware');

//set routes here
//main route
server.use('/', mainRoutes);

//registration
server.use('/api', registrationRoute);

//user routes
server.use('/api/users', restricted, userRoutes);
server.use('/api/diets', restricted, dietRoute);
server.use('/api/mealplan', restricted, mealplanRoute)
server.use('/api/workouts', restricted, workoutRoutes);
server.use('/api/routines', restricted, routineRoutes);
server.use('/api/follow', followRoutes);
server.use('/api/likes', likeRoutes);
server.use('/api/comments', commentRoutes);
server.use('/api/feed', entityRoutes)

module.exports = server;
