
//Here where all middlewares accessed
const isUser = require("./isUser");
module.exports.isUser = isUser;

const loggedOut = require("./loggedOut");
module.exports.loggedOut = loggedOut;

const isAuthenticated = require("./isAuthenticated");
module.exports.isAuthenticated = isAuthenticated

const yelp = require("./yelp");
module.exports.yelp = yelp;

const passport = require("./passport");
module.exports.passport = passport;

