$(document).ready(function(){
    var isOpen = false;
    var inputBox = $('.searchbox-input');
    var searchBox = $('.searchbox');
    inputBox.focus(function(){
        if(!isOpen) {
            searchBox.addClass('searchbox-open');
            isOpen = true;
        }
    });
    inputBox.blur(function(){
        if(isOpen) {
            searchBox.removeClass('searchbox-open');
            isOpen = false;
        }
    });

    (function() {
        var $wnd = $(window),
            $header = $(".project-type-nav");
        $wnd.on("scroll", function() {
            $header.css("top", Math.max(0, 72 - $wnd.scrollTop()));
        });
    })();

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
