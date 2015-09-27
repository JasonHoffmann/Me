define(['marionette', 'index/model'], function(Marionette, IndexModel) {
	var IndexCollection = Backbone.Collection.extend({
		model: IndexModel
	});

	return IndexCollection;
})