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
  Session.set('isLoading', false);
})


Template.login.events({
  'submit form, click a': function (event, template) {
    if (Session.get('isLoading')) {
      return;
    }

    var password = template.$('input').val();

    if (!password) {
      Materialize.toast('Escribe la contraseña', 4000)
      return false;
    }

    Session.set('isLoading', true);
    Meteor.loginWithApp(password, function(error) {
      if (error && error.error == 403) {
        Materialize.toast('Contraseña incorrecta', 4000)
      } else if (error) {
        Materialize.toast('Contraseña incorrecta', 4000)
      }
      Session.set('isLoading', false);
    })

    return false;
  }
});