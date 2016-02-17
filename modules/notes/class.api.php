<?php
/**
* Notes API class
* 
* This extends our base API class for the notes custom post type.
* We can override the default functions of our base class here, but since
* this post type will use all defaults that is not necessary yet.
*
* @since 0.1.1
*/

class Me_API_Notes extends Me_API {
	public function endpoint_update_single( $request ) {
		$id = (int) $request['id'];

		$post = get_post( $id );
		

		if ( isset( $request['title'] ) ) {
			if ( is_string( $request['title'] ) ) {
				$post->post_title = wp_filter_post_kses( $request['title'] );
			}
		}

		if ( isset( $request['markdown'] ) ) {
			if ( is_string( $request['markdown'] ) ) {
				update_post_meta($id, 'markdown', $request['markdown']);
				$processed = \Michelf\Markdown::defaultTransform( $request['markdown'] );
				$post->post_content = wp_filter_post_kses( $processed );
			}
		} else {

		}

		wp_update_post( $post );

		$return = array(
			'ID' => $post->ID,
			'title' => $post->post_title,
			'permalink' => get_permalink( $post->ID ),
			'content' => apply_filters( 'the_content', $post->post_content ),
			'excerpt' => wp_trim_words( $post->post_content, 20 )
		);
		$response = new WP_REST_Response( $return );
		return $response;
	}
}