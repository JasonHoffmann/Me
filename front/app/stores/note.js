import api from 'root/api/index'

var noteStore = {
	state : {
		notes : [],
		api_called : false
	},

	init: function() {
		if(!this.state.api_called) {
			this.getAll();
		}
	},

	getAll : function() {
		this.api_called = true;

		api.get_notes().then(function(data) {

			_.each(data.data, function( note ) {
				noteStore.state.notes.push(note);
			});	

		})
	}
}

export default noteStore;