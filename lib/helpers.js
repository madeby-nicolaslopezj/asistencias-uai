process.env.TZ = 'America/Santiago' 

var moduleTrackerDep = new Tracker.Dependency;
var oldModule;

getCurrentModule = function() {
  moduleTrackerDep.depend();
  if (moment().isBefore(moment().hour(9).minute(50))) {
    return 1;
  }
  if (moment().isBefore(moment().hour(11).minute(20))) {
    return 2;
  }
  if (moment().isBefore(moment().hour(12).minute(50))) {
    return 3;
  }
  if (moment().isBefore(moment().hour(14).minute(50))) {
    return 4;
  }
  if (moment().isBefore(moment().hour(16).minute(20))) {
    return 5;
  }
  if (moment().isBefore(moment().hour(17).minute(50))) {
    return 6;
  }
  if (moment().isBefore(moment().hour(19).minute(20))) {
    return 7;
  }
  return 8;
}

Meteor.startup(function () {

  if (Meteor.isClient) {
    Session.set('MeteorToys_display', true)
  }

  oldModule = getCurrentModule();
  Meteor.setInterval(function () {
    if (oldModule != getCurrentModule()) {
      oldModule = getCurrentModule();
      moduleTrackerDep.changed();
    }
    moduleTrackerDep.changed();
  }, 1000);

  if (Meteor.isServer) {
    Meteor.setInterval(function () {
      Meteor.call('updateCurrentSessions');
    }, 10000);
  }

});

