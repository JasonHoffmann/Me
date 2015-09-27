<?php
/**
 * Template for the /me route.
 * 
 * Includes a list of client-side templates for now.
 * 
 * @since 0.1.0
 * 
 * @param object me_vars. Localized list of variables
 * 
 */
?>


<?php wp_head(); ?>

<body id="me-plugin">
	<div class="application"></div>

<script type="text/template" id="notes-list">
	<div class="notes-list-content">
		<div class="notes-list-buttons">
			<a class="btn js-edit" href="#">Edit</a>
			<a class="btn js-trash" href="#">Delete</a>
		</div>
		<h3 class="notes-list-title">
			<a href="#" class="js-view">
				<%= title.rendered %>
			</a>
		</h3>
		<div class="notes-list-excerpt"><%= excerpt.rendered %></div>
	</div>
</script>
<script type="text/template" id="notes-show">
<a href="#" class="js-back note-back">Back to Notes</a>
	<div class="note-header">
		<h3 class="note-title">
			<%= title.rendered %>
		</h3>
		<div class="note-show-actions">
			<a href="#" class="btn js-edit note-show-edit">Edit</a>
		</div>
	</div>
	<ul class="no-list note-tags">
		<% _.each(tags, function(tag) { %>
			<li class="note-tags-item"><%= tag %></li>
		<% }); %>
	</ul>
		<div class="notes-show-content"><%= content.rendered %></div>
	</div>
</script>
<script type="text/template" id="notes-edit">
<a href="#" class="js-back note-back">Back to Notes</a>
<form>
	<div class="note-header">
		<input name="title" class="note-title note-edit-title" value="<%= title.rendered %>">

		<div class="note-show-actions">
			<a href="#" class="btn js-save note-show-edit">Save</a>
		</div>
	</div>
	<textarea name="content" class="note-editor js-editor">
		<%= content.rendered %>
	</textarea>
</form>

</script>
<script type="text/template" id="notes-tags-list">
	<a href="#" class="notes-tags-link js-tag"><%- name %></a>
</script>
<script type="text/template" id="layout-template">
	<div id="side" class="me-sidebar"></div>
	<div class="me-main">
		<div class="notes-item notes-list-actions">
			<a href="#" class="btn notes-new js-new">+ New Note</a>
		</div>
		<div id="main"></div>
	</div>
</script>
</body>

<?php wp_footer(); ?>