String.prototype.ucwords = function() {
  str = this.toLowerCase();
  str = str.replace(/(^([a-zA-Z\p{M}]))|([ -][a-zA-Z\p{M}])/g,
    function(s){
      return s.toUpperCase();
  });

  var letters = ['En', 'La', 'Y', 'A', 'Los', 'Las'];

  _.each(letters, function(letter){
    str = str.replace(' ' + letter + ' ', ' ' + letter.toLowerCase() + ' ');
  });

  return str;
};

Meteor.methods({
  upload: function (items) {
    console.log('recived items');

    check(items, [{
      CodigoOmega: String,
      PeriodoAcademicoId: String,
      NombrePeriodoAcademico: String,
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



    items = items.map(function(item) {
      item.Asignatura = item.Asignatura.ucwords();
      item.Profesor = item.Profesor.ucwords();
      item.Alumno = item.Alumno.ucwords();
      return item;
    })

    this.unblock();

    console.log('inserting ' + items.length + ' items');

    items.forEach(function (item) {
      Students.upsert({ omegaId: item.ExpedienteId }, {
        $set: {
          omegaId: item.ExpedienteId,
          name: item.Alumno,
          rut: item.Rut,
          digit: item.DigitoVerificador,
          email: item.Email,
        }
      });
      var studentId = Students.findOne({ omegaId: item.ExpedienteId }, { fields: { _id: 1 } })._id;
      var courseId = Courses.upsert({ omegaCode: item.CodigoOmega }, {
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