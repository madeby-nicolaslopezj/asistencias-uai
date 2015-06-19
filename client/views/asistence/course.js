Template.collectionsCoursesAsistance.onRendered(function() {
  Session.set('asistanceResult', null);
  Meteor.call('getAsistanceByCourse', Router.current().params._id, function (error, result) {
    if (error) {
      console.log(error);
    } else {
      Session.set('asistanceResult', result);
      
    }
  });
})

Template.collectionsCoursesAsistance.helpers({
  result: function() {
    return Session.get('asistanceResult');
  }
});

Template.collectionsCoursesAsistance.events({
  'click .export-btn': function () {
    var data = Session.get('asistanceResult');
    var rows = [];

    rows[0] = ['Omega Code', 'Code', 'Nombre', 'Profesor', 'Sección', 'Numero de sesiones', 'PeriodoId', 'Periodo'];
    rows[1] = [data.course.omegaCode, data.course.abbreviation, data.course.name, data.course.teacher, data.course.section, data.totalSessions, data.course.periodId, data.course.periodName];

    rows[2] = ['OmegaCode', 'Alumno', 'Rut', 'Asistencia', 'Asistencia (%)']

    _.each(data.asistance, function(student) {
      rows.push([ student.omegaId, student.name, ( student.rut + '-' + student.digit ), student.asisted, student.percentage ]);
    });

    var csv = JSON2CSV(rows);
    window.open("data:text/csv;charset=utf-8," + encodeURI(csv))
  }
});