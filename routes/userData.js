var express = require('express');
var router = express.Router();
const usersBL = require('../models/dataBl');




router.get('/userData/:id', async function(req, res, next) {
  if(req.params.id == 0)
  {
    res.render('userData', {errorMessage:""})
  }

  if(req.params.id == 1)
  {
    let data = await usersBL.getUsers();
    let users = []
    data.users.forEach(element => {
      users.push(element.Username)
    });
    res.render('listUser',{obj:users});
    }
});

//=====================================================

router.post('/update', async function(req, res, next) {
  let oldUsername = req.body.radio;

  let dataUser = await usersBL.getUser(oldUsername);

  let username = dataUser.Username;
  let password = dataUser.Password;
  let numberTransections = dataUser.NumberTransactions;
  let obj = {oldUsername, username, password, numberTransections};

  res.render('updateUser',{obj});
});
//=====================================================
//
//=====================================================

router.post('/savaDatabase/:old', async function(req, res, next) {
  console.log(req.params.old +"calanit");
  let oldUsername = req.params.old;
  let username = req.body.username;
  let password = req.body.password;
  let numberTransactions = req.body.numberTransactions;
  let obj = {oldUsername, username, password, numberTransactions}
  await usersBL.updateUser(obj);
  res.render('menuAdmin',{});

});
//=====================================================

//checke if username already registration
router.post('/checkeUsers', async function(req, res, next) {
  let users = await usersBL.getUsers();


  users.users.forEach(element => {
    if(element.Username == req.body.username)//if This username already exist
        res.render('menuAdmin', {})
  });

  await usersBL.saveUser(req.body);//else create new username


  res.render('menuAdmin', {});
});

//==========================================


router.post('/delete', async function(req, res, next) {
  let username = req.body.radio;
  await usersBL.deleteUser(username);

  
  res.render('menuAdmin',{});
});

module.exports = router;
