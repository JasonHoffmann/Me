import api from 'root/api/index';

var Section = {
	activated : 'false',
	name : '',
	slug: ''
};

var sectionStore = {
	state: {
		sections : [],
		api_called : false
	},

	getAll : function() {

		if(this.api_called === true ) {
			return;
		}

		this.api_called = true;


		api.get_sections().then(function(data) {

			_.each(data.data, function( section ) {
				sectionStore.state.sections.push(section);
			});

		})
	}
}

export default sectionStore;