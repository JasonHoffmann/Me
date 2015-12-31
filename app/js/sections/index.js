import Vue from 'vue';
import views from 'views';
import store from 'stores/store';
import {getSections} from 'stores/actions';

var Sections = Vue.extend({
	template: views['sections/index'],

	data: function() {
		return {
			sections: this.$revue.getState().sections,
			active_sections: this.$revue.getState().active_sections
		}
	},

	created: function() {
		this.$revue.dispatch(getSections());
	},

	ready: function() {
		this.$subscribe('sections');
		this.$subscribe('active_sections');	
	}
});

export default Sections;