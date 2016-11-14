var models = require('../models/models.js');

// Autoload - factoriza el codigo si ruta incluye: quizId
exports.load = function(req,res,next,quizId){
	models.Quiz.findById(quizId).then(
		function(quiz){
			if(quiz){
				req.quiz = quiz;
				next();
			}else {
				next(new Error('No existe quizId='+quizId));
			}
		}).catch(function(error){ 
			next(error);
		  })
}

// GET /quizes/:id
 exports.show = function(req,res){
	res.render('quizes/show', {quiz: req.quiz,errors: [],fallos: req.query.fallos});
};

// GET /quizes/:id/answer
exports.answer = function(req, res){
	var resultado = 'Incorrecto';
	var contador = ++req.query.fallos;
	
	if(req.query.respuesta === req.quiz.respuesta){
		resultado = 'Correcto';
		contador=0;
	}else {
		resultado = 'Incorrecto';
	}
	res.render('quizes/answer',
		 {quiz: req.quiz, respuesta: resultado, errors: [], incremento:contador});
		
    }

// GET /quizes
exports.index = function(req, res) {
	models.Quiz.findAll().then(function(quizes) {
		res.render('quizes/index',{quizes: quizes,errors: []});
	}).catch(function(error){
		next(error)
	  })
}

// GET /quizes/new
exports.new = function(req,res){
	var quiz = models.Quiz.build( //crea objeto quiz
		{pregunta:"Pregunta", respuesta: "Respuesta"}
		);
	res.render('quizes/new',{quiz: quiz,errors: []});
}

// POST /quizes/create
exports.create = function(req,res){
	var quiz = models.Quiz.build(req.body.quiz);

	quiz.validate().then(function(err){
			if(err){
				res.render('quizes/new',{quiz: quiz, errors: err.errors});
			}else{
				quiz //save:guardar en DB campos pregunta y respuesta de quiz
				.save({fields:["pregunta","respuesta"]})
				.then(function(){res.redirect('/quizes')})
			}	// res.redirect: Redireccion HTTP a lista de preguntas
	})	//Redireccion HTTP (URL relativo) lista de preguntas
};