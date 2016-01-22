import views from 'root/views';
import sectionStore from 'root/stores/section';

var Sections = Vue.extend({
	template: views['sections/index'],

	data: function(){
		return {
			sections: sectionStore.state.sections
		}
	},

	computed : {
			active_sections : function() {
				return _.filter(this.sections, function(o) {
					return o.activated
				})
			}
	},

	ready: function() {
		sectionStore.getAll();
	},

	methods : {
		clicked: function(e) {
			
			console.log(sectionStore.state);
		}
	}
});

export default Sections;