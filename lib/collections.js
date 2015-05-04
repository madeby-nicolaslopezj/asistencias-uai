Courses = new orion.collection('courses', {
  tabular: {
    columns: [
      { data:'abbreviation', title: 'Abbreviation' },
      { data:'name', title: 'Name' },
      { data:'section', title: 'Section' },
      { data:'teacher', title: 'Teacher' },
      { data:'numberOfStudents', title: 'Number of students' },
    ]
  }
})
Students = new orion.collection('students', {
  tabular: {
    columns: [
      { data:'name', title: 'Name' },
      { data:'rut', title: 'Rut' },
      { data:'digit', title: 'Digit' },
      { data:'email', title: 'Email' },
      { title: 'Actions', tmpl: Meteor.isClient && Template.asistanceButton }
    ]
  }
});

Sessions = new orion.collection('sessions', {
  tabular: {
    columns: [
      orion.attributeColumn('hasOne', 'course', 'Course'),
      { data:'module', title: 'Module' },
      { data:'date', title: 'Date' },
      orion.attributeColumn('hasMany', 'students', 'Asistants'),
    ]
  }
});

//Ground.Collection(Courses);
//Ground.Collection(Students);