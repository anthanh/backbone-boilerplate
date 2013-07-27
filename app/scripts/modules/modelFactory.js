define([
    'app'
], function(
    app
) {
    'use_strict';

    var models = {};

    var factory = {
        create: function(args) {
            var Model = models[args.model];
            console.debug('modelFactory.create' + JSON.stringify(args));
            return new Model(args.options);
        },
        get: function(args) {
            console.debug('modelFactory.get' + JSON.stringify(args));
            return models[args];
        }
    };

    app.addInitializer(function() {
        app.factory.model = factory;
    });

    return factory;

});
