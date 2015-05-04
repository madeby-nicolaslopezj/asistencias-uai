Template.collectionsStudentsAsistance.onRendered(function() {
  this.subscribe('student', Router.current().params._id);
  Session.set('asistanceResult', null);
  Meteor.call('getAsistance', Router.current().params._id, function (error, result) {
    if (error) {
      console.log(error);
    } else {
      Session.set('asistanceResult', result);
    }
  });
})

Template.collectionsStudentsAsistance.helpers({
  student: function () {
    return Students.findOne(Router.current().params._id);
  },
  result: function() {
    return Session.get('asistanceResult');
  }
});