import views from 'root/views';
import noteStore from 'root/stores/note';
import activeNoteStore from 'root/stores/activeNote'

var Notes = Vue.extend({
	template: views['notes/index'],

	data : function() {
		return {
			notes : noteStore.state.notes,
			active_note : noteStore.state.active_note
		}	
	},

	created: function() {
		noteStore.init();
		activeNoteStore.init();
	},

	ready: function() {
		noteStore.mutate();
	},

	methods : {
		deleteNote : function(note) {
		},

		newNote : function() {
		}
	}
});

export default Notes;