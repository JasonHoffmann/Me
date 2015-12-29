<?php

/*
 * Plugin Name: /Me
 * Plugin URI: 
 * Description: Organize your life and take back control of your data
 * Author: 
 * Version: 0.1.0
 * Author URI: 
 * License: GPL2+
 * Text Domain: me
 * Domain Path: /languages/
 */

define( 'ME__VERSION',            '0.1.1' );
define( 'ME__PLUGIN_DIR',         plugin_dir_path( __FILE__ ) );
define( 'ME__PLUGIN_URL',         plugin_dir_url( __FILE__ ) );
define( 'ME__PLUGIN_BASE',         plugin_basename( __FILE__ ) );
define( 'ME__PLUGIN_FILE',        __FILE__ );

require_once( ME__PLUGIN_DIR . 'classes/class.me.php'     );


if ( is_admin() ) {
	require_once( ME__PLUGIN_DIR . 'classes/class.me-admin.php'     );
}

/**
 * Begins execution of the plugin.
 *
 * Going to initialize the plugin and kick off execution
 *
 * @since    0.1.0
 */
register_activation_hook( __FILE__, array( 'Me', 'plugin_activation' ) );
register_deactivation_hook( __FILE__, array( 'Me', 'plugin_deactivation' ) );

Me::init();