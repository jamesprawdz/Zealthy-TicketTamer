const express = require('express');
const { login, register } = require('../controllers/authController');

const router = express.Router();

router.post('/login', login);
if (process.env.NODE_ENV !== 'production') {
  router.post('/register', register);
}

module.exports = router;
