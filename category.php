<?php get_header() ;?>

<div class="cat_list">
    <?php
        $categories = get_categories();
        foreach ($categories as $category):
    ?>
    <h2><a href="<?php echo esc_url(get_category_link($category->term_id)); ?>"><?php echo $category->name; ?></a></h2>
    <!--ここにサブループを記述-->
    <?php endforeach; ?>
</div>

<?php get_footer() ;?>