var express = require('express');
var router = express.Router();
var User = require('../models/user');

/* GET users listing. */
router.get('/', async (req, res, next) =>  {
  try {
    const Users = await User.findAll();
    res.json(Users);
  } catch (err) {
      next(err);
  }
});

module.exports = router;
