var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.render('users', {
      members:result
    });
  // res.send('respond with a resource');
});


module.exports = router;
