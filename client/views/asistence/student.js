Template.collectionsStudentsAsistance.onRendered(function() {
  this.subscribe('student', Router.current().params._id);
  Session.set('asistanceResult', null);
  Meteor.call('getAsistance', Router.current().params._id, function (error, result) {
    if (error) {
      console.log(error);
    } else {
      Session.set('asistanceResult', result);
    }
  });
})

Template.collectionsStudentsAsistance.helpers({
  student: function () {
    return Students.findOne(Router.current().params._id);
  },
  result: function() {
    return _.isArray(Session.get('asistanceResult')) && Session.get('asistanceResult');
  }
});

Template.collectionsStudentsAsistance.events({
  'click .export-btn': function () {
    var student = Students.findOne(Router.current().params._id);
    var data = Session.get('asistanceResult');
    var rows = [];

    rows[0] = ['Omega Code', 'Rut', 'Nombre'];
    rows[1] = [student.omegaId, ( student.rut + '-' + student.digit ), student.name];

    rows[2] = ['Omega Code', 'Code', 'Nombre', 'Profesor', 'Sección', 'PeriodoId', 'Periodo', 'Numero de sesiones', 'Asistencia', 'Asistencia (%)']

    _.each(data, function(course) {
      rows.push([ course.omegaCode, course.abbreviation, course.name, course.teacher, course.section, course.periodId, course.periodName, course.totalSessions, course.asisted, course.percentage ]);
    });

    var csv = JSON2CSV(rows);
    window.open("data:text/csv;charset=utf-8," + encodeURI(csv))
  }
});