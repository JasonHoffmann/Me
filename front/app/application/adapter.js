import DS from 'ember-data';

export default DS.RESTAdapter.extend({
	host: me_vars.baseURL,
	namespace: 'wp-json/wp/v2',
	headers: {
		'X-WP-Nonce' : WP_API_Settings.nonce
	},

	pathForType: function(type) {
		if(type == 'me-note-tag') {
			var $string = 'terms/' + type
			return Ember.String.pluralize($string);
		} else {
			return Ember.String.pluralize(type);
		}
	}

});
