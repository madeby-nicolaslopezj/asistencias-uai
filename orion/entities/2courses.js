orion.addEntity('courses', {
	omegaCode: {
		type: String,
		unique: true
	},
    name: {
        type: String,
    },
    section: {
        type: String,
    },
    abbreviation: {
    	type: String,
    },
    teacher: {
    	type: String,
    },
    numberOfStudents: {
    	type: String,
    },
    students: orion.attribute('hasMany', {
        label: 'Students',
        optional: true
    }, {
        entity: 'students',
        titleField: 'name',
        publicationName: 'asdfasdfasdf',
    })
}, {
    icon: 'bookmark',
    sidebarName: 'Courses',
    pluralName: 'Courses',
    singularName: 'Course',
    tableColumns: [
    	{ data:'abbreviation', title: 'Abbreviation' },
        { data:'name', title: 'Name' },
        { data:'section', title: 'Section' },
        { data:'teacher', title: 'Teacher' },
        { data:'numberOfStudents', title: 'Number of students' },
    ]
});


// We will create a permission for possible event host
orion.users.permissions.createCustomEntityPermission({
	entity: 'courses',
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