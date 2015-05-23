Template.coursesIndex.helpers({
  courses: function () {
    return Courses.find({ hidden: { $ne: true } }, { sort: { name: 1 } });
  }
});

Template.coursesIndex.events({
  'click .course': function () {
    Router.go('courses.show', this);
  },
  'click .btn-logout': function() {
    Meteor.logout();
  }
});