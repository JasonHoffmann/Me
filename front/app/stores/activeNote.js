import api from 'root/api/index'

var activeNoteStore = {
	state : {
		active_note : {}
	},

	init: function() {
		Vue.set(this.state.active_note, 'a', '1');
	}
}

export default activeNoteStore;