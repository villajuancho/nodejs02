var express = require('express');
var router = express.Router();
var user = require('./user');

router.use('/user', user);


router.get('/partidos', function(req, res) {
    var resp = {api: "PARTIDOS"};
    res.send(resp);
});

module.exports = router;
