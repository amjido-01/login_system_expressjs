const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const passport = require('passport')

// user model
const User = require('../model/User')

// Login Page
router.get('/login', (req, res) => {
    res.render('login');
});

// Registers Page
router.get('/register', (req, res) => {
    res.render('register')
})

// Handling Rigister
router.post('/register', (req, res) => {
    const {name, email, password, password2} = req.body;
    let errors = [];

    // check for required fields
    if (!name || !email || !password || !password2) {
        errors.push({
            msg: 'please fill in the input'
        });
    }

    // check if password matched
    if (password !== password2) {
        errors.push({
            msg: 'password dont match'
        });
    }

    // check if password is less than 6
    if (password.length < 6) {
        errors.push({
            msg: 'password must be atleast 6 characters'
        })
    }

    if (errors.length > 0) {
        res.render('register', {
            errors: errors,
            name: name,
            email: email,
            password: password,
            password2: password2
        })
    } else {
        // validation passed
        User.findOne({email: email}).then((user) => {
            console.log('see' + user);
            if(user) {
                errors.push({
                    msg: 'email already registered'
                });
                res.render('register', {
                    errors: errors,
                    name: name,
                    email: email,
                    password: password,
                    password2: password2
                })
            } else {
                const newUser = new User({
                    name: name,
                    email: email,
                    password: password
                })

               
                // hash password before saving to the database
                bcrypt.genSalt(10, (err, salt) => 
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) throw err;

                        // turn password to hash 
                        newUser.password = hash;

                        // save
                        newUser.save().then((value)=> {
                            console.log(value);
                            req.flash('success_msg', 'You are now registered, you can login!')
                            res.redirect('/users/login')
                        }).catch(value => {
                            console.log(value)
                        })
                        
                    }));
            }
        })
    }

});

// Handling login
router.post('/login', (req, res, next) =>{
    passport.authenticate('local',{
        successRedirect : '/dashboard',
        failureRedirect : '/users/login',
        failureFlash : true,
        })(req,res,next);
})

module.exports = router;