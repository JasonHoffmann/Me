export default {
	get_notes : function() {
		return Vue.http.get(meVars.api_url + '/notes');
	},

	get_note : function(id) {
		return Vue.http.get(meVars.api_url + '/notes/' + id + '/');
	},

	get_sections : function() {
		return Vue.http.get(meVars.api_url + '/modules');
	},

	edit_note : function(id, note) {
		return Vue.http.patch(meVars.api_url + '/notes/' + id + '/', note);
	},

	add_note : function(note) {
		return Vue.http.post(meVars.api_url + '/notes/', note);
	},

	delete_note : function(id) {
		return Vue.http.delete(meVars.api_url + '/notes/' + id + '/');
	}
}