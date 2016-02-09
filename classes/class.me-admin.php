<?php

class Me_Admin {

	protected $plugin_slug = 'me';

	protected $page_hook;

	static $instance = false;

	/**
	 * Initialize Me_Admin Class with a new instance
	 * 
	 * Should be called to boot up the class, stores an instance of itself
	 * Me_Admin::init()
	 * 
	 * @since 0.1.0
	 * 
	 * @global boolean $instance
	 * 
	 */
	static function init() {
		if ( ! self::$instance ) {
			self::$instance = new Me_Admin;
		}

		return self::$instance;
	}

	/**
	 * Class Constructer for Me_Admin.
	 * 
	 * Add an options page and load the settings page template
	 * 
	 * @since 0.1.0
	 * 
	 */
	private function __construct() {

		add_action( 'admin_menu', array( $this, 'add_me_options_page' ) );

		add_action( 'load-settings_page_me', array( $this, 'admin_page_load' ) );

		add_action( 'admin_enqueue_scripts', array( $this, 'admin_load_scripts' ) );
	}

	/**
	 * Fires on admin_enqueue_scripts
	 * 
	 * Loads in scripts and styles for the admin
	 * 
	 * @since 0.1.0
	 * 
	 */
	function admin_load_scripts() {
		wp_register_style( 'me_admin_css', ME__PLUGIN_URL . '/admin/css/admin.css' );
		wp_enqueue_style( 'me_admin_css' );
	}

	/**
	 * Fires on admin_menu, when admin is loaded.
	 * 
	 * Adds a settings page.
	 * 
	 * @since 0.1.0
	 * 
	 * @see create_admin_page
	 * 
	 */
	function add_me_options_page() {
		$this->page_hook = add_submenu_page( 'options-general.php', __( 'Me', $this->plugin_slug ), __( '/Me', $this->plugin_slug ), 'manage_options', 'me', array( $this, 'create_admin_page' ) );
	}

	/**
	 * Loads template for the admin page.
	 * 
	 * Stores several variables and includes template for the settings page
	 * 
	 * @since 0.1.0
	 * 
	 * @see Me::get_all_modules
	 * 
	 */
	function create_admin_page() {
		$modules = Me_Utils::get_all_modules();

		$activate_nonce = wp_create_nonce( 'me_module_activate' );
		$deactivate_nonce = wp_create_nonce( 'me_module_deactivate' );

		include ME__PLUGIN_DIR . 'admin/template.php';
	}

	/**
	 * Fires on admin page load
	 * 
	 * Handles all actions and GET requests on admin settings page
	 * 
	 * @since 0.1.0
	 * 
	 * @see Me::activate_module
	 * @see Me::deactivate_module
	 * 
	 */
	function admin_page_load() {
		if ( isset( $_GET['action'] ) ) {
			$url = add_query_arg( 'page', 'me', admin_url( 'options-general.php' ) );
			switch ( $_GET['action'] ) {
				case 'activate' :
					$module = stripslashes( $_GET['module'] );
					check_admin_referer( 'me_module_activate' );

					Me::activate_module( $module );
					wp_safe_redirect( $url );
				exit;
				case 'deactivate' :
					$module = stripslashes( $_GET['module'] );
					check_admin_referer( 'me_module_deactivate' );

					Me::deactivate_module( $module );
					wp_safe_redirect( $url );
				exit;
				default:
					wp_safe_redirect( $url );
			}
		}
	}

}

Me_Admin::init();