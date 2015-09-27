define(['marionette', 'index/item-view'], function(Marionette, IndexItem) {
	var IndexView = Marionette.CollectionView.extend({
		tagName: 'ul',
		className: 'module-list',
		childView: IndexItem
	});

	return IndexView;
})