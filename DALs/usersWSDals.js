const axios = require('axios');
const jFile = require('jsonfile');


//================================================================
const getUsers = ()=>
{

    return new Promise((resolve, reject) =>
    {
        jFile.readFile(__dirname + "/Users.json", function(err,data)
        {
            if(err)
            {
                reject(err)
            }
            else
            {
                resolve(data);
            }
        })
    })
}
//================================================================
const saveUser = (obj) =>
{
    return new Promise((resolve, reject) =>
    {
        jFile.writeFile(__dirname +"/Users.json", obj, function(err)
        {
            if(err)
            {
                reject(err);
            }
            else
            {
                resolve('Created !')
            }
        })
    })
}


module.exports = {getUsers, saveUser}