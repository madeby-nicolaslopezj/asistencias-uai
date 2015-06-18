Checks.attachSchema(new SimpleSchema({
  session: orion.attribute('hasOne', {
    label: 'Session'
  }, {
    collection: Sessions,
    titleField: 'courseName',
    publicationName: 'asdfasdfasasdasdffdf',
  }),
  student: orion.attribute('hasOne', {
    label: 'Student'
  }, {
    collection: Students,
    titleField: 'name',
    publicationName: 'asddsafajijisasddfasdf',
  }),
  createdBy: orion.attribute('createdBy')
}));

Checks.deny({
  insert: function (userId, doc) {
    return Checks.find({
      session: doc.session,
      student: doc.student
    }).count() != 0;
  }
});

Checks.deny({
  insert: function (userId, doc) {
    var student = Students.findOne(doc.student);
    if (!student) {
      return true
    }

    var session = Sessions.findOne(doc.session);
    if (!session) {
      return true;
    }

    var course = Courses.findOne(session.course);
    if (!course) {
      return true;
    }

    if (session.date != moment().format('DD-MM-YYYY')) {
      return true;
    }

    if (!_.contains(course.students, student._id)) {
      return true;
    }
  }
});