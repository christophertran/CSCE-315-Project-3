const express = require('express');
const router = express.Router();

const backend = require('../backend/backend');
const bk = new backend();

router.get('/:name', (req, res) => {
    bk.getUserTwitterScreenNameByName(req.params.name).then((twitterHandle) => {
        res.json(twitterHandle);
    }).catch((error) => {
        console.error(error);
    });
});

module.exports = router;