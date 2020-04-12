jQuery(document).ready(function($) {
  var sliderContainers = $('.cd-slider-wrapper');

  if (sliderContainers.length > 0) initBlockSlider(sliderContainers);

  function initBlockSlider(sliderContainers) {
    sliderContainers.each(function() {
      var sliderContainer = $(this),
        slides = sliderContainer.children('.cd-slider').children('li'),
        sliderPagination = createSliderPagination(sliderContainer);

      sliderPagination.on('click', function(event) {
        event.preventDefault();
        $('.meisjePopup').fadeOut(500);
        var selected = $(this),
          index = selected.index();
        updateSlider(index, sliderPagination, slides);
      });

      sliderContainer.on('swipeleft', function() {
        var bool = enableSwipe(sliderContainer),
          visibleSlide = sliderContainer.find('.is-visible').last(),
          visibleSlideIndex = visibleSlide.index();
        if (!visibleSlide.is(':last-child') && bool) {
          updateSlider(visibleSlideIndex + 1, sliderPagination, slides);
        }
      });

      sliderContainer.on('swiperight', function() {
        var bool = enableSwipe(sliderContainer),
          visibleSlide = sliderContainer.find('.is-visible').last(),
          visibleSlideIndex = visibleSlide.index();
        if (!visibleSlide.is(':first-child') && bool) {
          updateSlider(visibleSlideIndex - 1, sliderPagination, slides);
        }
      });
    });
  }

  function createSliderPagination(container) {
    var wrapper = $('<ol class="cd-slider-navigation"></ol>');
    container.children('.cd-slider').find('li').each(function(index) {
      var dotWrapper1 = (index == 0) ? $('<li class="selected"></li>') : $(''),
        dot1 = $('<a href="home"></a>').appendTo(dotWrapper1);
      dotWrapper1.appendTo(wrapper);
      var dotText1 = 'Home';
      dot1.text(dotText1);

      var dotWrapper2 = (index == 1) ? $('<li class=""></li>') : $(''),
        dot2 = $('<a href="projects"></a>').appendTo(dotWrapper2);
      dotWrapper2.appendTo(wrapper);
      var dotText2 = 'Blog';
      dot2.text(dotText2);

      var dotWrapper3 = (index == 2) ? $('<li class=""></li>') : $(''),
        dot3 = $('<a href="blog"></a>').appendTo(dotWrapper3);
      dotWrapper3.appendTo(wrapper);
      var dotText3 = 'Blog';
      dot3.text(dotText3);
    });
    wrapper.appendTo(container);
    return wrapper.children('li');
  }

  function updateSlider(n, navigation, slides) {
    navigation.removeClass('selected').eq(n).addClass('selected');
    slides.eq(n).addClass('is-visible').removeClass('covered').prevAll('li').addClass('is-visible covered').end().nextAll('li').removeClass('is-visible covered');

    //fixes a bug on Firefox with ul.cd-slider-navigation z-index
    navigation.parent('ul').addClass('slider-animating').on('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function() {
      $(this).removeClass('slider-animating');
    });
  }
  // window.history.pushState(null, projects, '/blog');

  function enableSwipe(container) {
    return (container.parents('.touch').length > 0);
  }

  // Meisje popup click function
  $('.meisje').click(function(event) {
    $('.meisjePopup').fadeIn(800);
  });
  // Meisje popup close function
  $('.close-button').click(function(event) {
    $('.meisjePopup').fadeOut(800);
  });
  // Meisje popup 'esc' key to close
  $(document).on('keydown', function(e) {
    if (e.keyCode === 27) { // ESC
      $('.meisjePopup').hide();
    }
  });
});

// avatar movement and its functions
// get the position of the mouse pointer within the page
$(document).mousemove(function(event) {
  // Round a number upward to it's nearest integer, find the width and height and divide it
  cx = Math.ceil($(window).width() / 1);
  cy = Math.ceil($(window).height() / 2);
  // Return the position of the mouse pointer
  dx = event.pageX - cx;
  dy = event.pageY - cy;

  tiltx = (dy / cy);
  tilty = -(dx / cx);
  radius = Math.sqrt(Math.pow(tiltx, 2) + Math.pow(tilty, 2));
  degree = (radius * 25);
  // make the head rotate and follow the mouse
  $('#head').css('-webkit-transform', 'rotate3d(' + -tiltx + ', ' + -tilty + ', 0, ' + degree + 'deg)');
  $('#head').css('transform', 'rotate3d(' + -tiltx + ', ' + -tilty + ', 0, ' + degree + 'deg)');
  $('#head').css('-ms-transform', 'rotate3d(' + -tiltx + ', ' + -tilty + ', 0, ' + degree + 'deg)');
});
// rotate through the svg to make the eye blink
function changeAnimState() {
  $(".eye-left").clone(true).insertBefore(".eye-left");
  $(".eye-left").last().remove();
  $(".eye-right").clone(true).insertBefore(".eye-right");
  $(".eye-right").last().remove();
}
// time between eye blinks
setInterval(changeAnimState, 3000);