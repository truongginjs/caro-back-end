const express = require('express');
const router = express.Router();

router.get('/', function (req, res, next) {
    const { email, realname } = req.user
    res.json({
        email, realname
    });
});

module.exports = router;