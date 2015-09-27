define(['marionette', 'index/collection-view', 'index/collection'], function(Marionette, View, IndexCollection) {
	var IndexRouter = Marionette.AppRouter.extend({
		initialize: function(options) {
			this.container = options.container;
			this.collection = new IndexCollection(meVars.active_modules);
		},

		routes: {
			'' : 'index'
		},

		index: function() {
			this.view = new View({
				collection: this.collection
			});
			this.container.show(this.view);
		}
	});

	return IndexRouter;
})