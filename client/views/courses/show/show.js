Template.coursesShow.onRendered(function() {
  $('.show').fadeIn();
})

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

Template.coursesShowSession.helpers({
  session: function () {
    return this.course.getCurrentSession();
  }
});

Template.coursesShowSession.events({
  'submit form, click a': function (event, template) {
    var course = this.course;
    var session = course.getCurrentSession();
    var rut = template.$('input').val();
    var student = Students.findOne({ rut: rut });
    if (!student) {
      Materialize.toast('Rut incorrecto', 4000)
      return false;
    }
    if (!_.contains(course.students, student._id)) {
      Materialize.toast('Rut incorrecto', 4000)
      return false;
    }
    if (_.contains(session.students, student._id)) {
      Materialize.toast('Ya marcaste asistencia', 4000)
      template.$('input').val('');
      return false;
    }

    template.$('input').val('');
    Sessions.update(session._id, { $addToSet: { students: student._id } })

    return false;
  }
});;