import Vue from 'vue';
import views from 'views';
import store from 'stores/store';
import {getNote, updateNote} from 'stores/actions';

var Notes_Edit = Vue.extend({
	template: views['notes/edit'],

	data : function() {
		return {
			note: this.$revue.getState().note
		}	
	},

	created: function() {
		var id = this.$route.params.id;
		this.$revue.dispatch(getNote(id));
	},

	ready: function() {
		this.$subscribe('note');
	},

	events: {
		save: function() {
			this.$revue.dispatch(updateNote(this.$route.params.id, this.note))
		}
	}
});

export default Notes_Edit;