const axios = require('axios');
const query = require('../utils/query.constants');

module.exports.greet = (req, res, next) => {
    res.status(200).json({
        message: 'API up & running 💙'
    })
}

module.exports.getAllHomes = (req, res, next) => {    
    axios.get(`${query.BASE_URL}/${query.DEFAULT_CITY}`)
    .then(response => {
        const ids = response.data.data.map(home => home.id);
        const parameters = ids.map(id => `ids[]=${id}`).slice(0,10);
        const fullURLParameters = parameters.join('&');
    
        axios.get(`${query.HOMESEARCH_URL}${fullURLParameters}`)
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