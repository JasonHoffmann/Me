<?php

/**
 * Module Name: Notes
 * Module Description: Keep notes and organize them in categories
 * Sort Order: 1
 */

class Me_Notes {

	static $instance = false;

	public static function init() {
		if ( ! self::$instance ) {
			self::$instance = new Me_Notes;
		}

		return self::$instance;
	}

	private function __construct() {
		add_action( 'init', array( $this, 'register_notes_custom_type' ) );
		add_action( 'init', array( $this, 'register_notes_tags' ) );

		add_action( 'init', array( $this, 'add_notes_to_rest_api' ) );


	}

	function add_notes_to_rest_api() {
		global $wp_post_types;
		$wp_post_types['me_note']->show_in_rest = true;
		$wp_post_types['me_note']->rest_base = 'me_notes';
		$wp_post_types['me_note']->rest_controller_class = 'WP_REST_Posts_Controller';
	}

	function register_notes_tags() {
		$labels = array(
			'name'                       => _x( 'Notes Tags', 'Taxonomy General Name', 'text_domain' ),
			'singular_name'              => _x( 'Note Tag', 'Taxonomy Singular Name', 'text_domain' ),
			'menu_name'                  => __( 'Note Tag', 'text_domain' ),
			'all_items'                  => __( 'All Note Tags', 'text_domain' ),
			'parent_item'                => __( 'Parent Tag', 'text_domain' ),
			'parent_item_colon'          => __( 'Parent Tag:', 'text_domain' ),
			'new_item_name'              => __( 'New Tag', 'text_domain' ),
			'add_new_item'               => __( 'Add New Tag', 'text_domain' ),
			'edit_item'                  => __( 'Edit Tag', 'text_domain' ),
			'update_item'                => __( 'Update Tag', 'text_domain' ),
			'view_item'                  => __( 'View Tag', 'text_domain' ),
			'separate_items_with_commas' => __( 'Separate items with commas', 'text_domain' ),
			'add_or_remove_items'        => __( 'Add or remove tags', 'text_domain' ),
			'choose_from_most_used'      => __( 'Choose from the most used', 'text_domain' ),
			'popular_items'              => __( 'Popular Tags', 'text_domain' ),
			'search_items'               => __( 'Search Tags', 'text_domain' ),
			'not_found'                  => __( 'Not Found', 'text_domain' ),
		);
		$args = array(
			'labels'                     => $labels,
			'hierarchical'               => false,
			'public'                     => true,
			'show_ui'                    => false,
			'show_admin_column'          => false,
			'show_in_nav_menus'          => false,
			'show_tagcloud'              => false,
		);
		register_taxonomy( 'me_note_tags', array( 'me_note' ), $args );

		register_taxonomy_for_object_type( 'me_note_tags', 'me_note' );
	}

	function register_notes_custom_type() {
		
		$labels = array(
			'name'                => _x( 'Notes', 'Post Type General Name', 'text_domain' ),
			'singular_name'       => _x( 'Note', 'Post Type Singular Name', 'text_domain' ),
			'menu_name'           => __( 'Note', 'text_domain' ),
			'name_admin_bar'      => __( 'Note', 'text_domain' ),
			'parent_item_colon'   => __( 'Parent Note:', 'text_domain' ),
			'all_items'           => __( 'All Notes', 'text_domain' ),
			'add_new_item'        => __( 'Add New Note', 'text_domain' ),
			'add_new'             => __( 'Add New', 'text_domain' ),
			'new_item'            => __( 'New Note', 'text_domain' ),
			'edit_item'           => __( 'Edit Note', 'text_domain' ),
			'update_item'         => __( 'Update Note', 'text_domain' ),
			'view_item'           => __( 'View Note', 'text_domain' ),
			'search_items'        => __( 'Search Notes', 'text_domain' ),
			'not_found'           => __( 'Not found', 'text_domain' ),
			'not_found_in_trash'  => __( 'Not found in Trash', 'text_domain' ),
		);
		$args = array(
			'label'               => __( 'Note', 'text_domain' ),
			'description'         => __( 'A list of notes', 'text_domain' ),
			'labels'              => $labels,
			'supports'            => array( 'title', 'editor', 'custom-fields' ),
			'hierarchical'        => false,
			'public'              => true,
			'show_ui'             => true,
			'show_in_menu'        => false,
			'menu_position'       => 5,
			'show_in_admin_bar'   => false,
			'show_in_nav_menus'   => false,
			'can_export'          => true,
			'has_archive'         => false,		
			'exclude_from_search' => true,
			'publicly_queryable'  => true,
			'capability_type'     => 'page',
		);

		register_post_type( 'me_note', $args );
	}

}

Me_Notes::init();