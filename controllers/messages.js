const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const Message = require('../models/message');
const bodyParser = require('body-parser');

// Message
exports.messagesReadOne = function(req, res) {
  res.json({message: req.message});
}

// List
exports.messagesReadAll = function(req, res) {
  Message.find({}, function(err, messages) {
    res.send(messages);
  });
}

// Publish message
exports.messagePublish = function(req, res) {
  let newMessage = new Message ({
    username: req.body.username,
    title: req.body.title,
    content: req.body.content,
    comments: req.body.comments,
    hashtags: req.body.hashtags,
    published: req.body.published,
    updated: req.body.updated
  });
  Message.addMessage(newMessage, (err, message) => {
    if(err) {
      res.json({success: false, msg: 'Failed to publish, msg d erreur '+ err});
    } else {
      res.json({success: true, msg: 'Message published'});
    }
  });
}
