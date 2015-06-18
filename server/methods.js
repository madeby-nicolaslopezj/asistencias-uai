Meteor.methods({
  getAsistance: function(studentId) {
    check(studentId, String);
    if (!Roles.userHasPermission(this.userId, 'collections.students.update')) {
      throw new Meteor.Error('unauthorized', 'The user id unauthorized to perform this action')
    }

    return Courses.find({ students: studentId }, { fields: { students: 0 } }).map(function (course) {
      var sessionsIds = _.pluck(Sessions.find({ course: course._id }, { fields: { _id: 1 } }).fetch(), '_id');
      course.totalSessions = sessionsIds.length;

      if (course.totalSessions == 0) {
        course.asisted = 0;
        course.percentage = 0;
        return course;
      }

      course.asisted = Checks.find({ student: studentId, session: { $in: sessionsIds } }).count();
      course.percentage = Math.round((course.asisted / course.totalSessions) * 100);
      return course;
    });
  },
  getAsistanceByCourse: function(courseId) {
    check(courseId, String);
    if (!Roles.userHasPermission(this.userId, 'collections.courses.update')) {
      throw new Meteor.Error('unauthorized', 'The user id unauthorized to perform this action')
    }

    var data = {};
    data.course = Courses.findOne(courseId);
    var sessionsIds = _.pluck(Sessions.find({ course: courseId }, { fields: { _id: 1 } }).fetch(), '_id');
    data.totalSessions = sessionsIds.length;

    data.asistance = Students.find({ _id: { $in: data.course.students } }).map(function (student) {
      if (data.totalSessions == 0) {
        student.asisted = 0;
        student.percentage = 0;
        return student;
      }
      student.asisted = Checks.find({ student: student._id, session: { $in: sessionsIds } }).count();
      student.percentage = Math.round((student.asisted / data.totalSessions) * 100);
      return student;
    });

    return data;
  }
});
