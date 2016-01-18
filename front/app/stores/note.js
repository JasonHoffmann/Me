import api from 'root/api/index'

var noteStore = {
	state : {
		active_note : {'a' : '1'},
		notes : [],
		api_called : false,
	},

	init: function() {
		this.state.active_note = Object.assign({}, this.state.active_note, { a: 1, b: 2 });
		// Vue.set(this.state.active_note, 'a', '1');

		if(!this.state.api_called) {
			this.getAll();
		}
	},

	mutate: function() {
		// this.state.active_note = Vue.extend({a: 1, b: '2'}, {});
		//Vue.$data.set(this.state, 'active_note', 'asdf');

		this.state.active_note = Object.assign({}, this.state.active_note, {a: '1'});
	},

	getAll : function() {
		this.api_called = true;
		

		api.get_notes().then(function(data) {
			var first = _.head(data.data);
			_.each(data.data, function( note ) {
				noteStore.state.notes.push(note);
			});

			
			

			
			// _.set(noteStore.state.active_note, first);
			// console.log('asdf');
			// console.log(noteStore.state.active_note);
			// noteStore.state.active_note = Object.assign({}, noteStore.state.active_note, first);

		})
	}
}

export default noteStore;