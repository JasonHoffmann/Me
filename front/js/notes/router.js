define(['marionette', 'index/collection-view', 'index/collection'], function(Marionette, View, IndexCollection) {
	var NoteRouter = Marionette.AppRouter.extend({
		initialize: function(options) {
		},

		routes: {
			'notes(/)' : 'index'
		},

		index: function() {
			console.log('at index');
		}
	});

	return NoteRouter;
})