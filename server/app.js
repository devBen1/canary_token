var createError = require('http-errors');
var express = require('express');
const cors = require('cors')
var path = require('path');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');
var logger = require('morgan');
const helmet = require("helmet");

var indexRouter = require('./routes/index');
var port = 8080 || process.env.PORT;

var app = express();
require('dotenv').config();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator());
app.use(helmet());
app.use(cors());

app.use('/', indexRouter);


app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})

module.exports = app;
