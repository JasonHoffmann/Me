import Vue from 'vue';
import views from 'root/views';
import store from 'root/stores/store';
import {getSections} from 'root/stores/actions';
import Revue from 'revue';

var Sections = Vue.extend({
	template: views['sections/index'],

	data: function() {
		return {
			active_sections: this.$store.state.active_sections
		}
	},

	created: function() {
		this.$store.dispatch(getSections());
	},

	ready: function() {
		this.$subscribe('active_sections');	
	}
});

export default Sections;