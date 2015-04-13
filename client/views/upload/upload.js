Template.upload.onRendered(function() {
	Session.set('showFileInput', true);
})

Template.upload.helpers({
	showFileInput: function () {
		return Session.get('showFileInput');
	}
});

Template.upload.events({
	'change input.filebag': function(e, template){
		Session.set('showFileInput', false);
		var files = e.target.files;
		var i,f, items;
		for (i = 0, f = files[i]; i != files.length; ++i) {
			var reader = new FileReader();
			var name = f.name;
			reader.onload = function(e) {
				var data = e.target.result;

				var workbook = XLSX.read(data, {type: 'binary'});

				items = to_json(workbook);

				Meteor.call('upload', items, function (error, result) {
					if (error) {
						console.log(error);
						alert(error.reason);
					} else {
						Router.go('adminEntitiesIndex', { entity: 'courses' });
					}
				});
				
			};
			reader.readAsBinaryString(f);
		}   
	}
})