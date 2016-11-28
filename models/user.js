// Definicion del modelo de Usuario

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('users',{
	 username: {
			type: DataTypes.STRING,
			validate: { notEmpty: {msg: "--> Falta Nombre"}}
		},
	 password:{
     		type: DataTypes.STRING,
			validate: { notEmpty: {msg: "-->Falta Contraseña"}}
			}
	});
}

			
			

