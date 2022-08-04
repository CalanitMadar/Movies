const wsDal = require('../DALs/moviesWSDals');
const cnmDAL = require('../DALs/createNewMovieDals')

const getData = async (obj)=>
{
    let nameMovies = obj.name;
    let Genere = obj.radio;
    let Language = obj.Language;
    let data = {};
    let finalList;
    let movieGenere=[];


    let urlData = await wsDal.getData();//get data from url
    let jsonData = await cnmDAL.getMovie();//get json of movies

    if(nameMovies != '' && Genere == undefined && Language == '')
    {
        finalList = checkNameMovies(nameMovies, urlData, jsonData);
    }
    //-------------------------------------------------------
    if(nameMovies == '' && Genere != undefined && Language == '')
    {
        finalList = checkGenereMovies(Genere, urlData, jsonData);
    }
    //-------------------------------------------------------
    if(nameMovies == '' && Genere == undefined && Language != '')
    {
        finalList = checkLanguageMovies(Language, urlData, jsonData);
    }
    //-------------------------------------------------------
    if(nameMovies != '' && Genere != undefined && Language == '')
    {
        let listMovies1 = checkNameMovies(nameMovies, urlData, jsonData);
        let listMovies2 = checkGenereMovies(Genere, urlData, jsonData);
        listMovies1.forEach(element1 => {
            listMovies2.forEach(element2 => {
                if(element1 == element2)
                {
                    finalList.push(element1);
                }
            });
        });
    }
    //-------------------------------------------------------
    if(nameMovies != '' && Genere == undefined && Language != '')
    {
        let listMovies1 = checkNameMovies(nameMovies, urlData, jsonData);
        let listMovies2 = checkLanguageMovies(Language, urlData, jsonData);
        listMovies1.forEach(element1 => {
            listMovies2.forEach(element2 => {
                if(element1 == element2)
                {
                    finalList.push(element1);
                }
            });
        });
    }
    //-------------------------------------------------------
    if(nameMovies == '' && Genere != undefined && Language != '')
    {
        let listMovies1 = checkGenereMovies(Genere, urlData, jsonData);
        let listMovies2 = checkLanguageMovies(Language, urlData, jsonData);
        listMovies1.forEach(element1 => {
            listMovies2.forEach(element2 => {
                if(element1 == element2)
                {
                    finalList.push(element1);
                }
            });
        });
    }
    //-------------------------------------------------------
    if(nameMovies != '' && Genere != undefined && Language != '')
    {
        let listMovies1 = checkGenereMovies(Genere, urlData, jsonData);
        let listMovies2 = checkLanguageMovies(Language, urlData, jsonData);
        let listMovies3 = checkNameMovies(nameMovies, urlData, jsonData);
        listMovies1.forEach(element1 => {
            listMovies2.forEach(element2 => {
                if(element1 == element2)
                {
                    finalList.push(element1);
                }
            });
        });
        finalList.forEach(element1 => {
            listMovies3.forEach(element2 => {
                if(element1 == element2)
                {
                    finalList.push(element1);
                }
            });
        });
    }
    //===================================================
    //===================================================
    let arrayGeneres = [];
    let finalArrayGeneres = [];
    finalList.forEach(movieName => {
        urlData.data.forEach(element1 => {
            if(element1.name == movieName)
            {
                arrayGeneres.push(element1.genres);
            }
        });
        jsonData.movies.forEach(element2 => {
            if(element2.Name == movieName)
            {
                arrayGeneres.push(element2.Genres);
            }
        });
    });

    arrayGeneres.forEach(element => {
        element.forEach(element2 => {
            finalArrayGeneres.push(element2);
        });
        
    });
    
    let uniqueChars = finalArrayGeneres.filter((element, index) => {//צמצום כפילויות
        return finalArrayGeneres.indexOf(element) === index;
    });
    
//    console.log(uniqueChars);
    
    uniqueChars.forEach(element => {
        urlData.data.forEach(element1 => {
            element1.genres.forEach(element2 => {
                if(element == element2)
                {
                    movieGenere.push(element1.name);
                }
            });
        });

        jsonData.movies.forEach(element2 => {
            element2.Genres.forEach(element3 => {
                if(element == element3)
                {
                    movieGenere.push(element2.Name);
                }
            });
        });
        
    });

    let last = movieGenere.filter((element, index) => {//צמצום כפילויות
        return movieGenere.indexOf(element) === index;
    });

    data = {lm: finalList, lmg: last };


    return data;


}

//==============================================

const checkNameMovies = (nameMovies, urlData, jsonData)=>
{
    let listMovies = [];

    urlData.data.forEach(element => {
        if(nameMovies == element.name)
        {
            listMovies.push(element.name);
        }
    });
    jsonData.movies.forEach(element => {
        if(nameMovies == element.Name)
        {
            listMovies.push(element.Name) ;
        }
    });

    return listMovies;
}
//==============================================


const checkGenereMovies = (Genere, urlData, jsonData)=>
{
    let listMovies = [];
     urlData.data.forEach(element => {
        element.genres.forEach(element2 => {
            if(Genere == element2)
            {
                listMovies.push(element.name);
            }
        });
        
    });

    
    jsonData.movies.forEach(element => {
        element.Genres.forEach(element2 => {
           if(Genere == element2)
           {
            listMovies.push(element.Name);
           }
        });
    });
    return listMovies;

}
//==============================================

const checkLanguageMovies = (Language, urlData, jsonData)=>
{
    let listMovies = [];

    urlData.data.forEach(element => {
        if(Language == element.language)
        {
            listMovies.push(element.name);
        }
    });
    jsonData.movies.forEach(element => {
        if(Language == element.Language)
        {
            listMovies.push(element.Name) ;
        }
    });

    return listMovies;
}

module.exports = {getData, checkNameMovies, checkGenereMovies, checkLanguageMovies};