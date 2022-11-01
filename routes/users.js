const express = require('express');
const router = express.Router();

// handle user Login
router.get('/login', (req, res) => {
    res.render('login');
});

// handle Registers
router.get('/register', (req, res) => {
    res.render('register')
})

module.exports = router;