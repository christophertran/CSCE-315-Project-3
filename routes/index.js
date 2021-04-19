const express = require('express');
const router = express.Router();

const nodemailer = require("nodemailer");

const backend = require('../backend/backend');
const bk = new backend();

router.get('/', (req, res) => {
    res.render('landing');
});

router.get('/politicians', (req, res) => {
    bk.getCongressMembersNamesOrganizedByState().then((members) => {
        res.render('politicians', { members: members });
    });
});

router.get('/about', (req, res) => {
    res.render('about');
});

router.get('/contact', (req, res) => {
    res.render('contact');
});

router.get('/faq', (req, res) => {
    res.render('faq');
});

router.get('/settings', (req, res) => {
    res.render('settings');
});

router.get('/autocomplete', (req, res) => {
    bk.getCongressMembersNames().then((names) => {
        res.json(names);
    }).catch((error) => {
        console.error(error);
    });
});

router.get('/search', (req, res) => {
    bk.getCongressMembersOrganizedByName().then((members) => {
        const info = members[req.query.politicianName.toLowerCase()];
        if (info) {
            bk.getArticlesByName(req.query.politicianName.toLowerCase(), 20).then((articles) => {
                res.render("politician", { info: info, articles: articles, searchInput: req.query.politicianName });
            }).catch((error) => {
                console.error(error);
            });
        } else {
            res.render("politician_dne", { searchInput: req.query.politicianName });
        }
    }).catch((error) => {
        console.error(error);
    });
});

router.get('/state/senate/:stateAbbrev', (req, res) => {
    bk.getCongressSenateMemberNamesByState(req.params.stateAbbrev).then((names) => {
        res.json(names);
    });
});

router.get('/state/house/:stateAbbrev', (req, res) => {
    bk.getCongressHouseMemberNamesByState(req.params.stateAbbrev).then((names) => {
        res.json(names);
    });
});

const smtpTransport = nodemailer.createTransport({
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

router.post("/send", (req, res) => {
    const { name, subject, email, message } = req.body;
    const mail = {
        sender: `${name} <${email}>`,
        to: process.env.EMAIL,
        subject: subject,
        text: `${name} <${email}> \n${message}`
    }

    smtpTransport.sendMail(mail, (error, data) => {
        if (error) {
            console.error(error);
            req.flash('error', 'Something went wrong');
            res.redirect('back');
        } else {
            req.flash('success', 'Email successfully sent');
            res.redirect('back');
        }
    });
});

module.exports = router;