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
		<a class="btn" href="#">View</a>
		<a class="btn" href="#">Edit</a>
	</div>
	<div class="notes-list-content">
		<% content.rendered = content.rendered.substring(0, 100); %>
		<h3 class="notes-list-title"><%= title.rendered %></h3>
		<div class="notes-list-excerpt"><%= content.rendered %></div>
	</div>
</script>
<script type="text/template" id="notes-tags-list">
	<%- name %>
</script>
<script type="text/template" id="layout-template">
	<div id="sidebar"></div>
	<div id="main"></div>
</script>
</body>

<?php wp_footer(); ?>