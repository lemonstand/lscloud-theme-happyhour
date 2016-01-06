//
// Bones - Responsive Theme
// Theme Scripts
//

(function ($) {

  $(document).ready(function() {

    //
    // Link scroll animate on home page
    //
    $('#how-does-it-work').click(function(){
      $('html, body').animate({
          scrollTop: $( $.attr(this, 'href') ).offset().top
      }, 500);
      return false;
    });

    // 
    // Handle thumbnail clicks on the Product page
    //
    $('#product-page').on('click', 'div.product-image-grid ul a', function(){
      $('figure.big-image img', $(this).closest('.product-image-grid')).attr('src', this.href);

      return false;
    })

    //
    // Handle the Enter key in the Coupon field
    //
    $('#cart-content').on('keydown', 'input#coupon', function(ev) {
      if (ev.keyCode == 13) {
        $(this).sendRequest('shop:cart', {
          update: {'#cart-content': 'shop-cart-content', '#mini-cart': 'shop-minicart'},
          extraFields: {'set_coupon_code': 1}
        });
      }
    }) 

    // 
    // Handle the Enter key in the Quantity field
    //
    $('#cart-content').on('keydown', 'input.quantity', function(ev) {
      if (ev.keyCode == 13) {
        $(this).sendRequest('shop:cart', {
          update: {'#cart-content': 'shop-cart-content', '#mini-cart': 'shop-minicart'}
        });
      }
    });

    $(document).on('change', '#payment_method', function() {
      $(this).sendRequest('shop:onUpdatePaymentMethod', {
        update: {'#payment_form' : 'partial-paymentform'},
      });
    })

    //
    // Handle the shipping option radio button clicks
    //
    $('#checkout-page').on('change', '#shipping-methods input', function(){
      // When the shipping method is shipping we want to update the 
      // order totals area on the Checkout page. The native Checkout 
      // action does all the calculations.
      $(this).sendRequest('shop:onCheckoutShippingMethod', {
        update: {'#checkout-totals': 'shop-checkout-totals', '#mini-cart':'shop-minicart'},
      })

    });

    //
    // Handle Checkbox copy-info button in checkout
    //
    $(document).on('click', '#copy_billing_to_shipping', function (){

      if($(this).is(':checked')) {
        $(".shipping-form").hide();

        $(this).sendRequest('shop:onCheckoutBillingInfo', {
          onAfterUpdate: function() {
            $(this).sendRequest('shop:onCopyBillingToShipping', {
              update: {'#checkout-page' : 'partial-checkout-address', '#mini-cart':'shop-minicart'},
              extraFields: {'nextStep': 'billing_info', 'doCheckout': 1, 'step': ''}
            });
          }
        });

      } else {
        $(".shipping-form").show();
      }

    });
    
    //
    // If copy-billing is checked, on ajax reload, prop checked and hide shipping form
    //
    $( document ).ajaxSuccess(function( event, request, settings ) { 
      if ( $( '#copy_billing_to_shipping' ).length ) { 
        $("#copy_billing_to_shipping").prop('checked', true);
        $(".shipping-form").hide();
      } 
    });

    $(document).on('click', '#product-add', function (){
      $(this).sendRequest('shop:onAddToCart', {
        update: {'#product-page' : 'partial-product', '#mini-cart' : 'shop-minicart'},
        onAfterUpdate: function() {
          $('#product-add').hide();
          $('#product-added').show();
        }
      });
    });

    $('.pChk').click(function() {
        if( $(this).is(':checked')) {
            $("#ProjectListButton").show();
        } else {
            $("#ProjectListButton").hide();
        }
    }); 

    //
    // Star Rating
    //
    $('.rating > span').click(function() {
        var currentId = $(this).attr('id');
        if ( currentId === 'hate' ) {
            $('#hate').addClass('select');
            $( '#dont-like, #ok, #like, #love' ).removeClass('select');
            $('.rating > p').text( 'I hate it' );
            $("#item_rating").val('1');
        }
        if ( currentId === 'dont-like' ) {
            $( '#hate, #dont-like' ).addClass('select');
            $( '#ok, #like, #love' ).removeClass('select');
            $('.rating > p').text( 'I don\'t like it' );
            $("#item_rating").val('2');
        }
        if ( currentId === 'ok' ) {
            $( '#hate, #dont-like, #ok' ).addClass('select');
            $( '#like, #love' ).removeClass('select');
            $('.rating > p').text( 'It\'s ok' );
            $("#item_rating").val('3');
        }
        if ( currentId === 'like' ) {
            $( '#hate, #dont-like, #ok, #like' ).addClass('select');
            $( '#love' ).removeClass('select');
            $('.rating > p').text( 'I like it' );
            $("#item_rating").val('4');
        }
        if ( currentId === 'love' ) {
            $( '#hate, #dont-like, #ok, #like, #love' ).addClass('select');
            $('.rating > p').text( 'I love it' );
            $("#item_rating").val('5');
        }
        console.log($('#item_rating').val());
    });

    //
    // Review Modal
    //
    $(function() {
      $("#modal-1").on("change", function() {
        if ($(this).is(":checked")) {
          $("body").addClass("modal-open");
          $(".modal-form-fade-screen").addClass("modal-fade-open");
          console.log("modal-1 activated!");
        } else {
          $("body").removeClass("modal-open");
          $(".modal-form-fade-screen").removeClass("modal-fade-open");
        }
      });
      $("#modal-2").on("change", function() {
        if ($(this).is(":checked")) {
          $("body").addClass("modal-open");
          $(".modal-view-fade-screen").addClass("modal-fade-open");
          console.log("modal-2 activated!");
        } else {
          $("body").removeClass("modal-open");
          $(".modal-view-fade-screen").removeClass("modal-fade-open");
        }
      });

      //
      // Change from view-review modal to write-review modal
      //
      $("#write-review-inview").on("click", function() {
        $(".modal-state:checked").prop("checked", false).change();
        $("#modal-1").prop("checked", true).change();
      })

      //
      // Change from Sign-Up modal to Sign-In modal and visa-versa
      //
      $("#sign-up-inview").on("click", function() {
        $(".modal-state:checked").prop("checked", false).change();
        $("#modal-2").prop("checked", true).change();
      })
      $("#sign-in-inview").on("click", function() {
        $(".modal-state:checked").prop("checked", false).change();
        $("#modal-1").prop("checked", true).change();
      })

      $(".modal-fade-screen, .modal-close").on("click", function() {
        $(".modal-state:checked").prop("checked", false).change();
      });

      $(".modal-inner").on("click", function(e) {
        e.stopPropagation();
      });
    });

    //
    // Handle mobile menu nav click
    //
    $(document).on('click', '.hamburger-dropdown', function (){
      $(this).toggleClass("active");
    });

  });
})(jQuery);