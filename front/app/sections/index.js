import views from 'root/views';
import sectionStore from 'root/stores/section';

var Sections = Vue.extend({
	template: views['sections/index'],

	data: function(){
		return {
			sections: sectionStore
		}
	},

	computed : {
			active_sections : function() {
				return sectionStore.active();
			}
	},

	created: function() {
		var fetched = sectionStore.fetch();
	},

	methods : {
		clicked: function(e) {
			
			console.log(sectionStore.state);
		}
	}
});

export default Sections;