<?php

/**
* Class for the front-end.
* 
* Includes activation and deactivation hooks, code that scales up modules
* and including assets on the front-end.
*
* @since 0.1.0
*/

class Me {

	protected $plugin_name = 'me';

	static $instance = false;

	
	/**
	 * Initialize Class with a new instance
	 * 
	 * Should be called to boot up the class, stores an instance of itself
	 * Me::init()
	 * 
	 * @since 0.1.0
	 * 
	 * @global boolean $instance
	 * 
	 */
	public static function init() {
		if ( ! self::$instance ) {
			self::$instance = new Me;
		}

		return self::$instance;
	}

	/**
	 * Class Constructer for Me.
	 * 
	 * Sets up everything for the class, loads modules.
	 * Uses WordPress hooks to add styles / scripts and rewrite rules.
	 * 
	 * @since 0.1.0
	 * 
	 */
	private function __construct() {
	
		add_filter('template_include', array($this, 'load_template'));
		// self::load_template();

		add_action( 'wp_enqueue_scripts', array( $this, 'load_all_scripts' ) );

	}


	/**
	 * Hooks into wp_enqueue_scripts to bring everything to the front-end.
	 * 
	 * Loads in our main styles and scripts for the /Me front-end. 
	 * Uses wp_localize_script to pass along a few parameters to our Marionette app.
	 * 
	 * @since 0.1.0
	 * 
	 * @uses wp_enqueue_scripts()
	 * 
	 * @see localize_modules
	 * 
	 */
	function load_all_scripts() {

		// This clears all current scripts and styles. Open to more elegant solutions here
		global $wp_scripts;
		global $wp_styles;
		$adminBar = $wp_styles->registered['admin-bar'];
		$openSans = $wp_styles->registered['open-sans'];
		$dashicons = $wp_styles->registered['dashicons'];
		$wp_scripts->registered = array();
		$wp_styles->queue = array("admin-bar");

		wp_enqueue_style( 'me_css', ME__PLUGIN_URL . 'front/css/style.css' );

		wp_enqueue_script( 'vendors', ME__PLUGIN_URL . '/front/app/vendor/vendor.min.js', '', '', true);
		wp_register_script( 'main', ME__PLUGIN_URL . '/front/app/build/index.bundle.js', '', '', true);
		wp_localize_script( 'main', 'meVars', array(
			'js_url' => ME__PLUGIN_URL . '/app/js',
			'root_url' => wp_make_link_relative( home_url( '/me' ) ) . '/',
			'api_url' => home_url('/wp-json/me/v1'),
			'active_modules' => Me_Utils::localize_modules(),
			'plugin_url' => ME__PLUGIN_URL
			) );
		wp_enqueue_script( 'main' );
	}


	/**
	 * Fires on template processing.
	 * 
	 * Identiifes the /me query variable and loads in proper template
	 * 
	 * @since 0.1.0
	 * 
	 */
	function load_template( $original_template ) {
		if( is_user_logged_in() ) {
			return ME__PLUGIN_DIR . 'front/templates/template.php';
		} else {
			return $original_template;
		}
	}

	/**
	 * Activate a module.
	 * 
	 * Checks for the existence of a module, then adds it to the active_modules option.
	 * 
	 * @since 0.1.0
	 * 
	 * @see is_module
	 * @see get_active_modules
	 * @see get_module_path
	 * 
	 * @param string $module The slug of the module to activate
	 * 
	 */
	public static function activate_module( $module ) {
		if ( ! Me_Utils::is_module( $module ) ) {
			return false;
		}

		$active = Me_Utils::get_active_modules();
		foreach ( $active as $act ) {
			if ( $act == $module )
				return true;
		}

		require Me_Utils::get_module_path( $module );

		$active[] = $module;
		Me_Utils::update_option( 'active_modules', $active );
		return true;

	}

	/**
	 * Deactivate a module.
	 * 
	 * Removes the module from the active_modules option
	 * 
	 * @since 0.1.0
	 * 
	 * @see get_active_modules
	 * 
	 * @param string $module The slug of the module to deactivate
	 * 
	 */
	public static function deactivate_module( $module ) {
		$active = Me_Utils::get_active_modules();
		$new = array_filter( array_diff( $active, (array) $module ) );

		Me_Utils::update_option( 'active_modules', $new );
		return true;

	}
}