Sessions.after.insert(function() {
  Meteor.call('updateCurrentSessions');
})

Sessions.after.update(function() {
  Meteor.call('updateCurrentSessions');
})

Sessions.after.remove(function() {
  Meteor.call('updateCurrentSessions');
})