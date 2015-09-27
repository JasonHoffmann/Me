define(['marionette', 'backbone.radio'], function(Marionette, Radio) {
	var moduleChannel = Radio.channel('module');

	moduleChannel.on('module:Notes', function() {
		console.log('notes again');
	});

	return moduleChannel;
}
