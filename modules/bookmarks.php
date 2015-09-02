<?php

/**
 * Module Name: Bookmarks
 * Module Description: Keep track of bookmarks from across the web
 * Sort Order: 2
 */

class Me_Bookmarks {

	static $instance = false;

	public static function init() {
		if ( ! self::$instance ) {
			self::$instance = new Me_Bookmarks;
		}

		return self::$instance;
	}

	private function __construct() {
		add_action( 'init', array( $this, 'register_bookmarks_custom_type' ) );
	}

	function register_bookmarks_custom_type() {
		
		$labels = array(
			'name'                => _x( 'Bookmarks', 'Post Type General Name', 'text_domain' ),
			'singular_name'       => _x( 'Bookmark', 'Post Type Singular Name', 'text_domain' ),
			'menu_name'           => __( 'Bookmark', 'text_domain' ),
			'name_admin_bar'      => __( 'Bookmark', 'text_domain' ),
			'parent_item_colon'   => __( 'Parent Bookmark:', 'text_domain' ),
			'all_items'           => __( 'All Bookmarks', 'text_domain' ),
			'add_new_item'        => __( 'Add New Bookmark', 'text_domain' ),
			'add_new'             => __( 'Add New', 'text_domain' ),
			'new_item'            => __( 'New Bookmark', 'text_domain' ),
			'edit_item'           => __( 'Edit Bookmark', 'text_domain' ),
			'update_item'         => __( 'Update Bookmark', 'text_domain' ),
			'view_item'           => __( 'View Bookmark', 'text_domain' ),
			'search_items'        => __( 'Search Bookmarks', 'text_domain' ),
			'not_found'           => __( 'Not found', 'text_domain' ),
			'not_found_in_trash'  => __( 'Not found in Trash', 'text_domain' ),
		);
		$args = array(
			'label'               => __( 'Bookmark', 'text_domain' ),
			'description'         => __( 'A list of bookmarks', 'text_domain' ),
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

		register_post_type( 'me_bookmark', $args );
	}

}

Me_Bookmarks::init();