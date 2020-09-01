var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

const authController = require("../controller/authController");

router.post("/login", authController.login);

module.exports = router;
