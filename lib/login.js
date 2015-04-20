if (Meteor.isClient) {
  Meteor.loginWithApp = function(password, callback) {
    var loginRequest = { appPassword: password };
    Accounts.callLoginMethod({
      methodArguments: [loginRequest],
      userCallback: callback
    });
  };
}

if (Meteor.isServer) {
  Accounts.registerLoginHandler(function(loginRequest) {

    if(!loginRequest.appPassword) {
      return undefined;
    }

    //our authentication logic :)
    if(loginRequest.appPassword != orion.config.get('APP_PASSWORD')) {
      return { error: new Meteor.Error(403, 'Incorrect password') };
    }
    
    var userId = Roles._collection.findOne({ roles: 'app' }).userId;

    //send loggedin user's user id
    return { userId: userId }
  });
}