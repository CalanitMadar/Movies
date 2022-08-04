const axios = require('axios');

const getData = () =>
{
    return axios.get("https://api.tvmaze.com/shows");
}
//================================================================

module.exports = {getData}