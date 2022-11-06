<?php

// ①ページネーションに現在のページ位置を知らせるのに必要
$paged = (int) get_query_var('paged');

$args = array(
  // get_option('posts_per_page') ← で管理画面で設定した、記事一覧で表示するページ数を取得
  'posts_per_page' => get_option('posts_per_page'),
  // (int) get_query_var('paged') ← で取得した、$pagedを挿入
  'paged' => $paged,
  'orderby' => 'post_date',
  'order' => 'DESC',
  'post_type' => 'post',
  'post_status' => 'publish'
);

// ②記事一覧のMaxページ数を取得するのに必要
$the_query = new WP_Query($args);

// 記事一覧のループスタート

if ( $the_query->have_posts() ) :
  while ( $the_query->have_posts() ) : $the_query->the_post();
?>

    <!-- ここにループを回して表示させるhtmlを -->
    <div>
      <h2><?php the_title(); ?></h2>
      <p><?php the_content();  ?></p>
    </div>

<?php

  endwhile;
endif;

// 記事一覧のループ終わり
wp_reset_postdata();

// ページネーション
$page_arg = array(
  'current' => max( 1, $paged ),
  'total' => $the_query->max_num_pages,
);

echo paginate_links($page_arg);

?>