const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../models/user');
const { isLoggedIn } = require('../middleware/middleware');

router.get('/register', (req, res) => {
    res.render('users/register');
});

router.post('/register', async (req, res, next) => {
    try {
        const { email, username, password } = req.body;
        const user = new User({ email, username });
        const registerdUser = await User.register(user, password);

        req.login(registerdUser, (err) => {
            if (err) {
                return next(err);
            }

            req.flash('success', 'Welcome to PoliLime');
            res.redirect('/');
        });
    } catch (e) {
        req.flash('error', e.message);
        res.redirect('/register');
    }
});

router.get('/login', (req, res) => {
    res.render('users/login');
});

router.post('/login', passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), (req, res) => {
    req.flash('success', 'Welcome Back!');
    const redirectUrl = req.session.returnTo || '/';
    delete req.session.returnTo;
    res.redirect(redirectUrl);
});

router.get('/logout', (req, res) => {
    req.logout();
    req.flash('success', 'You have been logged out');
    res.redirect('/');
});

router.get('/favorites', isLoggedIn, async (req, res) => {
    try {
        res.render('users/favorites');
    } catch (e) {
        req.flash('error', e.message);
        res.redirect('/');
    }
});

router.post('/favorites', isLoggedIn, async (req, res) => {
    try {
        const { politicianName } = req.body;

        const user = await User.findById(req.user.id);
        user.favorites.push(politicianName);
        await user.save();

        req.flash('success', 'Successfully favorited ' + politicianName);
        res.redirect('back');
    } catch (e) {
        req.flash('error', e.message);
        res.redirect('/');
    }
});

router.delete('/favorites', isLoggedIn, async (req, res) => {
    try {
        const { politicianName } = req.body;
        await User.findByIdAndUpdate(req.user.id, { $pull: { favorites: politicianName } });

        req.flash('success', 'Successfully unfavorited ' + politicianName);
        res.redirect('back');
    } catch (e) {
        req.flash('error', e.message);
        res.redirect('/');
    }
});

module.exports = router;