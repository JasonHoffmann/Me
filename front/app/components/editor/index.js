import views from 'root/views';

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