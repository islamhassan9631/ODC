const router = require("express").Router()
const category = require('../app/controller/category.controller')
const authService = require("../app/controller/auth.controller");
const auth = require("../midel/auth");

router
  .route('/')
.get(category.allCategories)
  .post(
   auth,
    authService.allowedTo('admin'),
   
    category.CreateCategory 
   
  );
router
  .route('/:id')
  .get(category.categoryId )
  .patch(
   
    authService.allowedTo('admin'),
   
    category.update 
  )
  .delete(
    
    authService.allowedTo('admin'),
    
    category.delete
  );


module.exports = router;