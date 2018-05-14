const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const User = require('../models/user');
const bodyParser = require('body-parser');
const ctrlUsers = require('../controllers/users');
const ctrlMessages = require('../controllers/messages');

// Index Route
router.get('/', (req, res) => {
  res.send('invalid endpoint');
});

/*-----------------USERS-----------------*/
router.get('/users/list', ctrlUsers.usersReadAll);
router.get('/users/profile', passport.authenticate('jwt', {session:false}), ctrlUsers.userReadProfile);
/*
router.put('/users/profile/:userid', ctrlUsers.usersUpdateOne);
router.delete('/users/profile/:userid', ctrlUsers.usersDeleteOne);
*/
/*-----------------MESSAGES-----------------*/
router.get('/messages/list', ctrlMessages.messagesReadAll);
//router.get('/messages/:msgid', ctrlMessages.messagesReadOne);
router.post('/publish', ctrlMessages.messagePublish);
//router.put('/messages/:msgid', ctrlMessages.usersUpdateOne);
//router.delete('/messages/:msgid', ctrlMessages.usersDeleteOne);

/*-----------------AUTH-----------------*/
router.post('/register', ctrlUsers.register);
router.post('/authenticate', ctrlUsers.login);

router.get('*', (req, res) => {
  res.send("yololo");
  //res.sendFile(path.join(__dirname, 'public/index.html'));
});


module.exports = router;
