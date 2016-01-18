import api from 'root/api/index'

var sectionStore = {
	state : {
		sections : [],
		active_sections : [],
		api_called : false
	},

	init: function() {
		if(!this.state.api_called) {
			this.getAll();
		}
	},

	getAll : function() {
		this.api_called = true;


		api.get_sections().then(function(data) {

			_.each(data.data, function( section ) {
				sectionStore.state.sections.push(section);
			});

			_.each(data.data, function( section ) {
				if( section.activated ) {
					sectionStore.state.active_sections.push(section);
				}
			});

			

		})
	}
}

export default sectionStore;