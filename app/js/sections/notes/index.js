import Vue from 'vue';
import views from 'views';
import store from 'stores/store';
import {getNotes, deleteNote, addNote} from 'stores/actions'

var Notes = Vue.extend({
	template: views['notes/index'],

	data : function() {
		return {
			notes: this.$revue.getState().notes
		}	
	},

	created: function() {
		this.$revue.dispatch(getNotes());
	},

	ready: function() {
		this.$subscribe('notes');
	},

	methods : {
		deleteNote : function(note) {
			// Need to do this with reducers instead of directly
			this.notes.$remove(note);
			this.$revue.dispatch(deleteNote(note.ID));
		},

		newNote : function() {
			this.$revue.dispatch(addNote());
		}
	}
});

export default Notes;