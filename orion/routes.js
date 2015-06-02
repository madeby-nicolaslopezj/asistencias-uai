Router.route('/admin/upload', function () {
  this.layout(ReactiveTemplates.get('layout'));
  this.render('upload');
}, { name: 'upload' });

if (Meteor.isClient) {
  orion.addLink({
    section: 'top',
    title: 'Upload Data',
    routeName: 'upload',
    activeRouteRegex: 'upload',
  });

  orion.accounts.addProtectedRoute('upload');
}