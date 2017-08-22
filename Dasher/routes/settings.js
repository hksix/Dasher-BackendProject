var express = require('express');
var router = express.Router();

const db = require('../db');


router.get('/:id', function(req, res, next) {
  db.query(`
    select username, nickname, location, timezone from users
    where userid=${req.params.id}
    ;
  `)
    .then((result)=>{
      res.render('settings',{
        title: 'Dasher | Settings', 
        layout:'settingslayout', 
        user: result
      });
    });
  });

router.post('/:id', function(req, res, next) {
  console.log(req.body);

  db.result(`
    INSERT INTO users (username, nickname, location, timezone)
      '${req.body.username}',
      '${req.body.nickname}',
      '${req.body.location}',
      '${req.body.timezone}',
      DEFAULT,
      );
  `).catch(console.log)
});

module.exports = router;