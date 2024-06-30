
//===========================//
//        header-hover       //  // 1200px~
//===========================//


$(".pc_menu_li").on('mouseenter', function(){
    $('#'+$(this).data('id')).css({
      visibility: "visible",
      opacity: '1',
    });
});
$(".pc_menu_li").on('mouseleave', function(){
  $('#'+$(this).data('id')).css({
    visibility: "hidden",
    opacity: '0',
  });
});

$(".nav-hover-menu").on('mouseenter', function(){
  $(this).css({
    visibility: "visible",
    opacity: '1',
  });
});
$(".nav-hover-menu").on('mouseleave', function(){
  $(this).css({
    visibility: "hidden",
    opacity: '0',
  });
});



//===========================//
//    header-hidden-menu     //  // ~1200px
//===========================//

$("a.mb_menu_li").on('click', function(e){
    e.preventDefault();
    $('#'+$(this).data('id')).toggleClass("show-inner-menu");
});

$(".turn-back-btn").click(function (e) {
  e.preventDefault();
  $("#nav-menu ul").removeClass("show-inner-menu");
});

var forEach = function (t, o, r) {
  if ("[object Object]" === Object.prototype.toString.call(t))
    for (var c in t)
      Object.prototype.hasOwnProperty.call(t, c) && o.call(r, t[c], c, t);
  else for (var e = 0, l = t.length; l > e; e++) o.call(r, t[e], e, t);
};
var hamburgers = document.querySelectorAll(".hamburger");
if (hamburgers.length > 0) {
  forEach(hamburgers, function (hamburger) {
    hamburger.addEventListener(
      "click",
      function () {
        this.classList.toggle("is-active");
      },
      false
    );
  });
}


$(".hamburger").click(function (e) {
  e.preventDefault();
  $("header").toggleClass("active");
  $("body").toggleClass("lock");
  $("#nav-menu").toggleClass("show-menu");
  $("#menu-cover").toggleClass("d-block");
});


//=====================//
//       lightbox      //
//=====================//

 //// lightbox-search
 $("header a#search").on("click", function (e) {
    e.preventDefault();
    $("#search_lightbox").addClass("active");
    $("body").addClass("lock");
  });
  $("#search_lightbox .close, #search_lightbox .cover").on("click", function () {
    $("#search_lightbox").removeClass("active");
    $("body").removeClass("lock");
  });

  //// choosebox
  $("#choose-box .option").on("click", function (e) {
    $(".option").removeClass("active");
    $(e.currentTarget).addClass("active");
  });
  
  $("#viewpoint-box-btn").on("click", function (e) {
    $("#viewpoint-box,#fund-info-box").removeClass("d-none");
    $("#fund-info-box").addClass("d-none");
  });
  
  $("#fund-info-box-btn").on("click", function (e) {
    $("#fund-info-box,#viewpoint-box").removeClass("d-none");
    $("#viewpoint-box").addClass("d-none");
  }); 


   //// lightbox-copyright
   $("footer .footer_bottom .content .left span").on("click", function () {
    $("#copyright_lightbox").addClass("active");
    $("body").addClass("lock");
  });
  $("#copyright_lightbox .close, #copyright_lightbox .cover").on("click", function () {
    $("#copyright_lightbox").removeClass("active");
    $("body").removeClass("lock");
  });
  
  //// lightbox-pageinfo
  $("a#pageinfo-btn").on("click", function (e) {
    $("#pageinfo_lightbox").addClass("active");
    $("body").addClass("lock");
    e.preventDefault();
  });
  $("#pageinfo_lightbox .close, #pageinfo_lightbox .cover").on("click", function () {
    $("#pageinfo_lightbox").removeClass("active");
    $("body").removeClass("lock");
  });

  //// lightbox-privacy
  $("a#privacy-btn").on("click", function (e) {
    $("#privacy_lightbox").addClass("active");
    $("body").addClass("lock");
    e.preventDefault();
  });
  $("#privacy_lightbox .close, #privacy_lightbox .cover").on("click", function () {
    $("#privacy_lightbox").removeClass("active");
    $("body").removeClass("lock");
  });

// ============================================================  
// =========================== KV RWD =========================
// ============================================================  

let screenWidth;

// KV SwitchBox RWD
$(window).on('load resize',function(){
                
  let kvBanners = document.querySelectorAll('#kv .kv_switch');
  screenWidth = $(window).width();

  for (let i = 0; i < kvBanners.length; i++) {
      let target = kvBanners[i];
      let pcSize = $(target).data('pc_banner');
      let mobileSize = $(target).data('mobile_banner');

      if (screenWidth > 768) {  
          $(target).css('background-image', `url(${pcSize})`)
      } else {
          $(target).css('background-image', `url(${mobileSize})`)
      }
  }
  
})

// KV RWD
$(window).on('load resize',function(){
    let oneKvBanner = document.getElementById('kv');
    screenWidth = $(window).width();
    
    let target = oneKvBanner;
    let pcSize = $(target).data('pc_banner');
    let mobileSize = $(target).data('mobile_banner');

    if (screenWidth > 768) {  
        $(target).attr('style', `background-image: url(${pcSize});`)
    } else {
        $(target).attr('style', `background-image: url(${mobileSize});`)
    }
    
})

$(window).on('load resize',function(){
    let twoKvBanner = document.querySelectorAll('.kv');
    screenWidth = $(window).width();
    
    for (let i = 0; i < twoKvBanner.length; i++) {
        let target = twoKvBanner[i];
        let pcSize = $(target).data('pc_banner');
        let mobileSize = $(target).data('mobile_banner');

        if (screenWidth > 768) {  
            $(target).attr('style', `background-image: url(${pcSize});`)
        } else {
            $(target).attr('style', `background-image: url(${mobileSize});`)
        }
    }
})

  // //// header hover menu - about us
// $("a#about-us-hbtn,#about-us-hmenu.nav-hover-menu").on(
//   "mouseenter",
//   function () {
//     $("#about-us-hmenu.nav-hover-menu").css({
//       visibility: "visible",
//       opacity: "1",
//     });
//     $("a#about-us-hbtn").css({ "border-color": "#DE6106" });
//   }
// );

// $("a#about-us-hbtn,#about-us-hmenu.nav-hover-menu").on(
//   "mouseleave",
//   function () {
//     $("#about-us-hmenu.nav-hover-menu").css({
//       opacity: "0",
//       visibility: "hidden",
//     });
//     $("a#about-us-hbtn").css({ "border-color": "transparent" });
//   }
// );

// //// header hover menu - invest cate
// $("a#invest-cate-hbtn,#invest-cate-hmenu.nav-hover-menu").on(
//   "mouseenter",
//   function () {
//     $("#invest-cate-hmenu.nav-hover-menu").css({
//       visibility: "visible",
//       opacity: "1",
//     });
//     $("a#invest-cate-hbtn").css({ "border-color": "#DE6106" });
//   }
// );

// $("a#invest-cate-hbtn,#invest-cate-hmenu.nav-hover-menu").on(
//   "mouseleave",
//   function () {
//     $("#invest-cate-hmenu.nav-hover-menu").css({
//       opacity: "0",
//       visibility: "hidden",
//     });
//     $("a#invest-cate-hbtn").css({ "border-color": "transparent" });
//   }
// );

// //// header hover menu - market
// $("a#market-hbtn,#market-hmenu.nav-hover-menu").on("mouseenter", function () {
//   $("#market-hmenu.nav-hover-menu").css({
//     visibility: "visible",
//     opacity: "1",
//   });
//   $("a#market-hbtn").css({ "border-color": "#DE6106" });
// });

// $("a#market-hbtn,#market-hmenu.nav-hover-menu").on("mouseleave", function () {
//   $("#market-hmenu.nav-hover-menu").css({ opacity: "0", visibility: "hidden" });
//   $("a#market-hbtn").css({ "border-color": "transparent" });
// });

// //// header hover menu - invest info
// $("a#invest-info-hbtn,#invest-info-hmenu.nav-hover-menu").on(
//   "mouseenter",
//   function () {
//     $("#invest-info-hmenu.nav-hover-menu").css({
//       visibility: "visible",
//       opacity: "1",
//     });
//     $("a#invest-info-hbtn").css({ "border-color": "#DE6106" });
//   }
// );

// $("a#invest-info-hbtn,#invest-info-hmenu.nav-hover-menu").on(
//   "mouseleave",
//   function () {
//     $("#invest-info-hmenu.nav-hover-menu").css({
//       opacity: "0",
//       visibility: "hidden",
//     });
//     $("a#invest-info-hbtn").css({ "border-color": "transparent" });
//   }
// );

// //// header hover menu - fund info
// $("a#fund-info-hbtn,#fund-info-hmenu.nav-hover-menu").on(
//   "mouseenter",
//   function () {
//     $("#fund-info-hmenu.nav-hover-menu").css({
//       visibility: "visible",
//       opacity: "1",
//     });
//     $("a#fund-info-hbtn").css({ "border-color": "#DE6106" });
//   }
// );

// $("a#fund-info-hbtn,#fund-info-hmenu.nav-hover-menu").on(
//   "mouseleave",
//   function () {
//     $("#fund-info-hmenu.nav-hover-menu").css({
//       opacity: "0",
//       visibility: "hidden",
//     });
//     $("a#fund-info-hbtn").css({ "border-color": "transparent" });
//   }
// );

// //// header hover menu - news
// $("a#news-hbtn,#news-hmenu.nav-hover-menu").on("mouseenter", function () {
//   $("#news-hmenu.nav-hover-menu").css({ visibility: "visible", opacity: "1" });
//   $("a#news-hbtn").css({ "border-color": "#DE6106" });
// });

// $("a#news-hbtn,#news-hmenu.nav-hover-menu").on("mouseleave", function () {
//   $("#news-hmenu.nav-hover-menu").css({ opacity: "0", visibility: "hidden" });
//   $("a#news-hbtn").css({ "border-color": "transparent" });
// });
