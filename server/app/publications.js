Meteor.publish('app.courses', function() {
  if (!Roles.userHasPermission(this.userId, 'app.subscribe')) {
    return [];
  }

  return Courses.find({ hidden: { $ne: true } }, { fields: { students: 0 } });
});

Meteor.publishComposite('app.course', function(courseId) {
  check(courseId, String);
  return {
    find: function() {
      if (!Roles.userHasPermission(this.userId, 'app.subscribe')) {
        return;
      }
      return Courses.find({ _id: courseId });
    },
    children: [{
      find: function(course) {
        var ids = course.students || [];
        return Students.find({ _id: { $in: ids } });
      }
    }, {
      find: function(course) {
        return Sessions.find({ course: course._id, date: moment().format("DD-MM-YYYY") });
      },
      children: [{
        find: function(session) {
          return Checks.find({ session: session._id });
        }
      }]
    }]
  }
})