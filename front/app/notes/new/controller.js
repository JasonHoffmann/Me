import Ember from 'ember';

export default Ember.Controller.extend({
	actions: {
		createNote: function() {

			var title = this.get('newTitle');

			if(!title.trim()) {
				return;
			}

			var todo = this.store.createRecord('me_note', {
				title: title,
				content: 'Sample Content'
			});

			this.set('newTitle', '');
			todo.save();
		}
	}
});
