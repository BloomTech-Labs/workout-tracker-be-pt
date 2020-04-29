//import express and body-parser
const express = require("express");
const bodyParser = require("body-parser");

//set server constant to use express
const server = express();

//use body-parser for bodies with UTF-8 encoding
server.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

//parse json with body-parser
server.use(bodyParser.json());

//import Routes
const mainRoutes = require("./api/routes/mainRoute");
const userRoutes = require("./api/routes/userRoutes");

//set routes here
//main route
server.use("/", mainRoutes);

//user routes
server.use("/users", userRoutes);

module.exports = server;
