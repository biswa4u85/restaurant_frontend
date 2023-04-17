/*
Template Name: Zomoto - Food Order Directory, Restaurants, Fast Food, Bars Mobile Template 
Author: Askbootstrap
Author URI: https://themeforest.net/user/askbootstrap
Version: 1.0
*/

(function($) {
  "use strict";

      // index_slider
      $(document).ready(function(){
        $('.index_slider').slick({
            infinite: true,
            arrows: false,
            slidesToShow: 1.2,
            slidesToScroll: 1,
            dots: true
        });
      });

      // yum_slider
      $(document).ready(function(){
        $('.yum_slider').slick({
            infinite: false,
            arrows: false,
            slidesToShow: 2.4,
            slidesToScroll: 1
        });
      });

      // new_slider
      $(document).ready(function(){
        $('.new_slider').slick({
            infinite: false,
            arrows: false,
            slidesToShow: 2,
            slidesToScroll: 1
        });
      });

      // fav_slider
      $(document).ready(function(){
        $('.fav_slider').slick({
            infinite: false,
            arrows: false,
            slidesToShow: 1,
            slidesToScroll: 0.3
        });
      });

      // featured slider
      $(document).ready(function(){
          $('.featured_slider').slick({
              infinite: false,
              arrows: false,
              slidesToShow: 1,
              slidesToScroll: 1,
              dots: true

          });
        });

      // near_slider
      $(document).ready(function(){
          $('.near_slider').slick({
              infinite: false,
              arrows: false,
              slidesToShow: 2.4,
              slidesToScroll: 2
          });
        });

      // card_slider
      $(document).ready(function(){
        $('.card_slider').slick({
            infinite: false,
            arrows: false,
            slidesToShow: 2.5,
            slidesToScroll: 2
        });
      });

      // pay_slider
      $(document).ready(function(){
        $('.pay_slider').slick({
            infinite: false,
            arrows: false,
            slidesToShow: 3.1,
            slidesToScroll: 2
        });
      });

      // nearyou_slider
      $(document).ready(function(){
        $('.nearyou_slider').slick({
            infinite: false,
            arrows: false,
            slidesToShow: 1.2,
            slidesToScroll: 1
        });
      });

      // detail_slider
      $(document).ready(function(){
          $('.detail_slider').slick({
              infinite: false,
              arrows: false,
              slidesToShow: 1,
              slidesToScroll: 1,
              dots: true
          });
      });

      // tabs_slider
      $(document).ready(function(){
          $('.tabs_slider').slick({
              infinite: false,
              arrows: false,
              slidesToShow: 4.2,
              slidesToScroll: 1,
          });
      });

      var $main_nav = $('#main-nav');
      var $toggle = $('.toggle');

      var defaultOptions = {
          disableAt: false,
          customToggle: $toggle,
          levelSpacing: 40,
          navTitle: 'Askbootstrap',
          levelTitles: true,
          levelTitleAsBack: true,
          pushContent: '#container',
          insertClose: 2
      };

        // call our plugin
      var Nav = $main_nav.hcOffcanvasNav(defaultOptions);

      $('.btn-plus, .btn-minus').on('click', function(e) {
        const isNegative = $(e.target).closest('.btn-minus').is('.btn-minus');
        const input = $(e.target).closest('.input-group').find('input');
        if (input.is('input')) {
          input[0][isNegative ? 'stepDown' : 'stepUp']()
        }
      });
      $(".add-btn").on('click',function(){
        var id = $(this).attr('data-id');
        $(this).hide();
        $('.view-cart').removeClass('d-none');
        $('.showme_'+id).removeClass('d-none');
      });

      $('.place-order-btn').click(function(){
        $('.success-box').removeClass('d-none');
      });
      $('.success-close-btn').click(function(){
        $('.success-box').addClass('d-none');
      });
      $('.takeout-btn').click(function(){
        var id=$(this).attr('id');
        $('.s-icon').addClass('d-none');
        $('.success'+id).removeClass('d-none');
      });

})(jQuery);