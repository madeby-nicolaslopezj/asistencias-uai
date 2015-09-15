Router.route('/admin/upload', function () {
  this.layout(ReactiveTemplates.get('layout'));
  this.render('upload');
}, { name: 'upload' });

if (Meteor.isClient) {
  orion.links.add({
    identifier: 'upload',
    index: 1,
    title: 'Upload Data',
    routeName: 'upload',
    activeRouteRegex: 'upload',
  });

  orion.accounts.addProtectedRoute('upload');
}
