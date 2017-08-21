var express = require('express');
var router = express.Router();

/* GET homepage */
router.get('/', function(req, res, next) {
    res.render('index',{title: 'Dasher | Welcome', layout:'layout'});
});
router.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
  });    

module.exports = router;
