Courses = new orion.collection('courses', {
  tabular: {
    columns: [
      { data:'abbreviation', title: 'Abbreviation' },
      { data:'name', title: 'Name' },
      { data:'section', title: 'Section' },
      { data:'teacher', title: 'Teacher' },
      { data:'numberOfStudents', title: 'Number of students' },
      { data:'hidden', title: 'Hidden', render: function(val) { return val ? 'Yes' : 'No' } },
      { title: 'Actions', tmpl: Meteor.isClient && Template.courseAsistanceButton }
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
      { data:'courseName', title: 'Curso' },
      { data:'module', title: 'Module' },
      { data:'date', title: 'Date' },
      { data:'isActive', title: 'Activo' }
    ]
  }
});

Checks = new orion.collection('checks', {
  tabular: {
    columns: [
      orion.attributeColumn('hasOne', 'session', 'Session'),
      orion.attributeColumn('hasOne', 'students', 'Alumno')
    ]
  }
});

//Ground.Collection(Courses);
//Ground.Collection(Students);