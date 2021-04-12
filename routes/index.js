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

module.exports = router;