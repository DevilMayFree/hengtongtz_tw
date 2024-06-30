// ====================
// kv Swiper
// ====================
var kv = new Swiper("#kv_index .kv_box", {
  loop: true,
  slidesPerView: 1,
  spaceBetween: 0,
  allowTouchMove: true,
  autoplay: {
    delay: 3700,
    disableOnInteraction: false,
  },
  pagination: {
    el: "#kv_index .kv_box .swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: "#kv_index .kv_box .right",
    prevEl: "#kv_index .kv_box .left",
  },
});

// KV RWD
let screenWidthIndex;
let kvSlides = document.querySelectorAll('#kv_index .swiper-slide');

$(window).on('load resize',function(){

    screenWidthIndex = $(window).width();
    for (let i = 0; i < kvSlides.length; i++) {
        let target = kvSlides[i];
        let pcSize = $(target).data('pc_banner');
        let mobileSize = $(target).data('mobile_banner');

        if (screenWidthIndex > 768) {  
            $(target).attr('style', `background-image: url(${pcSize});`)
        } else {
            $(target).attr('style', `background-image: url(${mobileSize});`)
        }
    }
    
})

// ====================
// scroll_down
// ====================
$("#scroll_down").on("click", function () {
  sliderTo($("#about"));
});

// ====================
// master Swiper
// ====================
var master = new Swiper("#master .master_box", {
  //   loop: true,
  slidesPerView: 2,
  spaceBetween: "6%",
  breakpoints: {
    1024: {
      slidesPerView: 1,
      spaceBetween: 0,
    },
  },
  allowTouchMove: true,
  autoplay: {
    delay: 3700,
    disableOnInteraction: false,
  },
  pagination: {
    el: "#master .swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: "#master .to_right",
    prevEl: "#master .to_left",
  },
});

// ====================
// about-us Swiper
// ====================
var area = new Swiper("#about-us .itembox", {
  watchOverflow: true,
//   loop: true,
  slidesPerView: 3,
  spaceBetween: 30,
//   centeredSlides: true,
//   allowTouchMove: true,
  centerInsufficientSlides: true,
  
  breakpoints: {
    500: {
      slidesPerView: 1,
    },
    680: {
      slidesPerView: 2,
      spaceBetween: 10,
    },
    1200: {
      slidesPerView: 2,
    },
  },
  navigation: {
    nextEl: "#about-us .control .to_right",
    prevEl: "#about-us .control .to_left",
  },
});


// ====================
// area Swiper
// ====================
var area = new Swiper("#area .itembox", {
  loop: true,
  slidesPerView: 3.5,
  spaceBetween: 30,
  centeredSlides: true,
  allowTouchMove: true,
  breakpoints: {
    500: {
      slidesPerView: 1,
    },
    680: {
      slidesPerView: 2,
      spaceBetween: 10,
    },
    1024: {
      slidesPerView: 2,
    },
  },
  navigation: {
    nextEl: "#area .control .to_right",
    prevEl: "#area .control .to_left",
  },
});

//=====================//
//       lightbox      //
//=====================//
  $("#cookie_lightbox .close, #cookie_lightbox .cover,#agree-btn").on("click", function () {
    $("#cookie_lightbox").removeClass("active");
    $("body").removeClass("lock");
  });
  
  $("a#cookie-more-btn").on("click", function (e) {
    $("#cookie-warning,#cookie-rules").toggleClass("d-none");
    let status=$("a#cookie-more-btn").html();
    if(status==="管理"){
      $("a#cookie-more-btn").html("返回");
    }else{
      $("a#cookie-more-btn").html("管理");
    }
    e.preventDefault();
  });
  
  $("a#turn-back-cookie-btn").on("click", function (e) {
    $("#cookie-warning,#cookie-rules").toggleClass("d-none");
    // $("body").addClass("lock");
    e.preventDefault();
  });
  
  
  






