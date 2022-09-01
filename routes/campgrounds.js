const express = require('express');
const router = express.Router();
const wrapAsync = require('../utils/wrapAsync');
const {
  isLoggedIn,
  validateAuthor,
  validateCampground,
} = require('../middleware');

const campgrounds = require('../controllers/campgrounds');

router
  .route('/')
  .get(wrapAsync(campgrounds.index))
  .post(isLoggedIn, validateCampground, wrapAsync(campgrounds.createNew));

router.get('/new', isLoggedIn, campgrounds.renderNewForm);

router
  .route('/:id')
  .get(wrapAsync(campgrounds.renderShow))
  .put(
    isLoggedIn,
    validateAuthor,
    validateCampground,
    wrapAsync(campgrounds.update),
  )
  .delete(isLoggedIn, validateAuthor, wrapAsync(campgrounds.delete));

router.get(
  '/:id/edit',
  isLoggedIn,
  validateAuthor,
  wrapAsync(campgrounds.renderEditForm),
);

module.exports = router;
