const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

// Message Schema
const MessageSchema = mongoose.Schema ({
  username: {
    type: String,
    required: true
  }, 
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  comments: [Number],
  hashtags: [Number],
  published: {
    type: Date,
    default: Date.now
  },
  updated: {
    type: Date,
    default: Date.now
  }
});

const Message = module.exports = mongoose.model('Message', MessageSchema);

/*
module.exports.getMessageById = function(id, callback) {
  User.findById(id, callback);
}
*/
module.exports.getMessageByUsername = function(username, callback) {
  const query = {username: username}
  Message.findOne(query, callback);
}

module.exports.addMessage = function(newMessage, callback) {
  newMessage.save(callback);
}

module.exports.getAllMessages = function() {
  Message.find();
}
