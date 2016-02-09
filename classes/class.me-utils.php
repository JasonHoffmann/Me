<?php
/**
* Class for basic utilities and module loading
* 
* For lack of a better structure, this class contains all utilities
* used throughout the plugin.
*
* @since 0.1.1
*/

class Me_Utils {

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
	public function localize_modules() {
		$active_modules = self::get_active_modules();

		$modules = array();

		foreach( $active_modules as $module ) {
			$mod = array();
			$mod['name'] = ucwords($module);
			$modules[] = $mod;
		}

		return $modules;

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
	public function is_module( $module ) {
		return ! empty( $module ) && ! array_key_exists( $module, self::get_all_modules() );
	}

	/**
	 * Checks if module is active
	 * 
	 * @since 0.1.0
	 * 
	 * @param string $module The module to check
	 * 
	 */
	public function is_module_active( $module ) {
		return in_array( $module, self::get_active_modules() );
	}

	/**
	 * Get a list of all activated modules
	 * 
	 * @since 0.1.0
	 * 
	 */
	public function get_active_modules() {
		$active = self::get_option( 'active_modules' );

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
	public function get_option( $name, $default = false ) {
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
	public function update_option( $name, $value ) {
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
	public function get_module_path( $slug ) {
		return ME__PLUGIN_DIR . "modules/$slug.php";

	}

	/**
	 * Get the name of a module from full filename
	 * 
	 * @since 0.1.0
	 * 
	 * @param string $file The filename to check.
	 */
	public function get_module_slug( $file ) {
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
	public function get_all_modules() {
		$files = self::glob_php( ME__PLUGIN_DIR . 'modules' );

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

			$slug = self::get_module_slug( $file );

			$data['name']			= _x( $data['name'], 'Module Name', 'me' );
			$data['description']	= _x( $data['description'], 'Module Description', 'me' );
			$data['sort']			= empty( $data['sort'] ) ? 10 : (int) $data['sort'];
			$data['activated'] 		= self::is_module_active( $slug );
			$data['slug']			= $slug;

			$modules[ $slug ] = $data;
		}

		usort($modules, array('Me_Utils', 'sort_modules'));

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
	public function glob_php( $absolute_path ) {
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
}