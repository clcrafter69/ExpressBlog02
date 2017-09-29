var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

// ROUTE Declaration
// Think of routes as URLs basically
// TODO Explain the relationship to the routes folder -- jeffa 20170906
// This loads the module for the route.
// In other words, it loads the javascript from the routes folder.
var index = require('./routes/index');
var users = require('./routes/users');
var myProfile = require("./routes/myprofile");
var newPost = require("./routes/newPost");
//var singlePost = require("./routes/singlePost")
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// TODO Explain how this relates to the Routes
// This is where URLS are translated to routes
app.use('/', index);
app.use('/users', users);
app.use("/myprofile", myProfile);
app.use("/newpost", newPost);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

/*app.get('/', function (req, res) { res.render('index', { nav: [{ Link: '/Training', Text: 'Training' }, { Link: '/Training',
Text: 'Add Post' }, { Link: '/Training', Text: 'About Me'}]
});
});*/

module.exports = app;
