Roles.registerAction('app.subscribe', false);

AppRole = new Roles.Role('app');
AppRole.allow('collections.sessions.insert', true);
AppRole.allow('collections.sessions.update', true);
AppRole.allow('collections.checks.insert', true);
AppRole.allow('app.subscribe', true);

Roles._adminRole.deny('collections.checks.index', true)