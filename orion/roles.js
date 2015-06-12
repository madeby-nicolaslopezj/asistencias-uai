Roles.registerAction('app.subscribe', false);

AppRole = new Roles.Role('app');
AppRole.allow('collections.sessions.insert', true);
AppRole.allow('collections.sessions.update', function(userId, doc, fields) {
  return _.isEqual(fields, ['students']);
});
AppRole.allow('app.subscribe', true);