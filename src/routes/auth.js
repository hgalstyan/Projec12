"use strict";
const express = require("express");
const router = express.Router();
const passport = require("../middlewares").passport;
const User = require("../models/User");

router.get("/", (req, res, next)=>{
    res.render("auth");
});

router.get("/google",passport.authenticate("google", {
    scope: ["profile"]
}));

router.get("/google/redirect",passport.authenticate("google"),(req,res,next)=>{
    res.redirect("/");
});

router.get("/facebook",passport.authenticate("facebook"));

router.get("/facebook/redirect",passport.authenticate("facebook"),(req,res,next)=>{
    res.redirect("/");
});

module.exports =router;