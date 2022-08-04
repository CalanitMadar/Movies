const jFile = require('jsonfile');

//================================================================
const getMovie = ()=>
{

    return new Promise((resolve, reject) =>
    {
        jFile.readFile(__dirname + "/NewMovies.json", function(err,data)
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
const saveMovie = (obj) =>
{
    return new Promise((resolve, reject) =>
    {
        jFile.writeFile(__dirname +"/NewMovies.json", obj, function(err)
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


module.exports = {getMovie, saveMovie}