define(["jquery", "backbone", "router", "bootstrap"], function($, Backbone, Router) {

    // Document On Ready Shit
    $(document).ready(function(){


        //// If you want one part of the site to "catch" when it reaches the top of the page on scroll
        //(function() {
        //    var $wnd = $(window),
        //        $header = $(".lang-selection-list");
        //    $wnd.on("scroll", function() {
        //        $header.css("top", Math.max(0, 165 - $wnd.scrollTop())+'px');
        //    });
        //})();

        //// Highlight the current Project Type based on the initial has upon site entrance
        var initialPath = window.location.hash;
        if (initialPath == '#shouldStart'){
            $('#shouldStartType').addClass('selected-project-type');
        } else if (initialPath == '#starting') {
            $('#startingType').addClass('selected-project-type');
        } else if (initialPath == '#started') {
            $('#startedType').addClass('selected-project-type');
        } else {
            $('#startingType').addClass('selected-project-type');
        }

        // Switch the highlighted project type based on hash changes once you're already in the site
        $(window).on('hashchange', function() {
            var path = window.location.hash;
            if (path == '#shouldStart'){
                $('#shouldStartType').addClass('selected-project-type');
                $('#startingType').removeClass('selected-project-type');
                $('#startedType').removeClass('selected-project-type');
            } else if (path == '#starting') {
                $('#startingType').addClass('selected-project-type');
                $('#shouldStartType').removeClass('selected-project-type');
                $('#startedType').removeClass('selected-project-type');
            } else if (path == '#started') {
                $('#startedType').addClass('selected-project-type');
                $('#shouldStartType').removeClass('selected-project-type');
                $('#startingType').removeClass('selected-project-type');
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
