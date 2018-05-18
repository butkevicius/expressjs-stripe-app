const passport = require('passport');
const express = require('express');
const router = express.Router();
const auth = require('../src/middleware/auth');

router.get('/callback',
  passport.authenticate('auth0', { failureRedirect: '/login' }),
  function(req, res) {
    if (!req.user) {
      throw new Error('user null');
    }
    res.redirect('/');
  },
);

router.get('/login',
  passport.authenticate('auth0', { scope: 'openid profile' }),
  function(req, res) {
    res.redirect('/');
  });

router.get('/logout',
  auth,
  (req, res) => {
    req.logout();
    res.redirect('/');
  });

module.exports = router;
