//navigation
$(function() {
    var $header = $('#header');
    $(window).scroll(function() {
        if ($(window).scrollTop() > 350) {
            $header.addClass('fixed');
        } else {
            $header.removeClass('fixed');
        }
    });
    $('.headerButton').click(function(){
        $header.toggleClass('open');
    });
    $('.globalNavList li a').click(function(){
        $header.removeClass('open');
    });
});

//scroll
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
 