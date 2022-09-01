const express = require('express');
const router = express.Router();
const passport = require('passport');

const wrapAsync = require('../utils/wrapAsync');
const users = require('../controllers/users');

router
  .route('/register')
  .get((req, res) => {
    res.render('auth/register');
  })
  .post(wrapAsync(users.register));

router
  .route('/login')
  .get(users.renderLogin)
  .post(
    passport.authenticate('local', {
      failureFlash: true,
      failureRedirect: '/login',
      keepSessionInfo: true,
    }),
    users.login,
  );

router.post('/logout', users.logout);

module.exports = router;
