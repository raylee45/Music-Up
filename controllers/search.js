const express = require('express');
const router = express.Router();
const db = require('../models');
const isLoggedIn = require('../middleware/isLoggedIn');

// Shazam API
const axios = require("axios");

router.post('/results', isLoggedIn, (req, res) => {
  const options = {
    method: 'GET',
    url: 'https://shazam.p.rapidapi.com/search',
    params: {term: req.body.artist?
      req.body.artist:
      req.body.song , locale: 'en-US', offset: '0', limit: '10'},
    headers: {
      'X-RapidAPI-Key': process.env.APIkey,
      'X-RapidAPI-Host': 'shazam.p.rapidapi.com'
    }
  };
  
  axios.request(options).then(function (response) {
    // console.log(response.data);
      const result = response.data.tracks.hits.map((song,idx) => {
        return{
          title: song.track.title,
          subtitle: song.track.subtitle,
          image: song.track.images.coverart,
          key: song.track.key,
          artists: JSON.stringify(response.data.artists.hits.map((artist) => {
            return artist.artist
          }))
        }
      })
      res.render('search/results', {result})
  })
  .catch(function (error) {
    console.error(error);
  });
})

module.exports = router