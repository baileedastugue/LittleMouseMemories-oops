const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const expressLayouts = require("express-ejs-layouts")
const flash = require("connect-flash");
const session = require("express-session");
// const LocalStrategy = require("passport-local");
// const passportLocalMongoose = require("passport-local-mongoose");

// initializes Express
let app = express();

// EJS
app.use(expressLayouts);
app.set("view engine", "ejs");

let PORT = process.env.PORT || 5000;

// use morgan logger for logging requests
app.use(logger("dev"));

// parse request body as JSON
app.use(express.urlencoded({extended: true}));
app.use(express.json());
if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
}

app.use(express.static(__dirname + "/public"));
app.set('views', __dirname + '/public/views');

// DB configuration
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/littlemousememories";
mongoose.connect(MONGODB_URI, { useNewUrlParser: true })
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.log(err));

// express session
app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true,
}))

// connects flash
app.use(flash());

// Global variables
app.use(function(req, res, next) {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
  });

// routes
app.use("/", require("./controllers/index.js"));
app.use("/users", require("./controllers/users.js"));


app.listen(PORT, () => {
    console.log("App running on localhost:" + PORT);
})