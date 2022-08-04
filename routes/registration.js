var express = require('express');
const jsonfile = require('jsonfile');
var router = express.Router();
const dataBL = require('../models/dataBl')


router.get('/registration', function(req, res, next) {
  res.render('registration');
});

//==========================================
//checke if username already registration
router.post('/checkeData', async function(req, res, next) {
  let users = await dataBL.getUsers();
  let flag = false;

  users.users.forEach(element => {
    if(element.Username == req.body.username)//if This username already exist
    {
      flag = true;
      res.render('data', {errorMessage:"This username already exist"})

    }
      });
      if(!flag)
      {
        await dataBL.saveUser(req.body);//else create new username
        res.render('data', {errorMessage:"Registration is received in the system"});

      }
  });


module.exports = router;
