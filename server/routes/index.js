var express = require('express');
var router = express.Router();
const axios = require("axios");
require('dotenv').config();

/* Post home page. */
router.post('/', async (req, res) => {
  try {
    req.checkBody('email', 'Invalid Credentials').notEmpty().trim().escape();
    req.checkBody('password', 'Password cannot be empty.').notEmpty().trim().escape();

    const errors = req.validationErrors();
    if (!errors) {
      if (req.body.email.toLowerCase() == process.env.USER_EMAIL && req.body.password == process.env.USER_PASSWORD) {
        const canary = await axios.get(process.env.CANARY_TOKEN);
        if(canary){
          return res.json({
            statusCode: 200
          });
        }else{
          return res.json({
            message: "Unauthorized!",
            statusCode: 401
          });
        }
      } else {
        return res.json({
          message: "Invalid Credentials",
          statusCode: 401
        });
      }
    } else {
      return res.json({
        message: errors,
        statusCode: 401
      });
    }
  } catch (error) {
    console.log(error)
  }
});

module.exports = router;
