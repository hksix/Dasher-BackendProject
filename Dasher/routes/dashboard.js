var express = require('express');
var router = express.Router();
const db = require('../db');
const cheerio = require('cheerio')
const $ = cheerio.load('dashboard.hbs');
 



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
        select widgetid, placement from dashsettings 
        where userid=${req.params.id}
        order by placement
        ;
      `)
        .then((result)=>{ //i corresponds to placement id
          // $('<li class="plum">Plum</li>').appendTo('#two')
          // $('widget').append('<p>HEELLLOOOOOO</p>');
          // $.html();
          for (var i = 0; i < 8; i++){  
            console.log(result[i]['widgetid']);
            // $('#i').html(result[i]['widgetid']);
            // result[i]['widgetid']  //this is your widgetid
          }

          // console.log(result)
          // var placementid = result[0]['placement'];
          
          // console.log('placement' + result[0]['placement']);
          res.render('dashboard',{
            title: 'Dasher | Dashboard', 
            layout:'dashlayout', 
            dashsettings: result
          })
        });

      });
    
module.exports = router;
