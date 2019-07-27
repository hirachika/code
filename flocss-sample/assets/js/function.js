//tab
$(function() {
  $('#tab li:first-child').addClass('active');
  $('#tab-list li').click(function() {
    var index = $('#tab-list li').index(this);
    $('#tab-list li').removeClass('active');
    $(this).addClass('active');
    $('#tab li').removeClass('active').eq(index).addClass('active'); 
  });
});

$(function() {
  $('#tab2 li:first-child').addClass('active');
  $('#tab-list2 li').click(function() {
    var index = $('#tab-list2 li').index(this);
    $('#tab-list2 li').removeClass('active');
    $(this).addClass('active');
    $('#tab2 li').removeClass('active').eq(index).addClass('active'); 
  });
});

//scroll
$(function() {
    var topBtn = $('.link-area');
    topBtn.hide();
    $(window).scroll(function () {
        if ($(this).scrollTop() > 700) {
            topBtn.fadeIn();
        }else if ($(this).scrollTop() > 0){
            topBtn.fadeOut();
        }else{
            topBtn.fadeOut();
        }
    });
    // //スクロールしてトップ
    // topBtn.click(function () {
    //     $('body,  html').animate({
    //         scrollTop: 0
    //     },   500);
    //     return false;
    // });
});

var timeoutId ;
window.addEventListener( 'scroll', function () {
  // スクロールを停止して500ms後に終了とする
  clearTimeout( timeoutId ) ;

  timeoutId = setTimeout( function () {
    $('.link-area').hide();
  }, 500 ) ;
} ) ;