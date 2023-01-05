const router = require("express").Router()
const quiz = require('../app/controller/quiz.controller')
const authService = require("../app/controller/auth.controller")
const auth = require("../midel/auth")


router
  .route('/')
  .get(quiz.Quizs)
  .post(auth,
   
    authService.allowedTo('admin'),
   
    quiz.addQuzi
  );
router
  .route('/:id')
  .get(quiz.QuizId)
  .patch(
   
    authService.allowedTo('admin'),
   
    quiz.update
  )
  .delete(
  
    authService.allowedTo('admin'),
  
    quiz.delete
  );
module.exports = router;