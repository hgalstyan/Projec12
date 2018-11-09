"use strict";
const express = require("express");
const router = express.Router();
const yelp = require("../middlewares").yelp;
const isAuthenticated = require("../middlewares").isAuthenticated;
const User = require("../models/User");

router.get("/",isAuthenticated,(req,res,next)=>{
    User.findById(req.user).exec((err, user)=>{
        if(err) return next(err);
        res.locals.name = user.name;
        res.render("index");
    });
});

router.get("/upload", (req, res,next)=>{
    User.findById(req.user).exec((err, user)=>{
        if(err) return next(err);
        res.send(user.places);
    }); 
})

router.post("/delete",(req,res,next)=>{
    console.log(req.body);
    User.findById(req.user, function(err, user){
        if(err) return next(err);
        user.places.pull(req.body.id);
        user.save();
        res.send(user);
    });
});



const map = require("./map");
router.use("/map", map);

const auth = require("./auth");
router.use("/auth", auth);

const pubs = require("./pubs");
router.use("/pubs", pubs);


module.exports = router;
