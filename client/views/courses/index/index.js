Template.coursesIndex.onRendered(function() {
  Meteor.setTimeout(function () {
    Materialize.showStaggeredList('.collection')
  }, 100);
})

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