/* globals define */
define([
    'app',
    'jquery',
    'common',
    'i18next',
    'moment',
    'numeral'
], function(app, $, common, i18n, moment, numeral) {
    'use_strict';

    var locale = {

        initialize: function(lang) {
            console.debug('locale.initialize.lang: ' + lang);
            $.i18n.init({
                getAsync: false,
                //Hasta que no carge todos los recursos no finaliza la inicialización, OJO! es bloqueante
                cookieName: 'lang',
                // userLocalStorage: true,
                // localStorageExpirationtime: 86400000, // in ms, 1 week
                load: 'current',
                lng: lang,
                fallbackLng: 'en-GB',
                resGetPath: 'res/locales/{{lng}}/locales.json',
                interpolationPrefix: '{{',
                interpolationSuffix: '}}'
            });

            console.debug('locale.initialize.momentLang: ' + lang.split('-')[0]);
            moment.lang(lang.split('-')[0]);
        },

        setLang: function(lang) {
            localStorage.lang = lang;
            app.vent.trigger('locale:changed');
        }

    };

    app.addInitializer(function() {
        app.locale = locale;

        //TODO: remove when full i18n, VBox FF detects US
        localStorage.lang = common.defaultLang;

        var lang = localStorage.lang;
        if (!lang) {
            if (navigator.userLanguage) { // Explorer
                lang = navigator.userLanguage;
            } else if (navigator.language) { // FF
                lang = navigator.language;
            } else {
                lang = common.defaultLang;
            }

            if (lang === 'es') {
                lang = 'es-ES';
            }

            localStorage.lang = lang;
        }

        locale.initialize(lang);

        app.vent.on('locale:set', locale.setLang);
        app.vent.on('locale:changed', function() {
            location.reload();
        });

    });

    return locale;

});