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

	var headerView = new Me.App.Views.HeaderView();
	Me.regions.header.show(headerView);

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

      filtered._currentCriterion = criterion;

      return items;
    };

    filtered.filter = function(filterCriterion){
      filtered._currentFilter = "filter";
      var items = applyFilter(filterCriterion, "filter");

      filtered.reset(items);
      return filtered;
    };

    filtered.where = function(filterCriterion){
      filtered._currentFilter = "where";
      var items = applyFilter(filterCriterion, "where");

      filtered.reset(items);
      return filtered;
    };

    original.on("reset", function(){
      var items = applyFilter(filtered._currentCriterion, filtered._currentFilter);

      filtered.reset(items);
    });

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
			'notes/:id(/)' : 'showNote',
			'notes/:id/edit(/)' : 'editNote'
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
		},

		editNote: function(id) {
			Me.Notes.Controller.edit(id);
		}
	}

	App.on('start', function() {
		new App.Router({
			controller: API
		})
	});
});

Me.module('App.Views', function(Views, Me, Backbone, Marionette, $, _){

	Views.HeaderView = Marionette.ItemView.extend({
		tagName: 'h2',
		className: 'module-header',
		template: '#main-header'
	});

});


Me.module('Notes.Entities', function(Entities, Me, Backbone, Marionette, $, _) {
	Entities.Note = wp.api.models.Post.extend({
		idAttribute: 'id',

		defaults: {
			id: null,
			type: 'me_note',
			status: 'publish',
			title: {
				rendered: 'New Note'
			},
			content: {
				rendered: ''
			}
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
		if(Me.Notes.Collection.list.length > 1) {
			return Me.Notes.Collection.list;
		} else {
			var notes = new Entities.NoteCollection();
			var defer = $.Deferred();
			notes.fetch({
				success: function(data) {
					defer.resolve(data);
				},
				remove: false
			});
			var promise = defer.promise();
			return promise;
		}
	}

	getNote = function(entity) {
		if(entity.id) {
			return entity
		} else {
			var note = new Entities.Note({
				id: entity
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

Me.module('Notes.Collection', function(Collection, Me, Backbone, Marionette, $, _){
	Collection.list = [];
});

Me.module('Notes.Controller', function(Controller, Me, Backbone, Marionette, $, _){
	Controller.on('note:show', function(note) {
		Backbone.history.navigate('notes/' + note.get('id').toString());

		if(!note.get('title').rendered) {
			note.set({title : { rendered: note.get('title') } });
		}
		if(!note.get('content').rendered) {
			note.set({content : { rendered: note.get('content') } });
		}

		Controller.show(note);
	});

	Controller.on('note:new', function(note) {
		Backbone.history.navigate('notes/new');
		Controller.new();
	})

	Controller.on('note:list', function() {
		Backbone.history.navigate('notes');
		Controller.list();
	})

	Controller.on('note:edit', function(note) {
		Backbone.history.navigate('notes/' + note.get('id').toString() + '/edit');
		Controller.edit(note);
	});

	Controller.list = function() {
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

					console.log('SECOND');
					console.log(filteredNotes);

					var notesView = new Me.Notes.Views.Notes({
		  				collection: filteredNotes
					});

					layout.content.show(notesView);

					layout.on('note:new', function() {
						var model = new Me.Notes.Entities.Note();
						var noteView = new Me.Notes.Views.NewNote({
							model: model
						});

						Me.regions.main.show(noteView);

						noteView.on('note:new', function(data) {
							if(notes.create(data)) {
								console.log('FIRST');
								console.log(filteredNotes);
								Controller.list();
							};
						})
					})

					notesView.on('childview:note:show', function(childView, note) {
						Controller.trigger('note:show', note);
					});

					notesView.on('childview:note:edit', function(childView, note) {
						Controller.trigger('note:edit', note);
					});

					Me.vent.on('notes:filter', function(tag) {
						filteredNotes.filter(tag);
					});

					Me.vent.on('notes:clear', function() {
						filteredNotes.filter('');
					});

				});


				var tags = Me.request('notes:tags:entities');
				var tagsView = new Me.Notes.Views.Tags({
					collection: tags
				});

				layout.sidebar.show(tagsView);
	}

	Controller.show = function(model) {
		
		var note = Me.request('note:entity', model);

		$.when(note).done(function(note) {
			var noteView = new Me.Notes.Views.Note({
				model: note
			});

			noteView.on('note:edit', function(model) {
				Controller.trigger('note:edit', model)
			});

			Me.regions.main.show(noteView);
		});	
	}

	Controller.edit = function(model) {
		var note = Me.request('note:entity', model);

		$.when(note).done(function(note) {
			var noteView = new Me.Notes.Views.EditNote({
				model: note
			});
			Me.regions.main.show(noteView);
			noteView.on('note:save', function(data) {
				if(note.save(data)) {
					Controller.trigger('note:show', note);
				}
			})
		});
	}

	Controller.new = function() {

		Me.regions.main.show(noteView);
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
		},

		events: {
			'click .js-new' : 'newNote'
		},

		newNote: function(e) {
			e.preventDefault();
			this.trigger('note:new');
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

	Views.TagItem = Marionette.ItemView.extend({
		tagName: 'li',
		className: 'notes-tags-item',
		template: '#notes-tags-list',

		events: {
			'click .js-tag' : 'filterNotes'		
		},

		filterNotes: function(e) {
			e.preventDefault();
			if(this.$el.hasClass('is-active')) {
				return;
			} else {
				$('.notes-tags-list li.is-active').removeClass('is-active');
				this.$el.addClass('is-active');
			}
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
			this.$el.prepend('<li class="notes-tags-item is-active js-tag-all"><a href="#" class="notes-tags-link">All Tags</a></li>');
		},

		resetNotes: function(e) {
			e.preventDefault();
			if(this.$el.hasClass('is-active')) {
				return;
			} else {
				$('.notes-tags-list li.is-active').removeClass('is-active');
				this.$el.find('.js-tag-all').addClass('is-active');
			}
			Me.vent.trigger('notes:clear');
		}
	});

	Views.Note = Marionette.ItemView.extend({
		tagName: 'div',
		className: 'note-container',
		template: '#notes-show',

		events: {
			'click .js-edit' : 'editNote',
			'click .js-back' : 'goBack'
		},

		editNote: function(e) {
			e.preventDefault();
			this.trigger('note:edit', this.model);
		},

		goBack: function(e) {
			e.preventDefault();
			Me.Notes.Controller.trigger('note:list');
		}
	});

	Views.EditNote = Marionette.ItemView.extend({
		tagName: 'div',
		className: 'note-container',
		template: '#notes-edit',

		events: {
			'click .js-save' : 'saveNote',
			'click .js-back' : 'goBack'
		},

		saveNote: function(e) {
			e.preventDefault();
			var data = Backbone.Syphon.serialize(this);
			this.trigger('note:save', data);
		},

		goBack: function(e) {
			e.preventDefault();
			Me.Notes.Controller.trigger('note:list');
		},

		onShow: function() {
			var $textEditor = this.$el.find('.js-editor');
			$textEditor.trumbowyg();

			var $input = this.$el.find('.note-edit-title');
			var size = $input.val().length;
			$input.attr('size', size);
		}
	});

	Views.NewNote = Marionette.ItemView.extend({
		tagName: 'div',
		className: 'note-container',
		template: '#notes-edit',

		events: {
			'click .js-save' : 'saveNote',
			'click .js-back' : 'goBack'
		},

		saveNote: function(e) {
			e.preventDefault();
			var data = Backbone.Syphon.serialize(this);
			this.trigger('note:new', data);
		},

		goBack: function(e) {
			e.preventDefault();

			//TODO: CHECK BEFORE DESTROYING MODEL
			this.model.destroy();

			Me.Notes.Controller.trigger('note:list');
		},

		onShow: function() {
			var $textEditor = this.$el.find('.js-editor');
			$textEditor.trumbowyg();
		}
	});
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
});

Me.module('Module', function(Module, Me, Backbone, Marionette, $, _) {
	Module.Controller = {
		listModules: function() {
			var modules = Me.request("module:entities");

			var modulesView = new Module.ModuleList({
  				collection: modules
			});

			Me.regions.main.show(modulesView);

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