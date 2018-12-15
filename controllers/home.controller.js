const axios = require('axios');
const query = require('../utils/query.constants');

module.exports.greet = (req, res, next) => {
    res.status(200).json({
        message: 'API up & running 💙'
    })
}

module.exports.getSpecificTypeHomes = (req, res, next) => {
    const city = req.params.city;
    const type = req.params.type;
    
    axios.get(`https://staging.spotahome.com/api/public/listings/search/markers/${city}?type[]=${type}`)
    .then(response => {
        const ids = response.data.data.map(home => home.id).slice(0,30);
        const parameters = ids.map(id => `ids[]=${id}`).join('&');
        
        axios.get(`https://staging.spotahome.com/api/public/listings/search/homecards_ids?${parameters}`)
        .then(response => {
            res.status(200).json({
                data: response.data.data.homecards
            })
        }) 
        .catch(err => {
            res.status(500).json({
                message: err.message
            })
        })
    })
    .catch(err => {
        res.status(500).json({
            message: err
        })
    })
}

// module.exports.getHomesFromIds = (req, res, next) => {
    
// }

module.exports.getAllHomes = (req, res, next) => {
    axios.get(`${query.BASE_URL}/${query.DEFAULT_CITY}`)
    .then(response => {
        const ids = response.data.data.map(home => home.id).slice(0,30);
        const parameters = ids.map(id => `ids[]=${id}`).join('&');
    
        axios.get(`${query.IDS_URL}${parameters}`)
        .then(response => {
            res.status(200).json({
                data: response.data.data.homecards
            })
        }) 
        .catch(err => {
            res.status(500).json({
                message: err.message
            })
        })        
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({
            message: err.message
        })
    })
}