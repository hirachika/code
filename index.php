<?php get_header(); ?>
  <main class="site-body">
    <article class="site-body__container">
      <section class="main-section page-section" id="story">
        <div class="main-section__inner container-md">
          <h2 class="page-section__title page-section__title--primary"><span>STORY</span>最新話はこちらからご覧ください</h2>
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
                  <time datetime="<?php echo get_the_date() ?>"><?php echo mysql2date('Y年n月j日', $post->post_date); ?></time>
                  <p><?php the_title(); ?></p>
                </div>
              </a>
            </li>
          <?php endwhile; endif; ?>
        </div>
      </section>

      <section class="character-section page-section" id="character">
        <div class="character-section__inner">
          <h2 class="page-section__title"><span>CHARACTER</span>Web業界で働く愉快な仲間たち</h2>
          <div id="slide">
            <div class="swiper-container container-md">
              <ul class="swiper-wrapper characters">
                <!-- slide -->
                <li class="swiper-slide">
                  <div class="characters__desc">
                    <p class="characters__name">そうまゆい<br>相馬由依 / <span>Web Designer</span></p>
                    <p>紙デザインからWebに転身したWebデザイナー。<br>やりたいことがない代わりに、無駄を徹底排除する思考で「やりたくないことをやらないための努力を怠らない」という信念を持つ。</p>
                  </div>
                  <figure class="characters__img">
                    <img src="<?php echo get_template_directory_uri();?>/images/character01.jpg" alt="">
                  </figure>
                </li>
                <li class="swiper-slide">
                  <div class="characters__desc">
                    <p class="characters__name">すめらぎあずさ<br>皇梓 / <span>Web Designer</span></p>
                    <p>Webデザイナー3年目。目標高くストイックだが、典型的な抱え込み体質で誰かに頼るのが苦手。完璧主義者。前職では、女だからという理由で生優しくされたり、仕事を軽くされることに嫌悪感を抱き退職した。</p>
                  </div>
                  <figure class="characters__img">
                    <img src="<?php echo get_template_directory_uri();?>/images/character02.jpg" alt="">
                  </figure>
                </li>
                <li class="swiper-slide">
                  <div class="characters__desc">
                    <p class="characters__name">かしわぎはるか<br>柏木ハルカ / <span>Manager</span></p>
                    <p>由依と梓上司。デザインチームのマネージャーかつ、案件によってはプロジェクトマネージャーや人事を務める。数年前に大手企業を退職し、現在の会社の立ち上げからいる古株。ヘビースモーカー。</p>
                  </div>
                  <figure class="characters__img">
                    <img src="<?php echo get_template_directory_uri();?>/images/character03.jpg" alt="柏木ハルカ（かしわぎはるか）">
                  </figure>
                </li>
                <li class="swiper-slide">
                  <div class="characters__desc">
                    <p class="characters__name">うじはらしずか<br>氏原静加 / <span>Web Designer</span></p>
                    <p>梓と同期入社のWebデザイナー。梓と違って未経験入社かつ年下なので敬語を使っている。アルバイトでコーディングをしたことがあり、実装が得意。現在はデザインチームでデザインの修行中。時たま毒を吐く。</p>
                  </div>
                  <figure class="characters__img">
                    <img src="<?php echo get_template_directory_uri();?>/images/character04.jpg" alt="氏原静加（うじはらしずか）">
                  </figure>
                </li>
                <!-- /slide -->
              </ul>
              <div class="swiper-button-prev"></div><!-- 前のページ -->
              <div class="swiper-button-next"></div><!-- 次のページ -->
              <div class="swiper-pagination swiper-pagination-white"></div><!-- ページネーション(dots)-->
            </div>
        </div>
        </div>
      </section>

      <section class="profile-section" id="profile">
        <div class="profile-section__inner container-sm">
          <h2 class="page-section__title page-section__title--primary"><span>PROFILE</span>Web制作やってるフリーランスです</h2>
          <div class="profile-section__flex">
            <figure>
              <img src="<?php echo get_template_directory_uri();?>/images/profile_rame.jpg" alt="Rame らめ">
            </figure>
            <div class="profile-section__desc">
              <p class="profile-section__name">らめ<br>Rame</p>
              <p class="profile-section__txt">Web業界でWebデザイナー3年半、IT業界でフロントエンドエンジニア2年半を経験して、社畜あがりのフリーランスです。2021年2月に独立し、現在はWeb制作の仕事を生業としつつ、ゆるゆる漫画を描いています。</p>
              <ul class="profile-section__sns">
                <li><a href="https://www.instagram.com/ramechika12/?hl=ja" target="_blank">Instagram</a></li>
                <li><a href="https://twitter.com/rame24190329" target="_blank">twitter</a></li>
                <li><a href="https://note.com/ramechika12" target="_blank">note</a></li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </article>
  </main>
<?php get_footer(); ?>