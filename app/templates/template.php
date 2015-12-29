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
	<div id="header"></div>
	<main id="main"></main>
<?php wp_footer(); ?>
<script>
  // set our baseURL reference path
  System.config({
    baseURL: meVars.plugin_url,
    bundles: {
      'bundle': ['outfile']
    }
  });

  // loads /app/main.js
  System.import('outfile.js').then(function(m) {
  	console.log(m);
  });
</script>
</body>

