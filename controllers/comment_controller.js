var models = require('../models/models.js');

// Autoload:id de comentarios
exports.load = function(req, res, next, commentId) {
	models.Comment.findById(commentId).then(function(comment) {
		if(comment) {
			req.comment = comment;
			next();
		 } else { next(new Error('No existe commentId=' + commentId))}
		}
	).catch(function(error) {next(error)});
}



// GET /quizes/:quizId/comments/new
exports.new = function(req, res, next) {
	var comment = models.Comment.build( //crea objeto comment
	);

	res.render('comments/new', {quiz: req.quiz, errors: [] });
};

// POST /quizes/:quizId/comments
exports.create = function(req, res, next) {

	var comment = models.Comment.build( req.body.comment );

	comment.validate().then(function(err) {
		if(err){
			res.render('comments/new', {comment: comment, quiz: req.quiz, errors: err.errors});
		}else{
			//guarda en DB los campo texto de comment
			comment.save().then(function(){
				req.quiz.addComment(comment).then(function(){
					res.redirect('/quizes/' + req.quiz.id);
				});
			}) // Redirección HTTP (URL relativo) lista de preguntas
		}
	}
  ).catch(function(error){next(error)});
};

exports.publish = function(req, res) {
	req.comment.publicado = true;

	req.comment.save( {fields: ["publicado"]})
	.then(function() {res.redirect('/quizes/'+req.params.quizId)})
	.catch(function(error) {next(error)})
}