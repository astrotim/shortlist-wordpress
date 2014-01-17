var $ = jQuery; // because we are using WP's noConflict mode jQuery

/* contents
--------------------------------------------

	1. Update counter with getItemTotal
	2. Add & remove actions for individual items
	3. Clear all

*/

// theme directory name
	var themeDirName = 'shortlist-wordpress';

// path to ajax file
	var homeURL = window.location.protocol + "//" + window.location.host + "/",
		filePath = homeURL + 'wp-content/themes/' + themeDirName + '/includes/';


/* craete counter for Shortlist nav item
----------------------------------------------------------------------------- */

	var shortlistNavItem = $('.navbar li a[href$="/shortlist/"]'),
		listCount = $('body').data('count');

	shortlistNavItem.append('&nbsp;(<span class="shortlist-count">0</span>)');

	console.log(listCount);
	$('.shortlist-count').html(listCount);




/* Update the shortlist counter
----------------------------------------------------------------------------- */

	function getItemTotal() {
		var	counter = $('.shortlist-count'),
			clearAll = $('.shortlist-clear a');

		$.ajax({
			type: 'GET',
			url: filePath + 'shortlist-total.php',
			success: function(data) {
				counter.text(data);
			},
			error: function() {
				console.log('error with getItemTotal function');
			}
		});
	};




/* Add & remove actions for individual items-------------------------------------

	ajax method is wrapped inside shortlistActions() function
	so it can be called after infinite scroll.

	function has 'button' parameter so jQuery object
	can be passed in and run via $(button).on('click'...)

	this allows for infinite scroll to apply the ajax method
	to the new content (moreContent)

----------------------------------------------------------------------------- */

	function shortlistActions(button) {

		$(button).on('click', function(e) {

			var target 		= $(this),
				item 		= target.closest('.item'),
				itemID 		= item.attr('id'),
				itemAction 	= target.data('action');

			// test bindings
			// console.log(itemAction, itemID);

			$.ajax({
				type: 'GET',
				url: filePath + 'shortlist-actions.php',
				data: 'action=' + itemAction + '&id=' + itemID,
				success: function() {
					getItemTotal();
					console.log(itemAction + ' item ' + itemID);
				},
				error: function() {
					console.log('error with shortlistActions function', 'check that "themeDirName" has been correctly set in shortlist.js');
				}
			});

			if (itemAction === 'remove') {
				item.removeClass('selected');
			} else {
				item.addClass('selected');
			}

			e.preventDefault();
		});

	}; // end fn


	// call immediately
	shortlistActions( $('.item .action:not(.page-template-shortlist-php .item .action)') );




/* remove items from shortlist page
----------------------------------------------------------------------------- */


	function shortlistPageActions() {

		var shortlistPage 		= $('.page-template-shortlist-php'),
			shortlistPageItem 	= shortlistPage.find('.item'),
			removeItem 			= shortlistPageItem.find('.action');

		removeItem.on('click', function(e) {

			var target = $(this),
				itemID = target.closest('.item').attr('id');

			$.ajax({
				type: 'GET',
				url: filePath + 'shortlist-actions.php',
				data: 'action=remove&id=' + itemID,
				success: function() {
					getItemTotal();
					console.log('removed item ' + itemID);
				},
				error: function() {
					console.log('error with removeItem action');
				}
			});

			target.closest('.item').remove();

			e.preventDefault();
		});

	}; // end

	// call immediately
	shortlistPageActions();




/* Clear all: empty session with clear button on shortlist page
----------------------------------------------------------------------------- */

	function clearAll() {

		$('.shortlist-clear a').on('click', function(e) {

			$.ajax({
				type: 'GET',
				url: filePath + 'shortlist-actions.php',
				data: 'action=empty',
				success: function() {
					getItemTotal();
				},
				error: function() {
					console.log('error with clearAll action');
				}
			});

			e.preventDefault();
		});
	} // end

	clearAll();


