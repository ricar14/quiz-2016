var models = require('../models/models.js');

/*var express = require('express');
var app = express();
var Contador = 0;
// Middleware Contador aciertos
app.use(function(req,res,next){
	app.locals.cont = (app.locals.cont || 0);
	app.locals.cont += 1;
	console.log("Aciertos: "+app.locals.cont);
	next();
})

app.get('*',function(req,res){
	res.render("Upss"+"<br>"+"Ha acertado "+app.locals.cont+" veces");
})
*/

// GET /quizes/question
 exports.question = function(res,res){
 	models.Quiz.findAll().then(function(quiz){
	res.render('quizes/question',{pregunta: quiz[0].pregunta});
	});
};

// GET /quizes/answer
exports.answer = function(req, res){
   models.Quiz.findAll().then(function(quiz){
	if(req.query.respuesta === quiz[0].respuesta){
		quiz[0].aciertos += 1;
		quiz[0].save({fields: ['aciertos']}).then(function() {
		res.render('quizes/answer',{respuesta: 'Correcto'});
	});
	}else{
		quiz[0].fallo += 1;
		quiz[0].save({fields: ['fallos']}).then(function() {
		res.render('quizes/contador',
		{respuesta: 'Incorrecto',aciertos: quiz[0].aciertos});
		});
    }
   });
}