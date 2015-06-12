Meteor.publish('app.courses', function() {
  Meteor._sleepForMs(700)
  if (!Roles.userHasPermission(this.userId, 'app.subscribe')) {
    return [];
  }

  return Courses.find({ hidden: { $ne: true } }, { fields: { students: 0 } });
});

Meteor.publishComposite('app.course', function(courseId) {
  Meteor._sleepForMs(700)
  check(courseId, String);
  return {
    find: function() {
      if (!Roles.userHasPermission(this.userId, 'app.subscribe')) {
        return [];
      }
      return Courses.find({ _id: courseId });
    },
    children: [{
      find: function(course) {
        var ids = course.students;
        return Students.find({ _id: { $in: ids } });
      }
    }, {
      find: function(course) {
        return Sessions.find({
          course: course._id,
          module: getCurrentModule(),
          date: moment().format('DD-MM-YYYY')
        })
      }
    }]
  }
})