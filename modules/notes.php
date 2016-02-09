<?php
require_once( ME__PLUGIN_DIR . 'includes/php-markdown/Markdown.inc.php' );
require_once( ME__PLUGIN_DIR . 'modules/notes/class.api.php' );


/**
 * Module Name: Notes
 * Module Description: Keep notes and organize them in categories
 * Sort Order: 1
 */

class Me_Notes {

	static $instance = false;

	public static function init() {
		if ( ! self::$instance ) {
			self::$instance = new Me_Notes();
		}

		return self::$instance;

	}

	private function __construct() {
		add_action( 'init', array( $this, 'register_notes_custom_type' ) );
		add_action( 'init', array( $this, 'register_notes_tags' ) );

		$api = new Me_API_Notes(
			array(
				'endpoint' => 'notes', 
				'post_type' => 'me_note',
				'meta_fields' => array( 'markdown' )
			)
		);

		
	}

	function register_notes_tags() {
		$args = array(
			'labels'                     => 'Notes Taxonomy',
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
		
		$args = array(
			'label'               => __( 'Note', 'text_domain' ),
			'description'         => __( 'A list of notes', 'text_domain' ),
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

}

Me_Notes::init();