"use strict";
const express = require("express");
const router = express.Router();
const User = require("../models/User");
const isAuthenticated = require("../middlewares").isAuthenticated;
const googleKey = require("../config/key").key.google;

router.get("/", isAuthenticated,(req,res,next)=>{
    User.findOne({_id:req.user}, function(err, user){
        if(err) return next(err);
        const place = user.places.id(req.query.l);
        res.locals.locations = place.locations;
        res.locals.city = place.city;
        res.locals.key = googleKey;
        res.render("map"); 
    });
    
})

module.exports = router;