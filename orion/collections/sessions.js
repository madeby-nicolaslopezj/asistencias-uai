Sessions.attachSchema(new SimpleSchema({
  course: orion.attribute('hasOne', {
    label: 'Course'
  }, {
    collection: Courses,
    titleField: 'name',
    publicationName: 'asdfasdfasasdffdf',
  }),
  module: {
    type: Number,
  },
  date: {
    type: String,
    autoValue: function() {
      if (this.isInsert) {
        return moment().format("DD-MM-YYYY");
      } else if (this.isUpsert) {
        return { $setOnInsert: moment().format("DD-MM-YYYY") };
      }
    },
  },
  students: orion.attribute('hasMany', {
    label: 'Students that went',
    optional: true
  }, {
    collection: Students,
    titleField: 'name',
    publicationName: 'asdfasasddfasdf',
  }),
  createdBy: orion.attribute('createdBy')
}));

Sessions.deny({
  insert: function (userId, doc) {
    return Sessions.find({
      date: doc.date,
      module: doc.module,
      course: doc.course
    }).count() != 0;
  }
});