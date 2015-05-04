Meteor.methods({
  getAsistance: function(studentId) {
    check(studentId, String);
    if (!Roles.userHasPermission(this.userId, 'collection.students.update')) {
      return;
    }

    return Courses.find({ students: studentId }, { fields: { students: 0 } }).map(function (course) {
      course.totalSessions = Sessions.find({ course: course._id }).count();
      if (course.totalSessions == 0) {
        course.asisted = 0;
        course.percentage = 0;
        return course;
      }
      course.asisted = Sessions.find({ course: course._id, students: studentId }).count();
      course.percentage = Math.round((course.asisted / course.totalSessions) * 100);
      return course;
    });
  },
  getAsistanceByCourse: function(courseId) {
    check(courseId, String);
    if (!Roles.userHasPermission(this.userId, 'collection.courses.update')) {
      return;
    }

    var data = {};
    data.course = Courses.findOne(courseId);
    data.totalSessions = Sessions.find({ course: courseId }).count();

    data.asistance = Students.find({ _id: { $in: data.course.students } }).map(function (student) {
      if (data.totalSessions == 0) {
        student.asisted = 0;
        student.percentage = 0;
        return student;
      }
      student.asisted = Sessions.find({ course: courseId, students: student._id }).count();
      student.percentage = Math.round((student.asisted / data.totalSessions) * 100);
      return student;
    });

    return data;
  }
});
