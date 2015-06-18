Sessions.attachSchema(new SimpleSchema({
  course: orion.attribute('hasOne', {
    label: 'Course'
  }, {
    collection: Courses,
    titleField: 'name',
    publicationName: 'asdfasdfasasdffdf',
  }),
  courseName: {
    type: String,
    optional: true,
    autoform: {
      omit: true
    },
    autoValue: function() {
      var courseId = this.field('course').value;
      var course = courseId && Courses.findOne(courseId);
      if (course) {
        return course.name
      }
      return '';
    }
  },
  module: {
    type: Number,
    autoValue: function() {
      if (this.isInsert) {
        return getCurrentModule()
      } else if (this.isUpsert) {
        return { $setOnInsert: getCurrentModule() };
      }
    }
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