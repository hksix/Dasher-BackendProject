var express = require('express');
var router = express.Router();

const db = require('../db');

/* GET home page. */
router.get('/', function(req, res, next) {
  // db.query(`
  //   select * from users;
  // `)
    // .then((result)=>{
      res.render('index', {
        members:[]
      });
    // });
  });
module.exports = router;
