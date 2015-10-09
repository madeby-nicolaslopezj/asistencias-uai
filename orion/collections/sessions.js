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
        return course.name;
      }
    }
  },
  module: {
    type: Number,
    allowedValues: [1, 2, 3, 4, 5, 6, 7, 8]
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
  isActive: {
    type: Boolean,
    autoValue: function() {
      return !!this.value;
    }
  },
  createdBy: orion.attribute('createdBy')
}));

Sessions.deny({
  insert: function (userId, doc) {
    Sessions.update({ isActive: true, date: { $lte: moment().startOf('day').toDate() } }, { $set: { isActive: false } }, { multi: true });
    return Sessions.find({
      $or: [{
        date: doc.date,
        module: doc.module,
        course: doc.course
      }, {
        course: doc.course,
        isActive: true
      }]
    }).count() !== 0;
  }
});
