Router.map(function() {
  
  this.route('home', {
    path: '/'
  });

  this.route('collections.students.asistance', {
    path: '/students/:_id/asistance',
    layoutTemplate: ReactiveTemplates.get('layout')
  });

  this.route('collections.courses.asistance', {
    path: '/courses/:_id/asistance',
    layoutTemplate: ReactiveTemplates.get('layout')
  });
});
