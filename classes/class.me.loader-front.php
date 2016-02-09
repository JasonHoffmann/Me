<?php
/**
* Loader Class for the front-end.
* 
* The purpose of this is to ensure that front-end classes are only
* initialized when the proper template_redirect hook is met.
* Otherwise, these are not necessary. 
*
* @since 0.1.1
*/

class Me_Loader {

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
			self::$instance = new Me_Loader;
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
		add_action('template_redirect', array( $this, 'load_me_plugin') );
		add_action( 'init', array( $this, 'handle_rewrites' ) );
		add_action('init', array( $this, 'load_rest_endpoints' ) );
		self::load_modules();
	}

	public function load_me_plugin() {
		global $wp_query;
		if (isset($wp_query->query_vars['me'])) {
			Me::init();
			
		}
	}

	/**
	 * Load the files for each module that is active.
	 * 
	 * Sorts through a list of active modules and includes the file
	 * for each one from the /modules folder.
	 * 
	 * @since 0.1.0
	 * 
	 * @see Me_Utils::get_active_modules()
	 * @see Me_Utils::get_module_path()
	 * 
	 */
	private function load_modules() {

		$modules =  Me_Utils::get_active_modules();

		foreach ( $modules as $module ) {
			if ( did_action( 'me_module_loaded' . $module ) ) {
				continue;
			}

			require Me_Utils::get_module_path( $module );
			do_action( 'me_module_loaded' . $module );
		}

	}

	/**
	 * Initializes our Me API Modules Class
	 * 
	 * Handles the endpoints for basic modules
	 * 
	 */
	public function load_rest_endpoints() {
		Me_API_Modules::init();
	}

	/**
	 * Create a rewrite tag for our /me route
	 * 
	 * @since 0.1.0
	 * 
	 */
	public function handle_rewrites() {
    	add_rewrite_tag('%me%', 'true');	
	}


}