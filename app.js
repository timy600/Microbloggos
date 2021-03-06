const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');
//const User = require('./models/user');

const app = express();

const indexRouter = require('./routes/index');

// Connect To Database (OLD CODE)
mongoose.connect(config.database);
// On Connection
mongoose.connection.on('connected', () => {
  console.log('Connected to Database '+config.database);
});
// On Error
mongoose.connection.on('error', (err) => {
  console.log('Database error '+err);
});


// Port Number
//const port = process.env.PORT || 8080;
const port = 8080;

// CORS Middleware
app.use(cors());

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

// Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));

// Body Parser Middleware
app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({extended: false}));

// Index Route
//app.use('/users', users);
app.use('/', indexRouter);

// Start Server
app.listen(port, () => {
  console.log('Server started on port '+port);
});
