var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var hbs = require('express-handlebars');
const db = require('./db');
var index = require('./routes/index');
var dashboard = require('./routes/dashboard');
var users = require('./routes/users');
var auth = require('./routes/auth');
var home = require('./views/home');
var settings = require('./routes/settings');
var about = require('./routes/about');

var app = express();

// view engine setup for handlebars
app.engine('hbs', hbs({extname: 'hbs', defaultLayout: 'layout', layoutsDir: __dirname + '/views/layouts'}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');


require('dotenv').config();
const passport = require('passport');
var GithubStrategy = require('passport-github2').Strategy;
app.use(passport.initialize());
app.use(passport.session()); //use these more widely instead of querying ids

passport.serializeUser(function(user, done) {
  // placeholder for custom user serialization
  // null is for errors
  done(null, user.id);
});

//route redirection if id does match current user session
//add admin user settings?
passport.deserializeUser((user, done)=> {
  db.User.find({where: {id: user.id}}).success(function(user){
  done(null, user);
  })
  .error(function(err){
  done(err, null)
});
});


passport.use(new GithubStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/github/callback"
  
  },
  function(accessToken, refreshToken, profile, done) {
    // console.log(profile);
      db.query(`
      SELECT * from users where username='${profile.username}'
      `).then((results)=>{
        if(results.length == 0){
          db.query(`
          INSERT INTO users(username, nickname)
            VALUES(
              '${profile.username}',
              '${profile.displayName}'
            )`).then(done(null,profile)
                )}
              else{
              return done(null,profile);
            }
        })
      }
    ));


app.get('/auth/github',
passport.authenticate('github', { scope: [ 'user:email' ] }));

app.get('/auth/github/callback', 
passport.authenticate('github', { failureRedirect: '/' }),
function(req, res) {
  // Successful authentication, redirect to dashboard.
  // console.log(req.user.username) this will get the info from github and then we get the ID from our DB
  db.one(`
  SELECT userid from users WHERE username='${req.user.username}'
  `).then((result)=>{
    // console.log(result.userid) this will print out the userid from our DB
    res.redirect('/dashboard/'+result.userid)
    db.query(`
    SELECT * from dashsettings where userid='${result.userid}'
    `).then((results)=>{
      if(results.length == 0){
    db.query(`
    INSERT INTO dashsettings (userid, placement)
      SELECT ${result.userid} id, x 
      FROM unnest(ARRAY[1,2,3,4,5,6,7,8]) x
    `);
    }
  })
  })
})
      

app.post('/auth/github',
  passport.authenticate('github', {
  successRedirect : '/dashboard', // redirect to the secure profile section
  failureRedirect : '/', // redirect back to the signup page if there is an error
  failureFlash : true // allow flash messages
}));

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
app.use('/settings', settings);
app.use('/about',about);

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


