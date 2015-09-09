import Ember from 'ember';

export default Ember.TextArea.extend({
	willInsertElement: function() {
		this.$().trumbowyg();
	}
});
