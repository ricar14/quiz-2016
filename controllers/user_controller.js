var models = require('../models/models.js');

// Comprueba si el usuario esta registrado en users
// Si autenticacion falla o hay errores se ejecuta callback(error)
exports.autenticar = function(login, password, callback) {
	models.User.findOne({
		where: {username:login, password:password},
		}).then(function(user){
		if(user) {
			callback(null, user);
		 }
		}).catch(function(error){
			callback(new Error('No existe el usuario'));
	});
		
}