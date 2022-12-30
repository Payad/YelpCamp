const user = require('../models/user');
const User = require('../models/user');
// const passport = require('passport');

module.exports.renderRegister = (req, res) => {
    res.render('users/register');
}

module.exports.register =  async(req, res, next) => {
    // res.send(req.body);
    try {
    const {email, username, password} = req.body;
    const user = new User({email, username});
    const registeredUser = await User.register(user, password);
    req.login(registeredUser, (err) => {
        if(err) return next(err);
    // console.log(registeredUser);
    req.flash('success', 'Welcome to yelpcamp');
    res.redirect('/campgrounds');
})
    } catch (e) {
        req.flash('error', e.message);
        res.redirect('register');
    }
}

module.exports.renderLogin = (req, res) => {
    res.render('users/login')
}

module.exports.login = (req, res) => {
    const redirectUrl = req.session.returnTo || '/campgrounds'
    req.flash('success', 'Welcome back');
    delete req.session.returnTo;
    // res.redirect('/campgrounds')
    res.redirect(redirectUrl);
}

module.exports.logout = (req, res) => {
    // req.logout(function(err) {
    //     req.flash('success', 'Goodbuy')
    //     res.redirect('/campgrounds')
    // });
    req.logout();
    req.flash('success', 'Goodbuy');
    res.redirect('/campgrounds');
}