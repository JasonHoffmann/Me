jQuery( function($){

var Me = new Marionette.Application();

Me.on('before:start', function(){
	var RegionContainer = Marionette.LayoutView.extend({
	  el: '#me-plugin-body',

	  regions: {
	  	header: '#me-plugin-header',
	    main: '#me-plugin-content'
	  }

	});

	Me.regions = new RegionContainer();
});

Me.on('start', function(){
		Backbone.history.start({
			pushState: true,
			root: me_vars.root_url
		});
});

Me.module('App', function(App, Me, Backbone, Marionette, $, _){
	App.Router = Marionette.AppRouter.extend({
		appRoutes: {
			'' : 'listIndex',
			'notes(/)' : 'listNotes'
		}
	});

	var API = {
		listIndex: function() {
			Me.Module.Controller.listModules();
		},

		listNotes: function() {
			Me.Notes.Controller.list();
		}
	}

	App.on('start', function() {
		new App.Router({
			controller: API
		})
	});
});




Me.module('Notes.Entities', function(Entities, Me, Backbone, Marionette, $, _) {
	Entities.Note = wp.api.models.Post.extend({
		idAttribute: 'id',

		defaults: {
			id: null,
			type: 'me_note',
			status: 'publish'
		},

		urlRoot: WP_API_Settings.root + '/wp/v2/me_notes'
	});

	Entities.NoteCollection = wp.api.collections.Posts.extend({
		url: WP_API_Settings.root + '/wp/v2/me_notes',
		model: Entities.Note
	});

	Entities.Tag = wp.api.models.Term.extend({
		idAttribute: 'id',
		taxonomy: 'me_note_tags',
		urlRoot: WP_API_Settings.root + '/wp/v2/terms/me_note_tags'
	});

	Entities.TagCollection = wp.api.collections.Terms.extend({
		model: Entities.Tag,
		type: 'me_note',
		taxonomy: 'me_note_tags',
		url: WP_API_Settings.root + '/wp/v2/terms/me_note_tags'
	});

	getTags = function() {
		var tags = new Entities.TagCollection();
		tags.fetch();
		return tags;
	}

	getNotes = function() {
		var notes = new Entities.NoteCollection();
		notes.fetch();
		return notes;
	}

	Me.reqres.setHandler('notes:entities', function() {
		return getNotes();
	});

	Me.reqres.setHandler('notes:tags:entities', function() {
		return getTags();
	})
});

Me.module('Notes', function(Notes, Me, Backbone, Marionette, $, _){
	Notes.Controller = {
		list: function(){
			var layout = new Me.Notes.Views.MainView();
			Me.regions.main.show(layout);

			var notes = Me.request("notes:entities");
			var notesView = new Notes.Views.IndexView({
  				collection: notes
			});

			var tags = Me.request('notes:tags:entities');
			var tagsView = new Notes.Views.Tags({
				collection: tags
			});

			layout.content.show(notesView);
			layout.sidebar.show(tagsView);
		}
	}
});

Me.module('Notes.Views', function(Views, Me, Backbone, Marionette, $, _) {
	Views.MainView = Marionette.LayoutView.extend({
		tagName: 'div',
		className: 'notes-container',

		template: '#layout-template',

		regions: {
			sidebar: '#sidebar',
			content: '#main'
		}
	});

	Views.IndexItem = Marionette.ItemView.extend({
		tagName: 'li',
		className: 'notes-item',
		template: '#notes-list'
	});

	Views.IndexView = Marionette.CollectionView.extend({
		tagName: 'ul',
		className: 'no-list notes-list',
		childView: Views.IndexItem
	});

	Views.TagItem = Marionette.ItemView.extend({
		tagName: 'li',
		className: 'notes-tags-item',
		template: '#notes-tags-list'
	});

	Views.Tags = Marionette.CollectionView.extend({
		tagName: 'ul',
		className: 'no-list notes-tags-list',
		childView: Views.TagItem
	})
});






Me.module('Bookmarks', function(Bookmarks, Me, Backbone, Marionette, $, _){
	Bookmarks.Controller = {
		list: function() {
			console.log('list bookmarks');
		}
	}
});




Me.module('Todos', function(Todos, Me, Backbone, Marionette, $, _){
	Todos.Controller = {
		list: function() {
			console.log('list todos');
		}
	}
});





Me.module('Module.Entities', function(Entities, Me, Backbone, Marionette, $, _) {
	Entities.Module = Backbone.Model.extend({});

	Entities.ModuleCollection = Backbone.Collection.extend({
		model: Entities.Module
	});

	var modules;

	var initializeModules = function() {
		modules = new Entities.ModuleCollection(me_vars.active_modules);
	}

	var API = {
		getActiveModules: function() {
			if(modules === undefined) {
				initializeModules();
			}
			return modules;
		}
	}

	Me.reqres.setHandler('module:entities', function() {
		return API.getActiveModules();
	})

});



Me.module('Module', function(Module, Me, Backbone, Marionette, $, _) {
	Module.ModuleView = Marionette.ItemView.extend({
		tagName: 'li',
		className: 'module-list-item',
		template: '#active-modules',

		events: {
			'click .js-module-link' : 'showModule'
		},

		showModule: function(e) {
			e.preventDefault();
			this.trigger('module:show', this.model);
		}
	});

	Module.ModuleList = Marionette.CollectionView.extend({
		tagName: 'ul',
		className: 'module-list',
		childView: Module.ModuleView
	});

	Module.HeaderView = Marionette.ItemView.extend({
		tagName: 'h2',
		className: 'module-header',
		template: '#main-header'
	});
});

Me.module('Module', function(Module, Me, Backbone, Marionette, $, _) {
	Module.Controller = {
		listModules: function() {
			var modules = Me.request("module:entities");

			var modulesView = new Module.ModuleList({
  				collection: modules
			});

			Me.regions.main.show(modulesView);

			var headerView = new Module.HeaderView();
			Me.regions.header.show(headerView);

			modulesView.on('childview:module:show', function(childView, model){
				Module.Controller.showModule(model);
				Backbone.history.navigate(model.get('name').toLowerCase());
			});
		},


		showModule: function(model) {
			var modelSlug = model.get('name');
			Me[modelSlug].Controller.list();
		}
	}
});


Me.start();

});