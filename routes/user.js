const express = require('express');
const user = require('../models/user');
const router = express.Router();
const passport = require('passport');
const catchAsync = require('../utils/catchAsync');
const User = require('../models/user');
const users = require('../controllers/users')


router.route('/register')
.get(users.renderRegister)
.post(catchAsync(users.register))


router.route('/login')
.get(users.renderLogin)
.post(passport.authenticate('local', {failureFlash: true, failureRedirect: '/login', failureMessage: true, keepSessionInfo: true}), users.login)

// router.get('/register', users.renderRegister);

// router.get('/register', (req, res) => {
//     res.render('users/register')
// })

// router.post('/register', catchAsync(users.register))

// router.post('/register', async(req, res) => {
//     // res.send(req.body);
//     try {
//     const {email, username, password} = req.body;
//     const user = new User({email, username});
//     const registeredUser = await User.register(user, password);
//     req.login(registeredUser, (err) => {
//         if(err) return next(err);
//     // console.log(registeredUser);
//     req.flash('success', 'Welcome to yelpcamp');
//     res.redirect('/campgrounds');
// })
//     } catch (e) {
//         req.flash('error', e.message);
//         res.redirect('register');
//     }
// });

// router.get('/login', users.renderLogin)

// router.get('/login', (req, res) => {
//     res.render('users/login')
// })

// router.post('/login', passport.authenticate('local', {failureFlash: true, failureRedirect: '/login', failureMessage: true, keepSessionInfo: true}), users.login)

// router.post('/login', passport.authenticate('local', {failureFlash: true, failureRedirect: '/login', failureMessage: true, keepSessionInfo: true,}), (req, res) => {
//     const redirectUrl = req.session.returnTo || '/campgrounds'
//     req.flash('success', 'Welcome back');
//     delete req.session.returnTo;
//     // res.redirect('/campgrounds')
//     res.redirect(redirectUrl);
// })

router.get('/logout', users.logout)

// router.get('/logout', (req, res) => {
//     // req.logout(function(err) {
//     //     req.flash('success', 'Goodbuy')
//     //     res.redirect('/campgrounds')
//     // });
//     req.logout();
//     req.flash('success', 'Goodbuy');
//     res.redirect('/campgrounds');
// })

module.exports = router;