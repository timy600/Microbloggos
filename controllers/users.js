const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const User = require('../models/user');
const bodyParser = require('body-parser');
//const mongoose = require('mongoose'); //mongo connection
//const methodOverride = require('method-override'); //used to manipulate POST

// Register
exports.register = function(req, res) {
  let newUser = new User ({
    name: req.body.name,
    email: req.body.email,
    username: req.body.username,
    password: req.body.password,
    description: req.body.description,
    following: req.body.following,
    registered_since: req.body.registered_since
  });
  User.addUser(newUser, (err, user) => {
    if(err) {
      res.json({success: false, msg: 'Failed to register user, msg d erreur '+ err});
    } else {
      res.json({success: true, msg: 'User registered'});
    }
  });
}

// Authenticate
exports.login = function(req, res) {
  const username = req.body.username;
  const password = req.body.password;

  User.getUserByUsername(username, (err, user) => {
    if (err) throw err;
    if (!user){
      return res.json({success: false, msg: 'User not found'});
    }
    User.comparePassword(password, user.password, (err, isMatch) => {
      if (err) throw err;
      if (isMatch) {
        const token =jwt.sign({data: user}, config.secret, {
          expiresIn: 604800 // 1 week
        });
        res.json({
          success: true,
          token: 'JWT '+token,
          user: {
            id: user._id,
            name: user.name,
            username: user.username,
            email: user.email
          }
        })
      } else {
        return res.json({success: false, msg: 'wrong password'});
      }
    });
  });
}


// Profile
exports.userReadProfile = function(req, res) {
  res.json({user: req.user});
}

// List
exports.usersReadAll = function(req, res) {
  User.find({}, function(err, users) {
    res.send(users);
  });
}
