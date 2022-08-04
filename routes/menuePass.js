var express = require('express');
var router = express.Router();
const usersBL = require('../models/dataBl');


router.get('/SearchMoviesPage', function(req, res, next) {
  res.render('SearchMoviesPage',{});
});
//=======================================================
router.get('/CreateMoviePage', function(req, res, next) {
    res.render('CreateMoviePage',{});
});
//=======================================================
router.get('/editUsers', async function(req, res, next) {
let data = await usersBL.getUsers();
let users = []
data.users.forEach(element => {
  users.push(element.Username)
});
res.render('UsersManagement',{obj:users});
});


module.exports = router;
