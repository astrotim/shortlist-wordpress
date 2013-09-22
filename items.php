<?php
/*
** Template name: All Items
*/
get_header(); ?>

		<div id="content" class="site-content" role="main">

<?php  
	// debug_shortlist();

	$args = array (
		'post_type' => 'post',
		'orderby' => 'ID',			
		'order' => 'asc',
	);

	$wp_query = new WP_Query( $args );
?>			

		<?php if ( have_posts() ) : ?>

			<ul class="items">

			<?php while ( have_posts() ) : the_post(); 

				// set selected class
				$selected = '';
				if(isset($_SESSION['shortlist'])) {
					if ( in_array($id, $_SESSION['shortlist']) ) {
						$selected = 'selected';
					}
				}
			?>

				<li id="<?php the_ID(); ?>" class="item <?php echo $selected; ?>">
					<img src="http://placehold.it/180x120/f0f7fd/428bca&text=<?php the_title(); ?>" alt="">						
					<a href="#" class="btn action add" data-action="add"><span class="glyphicon glyphicon-plus-sign"></span> Add</a>
					<a href="#" class="btn action remove" data-action="remove"><span class="glyphicon glyphicon-minus-sign"></span> Remove</a>
					<a href="#" class="btn selected"><span class="glyphicon glyphicon-ok-sign"></span> </a>
				</li>
				
			<?php endwhile; ?>

			</ul>
 
		<?php else : ?>
			<p>No items found.</p>
		<?php endif; ?>

		</div><!-- #content -->

<?php get_footer(); ?>