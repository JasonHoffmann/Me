import Ember from 'ember';

export default Ember.Resource.define({
	url: '/me-notes',

	schema: {
		id: Number,
		title: {
			rendered: String
		},
		content: {
			rendered: String
		}
	}

})
