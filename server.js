// back-end framework
const express = require('express');
const logger = require('morgan');
// ORM to interact with MongoDB database
const mongoose = require('mongoose');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
const cors = require('cors');

// initializes Express
let app = express();

let PORT = process.env.PORT || 5000;

app.use(cors());

// use morgan logger for logging requests
app.use(logger('dev'));

// parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
if (process.env.NODE_ENV === 'production') {
     app.use(express.static('client/build'));
}

app.use(express.static(__dirname + '/public'));
app.set('views', __dirname + '/public/views');

// DB configuration
var MONGODB_URI =
     process.env.MONGODB_URI || 'mongodb://localhost/littlemousememories';
mongoose
     .connect(MONGODB_URI, {
          useNewUrlParser: true,
          useCreateIndex: true,
          useFindAndModify: false,
          useUnifiedTopology: true,
     })
     .then(() => console.log('MongoDB connected'))
     .catch((err) => console.log(err));

// express session
app.use(
     session({
          secret: 'keyboard cat',
          resave: true,
          saveUninitialized: true,
     })
);

// connects flash
app.use(flash());

// Global variables
app.use(function (req, res, next) {
     res.locals.success_msg = req.flash('success_msg');
     res.locals.error_msg = req.flash('error_msg');
     res.locals.error = req.flash('error');
     next();
});

// Use Routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/albums', require('./routes/api/albums'));
app.use('/api/pictures', require('./routes/api/pictures'));

app.listen(PORT, () => {
     console.log('App running on localhost:' + PORT);
});
