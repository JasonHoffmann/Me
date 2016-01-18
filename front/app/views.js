'format cjs';
module.exports = Object.create(null);
module.exports['sections/index'] = '<ul v-for="item in active_sections" class="module-list">\n	<li class="module-list-item">\n		<a v-link="{ path: item.slug }" class="module-list-link btn js-module-link">{{ item.name }}</a>\n	</li>\n</ul>';
module.exports['editor/editor'] = '<form>\n	<div class="note-header">\n		<input name="title" class="note-title note-edit-title" v-model="note.title">\n\n		<div class="note-show-actions">\n			<button v-on:click.prevent="save" class="btn note-show-edit">Save</button>\n		</div>\n	</div>\n	<textarea name="content" class="note-edit-content"  v-model="note.markdown" autofocus>\n	</textarea>\n</form>';
module.exports['layout/layout'] = '<main class="container">\n	<div class="row">\n		<router-view></router-view>\n	</div>\n</main>';
module.exports['notes/edit'] = '<editor :note="note"></editor>';
module.exports['notes/index'] = '<aside class="col-xs-4">\n	<div class="nt-add">\n		<button href="#new" v-on:click.prevent="newNote" class="nt-add-btn">+ New Note</button>\n	</div>\n\n	<section v-for="note in notes" class="nt-list">\n		<h3 class="nt-list-title">\n				{{ note.title }}\n		</h3>\n		<div class="nt-list-excerpt">{{{ note.content }}}</div>\n	</section>\n</aside>\n\n\n<div class="col-xs-8">\n	{{ active_note | json }}\n</div>\n';
