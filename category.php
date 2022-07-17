<?php get_header() ;?>

<main class="site-body">
	<div class="container-md">
		<?php
		$cat = get_the_category();
		$catname = $cat[0]->cat_name;
		?>
		<h2 class="page-section__title page-section__title--primary"><span><?php echo $catname; ?></span></h2>

		<?php if(have_posts()): ?>
		<ul class="post-list">
			<?php while(have_posts()):the_post(); ?>
			<li class="post-list__card">
				<a href="<?php the_permalink(); ?>">
					<figure><?php the_post_thumbnail(); ?></figure>
					<div class="card-text">
						<time datetime="<?php echo get_the_date() ?>"><?php echo mysql2date('Y年n月j日', $post->post_date); ?></time>
						<p><?php the_title(); ?></p>
					</div>
				</a>
			</li>
			<?php endwhile; ?>
		</ul>
	
		<?php
			if (function_exists("pagination")) {
			pagination($wp_query->max_num_pages);
			}
		?>
		<?php endif; ?>
	</div>
</main>

<?php get_footer() ;?>