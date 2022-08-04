var express = require('express');
var router = express.Router();
const mdBL = require('../models/movieDataBL');
var session = require('express-session')



router.get('/movieData/:movie',async function(req, res, next) {
  if(!req.session.admin)
  {
    console.log(req.session.username)
    //await dataBl.actionCount(req.session.username)//Add 1 to the number of actions for that day
  }
  let movieName = req.params.movie;

  let dataUrl = await mdBL.getDataFromUrl(movieName);

  let dataJson = await mdBL.getDataFromJson(movieName);
  if(dataJson != 0)
  {
    let data = {id : dataJson.id, name : dataJson.Name , genres : dataJson.Genres , language : dataJson.Language}
    res.render('movieData',{obj : data});
  }

  if(dataUrl != 0)
  {
    let data = {id : dataUrl.id, name : dataUrl.name , genres : dataUrl.genres , language : dataUrl.language, image:dataUrl.image.medium}
    res.render('movieData',{obj : data});
  }

});




module.exports = router;
