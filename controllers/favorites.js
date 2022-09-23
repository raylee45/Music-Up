const express = require('express');
const router = express.Router();
const axios = require('axios');
const db = require('../models');
const isLoggedIn = require('../middleware/isLoggedIn');
const {Op} = require('sequelize');

router.get('/', isLoggedIn, (req, res) => {
    // res.render('favorites/faves', { comment })
    try {
        db.favorite.findAll({
            where: { userId: req.user.id },
        })
        .then((favorites) => {
            db.comment.findAll({
                // where: { userId: req.user.id },
            }).then((comment) => {
                res.render('favorites/faves', { favorites, comment })
            })
        })
        .catch(error => {
            console.log(error)
        })
    } catch(error) {
        console.log(error)
    }
})

// add a song to favorites within favorites page
router.post('/', isLoggedIn, (req, res) => {
    db.favorite.findAll({
        where: {
            [Op.and]: [
                {userId: req.user.id},
                {key: req.body.key}
            ]
        }
    })
    .then((fave) => {
        if(fave.length !== 0) throw Error('Song already favorited')
        const artists = JSON.parse(req.body.artists)
        db.favorite.create({
            userId: req.user.id,
            trackName: req.body.trackName,
            artistName: req.body.artistName,
            key: req.body.key
        })
        .then((newFaveSong) => {
            artists.forEach(artist => {
                db.artist.findAll({
                    where: {
                        [Op.and]: [
                            {userId: req.user.id},
                            {webURL: req.body.weburl}
                        ]
                    }
                })
                .then((artistFound) => {
                    if (artistFound.length !== 0) throw new Error('artist already exists')
                    console.log('ARTISTS FOUND', artistFound)
                    db.artist.create({
                        name: artist.name,
                        userId: req.user.id,
                        image: artist.avatar,
                        webURL: artist.weburl,
                    })
                    .catch(error => {
                        console.log(error)
                    })
                })
                .catch(error => {
                    console.log(error)
                })
            })
            res.redirect('/favorites')
        })
        .catch(error => {
            throw error
        })
    })
    .catch(error => {
        console.log('failed to create records', error.message)
        req.flash('error', error.message)
        res.redirect('/favorites')
    })
})

// delete a song in favorite page
router.post('/:id', isLoggedIn, (req, res) => {
    db.favorite.destroy({
        where: {id: req.params.id}})
    .then(deletedFavorite => {
        res.redirect('/favorites')
    })
    .catch(error => {
        console.log(error)
    })
})

//Retrieve all favorited artists
router.get('/artist', isLoggedIn, (req, res) => {
    try {
        db.artist.findAll({
            where: { userId: req.user.id },
        })
        .then((artists) => {
            console.log(artists)
            res.render('favorites/artist', { artists })
        })
        .catch(error => {
            console.log(error)
        })
    } catch(error) {
        console.log(error)
    }
})

// to post comments by user
router.post('/:id/comment', isLoggedIn, (req, res) => {
    const createdDate = new Date().toISOString();
    // console.log('tttttttttttttttttttttt')
    // console.log(req.params.id)
    db.favorite.findAll({
        where: { userId: req.user.id },
    })
    .then((favoriteSong) => {
        // console.log('$$$$$$$$$$$$$$$$$$$$')
        // console.log(favoriteSong)
        // console.log('$$$$$$$$$$$$DONE')
      if (!favoriteSong) throw Error()
      db.comment.create({
        favoriteId: favoriteSong.id,
        userId: req.user.id,
        name: req.user.name,
        content: req.body.content,
        key: req.params.id,
        createdAt: createdDate,
        updatedAt: createdDate,
      }).then(comment => {
            // console.log(comment)
            res.redirect('/favorites')
      })
    })
    .catch((error) => {
      console.log(error)
      res.status(400).render('main/404')
    })
})

module.exports = router