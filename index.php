<?php get_header(); ?>

		<div id="content" class="site-content" role="main">	

		<?php if ( have_posts() ) : ?>

			<?php while ( have_posts() ) : the_post(); ?>

				<?php if (!is_front_page()) : ?>
				<h2><?php the_title(); ?></h2>
				<?php endif; ?>
				<?php the_content(); ?>
				
			<?php endwhile; ?>
 
		<?php else : ?>
			<p>No posts found.</p>
		<?php endif; ?>

		</div><!-- #content -->

<?php get_footer(); ?>