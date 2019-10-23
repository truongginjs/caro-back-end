const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt")
const passport = require("passport");

const constant = require("../constants");
const userModel = require('../models/user.model')

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
      res.status(400).json({
        email: entity.email,
        message: `ERROR: Email already exists`
      });

    } else {
      await userModel.add(entity);
      res.json({
        email: entity.email,
        message: "SUCCESS"
      })
    }
  } catch (err) {
    res.status(400).json({
      email: entity.email,
      message: `ERROR: ${err}`
    });
  }
})

router.post('/login', (req, res, next) => {
  passport.authenticate('local', { session: false }, (err, user, info) => {
    console.log(user)
    if (err || !user) {
      return res.status(400).json({
        user,
        ...info
      });
    }
    req.login(user, { session: false }, (err) => {
      if (err) {
        res.status(400).json({
          user,
          message:`ERROR: ${err}`
        })
      }
      // generate a signed son web token with the contents of user object and return it in the response
      const token = jwt.sign(user, process.env.SECRET_KEY);
      return res.json({ user, token });
    });
  })(req, res);
});

module.exports = router;