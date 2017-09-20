var express = require('express');
var router = express.Router();
const db = require('../db');

let wFunctions = require('../widgets');
// let handlebars = require('handlebars');
// let render = require('handlebars-render-helper');




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

// router.get('/:id/:placement', function(req, res, next) {
//     db.query(`
//       select widgetid from dashsettings 
//       where userid=${req.params.id}
//       and placement= ${req.params.placement}
//       ;
//     `)
//       .then((result)=>{
//         console.log(result)
//         res.render('dashboard',{
//           title: 'Dasher | Dashboard', 
//           layout:'dashlayout', 
//           dashsettings: result
//         });
//       });
//     });
  
    router.get('/:id', function(req, res, next) {
      db.query(`
        select 
        users.nickname,
        users.reminder,
        widgetid, 
        placement
        from dashsettings
        INNER JOIN users on dashsettings.userid = users.userid 
        where dashsettings.userid= '${req.params.id}'
        order by placement
        ;
      `)
        .then((result)=>{ 
          useridd = req.params.id,
          console.log(result);
          res.render('dashboard',{
            title: 'Dasher | Dashboard', 
            id: useridd,
            dashsettings: result,
            layout:'dashlayout'
          })
        });
      });
router.post('/:id', function(req, res, next){
  console.log(req.body.widgetID);
  var widgetid = req.body.widgetID;
  widgetid= widgetid.substr(widgetid.length -1);
  var placementid = req.body.placementID;
  placementid= placementid.substr(placementid.length -1);

  console.log(placementid);
  db.result(`
  update dashsettings
    set
    widgetid='${widgetid}'
    where userid = ${req.params.id} AND placement = ${placementid};
`).then ((result) =>{
  res.render('dashboard',{
    title: 'Dasher | Dashboard', 
    layout:'dashlayout', 
    dashsettings:result
    });
});
});


module.exports = router;