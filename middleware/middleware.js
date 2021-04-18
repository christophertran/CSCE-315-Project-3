module.exports.isLoggedIn = (req, res, next) => {
    if (!res.isAuthenticated()) {
        req.session.returnTo = req.originalUrl;
        req.flash('error', 'You must be signed in first!');
        return res.redirect('/login');
    }

    next();
}