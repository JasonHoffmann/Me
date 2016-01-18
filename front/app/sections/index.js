import views from 'root/views';
import sectionStore from 'root/stores/section';

var Sections = Vue.extend({
	template: views['sections/index'],

	data: function(){
		return {
			sections: sectionStore.state.sections,
			active_sections : sectionStore.state.active_sections,
			string: 'string'
		}
	},

	ready: function() {
		sectionStore.init();
	},

	methods : {
		clicked: function(e) {
			e.preventDefault();
			console.log(sectionStore.state);
		}
	}
});

export default Sections;