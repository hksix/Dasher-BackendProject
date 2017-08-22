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
        widgetid, 
        placement 
        from dashsettings
        INNER JOIN users on dashsettings.userid = users.userid 
        where dashsettings.userid=${req.params.id}
        order by placement
        ;
      `)
        .then((result)=>{ //i corresponds to placement id
          // $('<li class="plum">Plum</li>').appendTo('#two')
          // $('widget').append('<p>HEELLLOOOOOO</p>');
          // $.html();
          // for (var i = 0; i < 8; i++){  
            // console.log(result[i]['widgetid']);

            // $('#i').html(result[i]['widgetid']);
            // result[i]['widgetid']  //this is your widgetid
          // }


          // handlebars.registerHelper("printItems", function(html) {
            
          //   if (html == '1'){
          //     htmlPromise = wFunctions.clock();
          //     htmlPromise.then((currentTime)=>{
          //       html = currentTime;
          //       console.log(html);
          //       return html;
          //     })
          //     .catch((error)=>{
          //       console.log(error);
          //     })
             
          //   }
            // if(html == '5') {
            //   html = wFunctions.greeting();
            //   return html;
          //   }
          //     //html = widget;
          //     //console.log(html)
          //   // return html;
          // });
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
