define(['marionette', 'tpl!header/template'], function(Marionette, template){
	var HeaderView = Marionette.ItemView.extend({
		tagName: 'h2',
		className: 'module-header',
		template: template
	});

	return HeaderView;
});