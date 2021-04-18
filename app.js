const express = require('express');
const app = express();

const mongoose = require('mongoose');

const session = require('express-session');

const flash = require('connect-flash');

const passport = require('passport');
const LocalStrategy = require('passport-local');

const User = require('./models/user');

mongoose.connect('mongodb+srv://dev:LI0aPyOQAwjg8sQD@cluster0.9yv30.mongodb.net/PoliLime?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    userCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: true
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error'));

// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }))

// parse application/json
app.use(express.json())

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

const sessionConfig = {
    secret: 'thisisasecret',
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}

app.use(session(sessionConfig));

app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
});

const indexRoutes = require('./routes/index');
app.use('/', indexRoutes);

const userRoutes = require('./routes/users');
app.use('/', userRoutes);

app.listen(process.env.PORT || 3000, process.env.IP, () => {
    console.log('PoliLime has been served.');
});