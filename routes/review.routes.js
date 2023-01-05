const router = require("express").Router({ mergeParams: true })
const review = require('../app/controller/review.controller')
const authService = require("../app/controller/auth.controller")
const auth = require("../midel/auth")

router
  .route('/')
  .get(review.createFilterObj, review.allreviews)
  .post(
    
    authService.allowedTo('user'),
    review.setProductIdAndUserIdToBody,
   
    review.createReview
  );
router
  .route('/:id')
  .get(review.reviewId )
  .patch(
    
    authService.allowedTo('user'),
   
    review.updateReview
  )
  .delete(
   
    authService.allowedTo('user', 'partner', 'admin'),
   
    review.delete
  );
  module.exports = router;