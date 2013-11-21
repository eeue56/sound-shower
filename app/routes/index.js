/*
 * GET home page.
 */

exports.index = function(req, res){
    res.render('index');
};

/*
 * GET a partial
 */

exports.partials = function(req, res) {
    var name = req.params.name;
    res.render('partials/' + name);
};

/*
 * GET session managing interface
 */

exports.manage = function(req, res) {
    res.render('manage');
};

/*
 * GET join session interface
 */

exports.join = function(req, res) {
    var sessionId = req.params.sessionId;
    if(typeof sessionId === 'undefined') {
        res.render('error', {
            
        });
    } else {
        res.render('join');
    }
};

/*
 * GET device manager interface
 */

exports.devices = function(req, res) {
    res.render('devices');
};

/*
 * GET login for admins
 */

exports.login = function(req, res) {
    res.render('login');
};
