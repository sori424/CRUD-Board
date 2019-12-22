var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var loginRouter = require('./routes/login');
var boardRouter = require('./routes/board');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  resave:false,
  saveUninitialized:false,
  secret:'my_session_key'
}),function(req, res, next){  //custom middleware
  if(req.session.logined){
    //rendering 시에 모든 페이지에 user_name을 줌
    res.locals.user_name = req.session.user_name;
  }
  next();
});


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/login', loginRouter);
//login 이 되어 있을 경우에만 페이지 접근 가능하도록 함
app.use('/board', function(req, res, next){
  if(req.session.logined){
    //login 돼있으면 다음으로 넘어감 next() 다음 middle ware 로 넘어감
    next();
  }else{
    //login 안될경우 board logic 이 아예 나오지 않음
    res.redirect('/');
  }
}, boardRouter);

app.use('/users', function(req, res, next){
  if(req.session.changed){
    next();
  }else{
    res.redirect('/');
  }
}, usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  // res.render('error');
  res.send(err.message);
});

module.exports = app;
