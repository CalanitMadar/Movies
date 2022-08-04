const mwsDal = require('../DALs/moviesWSDals');
const jmDal = require('../DALs/createNewMovieDals');



//============================================
const getDataFromUrl = async(movieName) =>
{
    let elementReturn = 0;
   let data = await mwsDal.getData();
   data.data.forEach(element => {
       if(element.name == movieName)
       {
         elementReturn = element;
       }
   });
   return elementReturn;
}
//============================================
const getDataFromJson = async (movieName) =>
{
    let elementReturn = 0;
    let data = await jmDal.getMovie();
    data.movies.forEach(element => {
        if(element.Name == movieName)
        {
            elementReturn = element;
        }
    });
    return elementReturn;
}


module.exports = {getDataFromUrl, getDataFromJson};