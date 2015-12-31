import Vue from 'vue';
import views from 'views';

var Editor = Vue.extend({
	template: views['editor/editor'],

	props: ['note'],

	methods: {
		save: function() {
			this.$dispatch('save');
		}
	}
});

export default Editor;