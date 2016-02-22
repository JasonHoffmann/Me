// import api from 'root/api/index';

// var stub = {
// 	ID : '',
// 	title : 'New Title',
// 	content : '',
// 	meta : {
// 		markdown : ''
// 	}
// };


// var noteStore = {

// 	state : {
// 		active_note : stub,
// 		notes : [],
// 		api_called : false,
// 	},

// 	init: function() {
// 		if(!this.state.api_called) {
// 			this.getAll();
// 		}
// 	},

// 	getAll : function() {
// 		this.api_called = true;

// 		return api.get_notes().then(function(data) {
// 			var first = _.head(data.data);

// 			_.each(data.data, function( note ) {
// 				if( first === note) {
// 					note.active = true;
// 				} else {
// 					note.active = false;
// 				}
// 				noteStore.state.notes.push(note);
// 			});

// 			return noteStore.state.active_note = _.assign(noteStore.state.active_note, first);

// 		})
// 	},

// 	getNotes : function() {
// 		this.api_called = true;

// 		return api.get_notes();
// 	},

// 	setActive : function(note) {
// 		this.state.active_note = _.assign(noteStore.state.active_note, note);

// 		_.each(this.state.notes, function( n ) {
// 			if(n.ID === note.ID) {
// 				n.active = true;
// 			} else {
// 				n.active = false;
// 			}
// 		});
// 	},

// 	createNew : function() {
// 		var newStub = {
// 			title : 'Untitled'
// 		};

// 		var newNote = api.add_note(newStub).then(function(note) {
// 			noteStore.state.notes.unshift(note.data);
// 			noteStore.setActive( note.data );
// 			return note.data;
// 		});
// 	},

// 	deleteNote : function( note ) {
// 		var where = _.findIndex(this.state.notes, function(n) {
// 			return n.ID === note.ID;
// 		})
// 		this.state.notes.splice(where, 1);

// 		var first = _.head(this.state.notes);
// 		noteStore.state.active_note = _.assign(noteStore.state.active_note, first);
// 		api.delete_note(note.ID);

// 		return first;
// 	},

// 	saveNote : function(note) {
// 		var newNote = api.edit_note(note.ID, note);

// 		newNote.then(function(data) {
// 			var match = _.find(noteStore.state.notes, {ID: 48}),
// 				index = _.indexOf(noteStore.state.notes, match);
// 			_.merge(noteStore.state.active_note, data.data);
// 			noteStore.state.notes.splice(index, 1, noteStore.state.active_note);
// 		})


// 	}
// }

// export default noteStore;

var Note = Backbone.Model.extend({
	defaults: {
		ID : '',
		title : '',
		content : '',
		meta: {
			markdown : ''
		},
		active : false
	},
	idAttribute : 'ID'
});

var NoteCollection = Backbone.Collection.extend({
	model : Note,
	url: 'http://slash-me.dev/wp-json/me/v1/notes',

	selected: function(note) {
		var thing = this.where({active: true})[0];
		return thing;
	},

	setSelected : function(note) {
		this.deselect();
		note = note || this.first();
		note.set({active: true});
	},

	deselect : function(note) {
		if (!this.selected()){ return; }
		note = note || this.selected();
		note.set({active: false});
	}
});

var noteStore = new NoteCollection({});

export default noteStore;