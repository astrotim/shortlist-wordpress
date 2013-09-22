<?php 
/*
** Template name: Shortlist
*/
get_header(); 
?>

	<div id="content" class="entry-content site-content" role="main">

<?php 
	// debug_shortlist();

	// get session array
	$shortlist = array(0);

	if(isset($_SESSION['shortlist'])) {
		$shortlist = $_SESSION['shortlist'];
	}

	$args = array (
		'post_type' => 'post',
		'orderby' => 'title',			
		'order' => 'asc',
	    'post__in' => $shortlist,
		// 'posts_per_page' => 24
	);

	$wp_query = new WP_Query( $args );

	if ( have_posts() ) : 

?>

		<ul class="items">

<?php 
	while ( have_posts() ) : the_post(); 

	// set selected class
	$selected = '';
	if(isset($_SESSION['shortlist'])) {
		if ( in_array($id, $_SESSION['shortlist']) ) {
			$selected = 'selected';
		}
	}

?>

			<li id="<?php the_ID(); ?>" class="item">
				<img src="http://placehold.it/180x120/f0f7fd/428bca&text=<?php the_title(); ?>" alt="">						
				<a href="#" class="btn action remove" data-action="remove"><span class="glyphicon glyphicon-minus-sign"></span> Remove</a>
			</li>
<?php 
	endwhile; 
?>

		</ul>

<?php else : ?>

<p>No items selected.</p>

<?php 	
	endif; // have_posts
?>

	</div><!-- #content -->


<?php get_footer(); ?>