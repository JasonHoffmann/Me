"format global";

!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in p||(p[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==v.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=p[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(v.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=p[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return x[e]||(x[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},r.name);t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=p[s],v=x[s];v?l=v.exports:c&&!c.declarative?l=c.esModule:c?(d(c),v=c.module,l=v.exports):l=f(s),v&&v.importers?(v.importers.push(t),t.dependencies.push(v)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=p[e];if(t)t.declarative?c(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=f(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=p[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){if(r===e)return r;var t={};if("object"==typeof r||"function"==typeof r)if(g){var n;for(var o in r)(n=Object.getOwnPropertyDescriptor(r,o))&&h(t,o,n)}else{var a=r&&r.hasOwnProperty;for(var o in r)(!a||r.hasOwnProperty(o))&&(t[o]=r[o])}return t["default"]=r,h(t,"__useDefault",{value:!0}),t}function c(r,t){var n=p[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==v.call(t,u)&&(p[u]?c(u,t):f(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function f(e){if(D[e])return D[e];if("@node/"==e.substr(0,6))return y(e.substr(6));var r=p[e];if(!r)throw"Module "+e+" not present.";return a(e),c(e,[]),p[e]=void 0,r.declarative&&h(r.module.exports,"__esModule",{value:!0}),D[e]=r.declarative?r.module.exports:r.esModule}var p={},v=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},g=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(m){g=!1}var h;!function(){try{Object.defineProperty({},"a",{})&&(h=Object.defineProperty)}catch(e){h=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var x={},y="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,D={"@empty":{}};return function(e,n,o){return function(a){a(function(a){for(var u={_nodeRequire:y,register:r,registerDynamic:t,get:f,set:function(e,r){D[e]=r},newModule:function(e){return e}},d=0;d<n.length;d++)(function(e,r){r&&r.__esModule?D[e]=r:D[e]=s(r)})(n[d],arguments[d]);o(u);var i=f(e[0]);if(e.length>1)for(var d=1;d<e.length;d++)f(e[d]);return i.__useDefault?i["default"]:i})}}}("undefined"!=typeof self?self:global)

(["1"], [], function($__System) {

!function(){var t=$__System;if("undefined"!=typeof window&&"undefined"!=typeof document&&window.location)var s=location.protocol+"//"+location.hostname+(location.port?":"+location.port:"");t.set("@@cjs-helpers",t.newModule({getPathVars:function(t){var n,o=t.lastIndexOf("!");n=-1!=o?t.substr(0,o):t;var e=n.split("/");return e.pop(),e=e.join("/"),"file:///"==n.substr(0,8)?(n=n.substr(7),e=e.substr(7),isWindows&&(n=n.substr(1),e=e.substr(1))):s&&n.substr(0,s.length)===s&&(n=n.substr(s.length),e=e.substr(s.length)),{filename:n,dirname:e}}}))}();
$__System.register('2', ['3'], function (_export) {
	'use strict';

	var views, Editor;
	return {
		setters: [function (_) {
			views = _['default'];
		}],
		execute: function () {
			Editor = Vue.extend({
				template: views['editor/editor'],

				props: ['note'],

				methods: {
					save: function save() {
						this.$dispatch('save');
					}
				}
			});

			_export('default', Editor);
		}
	};
});

$__System.register('4', ['5'], function (_export) {
	'use strict';

	var api, sectionStore;
	return {
		setters: [function (_2) {
			api = _2['default'];
		}],
		execute: function () {
			sectionStore = {
				state: {
					sections: [],
					active_sections: [],
					api_called: false
				},

				init: function init() {
					if (!this.state.api_called) {
						this.getAll();
					}
				},

				getAll: function getAll() {
					this.api_called = true;

					api.get_sections().then(function (data) {

						_.each(data.data, function (section) {
							sectionStore.state.sections.push(section);
						});

						_.each(data.data, function (section) {
							if (section.activated) {
								sectionStore.state.active_sections.push(section);
							}
						});
					});
				}
			};

			_export('default', sectionStore);
		}
	};
});

$__System.register('6', ['3', '4'], function (_export) {
	'use strict';

	var views, sectionStore, Sections;
	return {
		setters: [function (_) {
			views = _['default'];
		}, function (_2) {
			sectionStore = _2['default'];
		}],
		execute: function () {
			Sections = Vue.extend({
				template: views['sections/index'],

				data: function data() {
					return {
						sections: sectionStore.state.sections,
						active_sections: sectionStore.state.active_sections,
						string: 'string'
					};
				},

				ready: function ready() {
					sectionStore.init();
				},

				methods: {
					clicked: function clicked(e) {
						e.preventDefault();
						console.log(sectionStore.state);
					}
				}
			});

			_export('default', Sections);
		}
	};
});

$__System.registerDynamic("7", [], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var global = module.exports = typeof window != 'undefined' && window.Math == Math ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
  if (typeof __g == 'number')
    __g = global;
  global.define = __define;
  return module.exports;
});

$__System.registerDynamic("8", [], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  module.exports = function(it) {
    if (typeof it != 'function')
      throw TypeError(it + ' is not a function!');
    return it;
  };
  global.define = __define;
  return module.exports;
});

$__System.registerDynamic("9", ["8"], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var aFunction = $__require('8');
  module.exports = function(fn, that, length) {
    aFunction(fn);
    if (that === undefined)
      return fn;
    switch (length) {
      case 1:
        return function(a) {
          return fn.call(that, a);
        };
      case 2:
        return function(a, b) {
          return fn.call(that, a, b);
        };
      case 3:
        return function(a, b, c) {
          return fn.call(that, a, b, c);
        };
    }
    return function() {
      return fn.apply(that, arguments);
    };
  };
  global.define = __define;
  return module.exports;
});

$__System.registerDynamic("a", ["7", "b", "9"], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var global = $__require('7'),
      core = $__require('b'),
      ctx = $__require('9'),
      PROTOTYPE = 'prototype';
  var $export = function(type, name, source) {
    var IS_FORCED = type & $export.F,
        IS_GLOBAL = type & $export.G,
        IS_STATIC = type & $export.S,
        IS_PROTO = type & $export.P,
        IS_BIND = type & $export.B,
        IS_WRAP = type & $export.W,
        exports = IS_GLOBAL ? core : core[name] || (core[name] = {}),
        target = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE],
        key,
        own,
        out;
    if (IS_GLOBAL)
      source = name;
    for (key in source) {
      own = !IS_FORCED && target && key in target;
      if (own && key in exports)
        continue;
      out = own ? target[key] : source[key];
      exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key] : IS_BIND && own ? ctx(out, global) : IS_WRAP && target[key] == out ? (function(C) {
        var F = function(param) {
          return this instanceof C ? new C(param) : C(param);
        };
        F[PROTOTYPE] = C[PROTOTYPE];
        return F;
      })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
      if (IS_PROTO)
        (exports[PROTOTYPE] || (exports[PROTOTYPE] = {}))[key] = out;
    }
  };
  $export.F = 1;
  $export.G = 2;
  $export.S = 4;
  $export.P = 8;
  $export.B = 16;
  $export.W = 32;
  module.exports = $export;
  global.define = __define;
  return module.exports;
});

$__System.registerDynamic("c", [], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var $Object = Object;
  module.exports = {
    create: $Object.create,
    getProto: $Object.getPrototypeOf,
    isEnum: {}.propertyIsEnumerable,
    getDesc: $Object.getOwnPropertyDescriptor,
    setDesc: $Object.defineProperty,
    setDescs: $Object.defineProperties,
    getKeys: $Object.keys,
    getNames: $Object.getOwnPropertyNames,
    getSymbols: $Object.getOwnPropertySymbols,
    each: [].forEach
  };
  global.define = __define;
  return module.exports;
});

$__System.registerDynamic("d", [], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  module.exports = function(it) {
    if (it == undefined)
      throw TypeError("Can't call method on  " + it);
    return it;
  };
  global.define = __define;
  return module.exports;
});

$__System.registerDynamic("e", ["d"], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var defined = $__require('d');
  module.exports = function(it) {
    return Object(defined(it));
  };
  global.define = __define;
  return module.exports;
});

$__System.registerDynamic("f", [], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var toString = {}.toString;
  module.exports = function(it) {
    return toString.call(it).slice(8, -1);
  };
  global.define = __define;
  return module.exports;
});

$__System.registerDynamic("10", ["f"], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var cof = $__require('f');
  module.exports = Object('z').propertyIsEnumerable(0) ? Object : function(it) {
    return cof(it) == 'String' ? it.split('') : Object(it);
  };
  global.define = __define;
  return module.exports;
});

$__System.registerDynamic("11", [], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  module.exports = function(exec) {
    try {
      return !!exec();
    } catch (e) {
      return true;
    }
  };
  global.define = __define;
  return module.exports;
});

$__System.registerDynamic("12", ["c", "e", "10", "11"], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var $ = $__require('c'),
      toObject = $__require('e'),
      IObject = $__require('10');
  module.exports = $__require('11')(function() {
    var a = Object.assign,
        A = {},
        B = {},
        S = Symbol(),
        K = 'abcdefghijklmnopqrst';
    A[S] = 7;
    K.split('').forEach(function(k) {
      B[k] = k;
    });
    return a({}, A)[S] != 7 || Object.keys(a({}, B)).join('') != K;
  }) ? function assign(target, source) {
    var T = toObject(target),
        $$ = arguments,
        $$len = $$.length,
        index = 1,
        getKeys = $.getKeys,
        getSymbols = $.getSymbols,
        isEnum = $.isEnum;
    while ($$len > index) {
      var S = IObject($$[index++]),
          keys = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S),
          length = keys.length,
          j = 0,
          key;
      while (length > j)
        if (isEnum.call(S, key = keys[j++]))
          T[key] = S[key];
    }
    return T;
  } : Object.assign;
  global.define = __define;
  return module.exports;
});

$__System.registerDynamic("13", ["a", "12"], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var $export = $__require('a');
  $export($export.S + $export.F, 'Object', {assign: $__require('12')});
  global.define = __define;
  return module.exports;
});

$__System.registerDynamic("b", [], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var core = module.exports = {version: '1.2.6'};
  if (typeof __e == 'number')
    __e = core;
  global.define = __define;
  return module.exports;
});

$__System.registerDynamic("14", ["13", "b"], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  $__require('13');
  module.exports = $__require('b').Object.assign;
  global.define = __define;
  return module.exports;
});

$__System.registerDynamic("15", ["14"], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  module.exports = {
    "default": $__require('14'),
    __esModule: true
  };
  global.define = __define;
  return module.exports;
});

$__System.register('16', ['5', '15'], function (_export) {
	var api, _Object$assign, noteStore;

	return {
		setters: [function (_3) {
			api = _3['default'];
		}, function (_2) {
			_Object$assign = _2['default'];
		}],
		execute: function () {
			'use strict';

			noteStore = {
				state: {
					active_note: { 'a': '1' },
					notes: [],
					api_called: false
				},

				init: function init() {
					this.state.active_note = _Object$assign({}, this.state.active_note, { a: 1, b: 2 });
					// Vue.set(this.state.active_note, 'a', '1');

					if (!this.state.api_called) {
						this.getAll();
					}
				},

				mutate: function mutate() {
					// this.state.active_note = Vue.extend({a: 1, b: '2'}, {});
					//Vue.$data.set(this.state, 'active_note', 'asdf');

					this.state.active_note = _Object$assign({}, this.state.active_note, { a: '1' });
				},

				getAll: function getAll() {
					this.api_called = true;

					api.get_notes().then(function (data) {
						var first = _.head(data.data);
						_.each(data.data, function (note) {
							noteStore.state.notes.push(note);
						});

						// _.set(noteStore.state.active_note, first);
						// console.log('asdf');
						// console.log(noteStore.state.active_note);
						// noteStore.state.active_note = Object.assign({}, noteStore.state.active_note, first);
					});
				}
			};

			_export('default', noteStore);
		}
	};
});

$__System.register('5', [], function (_export) {
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
					return Vue.http.patch(meVars.api_url + '/notes/' + id + '/', note);
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

$__System.register('17', ['5'], function (_export) {
	'use strict';

	var api, activeNoteStore;
	return {
		setters: [function (_) {
			api = _['default'];
		}],
		execute: function () {
			activeNoteStore = {
				state: {
					active_note: {}
				},

				init: function init() {
					Vue.set(this.state.active_note, 'a', '1');
				}
			};

			_export('default', activeNoteStore);
		}
	};
});

$__System.register('18', ['3', '16', '17'], function (_export) {
	'use strict';

	var views, noteStore, activeNoteStore, Notes;
	return {
		setters: [function (_) {
			views = _['default'];
		}, function (_2) {
			noteStore = _2['default'];
		}, function (_3) {
			activeNoteStore = _3['default'];
		}],
		execute: function () {
			Notes = Vue.extend({
				template: views['notes/index'],

				data: function data() {
					return {
						notes: noteStore.state.notes,
						active_note: noteStore.state.active_note
					};
				},

				created: function created() {
					noteStore.init();
					activeNoteStore.init();
				},

				ready: function ready() {
					noteStore.mutate();
				},

				methods: {
					deleteNote: function deleteNote(note) {},

					newNote: function newNote() {}
				}
			});

			_export('default', Notes);
		}
	};
});

$__System.registerDynamic("3", [], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  'format cjs';
  module.exports = Object.create(null);
  module.exports['sections/index'] = '<ul v-for="item in active_sections" class="module-list">\n	<li class="module-list-item">\n		<a v-link="{ path: item.slug }" class="module-list-link btn js-module-link">{{ item.name }}</a>\n	</li>\n</ul>';
  module.exports['editor/editor'] = '<form>\n	<div class="note-header">\n		<input name="title" class="note-title note-edit-title" v-model="note.title">\n\n		<div class="note-show-actions">\n			<button v-on:click.prevent="save" class="btn note-show-edit">Save</button>\n		</div>\n	</div>\n	<textarea name="content" class="note-edit-content"  v-model="note.markdown" autofocus>\n	</textarea>\n</form>';
  module.exports['layout/layout'] = '<main class="container">\n	<div class="row">\n		<router-view></router-view>\n	</div>\n</main>';
  module.exports['notes/edit'] = '<editor :note="note"></editor>';
  module.exports['notes/index'] = '<aside class="col-xs-4">\n	<div class="nt-add">\n		<button href="#new" v-on:click.prevent="newNote" class="nt-add-btn">+ New Note</button>\n	</div>\n\n	<section v-for="note in notes" class="nt-list">\n		<h3 class="nt-list-title">\n				{{ note.title }}\n		</h3>\n		<div class="nt-list-excerpt">{{{ note.content }}}</div>\n	</section>\n</aside>\n\n\n<div class="col-xs-8">\n	{{ active_note | json }}\n</div>\n';
  global.define = __define;
  return module.exports;
});

$__System.register('19', ['3'], function (_export) {
	'use strict';

	var views, Notes_Edit;
	return {
		setters: [function (_) {
			views = _['default'];
		}],
		execute: function () {
			Notes_Edit = Vue.extend({
				template: views['notes/edit'],

				data: function data() {
					return {
						note: this.$store.state.note
					};
				},

				created: function created() {
					var id = this.$route.params.id;
					this.$store.dispatch(getNote(id));
				},

				ready: function ready() {
					this.$subscribe('note');
				},

				events: {
					save: function save() {
						this.$store.dispatch(updateNote(this.$route.params.id, this.note));
					}
				}
			});

			_export('default', Notes_Edit);
		}
	};
});

$__System.register('1a', ['6', '18', '19'], function (_export) {
    'use strict';

    var Sections, Notes, Notes_Edit, router;
    return {
        setters: [function (_) {
            Sections = _['default'];
        }, function (_2) {
            Notes = _2['default'];
        }, function (_3) {
            Notes_Edit = _3['default'];
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
                },

                '/notes/edit/:id': {
                    name: 'edit_note',
                    component: Notes_Edit
                }
            });

            _export('default', router);
        }
    };
});

$__System.register('1', ['2', '3', '1a'], function (_export) {
	'use strict';

	var Editor, views, router, App;
	return {
		setters: [function (_2) {
			Editor = _2['default'];
		}, function (_) {
			views = _['default'];
		}, function (_a) {
			router = _a['default'];
		}],
		execute: function () {

			Vue.component('editor', Editor);

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