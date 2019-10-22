var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', (req, res, next) => {
  res.json({
    author: {
      name: "Nguyễn Minh Trường",
      ID: "1612760"
    },
    message: "Welcome Welcome to my Caro API",
    domain: {
      me: "/me",
      user: {
        login: "/login",
        register: "/register"
      }
    }
  })
});

// router.get('/acc', (req, res, next) => {
//   res.json({
//     name: "abc",
//     password: "abc"
//   })
// })

module.exports = router;
