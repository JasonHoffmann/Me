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
		Me::load_modules();

		add_action( 'wp_enqueue_scripts', array( $this, 'load_all_scripts' ) );

		add_action( 'init', array( $this, 'handle_rewrites' ) );
		add_filter('template_redirect', array( $this, 'me_redirect') );

	}


	/**
	 * Load the files for each module that is active.
	 * 
	 * Sorts through a list of active modules and includes the file
	 * for each one from the /modules folder.
	 * 
	 * @since 0.1.0
	 * 
	 * @see get_active_modules()
	 * @see get_module_path()
	 * 
	 */
	public static function load_modules() {

		$modules =  Me::get_active_modules();

		foreach ( $modules as $module ) {
			if ( did_action( 'me_module_loaded' . $module ) ) {
				continue;
			}

			require Me::get_module_path( $module );
			do_action( 'me_module_loaded' . $module );
		}

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

		// TODO: Enqueue these only on the pages that need them (check for me query var)

		wp_enqueue_style( 'me_css', ME__PLUGIN_URL . 'front/css/style.css' );
		wp_enqueue_style( 'tbw_editor_style', ME__PLUGIN_URL . 'front/css/lib/trumbowyg.min.css' );

		// Going to let Require Handle all of this
		// wp_enqueue_script( 'backbone.marionette', ME__PLUGIN_URL . 'front/js/lib/backbone.marionette.min.js', array( 'jquery', 'underscore', 'backbone'), '', true );
		// wp_enqueue_script( 'fetch_cache', ME__PLUGIN_URL . 'front/js/lib/backbone.fetch-cache.min.js', array( 'jquery', 'underscore', 'backbone', 'backbone.marionette' ), '', true );
		// wp_enqueue_script( 'tbw_editor', ME__PLUGIN_URL . 'front/js/lib/trumbowyg.min.js', array( 'jquery', 'underscore', 'backbone', 'backbone.marionette' ), '', true );
		// wp_enqueue_script( 'backbone.syphon', ME__PLUGIN_URL . 'front/js/lib/backbone.syphon.min.js', array( 'jquery', 'underscore', 'backbone', 'backbone.marionette' ), '', true );
		// wp_register_script( 'me_script', ME__PLUGIN_URL . 'front/js/app.js', array( 'jquery', 'underscore', 'backbone', 'backbone.marionette', 'wp-api' ), '', true );

		// wp_localize_script( 'me_script', 'me_vars', array(
		// 	'active_modules' => Me::localize_modules(),
		// 	'root_url' => wp_make_link_relative( home_url( '/me' ) ) . '/'
		// 	) );
		// wp_enqueue_script( 'me_script' );

		wp_enqueue_script( 'require', ME__PLUGIN_URL . 'front/js/lib/require.js', '', '', true);
		wp_register_script( 'load', ME__PLUGIN_URL . 'front/js/r.js', 'require', '', true);
		wp_localize_script( 'load', 'meVars', array(
			'js_url' => ME__PLUGIN_URL . '/front/js',
			'root_url' => wp_make_link_relative( home_url( '/me' ) ) . '/',
			'active_modules' => Me::localize_modules()
			) );
		wp_enqueue_script( 'load' );
	}

	/**
	 * Create a JS readable version of our modules.
	 * 
	 * Creates a proper object that can be read on the front-end
	 * and placed into a collection. For now, this just includes name.
	 * 
	 * 
	 * @since 0.1.0
	 * 
	 * @see get_active_modules()
	 * 
	 */
	public static function localize_modules() {
		$active_modules = Me::get_active_modules();

		$modules = array();

		foreach( $active_modules as $module ) {
			$mod = array();
			$mod['name'] = ucwords($module);
			$modules[] = $mod;
		}

		return $modules;

	}

	/**
	 * Create a rewrite tag for our /me route
	 * 
	 * @since 0.1.0
	 * 
	 */
	function handle_rewrites() {
    	add_rewrite_tag('%me%', 'true');	
	}

	/**
	 * Fires on template processing.
	 * 
	 * Identiifes the /me query variable and loads in proper template
	 * 
	 * @since 0.1.0
	 * 
	 */
	function me_redirect() {
		global $wp_query;

		if (isset($wp_query->query_vars['me'])) {
			if( is_user_logged_in() ) {
				include ME__PLUGIN_DIR . 'front/templates/template.php';
				exit;
			} else {
				wp_safe_redirect( home_url( '/' ) );
			}
		}
	}

	/**
	 * Checks the existence of a module
	 * 
	 * @since 0.1.0
	 * 
	 * @see get_all_modules
	 * 
	 * @param string $module The module to check
	 * 
	 */
	public static function is_module( $module ) {
		return ! empty( $module ) && ! array_key_exists( $module, Me::get_all_modules() );
	}

	/**
	 * Checks if module is active
	 * 
	 * @since 0.1.0
	 * 
	 * @param string $module The module to check
	 * 
	 */
	public static function is_module_active( $module ) {
		return in_array( $module, self::get_active_modules() );
	}

	/**
	 * Get a list of all activated modules
	 * 
	 * @since 0.1.0
	 * 
	 */
	public static function get_active_modules() {
		$active = Me::get_option( 'active_modules' );

		if ( ! is_array( $active ) ) {
			$active = array();
		}

		return array_unique( $active );

	}

	/**
	 * Sort through modules and order properly.
	 * 
	 * Callback on usort.
	 * 
	 * @since 0.1.0
	 * 
	 */
	public function sort_modules($a, $b) {
		if ( $a['sort'] == $b['sort'] )
			return 0;

		return ( $a['sort'] < $b['sort'] ) ? -1 : 1;
	}

	/**
	 * Modify get_option with a "me_" prefix
	 * 
	 * @since 0.1.0
	 * 
	 * @param string $name Name of the option to get.
	 * @param boolean $default Optional. Default value to return
	 * 
	 */
	public static function get_option( $name, $default = false ) {
		if($name) {
			return get_option( "me_$name", $default );
		}

		return $default;
	}

	/**
	 * Modify update_option with a "me_prefix"
	 * 
	 * @since 0.1.0
	 * 
	 * @param string $name Name of the option to update.
	 * @param * $value Value of updated option
	 * 
	 */
	public static function update_option( $name, $value ) {
		return update_option( "me_$name", $value );
	}

	/**
	 * Get an absolute path to a module
	 * 
	 * @since 0.1.0
	 * 
	 * @param string $slug The module slug.
	 * 
	 */
	public static function get_module_path( $slug ) {
		return ME__PLUGIN_DIR . "modules/$slug.php";

	}

	/**
	 * Get the name of a module from full filename
	 * 
	 * @since 0.1.0
	 * 
	 * @param string $file The filename to check.
	 */
	public static function get_module_slug( $file ) {
		return str_replace( '.php', '', basename( $file ) );
	}

	/**
	 * Get a list of all modules available.
	 * 
	 * Steps through all of the files in the /modules directory
	 * and parses the headers, then returns them in an array.
	 * 
	 * @since 0.1.0
	 * 
	 * @see glob_php
	 * @see get_module_slug
	 * 
	 */
	public static function get_all_modules() {
		$files = Me::glob_php( ME__PLUGIN_DIR . 'modules' );

		$modules = array();

		$headers = array(
			'name'                  => 'Module Name',
			'description'           => 'Module Description',
			'sort'                  => 'Sort Order',
		);

		foreach($files as $file) {
			$data = get_file_data( $file, $headers );

			if( !$data ) {
				continue;
			}

			$slug = Me::get_module_slug( $file );

			$data['name']			= _x( $data['name'], 'Module Name', 'me' );
			$data['description']	= _x( $data['description'], 'Module Description', 'me' );
			$data['sort']			= empty( $data['sort'] ) ? 10 : (int) $data['sort'];
			$data['activated'] 		= Me::is_module_active( $slug );
			$data['slug']			= $slug;

			$modules[ $slug ] = $data;
		}

		usort($modules, array('Me', 'sort_modules'));

		return $modules;
	}


	/**
	 * A helper for the glob function.
	 * 
	 * Provides an alternative to glob function if it doesn't exist.
	 * 
	 * @since 0.1.0
	 * 
	 */
	public static function glob_php( $absolute_path ) {
		if ( function_exists( 'glob' ) ) {
			return glob( "$absolute_path/*.php" );
		}

		$absolute_path = untrailingslashit( $absolute_path );
		$files = array();
		if ( ! $dir = @opendir( $absolute_path ) ) {
			return $files;
		}

		while ( false !== $file = readdir( $dir ) ) {
			if ( '.' == substr( $file, 0, 1 ) || '.php' != substr( $file, -4 ) ) {
				continue;
			}

			$file = "$absolute_path/$file";

			if ( ! is_file( $file ) ) {
				continue;
			}

			$files[] = $file;
		}

		closedir( $dir );

		return $files;
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
		if ( ! Me::is_module( $module ) ) {
			return false;
		}

		$active = Me::get_active_modules();
		foreach ( $active as $act ) {
			if ( $act == $module )
				return true;
		}

		require Me::get_module_path( $module );

		$active[] = $module;
		Me::update_option( 'active_modules', $active );
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
		$active = Me::get_active_modules();
		$new = array_filter( array_diff( $active, (array) $module ) );

		Me::update_option( 'active_modules', $new );
		return true;

	}
}