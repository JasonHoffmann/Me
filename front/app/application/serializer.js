import DS from 'ember-data';

export default DS.RESTSerializer.extend({
	extractArray: function(store, type, payload) {
		console.log('extract');
		var data = {},
			extracted = [],
			root = Ember.String.pluralize(type.typeKey);

		payload.forEach(function(e){
			if (e.terms) {
				if ( typeof e.terms.post_tag !== 'undefined' ) {
					e.tags = e.terms.post_tag;
				}

				if ( typeof e.terms.category !== 'undefined' ) {
					e.categories = e.terms.category;
				}

				delete e.terms;
			}
			extracted.push(e);
		});

		data[root] = extracted;

		return this._super(store, type, data);
	},

	extractSingle: function(store, type, payload, id) {
		var payloadTemp = {};
		payloadTemp[type.typeKey] = payload;
		return this._super(store, type, payloadTemp, id);
	},
	  serialize: function(snapshot, options) {
	  	console.log('serialize');
	    var json = {
	    	title: 'this is a title',
	    	content: 'and some content'
	    }

	    return json;
	  }
});
