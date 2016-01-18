import views from 'root/views';
import noteStore from 'root/stores/note'

var Notes = Vue.extend({
	template: views['notes/index'],

	data : function() {
		return {
			notes: noteStore.state.notes
		}	
	},

	created: function() {
		noteStore.init();
	},

	methods : {
		deleteNote : function(note) {
		},

		newNote : function() {
		}
	}
});

export default Notes;