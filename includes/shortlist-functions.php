<?php

// SESSION -------------------------------------------------------------------------------- //

	function shortlist_start_session() {
	    if(!session_id()) {
	        session_start();
	    }
	}
	add_action('init', 'shortlist_start_session', 1);

	function list_count() {
		if(isset($_SESSION['shortlist'])) {
			echo count($_SESSION['shortlist']);
		} else {
			echo '0';
		}	
	}


// JS -------------------------------------------------------------------------------- //
	
	function custom_enqueue_scripts() {
		if (!is_admin()) {
			wp_enqueue_script(
				'shortlist', // handle	
				get_bloginfo('template_directory') . '/js/shortlist.js', // path
				array('jquery'), // dependency
				'2', 	// version
				true // load via wp_footer
			);
		}
	}
	add_action('wp_enqueue_scripts', 'custom_enqueue_scripts');



// Debug -------------------------------------------------------------------------------- //

	function debug_shortlist() {
		echo '<br><pre class="entry-content">';
		if(!empty($_SESSION['shortlist'])) {
			print_r($_SESSION['shortlist']);
		} else {
			echo 'Session is empty.';
		}	
		echo '</pre>';
	}

?>