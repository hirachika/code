// ハンバーガーメニュー
(function($) {
  var $body   = $('body');
  var $btn   = $('.toggleButton');
  var $mask  = $('#mask');
  var open   = 'open';
  // menu open close
  $btn.on( 'click', function() {
    if ( ! $body.hasClass( open ) ) {
      $body.addClass( open );
    } else {
      $body.removeClass( open );
    }
  });
  // mask close
  $mask.on('click', function() {
    $body.removeClass( open );
  });
} )(jQuery);

// スクロールアニメーション
$(function(){
  $('.content').addClass('move');
  $(window).scroll(function(){
    $(".content").each(function(){
      //対象要素が一番上まで来たか確認
      var content      = $(this).offset().top;   
      var scroll       = $(window).scrollTop();
      var windowHeight = $(window).height();
      if (scroll > content - windowHeight + windowHeight / 5){
        $(this).removeClass('move');
      }
      else {
        $(this).addClass('move');
      }
    });
  });
});
 