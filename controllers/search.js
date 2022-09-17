require('dotenv').config();
const express = require('express');
const router = express.Router();
const db = require('../models');

const request = require('request'); // this requests from the library of data

// Shazam API
const axios = require("axios");

const options = {
  method: 'GET',
  url: 'https://shazam.p.rapidapi.com/search',
  params: {term: 'kiss the rain', locale: 'en-US', offset: '0', limit: '5'},
  headers: {
    'X-RapidAPI-Key': 'b94407a4e5msh62abba97a6403f5p1726b9jsn6d78e721524e',
    'X-RapidAPI-Host': 'shazam.p.rapidapi.com'
  }
};

axios.request(options).then(function (response) {
	// console.log(response.data);
    const result = response.data
    console.log(JSON.stringify(result))
}).catch(function (error) {
	console.error(error);
});

module.exports = router;