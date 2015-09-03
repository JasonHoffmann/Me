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

Me.module("App.Entities", function(Entities, ContactManager, Backbone, Marionette, $, _){
  Entities.FilteredCollection = function(options){
    var original = options.collection;
    var filtered = new original.constructor();
    filtered.add(original.models);
    filtered.filterFunction = options.filterFunction;
   

    var applyFilter = function(filterCriterion, filterStrategy, collection){
      var collection = collection || original;
      var criterion;
      if(filterStrategy == 'filter'){
        criterion = filterCriterion.trim();
      }
      else{
        criterion = filterCriterion;
      }

      var items = [];
      if(criterion){
        if(filterStrategy == 'filter'){
          if( ! filtered.filterFunction){
            throw("Attempted to use 'filter' function, but none was defined");
          }
          var filterFunction = filtered.filterFunction(criterion);
          items = collection.filter(filterFunction);
        } else {
          items = collection.where(criterion);
        }
      }
      else{
        items = collection.models;
      }

      // store current criterion
      filtered._currentCriterion = criterion;

      return items;
    };

    filtered.filter = function(filterCriterion){
      filtered._currentFilter = "filter";
      var items = applyFilter(filterCriterion, "filter");

      // reset the filtered collection with the new items
      filtered.reset(items);
      return filtered;
    };

    filtered.where = function(filterCriterion){
      filtered._currentFilter = "where";
      var items = applyFilter(filterCriterion, "where");

      // reset the filtered collection with the new items
      filtered.reset(items);
      return filtered;
    };

    // when the original collection is reset,
    // the filtered collection will re-filter itself
    // and end up with the new filtered result set
    original.on("reset", function(){
      var items = applyFilter(filtered._currentCriterion, filtered._currentFilter);

      // reset the filtered collection with the new items
      filtered.reset(items);
    });

    // if the original collection gets models added to it:
    // 1. create a new collection
    // 2. filter it
    // 3. add the filtered models (i.e. the models that were added *and*
    //     match the filtering criterion) to the `filtered` collection
    original.on("add", function(models){
      var coll = new original.constructor();
      coll.add(models);
      var items = applyFilter(filtered._currentCriterion, filtered._currentFilter, coll);
      filtered.add(items);
    });

    return filtered;
  };
});

Me.module('App', function(App, Me, Backbone, Marionette, $, _){
	App.Router = Marionette.AppRouter.extend({
		appRoutes: {
			'' : 'listIndex',
			'notes(/)' : 'listNotes',
			'notes/:id(/)' : 'showNote'
		}
	});

	var API = {
		listIndex: function() {
			Me.Module.Controller.listModules();
		},

		listNotes: function() {
			Me.Notes.Controller.list();
		},

		showNote: function(id) {
			Me.Notes.Controller.show(id);
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
		tags.fetch({
			cache: true
		});
		return tags;
	}

	getNotes = function() {
		var notes = new Entities.NoteCollection();
		var defer = $.Deferred();
		notes.fetch({
			success: function(data) {
				defer.resolve(data);
			},
			cache: true
		});
		var promise = defer.promise();
		return promise;
	}

	getNote = function(id) {
		var note = new Entities.Note({
			id: id
		});
		var defer = $.Deferred();
		note.fetch({
			success: function(data) {
				defer.resolve(data);
			}
		});

		var promise = defer.promise()
		return promise;
	}

	Me.reqres.setHandler('notes:entities', function() {
		return getNotes();
	});

	Me.reqres.setHandler('notes:tags:entities', function() {
		return getTags();
	});

	Me.reqres.setHandler('note:entity', function(id) {
		return getNote(id)
	})
});

Me.module('Notes', function(Notes, Me, Backbone, Marionette, $, _){
	Notes.Controller = {
		list: function(){
			var layout = new Me.Notes.Views.MainView();
			Me.regions.main.show(layout);

			var fetchingNotes = Me.request("notes:entities");
			$.when(fetchingNotes).done(function(notes) {
				var filteredNotes = Me.App.Entities.FilteredCollection({
					collection: notes,

					filterFunction: function(tag) {
						return function(note) {
							if(note.get('tags').indexOf(tag) !== -1) {
								return note;
							} else {
							}
						}
					}
				});

				var notesView = new Notes.Views.Notes({
	  				collection: filteredNotes
				});

				layout.content.show(notesView);

				notesView.on('childview:note:show', function(childView, note) {
					Backbone.history.navigate('notes/' + note.get('id').toString());
					Notes.Controller.show(note);
				});

				notesView.on('childview:note:edit', function(childView, note) {
					Notes.Controller.edit(note);
				})

				Me.vent.on('notes:filter', function(tag) {
					filteredNotes.filter(tag);
				});

				Me.vent.on('notes:clear', function() {
					filteredNotes.filter('');
				})
			});


			var tags = Me.request('notes:tags:entities');
			var tagsView = new Notes.Views.Tags({
				collection: tags
			});

			layout.sidebar.show(tagsView);
		},

		show: function(model) {
			if(model.attributes) {
				var noteView = new Notes.Views.Note({
					model: model
				});
				Me.regions.main.show(noteView);
			} else {
				var note = Me.request('note:entity', model);
				$.when(note).done(function(note) {
					console.log(note);
					var noteView = new Notes.Views.Note({
						model: note
					});
					Me.regions.main.show(noteView);
				});
			}
			
		},

		edit: function(model) {
			if(model.attributes) {
				var noteView = new Notes.Views.EditNote({
					model: model
				});
				Me.regions.main.show(noteView);

				noteView.on('note:save', function(model) {
					console.log(model);
				})
			} else {
				var note = Me.request('note:entity', model);
				$.when(note).done(function(note) {
					var noteView = new Notes.Views.EditNote({
						model: note
					});
					Me.regions.main.show(noteView);
				});
			}

		}
	}
});

Me.module('Notes.Views', function(Views, Me, Backbone, Marionette, $, _) {
	Views.MainView = Marionette.LayoutView.extend({
		tagName: 'div',
		className: 'notes-container cf',

		template: '#layout-template',

		regions: {
			sidebar: '#side',
			content: '#main'
		}
	});

	Views.NotesItem = Marionette.ItemView.extend({
		tagName: 'li',
		className: 'notes-item',
		template: '#notes-list',

		events: {
			'click .js-view' : 'showNote',
			'click .js-edit' : 'editNote'
		},

	 	showNote: function(e) {
	 		e.preventDefault();
			this.trigger('note:show', this.model);
		},

		editNote: function(e) {
			e.preventDefault();
			this.trigger('note:edit', this.model);
		}
	});

	Views.Notes = Marionette.CollectionView.extend({
		tagName: 'ul',
		className: 'no-list notes-list',
		childView: Views.NotesItem
	});

	Views.Note = Marionette.ItemView.extend({
		tagName: 'div',
		className: 'notes-show',
		template: '#notes-show'
	});

	Views.EditNote = Marionette.ItemView.extend({
		tagName: 'div',
		className: 'notes-edit',
		template: '#notes-edit',

		events: {
			'click .js-save' : 'saveNote'
		},

		saveNote: function(e) {
			e.preventDefault();
			this.trigger('note:save', this.model);
		},

		onShow: function() {
			var $textEditor = this.$el.find('.js-editor');
			var content = this.model.get('content');
			$textEditor.trumbowyg();
		}
	});

	Views.TagItem = Marionette.ItemView.extend({
		tagName: 'li',
		className: 'notes-tags-item',
		template: '#notes-tags-list',

		events: {
			'click .js-tag' : 'filterNotes'
		},

		filterNotes: function(e) {
			e.preventDefault();
			var tag = this.model.get('name');
			Me.vent.trigger('notes:filter', tag);
		}
	});

	Views.Tags = Marionette.CollectionView.extend({
		tagName: 'ul',
		className: 'no-list notes-tags-list',
		childView: Views.TagItem,

		events: {
			'click .js-tag-all' : 'resetNotes'
		},

		onShow: function() {
			this.$el.prepend('<li class="notes-tags-item"><a href="#" class="notes-tags-link js-tag-all">All Tags</a></li>');
		},

		resetNotes: function(e) {
			e.preventDefault();
			Me.vent.trigger('notes:clear');
		}
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