define([
    'app',

    'views/modal',
    'views/playground/playground'
], function(
    app,

    ModalView,
    PlayGroundView

) {
    'use_strict';

    var views = {
        'PlayGroundView': PlayGroundView
    };

    var factory = {
        create: function(args) {
            var View = views[args.view];
            console.debug('viewFactory.create' + JSON.stringify(args));
            return new View(args.options);
        },
        get: function(args) {
            console.debug('viewFactory.get' + JSON.stringify(args));
            return views[args];
        }
    };

    app.addInitializer(function() {
        app.factory.view = factory;

    });

    return factory;

});
