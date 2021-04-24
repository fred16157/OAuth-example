const express = require('express');
const router = express.Router();
const passport = require('passport')

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }, (req, res) => {
    
}));

router.get('/google/callback', passport.authenticate('google'), (req, res) => {
    console.log(req.user);
});

module.exports = router;