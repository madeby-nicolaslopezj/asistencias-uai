Meteor.publish('everything', function() {
  if (!Roles.userHasPermission(this.userId, 'app.subscribe')) {
    return [];
  }
  return [
    Courses.find({ hidden: { $ne: true } }),
    Students.find({}),
    Sessions.find({ date: moment().format("DD-MM-YYYY") })
  ];
});

Meteor.publish('course', function(courseId) {
  check(courseId, String);
  if (!Roles.userHasPermission(this.userId, 'collection.courses.update')) {
    return [];
  }
  return Courses.find(courseId);
});

Meteor.publish('student', function(studentId) {
  check(studentId, String);
  if (!Roles.userHasPermission(this.userId, 'collection.students.update')) {
    return [];
  }
  return Students.find(studentId);
})