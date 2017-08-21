var express = require('express');
var router = express.Router();

const db = require('../db');


router.get('/:id/settings', function(req, res, next) {
  db.query(`
    select emid, username, nickname, location, timezone from users
    where userid=${req.params.id}
    ;
  `)
    .then((result)=>{
      res.render('settings',{
        title: 'Dasher | Settings', 
        layout:'settingslayout', 
        users: result
      });
    });
  });

router.post('/:id/settings', function(req, res, next) {
  console.log(req.body);

  db.result(`
    INSERT INTO users (memid, username, nickname, location, timezone)
      VALUES(
        '10001',
      '${req.body.username}',
      '${req.body.nickname}',
      '${req.body.location}',
      '${req.body.timezone}',
      DEFAULT,
      );
  `).catch(console.log)
});

module.exports = router;