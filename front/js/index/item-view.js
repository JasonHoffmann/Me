define(['marionette', 'backbone.radio', 'tpl!index/template'], function(Marionette, Radio, template) {
	var moduleChannel = Radio.channel('module');

	var IndexItem = Marionette.ItemView.extend({
		tagName: 'li',
		className: 'module-list-item',
		template: template,

		events: {
			'click .js-module-link' : 'showModule'
		},

		showModule: function(e) {
			e.preventDefault();
			moduleChannel.trigger('module:' + this.model.get('name'), this.model.get('name'));
			
		}
	});

	return IndexItem;
})