// Main Module
(function() {
    var SECTION_HREF_REGEX = /\#\/(\w+)/;
    var $body = $('html, body');

    function slideTo(scrollTop) {
        $body.animate({
            scrollTop: scrollTop,
        }, 1000, 'easeInOutExpo');
    }

    function doHashNavigation() {
        var match, section, hash = window.location.hash;
        if (match = hash.match(SECTION_HREF_REGEX)) {
            section = $('section#' + match[1]).get(0);
            if (section) {
                slideTo($(section).offset().top);
            }
        }
    }

    function hookUpLearnMoreScrolling() {
        $('.learn-more').click(function() {
            slideTo($('section#about').offset().top);
        });
    }

    function doIntroAnimation() {
        setTimeout(function() {
            $('#splash .stars').removeClass('concealed');
        }, 0);
        setTimeout(function() {
            $('#splash .clouds').removeClass('concealed');
        }, 250);
        setTimeout(function() {
            $('#splash .info').removeClass('concealed');
        }, 750);
        setTimeout(function() {
            $('#splash .learn-more').removeClass('concealed');
        }, 1250);
    }

    function makeAboutBackground() {
        var $about = $('section#about'),
            aboutWidth = $about.width(),
            aboutHeight = $about.height(),
            trianglifier = new Trianglify({
                x_gradient: ['#9e1b34', '#white', '#white']
            }),
            pattern = trianglifier.generate(
                aboutWidth,
                aboutHeight
            );
        // Set the background of the div
        $about.css('backgroundImage', pattern.dataUrl);
    }

    function makeCalendarBackground() {
        var $calendar = $('section#calendar'),
            calendarWidth = $calendar.width(),
            calendarHeight = $calendar.height(),
            trianglifier = new Trianglify({
                x_gradient: ['#9e1b34', '#gray', '#9e431b']
            }),
            pattern = trianglifier.generate(
                calendarWidth,
                calendarHeight
            );
        // Set the background of the div
        $calendar.css('backgroundImage', pattern.dataUrl);
    }

    function makeContactBackground() {
        var $contact = $('section#contact'),
            contactWidth = $contact.width(),
            contactHeight = $contact.height(),
            trianglifier = new Trianglify({
                x_gradient: ['#9e1b34', '#black', '#9e1b76']
            }),
            pattern = trianglifier.generate(
                contactWidth,
                contactHeight
            );
        // Set the background of the div
        $contact.css('backgroundImage', pattern.dataUrl);
    }

    function setupGoogleMap() {
        function initialize() {
            var center = {
                lat: 39.981454,
                lng: -75.153335
            };

            var mapOptions = {
                center: center,
                zoom: 16,
                scrollwheel: false,
                navigationControl: false,
                mapTypeControl: false,
                scaleControl: false,
                streetViewControl: false,
                disableDefaultUI: true,
                draggable: false
            };
            var map = new google.maps.Map(document.getElementById('google-map'), mapOptions);
            // Make sure the map stays centered
            google.maps.event.addDomListener(window, 'resize', function() {
                map.setCenter(center);
            });
            // To add the marker to the map, use the 'map' property
            var marker = new google.maps.Marker({
                position: {
                    lat: 39.981454,
                    lng: -75.153335
                },
                map: map,
                title: 'Hello World!'
            });
        }
        google.maps.event.addDomListener(window, 'load', initialize);
        // Check if we're in safari
        var isSafari = /Safari/.test(navigator.userAgent) && /Apple Computer/.test(navigator.vendor);
        if (isSafari) {
            // Handle safari's chicken shit
            $('.map .overlay').addClass('safari');
        }
    }

    $(function() {
        if ('onhashchange' in window) {
            $(window).bind('hashchange', doHashNavigation);
        }

        if (!Modernizr.flexbox) {
            $('section#about .cutoff').addClass('shimmed');
        }

        // Paint the geometric backgrounds
        makeAboutBackground();
        makeContactBackground();
        makeCalendarBackground();
        // Start the intro animation
        doIntroAnimation();
        // Get the map up
        setupGoogleMap();
        // Make the learn more button scroll
        hookUpLearnMoreScrolling();
    });
})();
