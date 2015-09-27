define([
	'marionette', 
	'app/regions', 
	'views/header'
	], function(Marionette, RegionContainer, Header){

	var Me = new Marionette.Application();

	Me.on('before:start', function() {
		Me.regions = new RegionContainer();

		var header = new Header();

		Me.regions.header.show(header);
	});

	Me.on('start', function() {
		Backbone.history.start({
			pushState: true,
			root: meVars.root_url
		});
	});

	return Me;
});