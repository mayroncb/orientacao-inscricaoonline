module.exports = function(app){

    app.get('/', function(req, res) {
        var login = {};
        console.log("req.user")
        console.log(req.user)
        if (req.user) {
                login = req.user;
        }
        res.render('blank', {"username": login})
    })

}
