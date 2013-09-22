<?php 
	//start the session
    if(!session_id()) {
        session_start();
    }

	if(isset($_SESSION['shortlist'])) {
		echo count($_SESSION['shortlist']);
	} else {
		echo '0';
	}	
?>