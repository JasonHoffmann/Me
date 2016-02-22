import views from 'root/views';
import noteStore from 'root/stores/note';
var simplemde;

var Notes = Vue.extend({
	template: views['notes/index'],

	route : {
		data : function(transition) {
			var notes = noteStore.fetch({
				success: function(data) {
					noteStore.setSelected();
				}
			});
			notes.then(function() {
				simplemde = new SimpleMDE({ element : document.getElementById('nt-textarea')});
			})
 		}
 	},

	data : function() {
		return {
			notes : noteStore
		}	
	},

	computed : {
			active_note : function() {
				return noteStore.selected()
			}
	},
	
	methods : {
		makeActive : function(note) {
			noteStore.setSelected(note);
			simplemde.value(note.get('meta').markdown);
		},

		newNote : function() {
			// var newNote = noteStore.create({title: 'NEW TITLE FOR A THING'}, {wait: true});
			// noteStore.push(newNote);
			noteStore.set([{title: 'NEW TITLE'}]);
		},

		deleteNote : function(note) {
			var currentNote = this.active_note;
			currentNote.destroy();
			noteStore.setSelected();
		},

		saveNote : function() {
			var currentNote = this.active_note;
			var title = document.getElementById('noteTitle').value;
			currentNote.set({ title: title, 'markdown' : simplemde.value() });
			currentNote.save();
		}
	}
});

export default Notes;