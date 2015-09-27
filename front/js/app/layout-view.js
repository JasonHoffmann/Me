define(['marionette', 'backbone.radio', 'tpl!app/template'], function(Marionette, Radio, template){
	var LayoutView = Marionette.LayoutView.extend({
		el: '.application',
		template: template,

		regions: {
			header: '.header',
			content: '.content'
		}
	});

	return LayoutView;
})