Template.coursesIndex.helpers({
  courses: function () {
    return Courses.find();
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