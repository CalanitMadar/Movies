var express = require('express');
var router = express.Router();
const movieBL = require('../models/createNewMovieBl')
const dataBl = require('../models/dataBl');
var session = require('express-session')


router.post('/newMovie',async function(req, res, next) {
  let data = await movieBL.saveMovie(req.body);
  if(req.session.admin)
  {
    res.render('menuAdmin',{});
  }
  else
  {
    console.log(req.session.username)
    //await dataBl.actionCount(req.session.username)//Add 1 to the number of actions for that day

    res.render('menu',{});
  }
});



module.exports = router;
