<section class="main-section page-section" id="story">
  <div class="main-section__inner container-md">
    <h2 class="page-section__title page-section__title--primary"><span>STORY</span>ブログやビジネス漫画を投稿しています♪</h2>
    <ul class="story-list">
    <?php if(have_posts()): while(have_posts()): the_post(); ?>
      <li class="story-list__card">
        <a href="<?php the_permalink(); ?>">
          <figure>
          <?php if( has_post_thumbnail() ): ?>
            <?php the_post_thumbnail('medium'); ?>
          <?php else: ?>
            <img src="<?php echo get_template_directory_uri(); ?>/images/no-image.gif" alt="no-img">
          <?php endif; ?>
          </figure>
          <div class="card-text">
            <time datetime="<?php echo get_the_date('Y-m-d') ?>"><?php echo mysql2date('Y年n月j日', $post->post_date); ?></time>
            <p><?php the_title(); ?></p>
            <?php 
            $post_tags = get_the_tags();
              if ( $post_tags ) {
                echo '<ul class="tags">';
                foreach ( $post_tags as $tag ) {
                  echo '<li class="tags__list">'.$tag->name.'</li>';
                }
                echo '</ul>';
              }
            ?>
          </div>
        </a>
      </li>
      <?php endwhile; endif; ?>
    </ul>
    <?php the_posts_pagination(
      array(
        'mid_size'      => 2, // 現在ページの左右に表示するページ番号の数
        'prev_next'     => true, // 「前へ」「次へ」のリンクを表示する場合はtrue
        'prev_text'     => __( '前へ'), // 「前へ」リンクのテキスト
        'next_text'     => __( '次へ'), // 「次へ」リンクのテキスト
        'type'          => 'list', // 戻り値の指定 (plain/list)
      )
    ); ?>
  </div>
</section>