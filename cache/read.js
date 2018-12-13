const axios = require('axios');
const homeController = require('../controllers/home.controller');
const fs = require('fs');

let homes = require('./homes.json');
let data = JSON.stringify(homes);  
fs.writeFileSync('homes-cached.json', data);  