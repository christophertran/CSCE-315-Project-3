const express = require('express');
const router = express.Router();

const backend = require('../backend/backend');
const bk = new backend();

router.get('/:name', (req, res) => {
    bk.getArticlesByName(req.params.name, 2).then((articles) => {
        res.json(articles);
    }).catch((error) => {
        console.error(error);
    });
});

module.exports = router;