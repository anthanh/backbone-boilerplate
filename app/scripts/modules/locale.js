/* globals define */
define([
    'jquery',
    'common',
    'i18next',
    'moment',
    'numeral'
], function($, common, i18n, moment, numeral) {
    'use_strict';

    var locales = {

        initialize: function(lang) {
            // console.debug('locale.initialize');

            moment().format();
            // console.debug('locale.initialize.moment: ' + moment('20111031', 'YYYYMMDD').fromNow());
            // console.debug('locale.initialize.numeral: ' + numeral(1000).format('0,0'));
            // console.debug('locale.initialize.lang: ' + lang);
            $.i18n.init({
                getAsync: false,
                load: 'current',
                lng: lang,
                fallbackLng: 'en-GB',
                resGetPath: 'locales/__lng__/locales.json'
            });
        },

        loadLang: function(lang) {
            // app.vent('locales:loaded', lang);
        },

        setLang: function(lang) {
            // app.vent('locales:changed', lang);
        }

    };

    return locales;

});