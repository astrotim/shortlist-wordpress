<?php 

// this file controls what IDs are added and removed from the session
// it is called by the ajax method when an add or remove button is clicked

//start the session
    if(!session_id()) {
        session_start();
    }

	    
// define the shortlist session
	if(!isset($_SESSION['shortlist'])) {
		$_SESSION['shortlist'] = array();
	}


// define variable defaults
	$action = null;
	$id = 0;

	// assign action & id parameters if set
	if ( isset( $_GET['action'] ) && !empty( $_GET['action'] ) ) {
		//the action from the URL 
		$action = $_GET['action']; 
	} 
	if ( isset( $_GET['id'] ) && !empty( $_GET['id'] ) ) {
		//the item id from the URL 
		$id = $_GET['id']; 
	} 


// perform actions
	switch($action) {	
	
		case "add":
			// check if item is already in array, if not, add
			if(($key = array_search($id, $_SESSION['shortlist'])) === false) {
				array_push( $_SESSION['shortlist'], $id );
			}
		break;
		
		case "remove":
			// search for item by value and remove if found
			if(($key = array_search($id, $_SESSION['shortlist'])) !== false) {
			    unset($_SESSION['shortlist'][$key]);
			}
		break;
		
		case "empty":
			//remove all
			unset($_SESSION['shortlist']); 
		break;
	
	} //end switch


?>