<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <meta name="description" content="" />
  <link rel="stylesheet" href="<?php echo get_template_directory_uri(); ?>/css/swiper.css">
  <?php wp_head(); ?>
  <!-- Global site tag (gtag.js) - Google Analytics -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-GBN11L7WT4"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());

    gtag('config', 'G-GBN11L7WT4');
  </script>
</head>
<body>
  <header class="page-header">
    <div class="page-header__inner container">
      <h1 class="page-header__title"><a href="<?php echo home_url(); ?>"><?php bloginfo('name'); ?></a></h1>
      <nav id="global-nav" class="global-nav">
      <?php wp_nav_menu( array(
        'theme_location'=>'main_menu', 
        'container'     =>'', 
        'menu_class'    =>'',
        'items_wrap'    =>'<ul id="menu-header-menu" class="global-nav__list">%3$s</ul>'));
      ?>
      </nav>
    </div>
  </header>