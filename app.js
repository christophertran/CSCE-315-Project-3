if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}

const express = require('express');

//---- for contact us page
const nodemailer = require("nodemailer");
const multiparty = require("multiparty");
//-----

const app = express();


const methodOverride = require('method-override');

const mongoose = require('mongoose');

const session = require('express-session');

const flash = require('connect-flash');

const passport = require('passport');
const LocalStrategy = require('passport-local');

const User = require('./models/user');

const MongoDBStore = require("connect-mongo")(session);

const dbUrl = process.env.DB_URL;

mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    userCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: true
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error'));

db.once('open', () => {
    console.log("Database connected");
});

// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }))

// parse application/json
app.use(express.json())

app.use(methodOverride('_method'));

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

const secret = process.env.SECRET || 'thisisasecret'

const store = new MongoDBStore({
    url: dbUrl,
    secret: secret,
    touchAfter: 24 * 60 * 60
});

store.on('error', (error) => {
    console.error('Session store error', error);
})

const sessionConfig = {
    store: store,
    secret: secret,
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


  var smtpTransport = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // use SSL
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASS
    }
});
  
  // verify connection configuration
  smtpTransport.verify(function (error, success) {
    if (error) {
      console.log(error);
    } else {
      console.log("Server is ready to take our messages");
    }
  });
  
  app.post("/send", (req, res) => {
    let form = new multiparty.Form();
    let data = {};
    form.parse(req, function (err, fields) {
      console.log(fields);
      Object.keys(fields).forEach(function (property) {
        data[property] = fields[property].toString();
      });
      console.log(data);
      const mail = {
        sender: `${data.name} <${data.email}>`,
        to: process.env.EMAIL, // receiver email,
        subject: data.subject,
        text: `${data.name} <${data.email}> \n${data.message}`,
      };
      smtpTransport.sendMail(mail, (err, data) => {
        if (err) {
          console.log(err);
          res.status(500).send("Something went wrong.");
        } 
        else {
          res.status(200).send("Email successfully sent to recipient! Please go back to the previous screen");
        }
      });
    });
  });
  app.route("/").get(function (req, res) {
    res.sendFile(process.cwd() + "/views/contact.ejs");
  });
  

const port = process.env.PORT || 3000;
app.listen(port, process.env.IP, () => {
    console.log(`PoliLime has been served on port ${port}`);
});