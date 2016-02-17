!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in p||(p[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==v.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=p[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(v.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=p[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return x[e]||(x[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},r.name);t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=p[s],v=x[s];v?l=v.exports:c&&!c.declarative?l=c.esModule:c?(d(c),v=c.module,l=v.exports):l=f(s),v&&v.importers?(v.importers.push(t),t.dependencies.push(v)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=p[e];if(t)t.declarative?c(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=f(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=p[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){if(r===e)return r;var t={};if("object"==typeof r||"function"==typeof r)if(g){var n;for(var o in r)(n=Object.getOwnPropertyDescriptor(r,o))&&h(t,o,n)}else{var a=r&&r.hasOwnProperty;for(var o in r)(!a||r.hasOwnProperty(o))&&(t[o]=r[o])}return t["default"]=r,h(t,"__useDefault",{value:!0}),t}function c(r,t){var n=p[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==v.call(t,u)&&(p[u]?c(u,t):f(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function f(e){if(D[e])return D[e];if("@node/"==e.substr(0,6))return y(e.substr(6));var r=p[e];if(!r)throw"Module "+e+" not present.";return a(e),c(e,[]),p[e]=void 0,r.declarative&&h(r.module.exports,"__esModule",{value:!0}),D[e]=r.declarative?r.module.exports:r.esModule}var p={},v=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},g=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(m){g=!1}var h;!function(){try{Object.defineProperty({},"a",{})&&(h=Object.defineProperty)}catch(e){h=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var x={},y="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,D={"@empty":{}};return function(e,n,o){return function(a){a(function(a){for(var u={_nodeRequire:y,register:r,registerDynamic:t,get:f,set:function(e,r){D[e]=r},newModule:function(e){return e}},d=0;d<n.length;d++)(function(e,r){r&&r.__esModule?D[e]=r:D[e]=s(r)})(n[d],arguments[d]);o(u);var i=f(e[0]);if(e.length>1)for(var d=1;d<e.length;d++)f(e[d]);return i.__useDefault?i["default"]:i})}}}("undefined"!=typeof self?self:global)

(["1"], [], function($__System) {

!function(){var t=$__System;if("undefined"!=typeof window&&"undefined"!=typeof document&&window.location)var s=location.protocol+"//"+location.hostname+(location.port?":"+location.port:"");t.set("@@cjs-helpers",t.newModule({getPathVars:function(t){var n,o=t.lastIndexOf("!");n=-1!=o?t.substr(0,o):t;var e=n.split("/");return e.pop(),e=e.join("/"),"file:///"==n.substr(0,8)?(n=n.substr(7),e=e.substr(7),isWindows&&(n=n.substr(1),e=e.substr(1))):s&&n.substr(0,s.length)===s&&(n=n.substr(s.length),e=e.substr(s.length)),{filename:n,dirname:e}}}))}();
$__System.register('2', ['3'], function (_export) {
	'use strict';

	var api, Section, sectionStore;
	return {
		setters: [function (_2) {
			api = _2['default'];
		}],
		execute: function () {
			Section = {
				activated: 'false',
				name: '',
				slug: ''
			};
			sectionStore = {
				state: {
					sections: [],
					api_called: false
				},

				getAll: function getAll() {

					if (this.api_called === true) {
						return;
					}

					this.api_called = true;

					api.get_sections().then(function (data) {

						_.each(data.data, function (section) {
							sectionStore.state.sections.push(section);
						});
					});
				}
			};

			_export('default', sectionStore);
		}
	};
});

$__System.register('4', ['2', '5'], function (_export) {
	'use strict';

	var sectionStore, views, Sections;
	return {
		setters: [function (_3) {
			sectionStore = _3['default'];
		}, function (_2) {
			views = _2['default'];
		}],
		execute: function () {
			Sections = Vue.extend({
				template: views['sections/index'],

				data: function data() {
					return {
						sections: sectionStore.state.sections
					};
				},

				computed: {
					active_sections: function active_sections() {
						return _.filter(this.sections, function (o) {
							return o.activated;
						});
					}
				},

				ready: function ready() {
					sectionStore.getAll();
				},

				methods: {
					clicked: function clicked(e) {

						console.log(sectionStore.state);
					}
				}
			});

			_export('default', Sections);
		}
	};
});

$__System.registerDynamic("5", [], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  'format cjs';
  module.exports = Object.create(null);
  module.exports['sections/index'] = '<ul v-for="item in active_sections" class="module-list">\n	<li class="module-list-item">\n		<a v-link="{ path: item.slug }" class="module-list-link btn js-module-link">{{ item.name }}</a>\n	</li>\n</ul>';
  module.exports['layout/layout'] = '<main class="container">\n	<div class="row">\n		<router-view></router-view>\n	</div>\n</main>';
  module.exports['notes/index'] = '<aside class="col-xs-4">\n	<div class="nt-add">\n		<button href="#new" v-on:click.prevent="newNote" class="nt-add-btn">+ New Note</button>\n	</div>\n\n	<section v-for="note in notes" class="nt-list" v-on:click.prevent="makeActive(note)" v-bind:class="{ \'active\': note.active }">\n		<h3 class="nt-list-title">\n				{{ note.title }}\n		</h3>\n		<div class="nt-list-excerpt">{{{ note.excerpt }}}</div>\n	</section>\n</aside>\n\n<div class="col-xs-8 nt-active-note">\n	<div class="nt-single-actions">\n		<a href="#" v-on:click.prevent="saveNote()" class="nt-save-btn btn">\n			Save\n		</a>\n		<a href="#" v-on:click.prevent="deleteNote(active_note)" class="nt-delete-btn btn">\n			Trash\n		</a>\n	</div>\n	<h2><input id="noteTitle" class="nt-title" type="text" value="{{ active_note.title }}" /></h2>\n	<div class="nt-content">\n		<textarea v-model="active_note.content" id="nt-textarea">{{ active_note.meta.markdown }}</textarea>\n	</div>\n</div>\n';
  global.define = __define;
  return module.exports;
});

$__System.register('3', [], function (_export) {
	'use strict';

	return {
		setters: [],
		execute: function () {
			_export('default', {
				get_notes: function get_notes() {
					return Vue.http.get(meVars.api_url + '/notes');
				},

				get_note: function get_note(id) {
					return Vue.http.get(meVars.api_url + '/notes/' + id + '/');
				},

				get_sections: function get_sections() {
					return Vue.http.get(meVars.api_url + '/modules');
				},

				edit_note: function edit_note(id, note) {
					return Vue.http.post(meVars.api_url + '/notes/' + id + '/', note).then(function (data) {
						return data;
					});
				},

				add_note: function add_note(note) {
					return Vue.http.post(meVars.api_url + '/notes/', note);
				},

				delete_note: function delete_note(id) {
					return Vue.http['delete'](meVars.api_url + '/notes/' + id + '/');
				}
			});
		}
	};
});

$__System.register('6', ['3'], function (_export) {
	'use strict';

	var api, stub, noteStore;
	return {
		setters: [function (_2) {
			api = _2['default'];
		}],
		execute: function () {
			stub = {
				ID: '',
				title: 'New Title',
				content: '',
				meta: {
					markdown: ''
				}
			};
			noteStore = {

				state: {
					active_note: stub,
					notes: [],
					api_called: false
				},

				init: function init() {
					if (!this.state.api_called) {
						this.getAll();
					}
				},

				getAll: function getAll() {
					this.api_called = true;

					return api.get_notes().then(function (data) {
						var first = _.head(data.data);

						_.each(data.data, function (note) {
							if (first === note) {
								note.active = true;
							} else {
								note.active = false;
							}
							noteStore.state.notes.push(note);
						});

						return noteStore.state.active_note = _.assign(noteStore.state.active_note, first);
					});
				},

				getNotes: function getNotes() {
					this.api_called = true;

					return api.get_notes();
				},

				setActive: function setActive(note) {
					this.state.active_note = _.assign(noteStore.state.active_note, note);

					_.each(this.state.notes, function (n) {
						if (n.ID === note.ID) {
							n.active = true;
						} else {
							n.active = false;
						}
					});
				},

				createNew: function createNew() {
					var newStub = {
						title: 'Untitled'
					};

					var newNote = api.add_note(newStub).then(function (note) {
						noteStore.state.notes.unshift(note.data);
						noteStore.setActive(note.data);
						return note.data;
					});
				},

				deleteNote: function deleteNote(note) {
					var where = _.findIndex(this.state.notes, function (n) {
						return n.ID === note.ID;
					});
					this.state.notes.splice(where, 1);

					var first = _.head(this.state.notes);
					noteStore.state.active_note = _.assign(noteStore.state.active_note, first);
					api.delete_note(note.ID);

					return first;
				},

				saveNote: function saveNote(note) {
					var newNote = api.edit_note(note.ID, note);

					newNote.then(function (data) {
						var match = _.find(noteStore.state.notes, { ID: 48 }),
						    index = _.indexOf(noteStore.state.notes, match);
						_.merge(noteStore.state.active_note, data.data);
						noteStore.state.notes.splice(index, 1, noteStore.state.active_note);
					});
				}
			};

			_export('default', noteStore);
		}
	};
});

$__System.register('7', ['5', '6'], function (_export) {
	'use strict';

	var views, noteStore, simplemde, Notes;
	return {
		setters: [function (_) {
			views = _['default'];
		}, function (_2) {
			noteStore = _2['default'];
		}],
		execute: function () {
			Notes = Vue.extend({
				template: views['notes/index'],

				route: {
					data: function data(transition) {
						return noteStore.getAll().then(function (data) {
							simplemde = new SimpleMDE({ element: document.getElementById('nt-textarea') });
						});
					}
				},

				data: function data() {
					return {
						notes: noteStore.state.notes,
						active_note: noteStore.state.active_note
					};
				},

				methods: {
					makeActive: function makeActive(note) {
						noteStore.setActive(note);
						simplemde.value(note.meta.markdown);
					},

					newNote: function newNote() {
						noteStore.createNew();
					},

					deleteNote: function deleteNote(note) {
						var newNote = noteStore.deleteNote(note);
						simplemde.value(newNote.meta.markdown);
					},

					saveNote: function saveNote() {
						var title = document.getElementById('noteTitle').value;
						noteStore.saveNote({ 'ID': this.active_note.ID, 'title': title, 'markdown': simplemde.value() });
						this.notes = noteStore.state.notes;
					}
				}
			});

			_export('default', Notes);
		}
	};
});

$__System.register('8', ['4', '7'], function (_export) {
    'use strict';

    var Sections, Notes, router;
    return {
        setters: [function (_) {
            Sections = _['default'];
        }, function (_2) {
            Notes = _2['default'];
        }],
        execute: function () {

            Vue.use(VueRouter);
            router = new VueRouter();

            router.map({
                '/': {
                    component: Sections
                },

                '/notes': {
                    component: Notes
                }
            });

            _export('default', router);
        }
    };
});

$__System.register('1', ['5', '8'], function (_export) {
	'use strict';

	var views, router, App;
	return {
		setters: [function (_) {
			views = _['default'];
		}, function (_2) {
			router = _2['default'];
		}],
		execute: function () {
			App = Vue.extend({
				template: views['layout/layout']
			});

			Vue.use(VueResource);

			router.start(App, '#app');
		}
	};
});

})
(function(factory) {
  factory();
});