var express = require('express');
var router = express.Router();

var quizController = require('../controllers/quiz_controller');
var commentController = require('../controllers/comment_controller');
var sessionController = require('../controllers/session_controller');
var userController = require('../controllers/user_controller');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Quiz-2016',errors: [] });
});

//Autoload de comandos con: quizId
router.param('quizId',quizController.load); //autoload: quizId
router.param('userId',userController.load); //autoload: userId

// Definicion de rutas de sesion
router.get('/login', sessionController.new);   // formulario login
router.post('/login', sessionController.create);  // crear sesion
router.get('/logout', sessionController.destroy);  // destruir sesion

// Definicion de rutas de /quizes
router.get('/quizes', quizController.index);
router.get('/quizes/:quizId(\\d+)', quizController.show);
router.get('/quizes/:quizId(\\d+)/answer', quizController.answer);

router.get('/quizes/new', sessionController.loginRequired, quizController.new);
router.post('/quizes/create', sessionController.loginRequired, quizController.create);
router.get('/quizes/:quizId(\\d+)/edit', sessionController.loginRequired, quizController.edit);
router.put('/quizes/:quizId(\\d+)', sessionController.loginRequired, quizController.destroy);
router.delete('/quizes/:quizId(\\d+)', quizController.answer);

router.get('/quizes/new',quizController.new);
router.post('/quizes/create',quizController.create);
router.get('/quizes/:quizId(\\d+)/edit',quizController.edit);
router.put('/quizes/:quizId(\\d+)',quizController.update);
router.delete('/quizes/:quizId(\\d+)',quizController.destroy);


router.get('/quizes/:quizId(\\d+)/comments/new',commentController.new);
router.post('/quizes/:quizId(\\d+)/comments',commentController.create);

router.get('/user/:userId(\\d+)/edit',userController.edit);
router.put('/user/:userId(\\d+)',userController.update);
router.delete('/user/:userId(\\d+)',userController.destroy);

router.get('/user/newUser', userController.new);
router.post('/user/newUser', userController.create);
router.get('/user', userController.index);

module.exports = router;
