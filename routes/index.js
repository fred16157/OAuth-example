const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('index', {user: req.user, failed: req.params.failed} );
});

module.exports = router;