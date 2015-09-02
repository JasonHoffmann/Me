<?php

/**
 * Module Name: Todos
 * Module Description: Short todo lists, organized for your pleasure
 * Sort Order: 3
 */

class Me_Todos {

	static $instance = false;

	public static function init() {
		if ( ! self::$instance ) {
			self::$instance = new Me_Todos;
		}

		return self::$instance;
	}

	private function __construct() {
		add_action( 'init', array( $this, 'register_todos_custom_type' ) );
	}

	function register_todos_custom_type() {
		
		$labels = array(
			'name'                => _x( 'Todos', 'Post Type General Name', 'text_domain' ),
			'singular_name'       => _x( 'Todo', 'Post Type Singular Name', 'text_domain' ),
			'menu_name'           => __( 'Todo', 'text_domain' ),
			'name_admin_bar'      => __( 'Todo', 'text_domain' ),
			'parent_item_colon'   => __( 'Parent Todo:', 'text_domain' ),
			'all_items'           => __( 'All Todos', 'text_domain' ),
			'add_new_item'        => __( 'Add New Todo', 'text_domain' ),
			'add_new'             => __( 'Add New', 'text_domain' ),
			'new_item'            => __( 'New Todo', 'text_domain' ),
			'edit_item'           => __( 'Edit Todo', 'text_domain' ),
			'update_item'         => __( 'Update Todo', 'text_domain' ),
			'view_item'           => __( 'View Todo', 'text_domain' ),
			'search_items'        => __( 'Search Todos', 'text_domain' ),
			'not_found'           => __( 'Not found', 'text_domain' ),
			'not_found_in_trash'  => __( 'Not found in Trash', 'text_domain' ),
		);
		$args = array(
			'label'               => __( 'Todo', 'text_domain' ),
			'description'         => __( 'A list of todos', 'text_domain' ),
			'labels'              => $labels,
			'supports'            => array( 'title', 'editor', 'custom-fields', ),
			'hierarchical'        => false,
			'public'              => true,
			'show_ui'             => false,
			'show_in_menu'        => false,
			'menu_position'       => 5,
			'show_in_admin_bar'   => false,
			'show_in_nav_menus'   => false,
			'can_export'          => true,
			'has_archive'         => false,		
			'exclude_from_search' => true,
			'publicly_queryable'  => false,
			'capability_type'     => 'page',
		);

		register_post_type( 'me_todo', $args );
	}

}

Me_Todos::init();