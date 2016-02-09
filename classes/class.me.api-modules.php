<?php

/**
* Class to setup API endpoints for our main modules
* 
* Called after rest_api_init, and registers a simple GET method
* which retrieves all of our URLs and returns them.
*
* @since 0.1.0
*/

class Me_API_Modules {

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
			self::$instance = new Me_API_Modules;
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
		add_action( 'rest_api_init', array( $this, 'add_me_modules_to_rest_api' ) );
	}

	/**
	 * Adds a list of modules to our API endpoint
	 * 
	 * Registers endpoints to retrieve a list of modules
	 *
	 * @since 0.1.1
	 * 
	 * 
	 */
	function add_me_modules_to_rest_api() {
		$namespace = 'me/v1';

		register_rest_route( $namespace, '/modules/', array(
		    'methods' => 'GET',
		    'callback' => array( $this, 'me_get_modules' ),
		) );
	}

	
	/**
	 * Gets a list of modules for our API endpoint
	 * 
	 * Callback for the GET method of the "modules" endpoint
	 *
	 * @since 0.1.1
	 * 
	 * 
	 */
	function me_get_modules() {
		$return = Me_Utils::get_all_modules();
		$response = new WP_REST_Response( $return );
		$response->header( 'Access-Control-Allow-Origin', apply_filters( 'giar_access_control_allow_origin','*' ) );
		return $response;
	}
}