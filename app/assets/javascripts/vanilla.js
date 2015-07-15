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
});