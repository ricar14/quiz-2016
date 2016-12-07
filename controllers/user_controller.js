var models = require('../models/models.js');

// Comprueba si el usuario esta registrado en users
// Si autenticacion falla o hay errores se ejecuta callback(error)
exports.autenticar = function(login, password, callback) {
	models.User.findOne({
		where: {username:login, password:password},
		}).then(function(user){
		if(user) {
			callback(null, user);
		 }else {
		 	callback(new Error('No existe el usuario o contraseña'));
		 }
		}).catch(function(error){
			callback(new Error('No existe el usuario'));
	});
		
}

exports.load = function(req,res,next,userId){
	models.User.findOne({
			where: {id: Number(userId) }	
		}).then(
		function(user){
			if(user){
				req.user = user;
				next();
			} else {
				next(new Error('No existe userId='+userId));
			}
		}).catch(function(error){ 
			next(error);
		  })
}

// GET /newUser
exports.new = function(req,res){
	var user = models.User.build( {} );//crea objeto quiz
	res.render('user/newUser',{user:user});
}

// POST /newUser
exports.create = function(req,res){
	var userBody = req.body.user;
	var user = models.User.build(userBody);
	user.validate().then(function(err){
			if(err){
				res.render('user/newUser',{user:user,errors:err.errors});
			} else if(user.password !=  userBody.password2) {	
				res.render('user/newUser',{user: user, errors: [{message: 'No coinciden las contraseñas'}]});
			}else{
				user //save:guardar en DB campos username y password de user
				.save({fields:["username","password"]})
				.then(function(){res.redirect('/user')})
			}	// res.redirect: Redireccion HTTP a lista de preguntas
	})	//Redireccion HTTP (URL relativo) lista de preguntas
};

// GET /user
exports.index = function(req, res) {
	models.User.findAll().then(function(User) {
		res.render('user/index',{User:User});
	}).catch(function(error){
		next(error)
	  })
}


exports.update = function(req, res){
	req.user.username = req.body.user.username;
	req.user.password = req.body.user.password;

	req.user.validate().then(
		function(err){
			if(err){
				res.render('/user/editUser',{user: req.user, errors: err.errors});
			}else{
				req.user // save: guarda campos pregunta y respuesta en DB
				.save( {fields:["username","password"]})
				.then( function(){ res.redirect('/user');});
			}	//Redireccion HTTP a lista de preguntas(URL relativo)
		})
	}

//Editar usuarios
exports.edit = function(req,res){
	var user = req.user; //autoload de instancia de user
	res.render('user/editUser',{user:user});
}

//Borrar usuarios
exports.destroy = function(req, res){
	req.user.destroy().then(function(){
		res.redirect('/user');
	}).catch(function(error){next(error)})
}


