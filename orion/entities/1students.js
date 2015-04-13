orion.addEntity('students', {
	omegaId: {
		type: String,
		unique: true
	},
    name: {
        type: String,
    },
    rut: {
        type: String,
    },
    digit: {
    	type: String,
    },
    email: {
    	type: String,
    }
}, {
    icon: 'users',
    sidebarName: 'Students',
    pluralName: 'Students',
    singularName: 'Student',
    tableColumns: [
        { data:'name', title: 'Name' },
        { data:'rut', title: 'Rut' },
        { data:'digit', title: 'Digit' },
        { data:'email', title: 'Email' },
    ]
});


// We will create a permission for possible event host
orion.users.permissions.createCustomEntityPermission({
	entity: 'students',
	name: 'roberto',
	indexFilter: function(userId) {
		return {};
	},
	update: function(userId, doc, fields, modifier) {
		return false;
	},
	create: function(userId, doc) {
		return false;
	},
	remove: function(userId, doc) {
		return false;
	},
});