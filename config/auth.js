module.exports = { 
    ensureAuthenticated: function(req, res, next) {
        if (req.isAuthenticated()) {
            return next()
        }
        req.flash('error_msg', 'please login to view your dashboard');
        res.redirect('/users/login')
    }
}