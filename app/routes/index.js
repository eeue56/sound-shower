var stream = require('./stream');
/*
 * GET client page.
 */

exports.client = function(req, res){
    res.render('client');
};

/*
 * GET a partial
 */

exports.partials = function(req, res) {
    var name = req.params.name;
    res.render('partials/' + name);
};

/*
 * GET device manager interface
 */

exports.admin = function(req, res) {
    res.render('admin');
};

/*
 * GET login for admins
 */

exports.login = function(req, res) {
    res.render('login');
};


exports.play = stream;