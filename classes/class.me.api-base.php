<?php
/**
* Base class for accessing custom API endpoints
* 
* Sets up basic calls to the API, to be extended and used 
* by other classes
*
* @since 0.1.1
*/

class Me_API {

	private $endpoint;
	private $post_type;
	private $meta_fields;

	/**
	 * Constructor for base API
	 * 
	 * Sets our endpoint, post type and required meta fields from
	 * the inital class. Then, it calls the init function to kick things
	 * off.
	 * 
	 * @since 0.1.1
	 */
	public function __construct( $data ) {
		$this->endpoint = $data['endpoint'];
		$this->post_type = $data['post_type'];
		$this->meta_fields = $data['meta_fields'];
		
		self::init();
	}

	/**
	 * Initiate the REST API call
	 * 
	 * Manages our hooks and actions. In this case, that's a simple call
	 * to the rest_api_init action, which kicks off our endpoint.
	 * 
	 * @see add_endpoint_to_rest_api
	 * @since 0.1.1
	 */
	public function init() {
		add_action( 'rest_api_init', array( $this, 'add_endpoint_to_rest_api' ) );
	}

	/**
	 * Adds endpoint methods to the API
	 * 
	 * Sets the API endpoints, which correspond to different methods (i.e. GET, POST, PATCH)
	 * Each one of thse calls a corresponding function as a callback (list below).
	 * 
	 * This plugin sets up some nice defaults, but this callback can be overriden by subclasses
	 * if that's necessary.
	 * 
	 * @see endpoint_get_all
	 * @see endpoint_create_single
	 * @see endpoint_get_single
	 * @see endpoint_update_single
	 * @see endpoint_delete_single
	 * @since 0.1.1
	 */
	public function add_endpoint_to_rest_api() {
		$namespace = 'me/v1';
		$enpdpoint = 'notes';

		register_rest_route( $namespace, '/' . $endpoint . '/', array(
			array(
			    'methods' => WP_REST_Server::READABLE,
			    'callback' => array( $this, 'endpoint_get_all' ),
			),
			array(
				'methods' => WP_REST_Server::CREATABLE,
				'callback' => array( $this, 'endpoint_create_single' )
			)
		));

		register_rest_route( $namespace, '/' . $this->endpoint . '/(?P<id>\d+)', array(
			array(
				'methods' => WP_REST_Server::READABLE,
				'callback' => array( $this, 'endpoint_get_single' )
			),

			array(
				'methods' => WP_REST_Server::EDITABLE,
				'callback' => array( $this, 'endpoint_update_single' )
			),

			array(
				'methods'  => WP_REST_Server::DELETABLE,
				'callback' => array( $this, 'endpoint_delete_single' ),
			)
		));
	}

	/**
	 * GET all from post type
	 * 
	 * A basic function that gets all of the posts associated
	 * with the post type passed to the class. It also takes the array of 
	 * meta data specified and places it all in a "meta" array, then
	 * returns a json_encoded response
	 * 
	 * @see get_posts
	 * @since 0.1.1
	 * @return type|$object $response  json_encoded list of posts
	 */
	public function endpoint_get_all() {
	            $query = array(
	                'numberposts' => -1,
	                'post_type'   => $this->post_type,
	                'post_status' => 'publish',
	            );
	            $all_posts = get_posts( $query );

	            foreach ( $all_posts as $post ) {
	            	$meta_fields = array();
	            	foreach( $this->meta_fields as $meta ) {
	            		$meta_fields[$meta] = get_post_meta($post->ID, $meta, true);
	            	}
	            	
	                $return[] = array(
	                    'ID' => $post->ID,
	                    'title' => $post->post_title,
	                    'permalink' => get_permalink( $post->ID ),
	                    'content' => apply_filters( 'the_content', $post->post_content ),
	                    'meta' => $meta_fields
	                );
	            }
	    $response = new WP_REST_Response( $return );
	    return $response;
	}

	/**
	 * POST create a new post type
	 * 
	 * Creates a new post based on the data passed to the request,
	 * the post type specified when this class is created, and any
	 * meta fields passed to the class. Returns a simple update status.
	 * 
	 * @since 0.1.1
	 * @return type|$object $response  json_encoded update status
	 */
	public function endpoint_create_single( $request ) {
		if ( ! empty( $request['id'] ) ) {
			return new WP_Error( 'rest_post_exists', __( 'Cannot create existing post.' ), array( 'status' => 400 ) );
		}

		$prepared_post = new stdClass;

		// Post title.
		if ( isset( $request['title'] ) ) {
			if ( is_string( $request['title'] ) ) {
				$prepared_post->post_title = wp_filter_post_kses( $request['title'] );
			}
		}

		$prepared_post->post_type = $this->post_type;
		$prepared_post->post_status = 'publish';
		$post_id = wp_insert_post( $prepared_post, true );

		foreach( $this->meta_fields as $meta ) {
			if( isset( $request[$meta] ) ) {
				update_post_meta($post_id, $request[$meta] );
			}
		}

		$response = array(
			'update' => 'true'
			);

		$response = rest_ensure_response( $response );
		$response->set_status( 201 );
		return $response;
	}


	/**
	 * GET single post from post type
	 * 
	 * Gets a single post based on the ID passed to the request.
	 * Also looks up meta data, based on the meta passed to this class.
	 * Returns a json_encoded object of the individual post.
	 * 
	 * @see get_post
	 * 
	 * @since 0.1.1
	 * @return type|$object $response  json_encoded post
	 */
	public function endpoint_get_single( $data ) {
		$post = get_post($data['id']);

		$meta_fields = array();
		foreach( $this->meta_fields as $meta ) {
			$meta_fields[$meta] = get_post_meta($post->ID, $meta, true);
		}


		$return = array(
			'ID' => $post->ID,
			'title' => $post->post_title,
			'permalink' => get_permalink( $post->ID ),
			'content' => apply_filters( 'the_content', $post->post_content ),
			'meta' => $meta_fields
		);
		$response = new WP_REST_Response( $return );
		return $response;
	}


	/**
	 * PUT, PATCH single post from post type
	 * 
	 * Updates a single post based on the ID passed through in the request.
	 * Verifies title and content, and updates any post meta if appropriate.
	 * Returns basic update status.
	 * 
	 * @see get_post
	 * 
	 * @since 0.1.1
	 * @return type|$object $response  json_encoded update status
	 */
	public function endpoint_update_single( $request ) {
		$id = (int) $request['id'];

		$post = get_post( $id );

		if ( isset( $request['title'] ) ) {
			if ( is_string( $request['title'] ) ) {
				$post->post_title = wp_filter_post_kses( $request['title'] );
			}
		}

		if ( isset( $request['content'] ) ) {
			if ( is_string( $request['content'] ) ) {
				$post->post_content = wp_filter_post_kses( $request['content'] );
			}
		}

		foreach( $this->meta_fields as $meta ) {
			if( isset( $request[$meta] ) ) {
				update_post_meta($id, $request[$meta] );
			}
		}

		$data = array(
			'update' => true
		);

		return new WP_REST_Response( $data, 200 );
	}

	/**
	 * DELETE single post from post type
	 * 
	 * Removes a post entirely based on ID based to request object.
	 * For now, we are using wp_trash_post, which will not permanently 
	 * remove the post, but stores it in trash for 30 days. Returns
	 * a basic update status.
	 * 
	 * @see wp_trash_post
	 * 
	 * @since 0.1.1
	 * @return type|$object $response  json_encoded update status
	 */
	public function endpoint_delete_single( $request ) {
		$id = (int) $request['id'];

		$result = wp_trash_post( $id );

		$data = array(
			'trashed' => true
		);

		return new WP_REST_Response( $data, 200 );
	}

}