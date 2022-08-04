const wsDal = require('../DALs/usersWSDals');
var session = require('express-session')


const getData = async ()=>
{

    let data = await wsDal.getData();
    console.log(data);
}
//============================================
const getUsers = () =>
{
   return wsDal.getUsers();
};
//============================================
const saveUser = async (obj) =>
{
    let data = await wsDal.getUsers();
    let admin = false;//this to admin of users
    let numberTransactions = 5;
    if(data.users == "")//create admin
    {
        //session.admin = true;
        admin =  true//session.admin;
        numberTransactions =500;
    }

    
    let newUser = {Username : obj.username, Password : obj.password, Date : new Date(), NumberTransactions : numberTransactions, DateLogin: new Date(), CounterTransactions: 0,Admin:admin};
    data.users.push(newUser);

    await wsDal.saveUser(data);
}
//============================================
const actionCount= async (username) =>
{
    let data = await wsDal.getUsers();

    data.users.forEach(element => {
        if(element.Username == username)
        {
            element.CounterTransactions += 1;
        }
    });

    await wsDal.saveUser(data);
}
//============================================
const counterReset = async (username) =>
{
    let data = await wsDal.getUsers();

    data.users.forEach(element => {
        if(element.Username == username)
        {
            element.CounterTransactions = 1;
            element.DateLogin = new Date();
        }
    });

    await wsDal.saveUser(data);
}

//============================================
const deleteUser = async (username) =>
{
    let data = await wsDal.getUsers();

    for(var i = 0; i<data.users.length; i++){
        if(data.users[i].Username == username){
           data.users.splice(i, 1);
        }
    }

    await wsDal.saveUser(data);
}

//============================================
const getUser = async (username) =>
{
    let data = await wsDal.getUsers();
    let user;
    for(var i = 0; i<data.users.length; i++){
        if(data.users[i].Username == username){
           user = data.users[i];
        }
    }

    return user;
}

//============================================
const updateUser = async (obj) =>
{
    console.log(obj)
    let username;
    let password;
    let numberTransactions;
    let date;
    let dateLogin;
    let counterTransactions;
    let admin;

    let data = await wsDal.getUsers();
    for(var i = 0; i<data.users.length; i++){
        if(data.users[i].Username == obj.oldUsername){

            date = data.users[i].Date;
            dateLogin = data.users[i].DateLogin;
            counterTransactions = data.users[i].CounterTransactions;
            admin = data.users[i].Admin;


            if(obj.username != "")
            {
                username = obj.username;
            }
            else
            {
                username = data.users[i].Username;
            }

            if(obj.password != "")
            {
                password = obj.password;
            }
            else
            {
                password = data.users[i].Password;
            }

            if(obj.numberTransactions != "")
            {
                numberTransactions = obj.numberTransactions;
            }
            else
            {
                numberTransactions = data.users[i].NumberTransactions;
            }
            let updateUser = {Username : username, Password : password, Date : date, NumberTransactions : numberTransactions, DateLogin: dateLogin, CounterTransactions: counterTransactions,Admin:0};
            data.users[i] = updateUser;
        }
    }

    

    await wsDal.saveUser(data);
}



module.exports = {getData, getUsers, saveUser, actionCount, counterReset, deleteUser, updateUser,getUser};