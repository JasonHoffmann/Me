<?php
/**
 * Template for the admin settings page
 * 
 * @since 0.1.0
 * 
 * @param array $modules A list of all modules
 * @param string $activate_nonce Nonce for module activation
 * @param string $deactivate_nonce Nonce for module deactivation
 * 
 */
?>

<div class="wrap">
	<h3>/Me Modules</h3>

	<table class="table wp-list-table me-modules">
	<tbody>

	<?php foreach( $modules as $module_slug => $module ) { ?>
		<tr class="me-module alternate">
			<td class="me-module_name">
				<h4><?php echo $module['name']; ?></h4>

				<div class="me-module_actions">
					<?php if( $module['activated'] ) { ?>
						<a class="button" href="<?php echo admin_url( 'options-general.php' ); ?>?page=me&#038;action=deactivate&#038;module=<?php echo $module['slug']; ?>&#038;_wpnonce=<?php echo $deactivate_nonce; ?>">
							<?php _e( 'Deactivate', 'me' ); ?>
						</a>
					<?php } else { ?>
						<a class="button-primary" href="<?php echo admin_url( 'options-general.php' ); ?>?page=me&#038;action=activate&#038;module=<?php echo $module['slug']; ?>&#038;_wpnonce=<?php echo $activate_nonce; ?>">
							<?php _e( 'Activate', 'me' ); ?>
						</a>
					<?php } ?>
				</div>
			</td>
		</tr>
	<?php } ?>

	</tbody>
	</table>
</div>