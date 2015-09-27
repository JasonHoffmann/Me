requirejs.config({
	baseUrl: meVars.js_url,

	paths: {
		'backbone' : 'lib/backbone',
		'jquery' : 'lib/jquery',
		'backbone.radio' : 'lib/backbone.radio',
		'marionette' : 'lib/backbone.marionette',
		'underscore' : 'lib/underscore',
		'text' : 'lib/require-text',
		'tpl' : 'lib/tpl'
	},

	tpl: {
		extension: '.tpl'
	},

	shim: {
		underscore: {
			exports: '_'
		},
		backbone: {
			deps: ['jquery', 'underscore'],
			exports: 'Backbone'
		},
		marionette: {
			deps: ['backbone'],
			exports: 'Marionette'
		}
	}
});

require(['app/app', 'index/router', 'notes/router', 'lib/radio.shim'], function(Application, IndexRouter, NoteRouter) {
	var app = new Application();

	app.index = new IndexRouter({
		container: app.layout.content
	});

	app.notes = new NoteRouter({
		container: app.layout.content
	});

	Backbone.history.start({
		pushState: true,
		root: meVars.root_url
	});
})