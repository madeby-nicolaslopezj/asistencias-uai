Template.layout.onRendered(function() {
  this.subscribe('everything');
})

Template.login.helpers({
  currentError: function() {
    return Session.get('currentError');
  },
  isLoading: function() {
    return Session.get('isLoading');
  }
});

Template.login.onRendered(function() {
  Session.set('currentError', null);
  Session.set('isLoading', false);
})


Template.login.events({
  'submit form, click a': function (event, template) {
    if (Session.get('isLoading')) {
      return;
    }

    Session.set('currentError', null);
    var password = template.$('input').val();

    if (!password) {
      Session.set('currentError', 'Escribe la contraseña');
      return false;
    }

    Session.set('isLoading', true);
    Meteor.loginWithApp(password, function(error) {
      if (error && error.error == 403) {
        Session.set('currentError', 'Contraseña incorrecta');
      } else if (error) {
        Session.set('currentError', 'Error desconocido');
      }
      Session.set('isLoading', false);
    })

    return false;
  }
});