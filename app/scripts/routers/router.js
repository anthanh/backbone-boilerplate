define([
  // Application.
  'app'
],

function(app) {

    // Defining the application router, you can attach sub routers here.
    var Router = Backbone.Router.extend({
        routes: {
            '': 'index'
        },

        index: function() {
            app.main.show(app.factory.view.create({view: 'PlayGroundView'}));
            app.vent.trigger('route', {route: 'playground'});
        }
    });

    var _lastRoute = '';
    app.vent.on('route', function(args) {
        console.info(args);
        sessionStorage.setItem('route', JSON.stringify(args));
        _lastRoute = args.route;
    });

    app.vent.on('logout', function() {
        console.debug('logout.session.destroy');
        app.session.destroy();
    });

    var gatekeeper = function() {
        var promise = $.Deferred();
        var user = app.session.getUser();
        if (user) {
            console.debug('gatekeeper.logged.cached');
            console.debug('compruebo q tiene perfil');
            app.api.getProfile().fail(function (jqXHR) {
                console.debug(jqXHR.status);
                if(jqXHR.status === 404) {
                    app.router.navigate('#/wizard');
                }
                return promise.reject(jqXHR);
            }).done(function () {
                app.session.setUser(user);
                return promise.resolve(user);
            });
            return promise;

        } else {
            if (app.common.gatekeeper) {
                app.api.isLogged().done(function(data) {
                    console.debug('gatekeeper.logged.not.cached');
                    app.session.setUser(data);
                    console.debug('compruebo q tiene perfil');
                    app.api.getProfile().fail(function (jqXHR) {
                        console.debug(jqXHR.status);
                        if(jqXHR.status === 404) {
                            app.router.navigate('#/wizard');
                        }
                        return promise.reject(jqXHR);
                    }).done(function () {
                        return promise.resolve(data);
                    });
                }).fail(function(jqXHR) {
                    console.debug('gatekeeper.not.logged');
                    app.router.navigate('#/login');
                    return promise.reject(jqXHR);
                });
                return promise;
            } else {
                return promise.resolve(app.factory.model.create({model:'User'}));
            }
        }
    };

    return Router;

});