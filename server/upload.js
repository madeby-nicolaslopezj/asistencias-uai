Meteor.methods({
	upload: function (items) {
		console.log('recived items');

		check(items, [{
			CodigoOmega: String,
			ExpedienteId: String,
			Rut: String,
			DigitoVerificador: String,
			Email: String,
			Alumno: String,
			Asignatura: String,
			NumeroSeccion: String,
			'Sigla Asignatura': String,
			Profesor: String,
			InscritosVigentes: String
		}]);

		this.unblock();

		console.log('inserting ' + items.length + ' items');

		items.forEach(function (item) {
			orion.entities.students.collection.upsert({ omegaId: item.ExpedienteId }, {
				$set: {
					omegaId: item.ExpedienteId,
					name: item.Alumno,
					rut: item.Rut,
					digit: item.DigitoVerificador,
					email: item.Email,
				}
			});
			var studentId = orion.entities.students.collection.findOne({ omegaId: item.ExpedienteId }, { fields: { _id: 1 } })._id;
			var courseId = orion.entities.courses.collection.upsert({ omegaCode: item.CodigoOmega }, {
				$set: {
					omegaCode: item.CodigoOmega,
					name: item.Asignatura,
					section: item.NumeroSeccion,
					abbreviation: item['Sigla Asignatura'],
					teacher: item.Profesor,
					numberOfStudents: item.InscritosVigentes,
				},
				$addToSet: {
					students: studentId
				}
			});
		});

		console.log('items inserted');
	}
});