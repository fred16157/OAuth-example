const express = require('express');
const session = require('express-session');
const app = express();
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const path = require('path');

app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(session({
    secret: 'OAuth-Example',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, './static')));

const config = require('./config.json');

//Google OAuth 설정
passport.use(new GoogleStrategy({
    clientID: config.google.clientID,
    clientSecret: config.google.clientSecret,
    callbackURL: config.google.callbackURL,
}, (accessToken, refreshToken, profile, callback) => {
    callback(accessToken, refreshToken, profile);
}));

app.use('/', require('./routes/index'));
app.use('/oauth/', require('./routes/oauth'));

app.listen(3000, () => {
    console.log("Listening on port 3000");
});