<?php get_header(); ?>
<main class="site-body">
    <div class="site-body__2col container-md">
      <div class="primary">
        <div class="primary__inner">
          <div class="blog">
            <div class="blog__date"><time datetime="<?php echo get_the_date('Y-m-d') ?>"><?php echo mysql2date('Y年n月j日', $post->post_date); ?></time></div>
            <h1 class="blog__title"><?php the_title();?></h1>
            <?php 
            $post_tags = get_the_tags();
              if ( $post_tags ) {
                echo '<div class="tags">';
                foreach ( $post_tags as $tag ) {
                  echo '<div class="tags__list">'.$tag->name.'</div>';
                }
                echo '</div>';
              }
            ?>
            <div class="blog__content">
            <?php
              if(have_posts()){
                while(have_posts()){
                  the_post();
                  the_content();
                }
              } ?>
            </div>
            <!-- <h2>よかったらシェアしてください♪</h2>
            <div class="sns">
              <a class="sns__twitter" href="https://twitter.com/share?url=<?php echo get_the_permalink();?>&text=<?php echo get_the_title();?>" target="_blank" rel="nofollow noopener"><i class="fab fa-twitter-square"></i></a>
              <a class="sns__facebook" href="http://www.facebook.com/share.php?u=<?php echo get_the_permalink(); ?>" target="_blank" rel="nofollow noopener"><i class="fab fa-facebook-square"></i></a>
              <a class="sns__line" href="https://social-plugins.line.me/lineit/share?url=<?php echo get_the_permalink(); ?>" target="_blank" rel="nofollow noopener"><i class="fab fa-line"></i></a>
            </div> -->
          </div>
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