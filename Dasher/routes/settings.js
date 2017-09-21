var express = require('express');
var router = express.Router();

const db = require('../db');

function preventer(e) {
  e.preventDefault();
}

router.get('/:id', function(req, res, next) {
  db.one(`
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

// router.get('/:id', function(req, res, next){
  // var resetBtn = document.querySelector('input[name="reset"]');
  // resetBtn.addEventListener('click', resetDB);
  
  // function resetDB(){
  //   console.log('ehy')
  // }
  
// })

router.post('/:id', function(req, res, next) {
  // console.log(req.body);
  if (req.body.reset){
    console.log(req.params.id)
    db.result(`
    UPDATE dashsettings
      SET widgetid = x 
      FROM unnest(ARRAY[Null,2,3,4,5,6,7,8]) x
      WHERE userid = '${req.params.id}'
    `)
    // .then((result)=>{
    //   res.render('settings',{
    //     title: 'Dasher | Settings', 
    //     id: useridd,
    //     user: result,
    //     layout:'settingslayout'
    //   })
    // })

  }else{
  db.result(`
    UPDATE users 
    SET
    nickname = '${req.body.nickname}',
    location = '${req.body.location}',
    reminder = '${req.body.reminder}'
    WHERE userid = '${req.params.id}'
    `)
    // .then((result)=>{
    //   res.render('settings',{
    //     title: 'Dasher | Settings', 
    //     id: useridd,
    //     user: result,
    //     layout:'settingslayout'
    //   })
    // })
  }
});

module.exports = router;