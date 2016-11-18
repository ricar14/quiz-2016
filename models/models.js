var path = require('path');

// Cargar Modelo ORM
var Sequelize = require('sequelize');

// Usar BBDD SQLite
var sequelize = new Sequelize(null, null, null, {
	dialect: "sqlite",
	storage: "quiz.sqlite"
});

//Importar la definicion de la tabla Quiz en quiz.js
var Quiz = sequelize.import(path.join(__dirname, 'quiz'));
var Comment = sequelize.import(path.join(__dirname, 'comment'));

Comment.belongsTo(Quiz);
Quiz.hasMany(Comment);

exports.Quiz = Quiz; // exporta la definicion de la tabla Quiz
exports.Comment = Comment; // exporta la definicion de la tabla Quiz

//sequelize.sync() crea e inicializa la tabla de preguntas en DB
sequelize.sync().then(function() {
	// success(..) ejecuta el manejador una vez creada la tabla
	Quiz.count().then(function(count) {
		if (count === 0) { //la tabla se inicializa solo si está vacia
			Quiz.create({
					pregunta: 'Capital de <strong>Italia</strong>',
					respuesta: 'Roma'
				});
			Quiz.create({
					pregunta: 'Capital de <strong>Portugal</strong>',
					respuesta: 'Lisboa'
				})
				.then(function() {
					console.log('Base de datos inicializada')
				});
		};
	});
});