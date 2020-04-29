//some code comes from: https://www.simplecode.io/blog/create-a-rest-api-part-3-user-registration-and-validation/

const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const database = require("../../connection");

//validate registration form fields
const checkRegistrationFields = require("../../validation/register");

//authenticate and validate login fields
const jwt = require("jsonwebtoken");
const secrets = require("../../utilities/secrets");
const validateLoginInput = require("../../validation/login");

//import model
const Users = require("../models/userModel");

//CREATE USER
//not sure how to split it up into a model/route
router.post("/register", (req, res) => {
  //res.send({message: 'IT LIVES!!'})
  //validates form fields
  const { error, isValid } = checkRegistrationFields(req.body);

  //return 400 error if entries are invalid
  if (!isValid) {
    return res.status(400).json(error);
  }

  //hash password
  bcrypt.genSalt(8, (err, salt) => {
    if (err) throw err;
    bcrypt.hash(req.body.password, salt, (err, hash) => {
      if (err) throw err;
      database("users")
        .returning(["id", "email", "username"])
        .insert({
          username: req.body.username,
          email: req.body.email,
          password: hash,
          goal: req.body.goal,
          goal_startdate: req.body.goal_startdate,
          goal_enddate: req.body.goal_enddate,
        })
        .then((user) => {
          res.status(200).json(user[0]);
        })
        .catch((err) => {
          res.status(500).json({
            message: "Failed to create new user.",
          });
        });
    });
  });
});

//GET ALL USERS
router.get("/org", (req, res) => {
  Users.getUsers()
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((err) => {
      res.status(500).json({
        message: "Failed to retrieve users",
      });
    });
});

//GET USER BY ID
router.get("/:userId", (req, res) => {
  const userID = req.params.id;
  Users.getUserById(userId)
    .then((users) => {
      const user = users[0];
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({
          message: "Could not find user with given id.",
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: "Failed to get user",
      });
    });
});

//UPDATE USER
//returns empty object - not working properly
router.put("/:userId", (req, res) => {
  const updatedUser = req.body;
  Users.findBy(req.params.id, updatedUser)
    .then((user) => {
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({
          message: "Could not find user with given id",
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: err,
      });
    });
});

//DELETE USER
router.delete("/:userId", (req, res) => {
  const { userId } = req.params;
  Users.deleteUser(userId)
    .then((user) => {
      res.status(200).json({
        message: "User deleted",
      });
    })
    .catch((err) => {
      res.status(500).json({ err });
    });
});

//USER LOGIN
router.post("/login", (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  } else {
    let { email, password } = req.body;
    Users.findBy({ email })
      .first()
      .then((user) => {
        if (user && bcrypt.compareSync(password, user.password)) {
          const token = generateToken(user);
          res.status(200).json({
            message: `Welcome ${user.email}!`,
            token,
          });
        } else {
          res.status(401).json({
            message: "Invalid Credentials",
          });
        }
      })

      .catch((err) => {
        res.status(500).json(err);
      });
  }
});

function generateToken(user) {
  const payload = {
    subject: user.id,
    email: user.email,
  };

  const options = {
    expiresIn: "1d",
  };
  return jwt.sign(payload, secrets.jwtSecret, options);
}

module.exports = router;
