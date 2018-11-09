"use strict";
const express = require("express");
const jsonParser = require("body-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
const routes = require("./routes/router")
const passport = require("./middlewares").passport;
const session = require("express-session");
const cookieParser = require("cookie-parser");
const MongoStore = require('connect-mongo')(session);
const app = express();
const cookieSession = require("cookie-session");


//mongoDB connection
mongoose.connect("mongodb://localhost:27017/PnB");
const db = mongoose.connection;

db.on("error", function(err){
	console.error("connection error:", err);
});

db.once("open", function(){
	console.log("db connection successful");
});

app.use(cookieSession({
    secret: "Luke, I am your father",
    maxAge: 24*60*60*1000,
    keys:["asdfasdfasdfasdf"]
}));



app.use(passport.initialize());
app.use(passport.session());



//Middlewares
app.use(jsonParser());
app.use(logger("dev"));
app.use(cookieParser("The biggest secret",
                    {pubsChecked: []}));

//Front-End
app.use('/', express.static('public'));
app.set('views', __dirname + '/views');
app.set('view engine', 'pug');

//Routing
app.use("/", routes);


//connection to port
const port = process.env.PORT || 3000;

app.listen(port,()=>{
    console.log("Express server is running on port: "+ port);
});

