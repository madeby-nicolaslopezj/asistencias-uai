Meteor.methods({
  getAsistance: function(studentId) {
    check(studentId, String);
    if (!Roles.userHasPermission(this.userId, 'collection.students.update')) {
      //return;
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
  }
});
