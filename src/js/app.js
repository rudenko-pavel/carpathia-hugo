// $(document).foundation();

$(document).ready(function() {

  var CarpathiaEvents = undefined;

  if($("#fullpage").length ) {
    var header = $('#fullpage #main-header'),
      isMobile = $(window).width() < 640,
      headerHeight = header.height(),
      fpSettings = {
          //Navigation
          anchors:['home', 'about', 'suites', 'hireus', 'joinus'],
          // navigationPosition: 'right',
          // navigationTooltips: ['firstSlide', 'secondSlide'],
          showActiveTooltip: true,
          slidesNavigation: false,
          // navigation: false,
          // slidesNavPosition: 'bottom',
          // autoScrolling: false,
          fitToSection: !isMobile,
          paddingTop: '0',
          paddingBottom: '0',
          // fixedElements: '#main-header.fixed',

          afterLoad: function(anchorText, index) {
            $('[data-menuanchor]').removeClass('active');
            $('[data-menuanchor="' + anchorText + '"]').addClass('active');
          },
          onLeave: function(index, nextIndex, direction){
            console.log("Next slide index = ", nextIndex);

            if( nextIndex > 1 ) {
              let winH = $(window).height(),
                offset = winH * ( nextIndex - 2 ),
                val = "calc(4rem + " + offset + "px)";

              header.addClass('fixed');
              header.find('.main-header-inner').css({
                transform: "translateY(" + val + ")",
                "-webkit-transform": "translateY(" + val + ")",
                "-moz-transform": "translateY(" + val + ")",
                "-o-transform": "translateY(" + val + ")"
              });
            } else {
              let offset = 0;
              header.removeClass('fixed');
              header.find('.main-header-inner').css({
                transform: "translateY(" + offset + "px)",
                "-webkit-transform": "translateY(" + offset + "px)",
                "-moz-transform": "translateY(" +  + "px)",
                "-o-transform": "translateY(" + offset + "px)"
              });
            }
          },
          onSlideLeave: function(anchorLink, index, slideIndex, direction, nextSlideIndex){
            $('[href^="#' + anchorLink + '/"]').parent().removeClass('active');
            $('[href="#' + anchorLink + '/' + nextSlideIndex + '"]').parent().addClass('active');
          }
      };
    $('#fullpage').fullpage(fpSettings);

    $(window).bind("scroll", function(){
      var offset = $(window).scrollTop(),
        wHeight = $(window).height();

      // console.log("scrolling!");

      if (offset >= (wHeight - headerHeight) && !header.hasClass('fixed')) {
        header.addClass('fixed');
      } else if ( offset < (wHeight - headerHeight) && header.hasClass('fixed') ) {
        header.removeClass('fixed');
      }
    })

  }

  $(document).foundation();

  $('#offCanvas').click(function(){
    $(this).foundation('toggle');
  })


})
