Roles.registerAction('app.subscribe', false);
AppRole = new Roles.Role('app');
AppRole.allow('collection.sessions.insert', true);
AppRole.allow('collection.sessions.update', function(userId, doc, fields) {
  return _.isEqual(fields, ['students']);
});
AppRole.allow('app.subscribe', true);