/* 
 * log() by Paul Irish stops console.log() breaking Ajax in IE
 * http://paulirish.com/2009/log-a-lightweight-wrapper-for-consolelog/
 */

window.log = function(){
  log.history = log.history || [];   // store logs to an array for reference
  log.history.push(arguments);
  if(this.console){
    console.log( Array.prototype.slice.call(arguments) );
  }
};


/* shortlist methods
----------------------------------------------------------------------------- */

var shortlist = (function($) { // constructor function


  // define object literal container for parameters and methods
  var method = {};

  // define some parameters
  // theme directory name
  var themeDirName = 'shortlist-wordpress';

  // path to ajax file
  var homeURL = window.location.protocol + "//" + window.location.host + "/",
      filePath = homeURL + 'wp-content/themes/' + themeDirName + '/includes/';




  /* append counter to 'shortlist' nav item
  ----------------------------------------- */

  var shortlistNavItem = $('.navbar li a[href$="/shortlist/"]'),
      listCount = $('body').data('count');

  shortlistNavItem.append('&nbsp;(<span class="shortlist-count">0</span>)');

  log(listCount);
  $('.shortlist-count').html(listCount);




  /* Method to update the shortlist counter
  ----------------------------------------- */

  method.getItemTotal = function() {
    var counter = $('.shortlist-count'),
        clearAll = $('.shortlist-clear a');

    $.ajax({
      type: 'GET',
      url: filePath + 'shortlist-total.php',
      success: function(data) {
        counter.text(data);
      },
      error: function() {
        log('error with getItemTotal function');
      }
    });
  };




  /* Add & remove actions for individual items
   *
   * ajax method is wrapped inside itemActions() function
   *
   * method has 'button' parameter so jQuery object
   * can be passed in and run via $(button).on('click'...)
  -------------------------------------------------------- */

  method.itemActions = function(button) {

    $(button).on('click', function(e) {

      var target    = $(this),
          item      = target.closest('.item'),
          itemID    = item.attr('id'),
          itemAction= target.data('action');

      // test bindings
      // log(itemAction, itemID);

      $.ajax({
        type: 'GET',
        url: filePath + 'shortlist-actions.php',
        data: 'action=' + itemAction + '&id=' + itemID,
        success: function() {
          method.getItemTotal();
          log(itemAction + ' item ' + itemID);
        },
        error: function() {
          log('error with itemActions function', 'check that "themeDirName" has been correctly set in shortlist.js');
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





  /* method to remove items from shortlist page
  --------------------------------------------- */

  method.pageActions = function () {

    var shortlistPage     = $('.page-template-shortlist-php'),
        shortlistPageItem = shortlistPage.find('.item'),
        removeItem        = shortlistPageItem.find('.action');

    removeItem.on('click', function(e) {

      var target = $(this),
        itemID = target.closest('.item').attr('id');

      $.ajax({
        type: 'GET',
        url: filePath + 'shortlist-actions.php',
        data: 'action=remove&id=' + itemID,
        success: function() {
          method.getItemTotal();
          log('removed item ' + itemID);
        },
        error: function() {
          log('error with removeItem action');
        }
      });

      target.closest('.item').remove();

      e.preventDefault();
    });

  }; // end



  /* method to empty session with clear button on shortlist page
  --------------------------------------------------------------- */

  method.clearAll = function () {

    $('.shortlist-clear a').on('click', function(e) {

      $.ajax({
        type: 'GET',
        url: filePath + 'shortlist-actions.php',
        data: 'action=empty',
        success: function() {
          method.getItemTotal();
          // fade and remove selected items
          $('.items').fadeOut(function() {
            $(this).remove();
          });
        },
        error: function() {
          log('error with clearAll action');
        }
      });

      e.preventDefault();
    });
  }; // end



  /* make methods accessible
  -------------------------- */
  return method;


}(jQuery)); // end of shortlist constructor




/* invoke shortlist methods
----------------------------------------------------------------------------- */

(function($){

  // select items, excluding those on shortlist page
  var action = $('.item .action:not(.page-template-shortlist-php .item .action)');

  shortlist.getItemTotal();
  shortlist.itemActions( action );
  shortlist.pageActions();
  shortlist.clearAll();

}(jQuery));






