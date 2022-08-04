var express = require('express');
var router = express.Router();
const searchMovieBL = require('../models/searchMoviesBL');
const dataBl = require('../models/dataBl');
var session = require('express-session')


router.post('/SearchMoviesPage', async function(req, res, next) {
  if(req.body.name == '' && req.body.Genre == '' && req.body.Language == '')
  {
    res.render('searchMoviesPage',{});
  }
  else
  {
    if(!req.session.admin)
    {
      console.log(req.session.username)
      //await dataBl.actionCount(req.session.username)//Add 1 to the number of actions for that day
    }
    console.log(req.session.username)
    console.log(req.session.admin)
    let data = await searchMovieBL.getData(req.body);
    res.render('searchResultsPage',{obj : data});
  }
});


module.exports = router;
