/*
Nest add to cart reference
https://wordpress.org/support/topic/ajax-add-to-cart-just-adding-1-item-instead-of-quantity-selected/
https://stackoverflow.com/questions/65793717/ajax-add-to-cart-for-simple-and-variable-products-on-woocommerce-single-products
https://quadlayers.com/woocommerce-ajax-add-to-cart/
*/
(function ($) {
    "use strict";
    jQuery(function($) {
    $(document).on('click', 'a.ajax_add_to_cart', function(e){
        e.preventDefault();
        var $thisbutton = $(this);
        var formData = new FormData();
        formData.append('add-to-cart', $thisbutton.attr( 'data-product_id' ));
        $( document.body ).trigger( 'adding_to_cart', [ $thisbutton, formData ] );
        $.ajax({
            url: wc_add_to_cart_params.wc_ajax_url.toString().replace( '%%endpoint%%', 'ace_add_to_cart' ),
            data: formData,
            type: 'POST',
            processData: false,
            contentType: false,
            complete: function( response ) {
                response = response.responseJSON;
                if ( ! response ) {
                    return;
                }
                if ( response.error && response.product_url ) {
                    window.location = response.product_url;
                    return;
                }
                if ( wc_add_to_cart_params.cart_redirect_after_add === 'yes' ) {
                    window.location = wc_add_to_cart_params.cart_url;
                    return;
                }
				$( document.body ).trigger( 'added_to_cart', [ response.fragments, response.cart_hash, $thisbutton ] );
				$(response.fragments.notices_html).appendTo('.cart_notice').delay(3000).fadeOut(300, function(){ $(this).remove();});
                window.stop();
			},
			dataType: 'json'
        });
    });
});  
}(jQuery));