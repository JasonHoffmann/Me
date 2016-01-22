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
	},

	methods : {
		makeActive : function(note) {
			noteStore.setActive(note);
		},

		newNote : function() {
			noteStore.createNew()
		}
	}
});

export default Notes;