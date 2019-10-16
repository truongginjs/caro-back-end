const express = require('express');
const router = express.Router();
const userModel = require('../models/user.model')
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt")
const constant = require("../constants");

router.post('/register', async (req, res, next) => {
  try {
    var salt = bcrypt.genSaltSync(constant.SALT)    
    const entity = {
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, salt),
      realname: req.body.realname
    }

    const check = await userModel.findOne({ email: req.body.email });
    if (check.length > 0) {
      res.send("register error: Email already exists");
      console.log(check);
    } else {
      await userModel.add(entity);
      res.send("register success!");
    }
  } catch (err) {
    console.log(err)
    res.send("register error: " + err);
  }
})

router.post('/login', async (req, res, next) => {
  const entity = {
    email: req.body.email
  }
  userModel.findOne(entity).then((result) => {
    if (result.length > 0) {
      const user = result[0]
      if (bcrypt.compareSync(req.body.password, user.password)) {
        jwt.sign({ user }, 'your_jwt_secret', { expiresIn: '1h' }, (err, token) => {
          if (err) { console.log(err) }
          res.json({ email: user.email, token })
        });
      }else{
        res.send("ERROR: password or email wrong")
      }
    } else {
      res.send("ERROR: email wrong")
    }
  }).catch(err => {
    console.log('ERROR: Could not log in');
    res.send("ERROR: Could not log in")
  })
})

module.exports = router;