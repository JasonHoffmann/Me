import Vue from 'vue';
import views from 'root/views';
import store from 'root/stores/store';
import {getNotes, deleteNote, addNote} from 'root/stores/actions';

var Notes = Vue.extend({
	template: views['notes/index'],

	data : function() {
		return {
			notes: this.$store.state.notes
		}	
	},

	created: function() {
		this.$store.dispatch(getNotes());
	},

	ready: function() {
		this.$subscribe('notes');
	},

	methods : {
		deleteNote : function(note) {
			// Need to do this with reducers instead of directly
			this.notes.$remove(note);
			this.$store.dispatch(deleteNote(note.ID));
		},

		newNote : function() {
			this.$store.dispatch(addNote());
		}
	}
});

export default Notes;