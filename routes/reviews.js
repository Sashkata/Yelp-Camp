const express = require('express');
const router = express.Router({ mergeParams: true });

const {
  validateReview,
  isLoggedIn,
  validateReviewAuthor,
} = require('../middleware');

const reviews = require('../controllers/reviews');

const wrapAsync = require('../utils/wrapAsync');

router.delete(
  '/:reviewId',
  isLoggedIn,
  validateReviewAuthor,
  wrapAsync(reviews.deleteReview),
);

router.post('/', isLoggedIn, validateReview, wrapAsync(reviews.createReview));

module.exports = router;
