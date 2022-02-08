var express = require('express');
var router = express.Router();
const axios = require("axios");
require('dotenv').config();

/* GET home page. */
router.get('/', function (req, res) {
    const error = res.app.get("error");
    res.render('index', {
      title: 'Canary Token',
      return: error
    });
});

/* GET Dashboard page. */
router.get('/dashboard', function (req, res) {
  res.render('dashboard', {
    title: 'Canary Token Admin Panel'
  });
});

/* Post home page. */
router.post('/', async (req, res) => {
  try {
    req.checkBody('email', 'Invalid Credentials').notEmpty().trim().escape();
    req.checkBody('password', 'Password cannot be empty.').notEmpty().trim().escape();

    const errors = req.validationErrors();
    if (!errors) {
      if (req.body.email.toLowerCase() == "admin" && req.body.password == "admin") {
        await axios.get(process.env.CANARY_TOKEN);
        res.redirect('/dashboard');
      } else {
      res.app.set("error", "Invalid Credentials");
        res.redirect('/');
      }
    } else {
      res.app.set("error", "Invalid Credentials");
      res.redirect('/');
    }
  } catch (error) {
    console.log(error)
  }
});

module.exports = router;
