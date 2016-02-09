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

		return api.get_notes().then(function(data) {
			var first = _.head(data.data);

			_.each(data.data, function( note ) {
				if( first === note) {
					note.active = true;
				} else {
					note.active = false;
				}
				noteStore.state.notes.push(note);
			});

			return noteStore.state.active_note = _.assign(noteStore.state.active_note, first);

		})
	},

	getNotes : function() {
		this.api_called = true;

		return api.get_notes();
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
			title : 'Untitled'
		};

		var newNote = api.add_note(newStub).then(function(note) {
			noteStore.state.notes.unshift(note.data);
			noteStore.setActive( note.data );
			return note.data;
		});
	},

	deleteNote : function( note ) {
		var where = _.findIndex(this.state.notes, function(n) {
			return n.ID === note.ID;
		})
		this.state.notes.splice(where, 1);

		var first = _.head(this.state.notes);
		noteStore.state.active_note = _.assign(noteStore.state.active_note, first);
		api.delete_note(note.ID);

		return first;
	},

	saveNote : function(note) {
		var newNote = api.edit_note(note.ID, note);
	}
}

export default noteStore;