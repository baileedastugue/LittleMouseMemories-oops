require('dotenv').config();

// back-end framework
const express = require('express');
const logger = require('morgan');
// ORM to interact with MongoDB database
const mongoose = require('mongoose');
const session = require('express-session');
const cors = require('cors');
const fileupload = require('express-fileupload');

// initializes Express
let app = express();

app.use(
     fileupload({
          useTempFiles: true,
     })
);

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

// app.use(express.static(__dirname, '/public'));

// DB configuration
var MONGODB_URI =
     process.env.MONGODB_URI ||
     `mongodb://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@ds117899.mlab.com:17899/heroku_28bkr9pp`;
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

// Use Routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/albums', require('./routes/api/albums'));
app.use('/api/pictures', require('./routes/api/pictures'));
app.use('/api/prompts', require('./routes/api/prompts'));

app.listen(PORT, () => {
     console.log('App running on localhost:' + PORT);
});
