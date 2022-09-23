const express = require('express');
const router = express.Router();
const axios = require('axios');
const db = require('../models');
const isLoggedIn = require('../middleware/isLoggedIn');

router.get('/', isLoggedIn, (req, res) => {
    try {
        res.render('user/profile', { user: req.user })
    } catch (error) {
        console.log(error)
    }
})

//get user update form
router.get("/edit", (req, res) => {
    res.render('user/userEdit')
})

//update a user
router.put("/", (req, res) => {
   req.user = res.locals.currentUser
    db.user.update(
        {name: req.body.name},
        {where: {name: req.user.name}}
      )
      .then(updatedUser => {
          console.log(updatedUser)
        res.redirect('/profile')
      }) 
})


module.exports = router