var express = require('express');
var router = express.Router();

const db = require('../db');

/* GET home page. */
router.get('/', function(req, res, next) {
  db.query(`
    select * from members;
  `)
    .then((result)=>{
      res.render('index', {
        members:result
      });
    });
  });
module.exports = router;
