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
  result: function() {
    return Session.get('asistanceResult');
  }
});