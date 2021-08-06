const express = require('express');
const router = express.Router();
const db = require('../config/database');
const Gig = require('../models/Gig');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

// Get user list
router.get('/', (req, res) => 
  Gig.findAll()
    .then(gigs => res.render('gigs', {
        gigs
      }))
    .catch(err => res.render('error', {error: err})));

// Display add user form
router.get('/add', (req, res) => res.render('add'));

// Add a user
router.post('/add', (req, res) => {
  let {username,firstname,lastname,birthdate,imgurl,description,email} = req.body;
  let errors = [];

  // Validate Fields
  if(!username) {
    errors.push({ text: 'Please add a username' });
  }
  if(!firstname) {
    errors.push({ text: 'Please add a firstname' });
  }
  if(!lastname) {
    errors.push({ text: 'Please add a lastname' });
  }
  if(!email) {
    errors.push({ text: 'Please add a  email' });
  }

  // Erro kontrolu errors
  if(errors.length > 0) {
    res.render('add', {
      errors,
      username,
      firstname,
      lastname,
      birthdate,
      description,
      imgurl,
      email
    });
  } else {
    if(!birthdate) {
      birthdate = 'Unknown';
    } else {
      birthdate = `$${birthdate}`;
    }

    
    firstname = firstname.toLowerCase().replace(/,[ ]+/g, ',');

    // Ekleme
    Gig.create({
      username,
      firstname,
      lastname,
      birthdate,
      description,
      imgurl,
      email
    })
      .then(gig => res.redirect('/gigs'))
      .catch(err => res.render('error', {error:err.message}))
  }
});

//delete part
router.get('/:id/delete',(req,res)=>{
    Gig.destroy({ 
        where:{
        id :  req.params.id,
      },
    })
    .then(gig => res.redirect('/gigs'))
    .catch(err => res.render('error', {error:err.message}))
})

//detail part
router.get('/:id/detail',(req,res)=>{
    Gig.findOne({ 
        where:{
        id :  req.params.id,
      },
    })
    .then(gig => res.render('detail', {
        gig
      }))
    .catch(err => res.render('error', {error:err.message}))
})

// edit part
router.get('/:id/edit',(req,res)=>{
    Gig.findOne({ 
        where:{
        id :  req.params.id,
      },
    })
    .then(gig => res.render('edit', {
        gig
      }))
    .catch(err => res.render('error', {error:err.message}))
})
router.post('/:id/edit',(req,res)=>{
    let updatedObject = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        imgurl: req.body.imgurl,
        description: req.body.description,
        email: req.body.email,
      };
    Gig.update(updatedObject,{ 
        where:{
        id :  req.params.id,
      },
    })
    .then(gig => res.redirect('/gigs'))
    .catch(err => res.render('error', {error:err.message}))
})



// Search for gigs
router.get('/search', (req, res) => {
  let { term } = req.query;

  // Make lowercase
  term = term.toLowerCase();

  Gig.findAll({ where: { firstname: { [Op.like]: '%' + term + '%' } } })
    .then(gigs => res.render('gigs', { gigs }))
    .catch(err => res.render('error', {error: err}));
});

module.exports = router;