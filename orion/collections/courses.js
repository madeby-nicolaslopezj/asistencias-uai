Courses.attachSchema(new SimpleSchema({
  omegaCode: {
    type: String,
    unique: true
  },
  name: {
    type: String,
  },
  section: {
    type: String,
  },
  abbreviation: {
    type: String,
  },
  teacher: {
    type: String,
  },
  numberOfStudents: {
    type: String,
  },
  students: orion.attribute('hasMany', {
    label: 'Students',
    optional: true
  }, {
    collection: Students,
    titleField: 'name',
    publicationName: 'asdfasdfasdf',
  })
}));

Courses.helpers({
  getCurrentSession: function() {
    return Sessions.findOne({ course: this._id, date: moment().format("DD-MM-YYYY"), module: getCurrentModule() });
  }
});