if (Roles._collection.find({ roles: 'admin' }).count() != 0) {
  if (Roles._collection.find({ roles: 'app' }).count() == 0) {
    console.log('Creating the app account');
    var id = Meteor.users.insert({
      profile: {
        name: "App"
      },
    });

    Roles.addUserToRoles(id, 'app');
  }
}