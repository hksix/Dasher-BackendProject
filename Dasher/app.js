var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var exphbs = require('express-handlebars');
const db = require('./db');
var index = require('./routes/index');
var dashboard = require('./routes/dashboard');
var users = require('./routes/users');
var auth = require('./routes/auth');
var home = require('./views/home');
var app = express();



// view engine setup
app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'hbs');
app.engine('.hbs', exphbs({defaultLayout: 'layout', extname: '.hbs'}));
app.set('view engine', '.hbs');



require('dotenv').config();
const passport = require('passport');
var GithubStrategy = require('passport-github2').Strategy;
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, done) {
  // placeholder for custom user serialization
  // null is for errors
  log.debug("serialize ", user);
  done(null, user.userid);
});

passport.deserializeUser((id, done)=> {
  db.one(`SELECT userid,username, nickname FROM users
  where userid = $1,[id]
`)
  .then((user) => { done(null, user); })
  .catch((err) => { done(err,null); });
  });


passport.use(new GithubStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/github/callback"
  
  },
  function(accessToken, refreshToken, profile, done) {
    return db.one(`SELECT userid,username,nickname
    FROM users
    Where userid=$1 AND username=$2
  `).then((results)=>{
    done(null,profile);
  });
  
    console.log(profile);
    console.log("profileid" ,profile.id)
    // profil gives you an object with 
    // id: '29579724',
    // displayName: 'Hamza Haseeb',
    // username: 'hksix',
  }
));




//     User.findOrCreate({ githubId: profile.id }, function (err, user) {
//       return done(err, user);
//     });
//         // placeholder for translating profile into your own custom user object.
//     //     // for now we will just use the profile object returned by GitHub
//   }
// ));


app.get('/auth/github',
passport.authenticate('github', { scope: [ 'user:email' ] }));

app.get('/auth/github/callback', 
passport.authenticate('github', { failureRedirect: '/' }),
function(req, res) {
  // Successful authentication, redirect home.
  res.redirect('/dashboard');
});
app.post('/', passport.authenticate('github'), (req, resp)=>{
  log.debug(req.user);
  resp.send(req.user);
});


// Express and Passport Session
const session = require('express-session');
app.use(session({
  secret: 'abcdefg',
  resave: true,
  saveUninitialized: true

}));



// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', index);
app.use('/users', users);
app.use('/auth', auth);
app.use('/dashboard',dashboard);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
