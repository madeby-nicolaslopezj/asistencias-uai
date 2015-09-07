Template.collectionsCoursesAsistance.onRendered(function() {
  Session.set('asistanceResult', null);
  Meteor.call('getAsistanceByCourse', Router.current().params._id, function (error, result) {
    if (error) {
      console.log(error);
    } else {
      Session.set('asistanceResult', result);
      
    }
  });
})

Template.collectionsCoursesAsistance.helpers({
  courseId: function() {
    return Router.current().params._id;
  },
  result: function() {
    return Session.get('asistanceResult');
  }
});