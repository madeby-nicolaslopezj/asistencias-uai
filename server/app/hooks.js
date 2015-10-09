Sessions.before.insert(function() {
  Sessions.update({ isActive: true, date: { $lte: moment().startOf('day').toDate() } }, { $set: { isActive: false } }, { multi: true });
});

Sessions.after.insert(function() {
  Meteor.call('updateCurrentSessions');
});

Sessions.after.update(function() {
  Meteor.call('updateCurrentSessions');
});

Sessions.after.remove(function() {
  Meteor.call('updateCurrentSessions');
});
