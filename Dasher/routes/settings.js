var express = require('express');
var router = express.Router();

const db = require('../db');


router.get('/:id', function(req, res, next) {
  db.query(`
    select username, nickname, location, reminder from users
    where userid=${req.params.id}
    ;
  `)
    .then((result)=>{
      useridd = req.params.id,
      res.render('settings',{
        title: 'Dasher | Settings', 
        id: useridd,
        user: result,
        layout:'settingslayout'
      });
    });
  });



router.post('/:id', function(req, res, next) {
  console.log(req.body);

  db.result(`
    UPDATE users 
    SET username = '${req.body.username}',
    nickname = '${req.body.nickname}',
    location = '${req.body.location}',
    reminder = '${req.body.reminder}'
    WHERE userid = '${req.params.id}'
    `).catch(console.log)
});

module.exports = router;