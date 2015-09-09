import Ember from 'ember';

export default Ember.Route.extend({
	model() {
		return { 
			"modules" : me_vars.active_modules
		}
	}
});
