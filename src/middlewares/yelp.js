const yelp = require("yelp-fusion");
const apiKey = require("../config/key").key.yelp;
const client = yelp.client(apiKey);

const yelpSearch = (req, res,next)=>{
    if(req.param.location !== ""){
        client.search({
            term:'Pubs',
            location: req.query.search
            }).then(response => {
                res.locals.pubs = response.jsonBody.businesses;
                res.locals.city = req.query.search;
                res.render("pub");
            }).catch(e => {
            console.log(e);
        });
    } else {
        res.redirect("/");
    }
}



module.exports = yelpSearch;