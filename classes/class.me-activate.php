<?php
/**
* Class for plugin initialization and deactivation
* 
* This is used to kick the plugin off and
* includes activation and deactivation hooks
*
* @since 0.1.1
*/

class Me_Activate {
	static $instance = false;

	/**
	 * Initialize Me_Activate Class with a new instance
	 * 
	 * Should be called to boot up the class, stores an instance of itself
	 * Me_Admin::init()
	 * 
	 * @since 0.1.1
	 * 
	 * @global boolean $instance
	 * 
	 */
	static function init() {
		if ( ! self::$instance ) {
			self::$instance = new Me_Activate;
		}

		return self::$instance;
	}

	/**
	 * Plugin Activation hook.
	 * 
	 * Sets up the /me route and flushes rewrite rules
	 * 
	 * @since 0.1.0
	 * 
	 */
	public static function plugin_activation() {
		add_rewrite_rule('me', 'index.php?me=true', 'top');
		flush_rewrite_rules();
	}

	/**
	 * Plugin Deactivation hook.
	 * 
	 * Let's make sure to flush rewrite rules when the plugin is deactivated
	 * 
	 * @since 0.1.0
	 * 
	 */
	public static function plugin_deactivation() {
		flush_rewrite_rules();
	}
}