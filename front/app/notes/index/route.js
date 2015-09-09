import Ember from 'ember';

export default Ember.Route.extend({
	model() {
		return Ember.RSVP.hash({
			notes: this.store.findAll('me_note'),
			tags: this.store.findAll('me-note-tag')
		});
	},

	setupController: function(controller, model) {
	  this._super(controller, model);
	  controller.set('filteredNotes', model.notes);
	}
});
