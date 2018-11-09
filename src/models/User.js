const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const placeSchema = new Schema({
    locations: [String],
    city: String,
    name: String,
    quantity: Number,  
});

const userSchema = new Schema({
    name: String,
    googleId: String,
    facebookId: String,
    places: [placeSchema],
});



const Users = mongoose.model("User", userSchema);

module.exports = Users;