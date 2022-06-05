<?php get_header(); ?>
<main class="site-body">
  <article class="site-body__container">
    <section class="main-section page-section" id="story">
      <div class="main-section__inner container-md">
        <h2 class="page-section__title page-section__title--primary"><span><?php the_title();?></span></h2>
        <?php the_content(); ?>
      </div>
    </section>
  </article>
</main>
<?php get_footer(); ?>