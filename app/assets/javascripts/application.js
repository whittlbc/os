define(["jquery", "backbone", "router", "bootstrap"], function($, Backbone, Router) {

    // Document On Ready Shit
    $(document).ready(function(){

        var headerShadowOn = false;
        var headerShadow = '0 5px 8px 0 rgba(0, 0, 0, 0.075)';

        $(window).scroll(function () {
            var pos = $(window).scrollTop();
            if (pos < 5 && $('.header').css('box-shadow') != 'none') {
                $('.header').css('box-shadow', 'none');
            } else if (pos >= 5 && $('.header').css('box-shadow') != headerShadow) {
                $('.header').css('box-shadow', headerShadow);
            }
        });

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


        // CreateNewProjectPopup --> Set the top positioning
        // DO NOT FUCK WITH THESE NUMBERS
        var currentTopPos = 150; // just eyeballing from default Modal Positioning
        var createNewProjectModalHeight = 456;
        var createNewProjectModalMarginTop = ((window.innerHeight - createNewProjectModalHeight - currentTopPos) / 2);
        $('#createNewProjectModal').css('margin-top', createNewProjectModalMarginTop + 'px');
        $('#createNewProjectModalContentContainer').width(750);
        $('#createNewProjectModalContentContainer').css('left', '-75px');
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
