<?php get_header(); ?>
<main class="site-body">
    <div class="site-body__2col container-md">
      <div class="primary">
        <div class="primary__inner">
          <article class="blog">
            <div class="blog__date"><time datetime="<?php echo get_the_date() ?>"><?php echo mysql2date('Y年n月j日', $post->post_date); ?></time></div>
            <h1 class="blog__title"><?php the_title();?></h1>
            <div class="blog__content">
            <?php
              if(have_posts()){
                while(have_posts()){
                  the_post();
                  the_content();
                }
              } ?>
            </div>
          </article>
        </div>
        <?php if( get_previous_post()|| get_next_post()): ?>
        <div class="pager">
          <ul class="article-pager">
            <li class="article-pager__prev"><?php previous_post_link('%link','前の記事へ'); ?></li>
            <li class="article-pager__next"><?php next_post_link('%link','次の記事へ'); ?></li>
          </ul>
        </div>
        <?php endif; ?>
      </div>
      <?php get_sidebar(); ?>
    </div>
  </main>
<?php get_footer(); ?>