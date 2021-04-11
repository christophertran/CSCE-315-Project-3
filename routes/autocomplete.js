const express = require('express');
const router = express.Router();

const backend = require('../backend/backend');
const bk = new backend();

router.get('/', (req, res) => {
    bk.getNamesFromDatabase().then((names) => {
        res.json(names);
    }).catch((error) => {
        console.error(error);
    });
    bk.disconnect();
});

module.exports = router;