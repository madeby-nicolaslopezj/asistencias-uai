Meteor.methods({
  addStudentToSession: function (studentId, sessionId) {
    if (!Roles.userHasPermission(this.userId, 'app.subscribe')) {
      throw new Meteor.Error('unauthorized', 'Unauthorized client');
    }

    check(studentId, String);
    check(sessionId, String);

    var student = Students.findOne(studentId);
    if (!student) {
      throw new Meteor.Error('not-found', 'Student not found');
    }

    var session = Sessions.findOne(sessionId);
    if (!session) {
      throw new Meteor.Error('not-found', 'Session not found');
    }

    var course = Courses.findOne(session.course);
    if (!course) {
      throw new Meteor.Error('not-found', 'Course not found');
    }

    if (session.date != moment().format("DD-MM-YYYY")) {
      throw new Meteor.Error('invalid-session', 'Date is not today');
    }

    if (!_.contains(course.students, student._id)) {
      throw new Meteor.Error('invalid-course', 'Student is not in course');
    }

    if (_.contains(session.students, student._id)) {
      throw new Meteor.Error('repeated', 'Ya marcó asistencia');
    }

    Sessions.update(session._id, { $addToSet: { students: student._id } })
  }
});