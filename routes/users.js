var express = require('express');
var router = express.Router();
const userBL = require('../models/dataBl')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('data', {errorMessage:""});
});




//==============================================
router.post('/getdata', async function(req, res, next){
 
  let data = await userBL.getData();
  res.send('Created !');
});




module.exports = router;
