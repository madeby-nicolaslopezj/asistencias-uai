Sessions.before.remove(function(userId, doc) {
  Checks.remove({ session: doc._id });
})