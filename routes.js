Router.map(function() {
  
  if (Meteor.isCordova || true) {
    this.route('courses.index', {
      path: '/',
      layoutTemplate: 'layout'
    });

    this.route('courses.show', {
      path: '/course/:_id',
      layoutTemplate: 'layout'
    });
  } else {
    this.route('home', {
      path: '/'
    });
  }

  this.route('collections.students.asistance', {
    path: '/students/:_id/asistance',
    layoutTemplate: ReactiveTemplates.get('layout')
  });

  this.route('collections.courses.asistance', {
    path: '/courses/:_id/asistance',
    layoutTemplate: ReactiveTemplates.get('layout')
  });
});
