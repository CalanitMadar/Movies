var express = require('express');
//const { required } = require('nodemon/lib/config');
var router = express.Router();
const dataBL = require('../models/dataBl')
var session = require('express-session')



router.post('/login', async function(req, res, next) {

    let JSON = await dataBL.getUsers();
    let dateToday = new Date();
    JSON.users.forEach(element => {
        if(element.Username == req.body.username && element.Password == req.body.password)//if username and password good
        {
            req.session.username = req.body.username;
            console.log(req.session.username);


            
            JSON.users.forEach(element3 => {//We will check if this is a manager
            if (element3.Username == req.body.username && element3.Admin == true) 
            {
                req.session.admin = true;
                console.log(req.session.admin);
                res.render('menuAdmin',{});
            }});

            let date = new Date(element.DateLogin);
            if(date.getYear() == dateToday.getYear() && date.getDay() == dateToday.getDay())//If today's date is the same as the date of the last login
            {

                ////////////////////////////////////check this//////////////////////////
                if(element.NumberTransactions > element.CounterTransactions)//If the number of operations has not yet ended
                {
                   // req.session.admin = false;
                    //console.log(req.session.admin);
                    res.render('menu',{});
                }
                else
                {
                    res.render('data', {errorMessage:"No further action can be taken today, please log in again tomorrow"});
                }
            }

            else
            {
                dataBL.counterReset(req.body.username);
                req.session.admin = false;
                res.render('menu',{});
            }
        }

        
    });
    
    
});

module.exports = router;
