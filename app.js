var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var db = require("./conection/config");
var hbs = require("express-handlebars");

var adminRouter = require("./routes/admin");
var usersRouter = require("./routes/users");
var clientRouter= require("./routes/client");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");
app.engine(
  "hbs",
  hbs({
    helpers: {
      ifEquals: function (arg1, arg2, options) {
        return arg1 == arg2 ? options.fn(this) : options.inverse(this);
      },
    },
    extname: "hbs",
    defaultLayout: "layout",
    layoutDir: __dirname + "/views/layout/",
    partialDir: __dirname + "/views/partials/",
  })
);

db.connect((err) => {
  if (err) console.log("conction error");
  else console.log("Database conected");
});


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use("/", adminRouter);
app.use("/", usersRouter);
app.use("/", clientRouter); 

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
  res.render('error');
});

module.exports = app;
