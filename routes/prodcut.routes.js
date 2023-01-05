const router = require("express").Router()
const prodcut = require('../app/controller/prodcut.controller')
const authService = require("../app/controller/auth.controller")
const auth = require("../midel/auth")
const upload = require("../midel/upload")
const reviewsRoute=require("../routes/review.routes")
router.use('/:productId/reviews', reviewsRoute);

router
  .route('/')
  .get(prodcut.products)
  .post(auth,
   
    authService.allowedTo('admin', 'partner'),
    upload.array('photos', 5),
   prodcut.prodcutimg,
    prodcut.addprodcut
  );
router
  .route('/:id')
  .get(prodcut.productId)
  .patch(
   
    authService.allowedTo('admin', 'partner'),
   
    prodcut.update
  )
  .delete(
  
    authService.allowedTo('admin', 'partner'),
  
    prodcut.delete
  );
  router.route("/myProdcuts").get( auth,authService.allowedTo( 'partner'), prodcut.myProdcuts)
module.exports = router;