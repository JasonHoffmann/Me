import views from 'root/views';
import noteStore from 'root/stores/note';
var simplemde;

var Notes = Vue.extend({
	template: views['notes/index'],

	route : {
		data : function(transition) {
			return noteStore.getAll().then(function(data) {
				simplemde = new SimpleMDE({ element : document.getElementById('nt-textarea')});
			});
 		}
 	},

	data : function() {
		return {
			notes : noteStore.state.notes,
			active_note : noteStore.state.active_note
		}	
	},
	
	methods : {
		makeActive : function(note) {
			noteStore.setActive(note);
			simplemde.value(note.meta.markdown);
		},

		newNote : function() {
			noteStore.createNew()
		},

		deleteNote : function(note) {
			var newNote = noteStore.deleteNote(note);
			simplemde.value( newNote.meta.markdown );
		},

		saveNote : function() {
			noteStore.saveNote({ 'ID' : this.active_note.ID, 'markdown' : simplemde.value() });
		}
	}
});

export default Notes;