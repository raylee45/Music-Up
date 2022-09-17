const express = require('express');
const router = express.Router();
const axios = require('axios');
const db = require('../models');

router.get('/', (req, res) => {
    db.user.findOne({
        where: {name: req.user.name}
    })
    .then(foundUser => {
        foundUser.getFavorites().then(favorites => {
            res.render('favorites/faves', { favorites: favorites })
        })
    })
    .catch(error => {
        console.log(error)
    })
})

// add a song to favorites within favorites page
router.post('/', (req, res) => {
    const data = JSON.parse(JSON.stringify(req.body))

    db.user.findOne({
        where: {name: req.user.name}
    })
    .then(foundUser => {
        foundUser.createFavorite({
            trackName: data.name
        }).then(fav => {
            res.redirect('/favorites')
        })
    })
})

// delete a song in favorite page
router.delete('/', (req, res) => {
    const data = JSON.parse(JSON.stringify(req.body))
    db.favorite.destroy({
        where: {userId: req.user.id, trackName: data.name}})
    .then(deletedFavorite => {
        res.redirect('/favorites')
    })
})

module.exports = router;