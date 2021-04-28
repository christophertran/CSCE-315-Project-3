const express = require('express');
const router = express.Router();

const nodemailer = require("nodemailer");

const backend = require('../backend/backend');
const bk = new backend();

router.get('/', (req, res) => {
    res.render('landing');
});

const states = {
    "AL": "Alabama",
    "AK": "Alaska",
    "AS": "American Samoa",
    "AZ": "Arizona",
    "AR": "Arkansas",
    "CA": "California",
    "CO": "Colorado",
    "CT": "Connecticut",
    "DE": "Delaware",
    "DC": "District Of Columbia",
    "FM": "Federated States Of Micronesia",
    "FL": "Florida",
    "GA": "Georgia",
    "GU": "Guam",
    "HI": "Hawaii",
    "ID": "Idaho",
    "IL": "Illinois",
    "IN": "Indiana",
    "IA": "Iowa",
    "KS": "Kansas",
    "KY": "Kentucky",
    "LA": "Louisiana",
    "ME": "Maine",
    "MH": "Marshall Islands",
    "MD": "Maryland",
    "MA": "Massachusetts",
    "MI": "Michigan",
    "MN": "Minnesota",
    "MS": "Mississippi",
    "MO": "Missouri",
    "MT": "Montana",
    "NE": "Nebraska",
    "NV": "Nevada",
    "NH": "New Hampshire",
    "NJ": "New Jersey",
    "NM": "New Mexico",
    "NY": "New York",
    "NC": "North Carolina",
    "ND": "North Dakota",
    "MP": "Northern Mariana Islands",
    "OH": "Ohio",
    "OK": "Oklahoma",
    "OR": "Oregon",
    "PW": "Palau",
    "PA": "Pennsylvania",
    "PR": "Puerto Rico",
    "RI": "Rhode Island",
    "SC": "South Carolina",
    "SD": "South Dakota",
    "TN": "Tennessee",
    "TX": "Texas",
    "UT": "Utah",
    "VT": "Vermont",
    "VI": "Virgin Islands",
    "VA": "Virginia",
    "WA": "Washington",
    "WV": "West Virginia",
    "WI": "Wisconsin",
    "WY": "Wyoming"
};

const affiliations = {
    "R": "Republican",
    "D": "Democrat"
}

const genders = {
    "M": "Male", 
    "F": "Female"
}

router.get('/politicians', (req, res) => {
    res.render('politicians');
});

router.get('/allpoliticians', (req, res) => {
    bk.getCongressMembersNamesOrganizedByState().then((members) => {
        res.json(members);
    });
});

router.get('/voting', (req, res) => {
    res.render('voting');
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
            var timeout = setTimeout(() => {
                console.log(`Unable to find articles for ${req.query.politicianName.toLowerCase()}`);
                return res.render("politician", { info: info, articles: [], searchInput: req.query.politicianName, states: states, affiliations: affiliations, genders: genders });
            }, 20 * 1000); // Timeout in 20 seconds.

            bk.getArticlesByName(req.query.politicianName.toLowerCase(), 20).then((articles) => {
                clearTimeout(timeout);
                return res.render("politician", { info: info, articles: articles, searchInput: req.query.politicianName, states: states, affiliations: affiliations, genders: genders });
            }).catch((error) => {
                console.error(error);
            });
        } else {
            return res.render("politician_dne", { searchInput: req.query.politicianName });
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
        console.log("Mail server is ready");
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