"use strict";
const express = require("express");
const router = express.Router();
const yelp = require("../middlewares").yelp;
const User = require("../models/User");
const isAuthenticated = require("../middlewares").isAuthenticated;
const sort = require("../middlewares/sort");


router.get("/", isAuthenticated, yelp);

router.post("/",(req,res,next)=>{
    User.findById(req.user, function(err, user){
        if(err) {
            err.status = 400;
            return next(err);
        }
        let pubs = [];
        for(let i in req.body){
            if(i !== "city") pubs.push(req.body[i]); 
        }
        pubs = sort(pubs);
        user.places.push({
            locations: pubs,
            city: req.body.city,
            name: req.body.name,
            quantity: pubs.length
        });
        user.save((err, user) => {
            if(err) return next(err);
        });
        res.redirect("/");
    });
});



module.exports = router;