import Ember from 'ember';

export default Ember.Controller.extend({
	filteredNotes: [],

	actions: {
		filterByTag: function(filter) {

			if(filter === 'all') {
				return this.set('filteredNotes', this.get('model.notes'));
			} else {
				var filterFn = function(note) {
					return note.get('tags').contains(filter);
				}
				this.set('filteredNotes', this.get('model.notes').filter(filterFn));
			}
		},

		toggleClass: function(tag) {
			tag.set('isActive', !tag.get('isActive'));
		}
	}
});
