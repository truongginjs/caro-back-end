var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express' });
});

// router.get('/acc', (req, res, next) => {
//   res.json({
//     name: "abc",
//     password: "abc"
//   })
// })

module.exports = router;
