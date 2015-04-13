Router.route('/admin/upload-data', {
	name: 'upload',
	controller: orion.RouteController,  
	onBeforeAction: orion.users.ensureRoutePermissions('entity.courses')
});

orion.admin.addSidebarTab({
    routeName: 'upload',
    navbarTitle: 'Upload',
    activeRouteRegex: 'upload',
    icon: 'upload',
    permission: 'entity.courses'
});