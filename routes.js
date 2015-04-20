Router.map(function() {
  this.route('courses.index', {
    path: '/',
    layoutTemplate: 'layout'
  });

  this.route('courses.show', {
    path: '/course/:_id',
    layoutTemplate: 'layout'
  });
});
