import Ember from 'ember';
import MeNote from "../../me-note/model.js";

export default Ember.Route.extend({
	model() {
		console.log(Me-Note);
		// return Ember.RSVP.hash({
		// 	notes: this.store.findAll('me_note'),
		// 	tags: this.store.findAll('me-note-tag')
		// });
	},

	setupController: function(controller, model) {
	}
});
