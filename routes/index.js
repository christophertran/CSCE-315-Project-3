const express = require('express');
const router = express.Router();

const backend = require('../backend/backend');
const bk = new backend();

router.get('/', (req, res) => {
    res.render('landing');
});

router.get('/about', (req, res) => {
    res.render('about');
})

router.get('/autocomplete', (req, res) => {
    bk.getNamesFromDatabase().then((names) => {
        res.json(names);
    }).catch((error) => {
        console.error(error);
    });
    bk.disconnect();
});

router.get('/search', (req, res) => {
    bk.getUserTwitterScreenNameByName(req.query.politicianName.toLowerCase()).then((screenName) => {
        bk.getArticlesByName(req.query.politicianName.toLowerCase(), 20).then((articles) => {
            res.render("politician", { articles: articles, screenName: screenName });
        }).catch((error) => {
            console.error(error);
        });
    }).catch((error) => {
        console.error(error);
    });
});

router.get('/state/:stateAbbrev', (req, res) => {
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

    bk.getNamesFromDatabaseByState(states[req.params.stateAbbrev]).then((politicians) => {
        res.json(politicians);
    });
});

module.exports = router;