Router.route('/download-course/:_id', function() {
  var courseId = this.params._id;
  var course = Courses.findOne(courseId);

  var sessions = Sessions.find({ course: courseId }).fetch();
  var students = Students.find({ _id: { $in: course.students } }).fetch();
  var data = [];

  _.each(students, function(student) {
    var row = student;
    row.sessions = {};
    _.each(sessions, function(session, index) {
      row.sessions[session._id] = !!Checks.find({ student: student._id, session: session._id }).count();
    });
    data.push(row);
  });

  var fields = [];
  fields.push({
    key: 'omegaId',
    title: 'Omega ID',
    type: 'number'
  });
  fields.push({
    key: 'name',
    title: 'Nombre'
  });
  fields.push({
    key: 'rut',
    title: 'Rut',
    transform: function(val, doc) {
      return doc.rut + '-' + doc.digit;
    }
  });

  _.each(sessions, function(session, index) {
    fields.push({
      key: 'sessions.' + session._id,
      title: '#' + (index + 1) + ' - Modulo ' + session.module + ' - ' + session.date,
      type: 'number',
      transform: function(val) {
        return val ? 1: 0;
      }
    });
  });

  var title = 'Asistencia ' + course.name;
  var file = Excel.export(title, fields, data);
  var headers = {
    'Content-type': 'application/vnd.openxmlformats',
    'Content-Disposition': 'attachment; filename=' + title + '.xlsx'
  };

  this.response.writeHead(200, headers);
  this.response.end(file, 'binary');
}, { where: 'server' });