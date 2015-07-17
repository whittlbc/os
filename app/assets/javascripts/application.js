define(["backbone", "router"], function(Backbone, Router) {
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
