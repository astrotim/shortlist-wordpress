<!DOCTYPE html>
<html>
<head>
	<title><?php wp_title(); ?></title>
	<link href="//netdna.bootstrapcdn.com/bootstrap/3.0.0/css/bootstrap.min.css" rel="stylesheet">
	<link href="//netdna.bootstrapcdn.com/font-awesome/3.2.1/css/font-awesome.min.css" rel="stylesheet">
	<?php wp_head(); ?>
</head>
<body <?php body_class(); ?> data-count="<?php echo list_count(); ?>">

	<header> 
		<a href="<?php echo esc_url( home_url( '/' ) ); ?>">
		<h1 class="site-header"><?php bloginfo( 'name' ); ?></h1>
		</a>

		<nav class="navbar navbar-default" role="navigation"> 
			<ul class="nav navbar-nav">
			<?php wp_list_pages('title_li='); ?>
			</ul>
		</nav>
	</header>