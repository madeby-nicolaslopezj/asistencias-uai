Meteor.methods({
  example: function () {
    console.log('wow, I was called');
    console.log(arguments);
  }
});