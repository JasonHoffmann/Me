define(['marionette', 'backbone.radio', 'app/layout-view', 'header/view'], function(Marionette, Radio, LayoutView, Header) {
	var moduleChannel = Radio.channel('module');

	var Me = Marionette.Application.extend({
		initialize: function() {
			this.$body = $(document.body);
			this.layout = new LayoutView();
			this.layout.render();

			var header = new Header();
			this.layout.header.show(header);

			moduleChannel.on('module:Notes', this.newNotes);
		},

		switchModule: function(something) {
			console.log('notes');
		}
	});

	return Me;
})