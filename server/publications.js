Meteor.publish('everything', function () {
  if (!Roles.userHasPermission(this.userId, 'app.subscribe')) {
    return [];
  }
  return [
    Courses.find({}),
    Students.find({}),
    Sessions.find({ date: moment().format("DD-MM-YYYY") })
  ];
});