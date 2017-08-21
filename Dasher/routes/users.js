var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.render('dashboard', {
    });
  // res.send('respond with a resource');
});

router.post('/', function(req, res, next) {
  console.log(req.body);

  db.result(`
    INSERT INTO users (userid, username,)
      VALUES(
        '10001',
      '${req.body.surname}',
      '${req.body.firstname}',
      '${req.body.address}',
      '${req.body.zipcode}',
      '${req.body.telephone}',
      
      );
  `).catch(console.log)
    });

module.exports = router;
