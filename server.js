const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const expressLayouts = require("express-ejs-layouts")
// const LocalStrategy = require("passport-local");
// const passportLocalMongoose = require("passport-local-mongoose");

// initializes Express
let app = express();

// EJS
app.use(expressLayouts);
// app.engine("handlebars", exphbs({defaultLayout: "main"}));
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

// var exphbs = require("express-handlebars");


// DB configuration
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/littlemousememories";

mongoose.connect(MONGODB_URI, { useNewUrlParser: true })
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.log(err));

// routes
// var routes = ;
app.use("/", require("./controllers/index.js"));
app.use("/users", require("./controllers/users.js"));

// // how you use passport in express
// app.use(passport.initialize());
// // how to have persistent logins
// app.use(passport.session());

app.listen(PORT, () => {
    console.log("App running on localhost:" + PORT);
})