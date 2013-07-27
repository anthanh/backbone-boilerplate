/* globals define */
define([], function() {
    'use_strict';

    var user = null;
    var token = null;
    var profile = null;

    var session = {

        initialize: function() { },

        create: function(data, remember) {
            if (remember) {
                console.debug('session.create (remember) ' + remember);
            }
            user = data;
            console.debug('session.create (user): ' + JSON.stringify(user));
            console.debug(user);
            return this;
        },

        setUser: function(data) {
            console.debug('session.setUser (user): ' + JSON.stringify(data));
            console.debug(data);
            user = data;

            return this;
        },

        getUser: function() {
            console.debug('session.getUser: ' + JSON.stringify(user));
            console.debug(user);
            return user;
        },

        destroy: function() {
            user = null;
            token = null;
            profile = null;

            return this;
        },

        getUserId: function() {
            return user.id;
        }

    };

    return session;

});