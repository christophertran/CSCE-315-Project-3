const express = require('express');
const router = express.Router();

const backend = require('../backend/backend');
const bk = new backend();

router.get('/', (req, res) => {
    res.render('landing');
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
    bk.getCongressMembers().then((members) => {
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

module.exports = router;