$(document).ready(function (){
  scaleVideoContainer();

  initBannerVideoSize('.video-container .poster img');
  initBannerVideoSize('.video-container .filter');
  initBannerVideoSize('.video-container video');

  $(window).on('resize', function() {
      scaleVideoContainer();
      scaleBannerVideoSize('.video-container .poster img');
      scaleBannerVideoSize('.video-container .filter');
      scaleBannerVideoSize('.video-container video');
  });  
});

function scaleVideoContainer() {

    var height = $(window).height() + 5;
    var unitHeight = parseInt(height) + 'px';
    $('.homepage-hero-module').css('height',unitHeight);

}

function initBannerVideoSize(element){

    $(element).each(function(){
        $(this).data('height', $(this).height());
        $(this).data('width', $(this).width());
    });

    scaleBannerVideoSize(element);

}

function scaleBannerVideoSize(element){

    var windowWidth = $(window).width(),
    windowHeight = $(window).height() + 5,
    videoWidth,
    videoHeight;

    console.log(windowHeight);

    $(element).each(function(){
        var videoAspectRatio = $(this).data('height')/$(this).data('width');

        $(this).width(windowWidth);

        if(windowWidth < 1000){
            videoHeight = windowHeight;
            videoWidth = videoHeight / videoAspectRatio;
            $(this).css({'margin-top' : 0, 'margin-left' : -(videoWidth - windowWidth) / 2 + 'px'});

            $(this).width(videoWidth).height(videoHeight);
        }

        $('.homepage-hero-module .video-container video').addClass('fadeIn animated');

    });
}

/**
 * Listen to scroll to change header opacity class
 */
function checkScroll(){
    var height = $(window).height() - 10;
    var unitHeight = parseInt(height) + 'px';

    if($(window).scrollTop() > height){
        $('.navbar').addClass("scrolled");
    }else{
        $('.navbar').removeClass("scrolled");
    }
}

if($('.navbar').length > 0){
    $(window).on("scroll load resize", function(){
        checkScroll();
    });
}

function initMap() {
   // create a LatLng object containing the coordinate for the center of the map
  var latlng = new google.maps.LatLng(43.28087, -86.230107);

  // style the map
  var customMapType = new google.maps.StyledMapType([
        {
          stylers: [
            {hue: '#67b6d2'},
            {weight: 0.5}
          ]
        },
        {
          elementType: 'labels',
          stylers: [{visibility: 'on'}]
        }
      ], {
        name: 'Custom Style'
    });
    var customMapTypeId = 'custom_style';

  // prepare the map properties
  var options = {
    zoom: 15,
    center: latlng,
    mapTypeControlOptions: {
        mapTypeIds: [google.maps.MapTypeId.ROADMAP, customMapTypeId]
      },
    navigationControl: true,
    mapTypeControl: false,
    scrollwheel: false,
    disableDoubleClickZoom: true
  };

  // initialize the map object
  var map = new google.maps.Map(document.getElementById('google_map'), options);

  // add Marker
  var marker1 = new google.maps.Marker({
    position: latlng, map: map, icon: 'http://sleepingbeardesign.github.io/steak-n-egger/img/marker-google.png',
  });

  // add listener for a click on the pin
  google.maps.event.addListener(marker1, 'click', function() {
    infowindow.open(map, marker1);
  });

  // add information window
  var infowindow = new google.maps.InfoWindow({
    content:  '<div class="info"><strong>Steak \'N Egger</strong><br><br>1535 Holton Rd,<br>Muskegon, MI 49445<br><a target="_blank" href="https://goo.gl/maps/roXSyogoZVq">Directions</a></div>'
  });
  map.mapTypes.set(customMapTypeId, customMapType);
  map.setMapTypeId(customMapTypeId);
}