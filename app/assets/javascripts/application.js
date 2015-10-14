define(['jquery',
    'backbone',
    'underscore',
    'router',
    'bootstrap',
    'backbone-eventbroker'
], function ($,
     Backbone,
     _,
     Router) {

    // Document On Ready Shit
    $(document).ready(function(){

        // Hide Header on on scroll down
        var didScroll;
        var lastScrollTop = 0;
        var delta = 5;
        var navbarHeight = $('header').outerHeight();

        var hasScrolled = function() {
            var st = $(this).scrollTop();

            // Make sure they scroll more than delta
            if(Math.abs(lastScrollTop - st) <= delta)
                return;

            // If they scrolled down and are past the navbar, add class .nav-up.
            // This is necessary so you never see what is "behind" the navbar.
            if (st > lastScrollTop && st > navbarHeight) {
                // Scroll Down
                $('header').removeClass('header-nav-down').addClass('header-nav-up');
                if (!$('footer').hasClass('footer-dropdown-shown')) {
                    $('footer').removeClass('footer-nav-down').addClass('footer-nav-up');
                }
            } else {
                // Scroll Up
                if(st + $(window).height() < $(document).height()) {
                    $('header').removeClass('header-nav-up').addClass('header-nav-down');
                    $('footer').removeClass('footer-nav-up').addClass('footer-nav-down');
                }
            }

            lastScrollTop = st;
        };

        $(window).scroll(function(event){
            didScroll = true;
        });

        setInterval(function() {
            if (didScroll) {
                hasScrolled();
                didScroll = false;
            }
        }, 250);


        //// Highlight the current Project Type based on the initial has upon site entrance
        var initialPath = window.location.hash;
        if (initialPath == '#up-for-grabs'){
            $('#upForGrabsType').addClass('selected-project-type');
        } else if (initialPath == '#on-the-fence') {
            $('#onTheFenceType').addClass('selected-project-type');
        } else if (initialPath == '#launched') {
            $('#launchedType').addClass('selected-project-type');
        } else {
            $('#onTheFenceType').addClass('selected-project-type');
        }

        // Switch the highlighted project type based on hash changes once you're already in the site
        $(window).on('hashchange', function() {
            var path = window.location.hash;
            if (path == '#up-for-grabs'){
                $('#upForGrabsType').addClass('selected-project-type');
                $('#onTheFenceType').removeClass('selected-project-type');
                $('#launchedType').removeClass('selected-project-type');
            } else if (path == '#on-the-fence') {
                $('#onTheFenceType').addClass('selected-project-type');
                $('#upForGrabsType').removeClass('selected-project-type');
                $('#launchedType').removeClass('selected-project-type');
            } else if (path == '#launched') {
                $('#launchedType').addClass('selected-project-type');
                $('#upForGrabsType').removeClass('selected-project-type');
                $('#onTheFenceType').removeClass('selected-project-type');
            }
        });

    });

    // Actual Backbone App
    var App = {};
    App.start = function() {
        new Router();
        Backbone.history.start();
    };

    App.csrfToken = $("meta[name='csrf-token']").attr('content');

    // Override Backbone.sync to add CSRF-TOKEN HEADER
    Backbone.sync = (function(original) {
        return function(method, model, options) {
            options.beforeSend = function(xhr) {
                xhr.setRequestHeader('X-CSRF-Token', App.csrfToken);
            };
            original(method, model, options);
        };
    })(Backbone.sync);

    App.start();

    return App;
});
