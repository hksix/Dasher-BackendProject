var express = require('express');
var router = express.Router();

const db = require('../db')

// getting & posting user widget preferences
router.get('/', function(req, res, next){
    db.query(`
    select * from dashsettings where userid > 0 order by userid;
    `)
    .then((result) => {
        res.render('dashboard', {
            dashsettings:result
        });
    });
});

router.get('/:id', function(req, res, next) {
    db.query(`
    select * from dashsettings where userid=${req.params.id};
    `)
    .then((result) => {
        console.log(result);
        res.render('dashboard', {
            dashsettings : result
        });
    });
});

// router.get('/:id/:widgets', function(req, res, next) {
//     db.one(`
//     select * from dashsettings where widgetid=${req.params.widgets};
//     `)
//     .then((result) => {
//         console.log(result);
//         res.render('dashboard', {
//             dashsettings:result
//         });
//     });
// });

// router.post('/:id/:widgets', function(req, res, next) {
//     console.log(req.body);

//     db.result(`
//     widgetid='${req.body.widgetid}',
//     `)
//     .then((result) => {
//         console.log(result);
//         res.render('dashboard', {
//             dashsettings:result
//         });
//     });
// });



module.exports = router;




