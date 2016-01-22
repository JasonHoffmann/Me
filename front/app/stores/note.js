import api from 'root/api/index';

var stub = {
	ID : '',
	title : 'New Title',
	content : '',
	meta : {
		markdown : ''
	}
};


var noteStore = {

	state : {
		active_note : stub,
		notes : [],
		api_called : false,
	},

	init: function() {
		if(!this.state.api_called) {
			this.getAll();
		}
	},

	getAll : function() {
		this.api_called = true;

		api.get_notes().then(function(data) {
			var first = _.head(data.data);

			_.each(data.data, function( note ) {
				if( first === note) {
					note.active = true;
				} else {
					note.active = false;
				}
				noteStore.state.notes.push(note);
			});

			noteStore.state.active_note = _.assign(noteStore.state.active_note, first);

		})
	},

	setActive : function(note) {
		this.state.active_note = _.assign(noteStore.state.active_note, note);

		_.each(this.state.notes, function( n ) {
			if(n.ID === note.ID) {
				n.active = true;
			} else {
				n.active = false;
			}
		});
	},

	createNew : function() {
		var newStub = {
			title : 'Note Title',
		};

		api.add_note(newStub).then(function(note) {
			console.log(note);
			console.log(note.data);
		});

		// TODO : MAKE PROPER REQUEST TO API AND RETURN THE ID
		// noteStore.state.notes.push(newStub);

		// this.state.active_note = _.assign(noteStore.state.active_note, newStub);
	}
}

export default noteStore;