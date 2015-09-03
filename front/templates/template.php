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

<div id="me-plugin-body" class="body">
	<div id="me-plugin-header">
	</div>
	<div id="me-plugin-content">
	</div>
</div>

<script type="text/template" id="main-header">
	 <span class="module-header-slash">/</span>Me
</script>
<script type="text/template" id="active-modules">
	<a href="#" class="module-list-link btn js-module-link"><%- name %></a>
</script>

<script type="text/template" id="notes-list">
	<div class="notes-list-buttons">
		<a class="btn js-view" href="#">View</a>
		<a class="btn js-edit" href="#">Edit</a>
	</div>
	<div class="notes-list-content">
		<% // TODO: Find a better way to truncate this %>
		<h3 class="notes-list-title"><%= title.rendered %></h3>
		<div class="notes-list-excerpt"><%= excerpt.rendered %></div>
	</div>
</script>
<script type="text/template" id="notes-show">
	<div class="notes-show-main">
		<h3 class="notes-show-title"><%= title.rendered %></h3>
		<div class="notes-show-content"><%= content.rendered %></div>
	</div>
</script>
<script type="text/template" id="notes-edit">
	<div class="notes-edit-main">
		<h3 class="notes-edit-title"><%= title.rendered %></h3>
		<textarea class="notes-editor js-editor">
		<%= content.rendered %>
		</textarea>
		<div class="notes-edit-actions">
			<a href="#" class="notes-edit-button btn js-save">Save</a>
		</div>
	</div>
</script>
<script type="text/template" id="notes-tags-list">
	<a href="#" class="notes-tags-link js-tag"><%- name %></a>
</script>
<script type="text/template" id="layout-template">
	<div id="side" class="me-sidebar"></div>
	<div id="main" class="me-main"></div>
</script>
</body>

<?php wp_footer(); ?>