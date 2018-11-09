function isUser(req, res, next){
    if(req.session.userId === req.params.profileId){
        res.locals.isUser = true;
    } else res.locals.isUser = false;
    next();
}


module.exports = isUser;