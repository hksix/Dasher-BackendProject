var express = require('express');
var router = express.Router();

const db = require('../db');
/* GET users listing. */
router.get('/', function(req, res, next) {
    res.render('index', {
    //   members:result
    });
  // res.send('respond with a resource');
});


module.exports = router;
