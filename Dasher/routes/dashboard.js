var express = require('express');
var router = express.Router();
const db = require('../db');

/* GET dashboard page. */
router.get('/', function(req, res, next) {
  db.query(`
    select * from users;
  `)
    .then((result)=>{
      res.render('dashboard',{
        title: 'Dasher | Dashboard', 
        layout:'dashlayout', 
        users: result
      });
    });
  });

module.exports = router;
