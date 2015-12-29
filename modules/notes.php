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

		add_action( 'rest_api_init', array( $this, 'add_notes_to_rest_api' ) );
	}

	function add_notes_to_rest_api() {
		$namespace = 'me/v1';

		register_rest_route( $namespace, '/notes/', array(
		    'methods' => 'GET',
		    'callback' => array( $this, 'me_get_notes' ),
		) );

		register_rest_route( $namespace, '/notes/', array(
		    'methods' => 'POST',
		    'callback' => array( $this, 'me_process_notes' ),
		) );
	}

	function me_get_notes() {
	    if ( 0 || false === ( $return = get_transient( 'me_all_notes' ) ) ) {
	            $query = apply_filters( 'me_notes_query', array(
	                'numberposts' => -1,
	                'post_type'   => 'post',
	                'post_status' => 'publish',
	            ) );
	            $all_posts = get_posts( $query );
	            $return = array();

	            foreach ( $all_posts as $post ) {
	                $return[] = array(
	                    'ID' => $post->ID,
	                    'title' => $post->post_title,
	                    'permalink' => get_permalink( $post->ID ),
	                    'content' => $post->post_content
	                );
	            }

	        // cache for 10 minutes
	        set_transient( 'me_all_notes', $return, apply_filters( 'me_notes_ttl', 60*10 ) );
	    }
	    $response = new WP_REST_Response( $return );
	    $response->header( 'Access-Control-Allow-Origin', apply_filters( 'giar_access_control_allow_origin','*' ) );
	    return $response;
	}

	function me_process_notes() {
		$post_id = $_POST['id'];
		// input validation
		if ( ! is_numeric( $post_id ) ) {
			return false;
		}

		delete_transient( 'giar_all_posts' );
		$update_success = 'TODO: MAKE THIS WORK';
		
		$response = new WP_REST_Response( $update_success );
		$response->header( 'Access-Control-Allow-Origin', apply_filters( 'giar_access_control_allow_origin', '*' ) );
		return $response;
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
			'show_ui'                    => true,
			'show_admin_column'          => true,
			'show_in_nav_menus'          => true,
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
			'supports'            => array( 'title', 'editor', 'custom-fields', 'excerpt' ),
			'taxonomies'		  => array( 'me_note_tags' ),
			'hierarchical'        => false,
			'public'              => true,
			'show_ui'             => true,
			'show_in_menu'        => true,
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

	function add_fields_to_response( $data, $post, $request ) {
		$tags = wp_get_post_terms($post->ID, 'me_note_tags', array('fields' => 'names'));
		$data->data['tags'] = $tags;

		return $data;
	}

	function filter_notes_excerpt( $more ) {
		global $post;
		if($post->post_type === 'me_note') {
			return '';
		}
 		
	}

}

Me_Notes::init();