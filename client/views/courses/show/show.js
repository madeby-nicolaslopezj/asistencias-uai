Template.coursesShow.helpers({
  course: function () {
    var id = Router.current().params._id;
    return Courses.findOne(id);
  },
  currentModule: function() {
    return getCurrentModule();
  }
});

Template.coursesShow.events({
  'click .start-session': function () {
    Sessions.insert({ course: Router.current().params._id, module: getCurrentModule() });
  }
});

Template.coursesShowSession.onRendered(function() {
  Session.set('currentError', null);
})

Template.coursesShowSession.helpers({
  session: function () {
    return this.course.getCurrentSession();
  },
  currentError: function() {
    return Session.get('currentError');
  }
});

Template.coursesShowSession.events({
  'submit form, click a': function (event, template) {
    Session.set('currentError', null);
    var course = this.course;
    var session = course.getCurrentSession();
    var rut = template.$('input').val();
    var student = Students.findOne({ rut: rut });
    if (!student) {
      Session.set('currentError', 'Rut incorrecto');
      return false;
    }
    if (!_.contains(course.students, student._id)) {
      Session.set('currentError', 'Rut incorrecto');
      return false;
    }
    if (_.contains(session.students, student._id)) {
      Session.set('currentError', 'Ya marcaste asistencia');
      template.$('input').val('');
      return false;
    }

    template.$('input').val('');
    Sessions.update(session._id, { $addToSet: { students: student._id } })

    return false;
  }
});;