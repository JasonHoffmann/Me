'format cjs';
module.exports = Object.create(null);
module.exports['sections/index'] = '<ul v-for="item in active_sections" class="module-list">\n	<li class="module-list-item">\n		<a v-link="{ path: item.slug }" class="module-list-link btn js-module-link">{{ item.name }}</a>\n	</li>\n</ul>';
module.exports['layout/layout'] = '<main class="container">\n	<div class="row">\n		<router-view></router-view>\n	</div>\n</main>';
module.exports['notes/index'] = '<aside class="col-xs-4">\n	<div class="nt-add">\n		<button href="#new" v-on:click.prevent="newNote" class="nt-add-btn">+ New Note</button>\n	</div>\n\n	<section v-for="note in notes" class="nt-list" v-on:click.prevent="makeActive(note)" v-bind:class="{ \'active\': note.active }">\n		<h3 class="nt-list-title">\n				{{ note.title }}\n		</h3>\n		<div class="nt-list-excerpt">{{{ note.excerpt }}}</div>\n	</section>\n</aside>\n\n<div class="col-xs-8 nt-active-note">\n	<div class="nt-single-actions">\n		<a href="#" v-on:click.prevent="saveNote()" class="nt-save-btn btn">\n			Save\n		</a>\n		<a href="#" v-on:click.prevent="deleteNote(active_note)" class="nt-delete-btn btn">\n			Trash\n		</a>\n	</div>\n	<h2><input id="noteTitle" class="nt-title" type="text" value="{{ active_note.title }}" /></h2>\n	<div class="nt-content">\n		<textarea v-model="active_note.content" id="nt-textarea">{{ active_note.meta.markdown }}</textarea>\n	</div>\n</div>\n';
