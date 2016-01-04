import Vue from 'vue';
import views from 'root/views';
import store from 'root/stores/store';
import {getNote, updateNote} from 'root/stores/actions';

var Notes_Edit = Vue.extend({
	template: views['notes/edit'],

	data : function() {
		return {
			note: this.$store.state.note
		}	
	},

	created: function() {
		var id = this.$route.params.id;
		this.$store.dispatch(getNote(id));
	},

	ready: function() {
		this.$subscribe('note');
	},

	events: {
		save: function() {
			this.$store.dispatch(updateNote(this.$route.params.id, this.note))
		}
	}
});

export default Notes_Edit;