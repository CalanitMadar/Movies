const cnmDal = require('../DALs/createNewMovieDals');
const movieDal = require('../DALs/moviesWSDals');
require('jsonfile')

//============================================
const saveMovie = async (obj) =>
{
    let lastId;
    let data = await movieDal.getData();//get all data from url

    let jsonMoviesData = await cnmDal.getMovie();//get all movies json data

    if(jsonMoviesData.movies == "")//if json is empty
    {
        lastId = data.data[data.data.length-1].id + 1;//get last id from url
    }
    else
    {
        lastId = jsonMoviesData.movies[jsonMoviesData.movies.length-1].id + 1;//add 1 to next id
    }

    let NewMovie = {id : lastId, Name : obj.name, Language : obj.Language, Genres: obj.checkbox};
    jsonMoviesData.movies.push(NewMovie);

    await cnmDal.saveMovie(jsonMoviesData);
}


module.exports = {saveMovie};