<?php 

// INCLUDES -------------------------------------------------------------------------------- //

	if ( ! function_exists('custom_functions') ) :
	function custom_functions() {
		include(get_template_directory() . '/includes/shortlist-functions.php');
	}
	endif;
	// runs before 'init' hook
	add_action( 'after_setup_theme', 'custom_functions' );


	function scripts_and_styles() {

		wp_enqueue_style( 'stylesheet', get_stylesheet_uri(), array(), '2013-07-18' );

	}
	add_action( 'wp_enqueue_scripts', 'scripts_and_styles' );

 ?>