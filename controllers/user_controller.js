var users = {admin: {id:1, username:"admin", password:"1234"},
			 ricardo: {id:2, username:"ricardo", password:"12345"}
			}

// Comprueba si el usuario esta registrado en users
// Si autenticacion falla o hay errores se ejecuta callback(error)
exports.autenticar = function(login, password, callback) {
	if(users[login]) {
		if(password === users[login].password) {
			callback(null, users[login]);
		} else {
			callback(new Error('Password erroneo')); 
		}
	} else { 
			callback(new Error('No existe el usuario'));
		}
}