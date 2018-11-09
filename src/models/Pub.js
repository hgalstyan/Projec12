const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const pubSchema = new Schema({
    name: String,
    location: {lat: Number, lon: Number},
    price: String,
    adress: String,
    phone: String,
    rating: Number,
    city: String
});

const Pubs = mongoose.model("Pub", pubSchema);

module.exports = Pubs;