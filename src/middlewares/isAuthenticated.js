function isAuthenticated(req, res, next){
    console.log(req.user);
    if (req.user) {
        return next();
    } 
    res.redirect("/auth");
}

module.exports = isAuthenticated;