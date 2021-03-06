define([
    'app',
    'jquery',
    'jqueryspin'
], function(app, $) {
    'use_strict';

    var utils = {};

    /**
     * Randomize array element order in-place.
     * Using Fisher-Yates shuffle algorithm.
     * http://stackoverflow.com/questions/2450954/how-to-randomize-a-javascript-array
     */
    utils.shuffleArray = function(array) {
        for (var i = array.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
        return array;
    };

    utils.colorLuminance = function(hex, lum) {
        // validate hex string
        hex = String(hex).replace(/[^0-9a-f]/gi, '');
        if (hex.length < 6) {
            hex = hex[0]+hex[0]+hex[1]+hex[1]+hex[2]+hex[2];
        }
        lum = lum || 0;
        // convert to decimal and change luminosity
        var rgb = '#', c, i;
        for (i = 0; i < 3; i++) {
            c = parseInt(hex.substr(i*2,2), 16);
            c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16);
            rgb += ('00' + c).substr(c.length);
        }
        return rgb;
    };

    utils.getRandomColor = function(noHash) {
        var letters = '0123456789ABCDEF'.split('');
        var color = '#';
        if (noHash) {
            color = '';
        }
        for (var i = 0; i < 6; i++ ) {
            color += letters[Math.round(Math.random() * 15)];
        }
        return color;
    };

    utils.isMobile = {
        Android: function() {
            return navigator.userAgent.match(/Android/i);
        },
        BlackBerry: function() {
            return navigator.userAgent.match(/BlackBerry/i);
        },
        iOS: function() {
            return navigator.userAgent.match(/iPhone|iPad|iPod/i);
        },
        Opera: function() {
            return navigator.userAgent.match(/Opera Mini/i);
        },
        Windows: function() {
            return navigator.userAgent.match(/IEMobile/i);
        },
        any: function() {
            return (utils.isMobile.Android() || utils.isMobile.BlackBerry() || utils.isMobile.iOS() || utils.isMobile.Opera() || utils.isMobile.Windows());
        }
    };

    var spinActive = false;
    utils.spiner = {
        show: function(selector) {
            console.debug('utils.spiner.show');
            selector = selector || 'body';
            if (spinActive) { return; }
            $(selector).spin();
            spinActive = true;
        },
        hide: function(selector) {
            console.debug('utils.spiner.hide');
            selector = selector || 'body';
            if (!spinActive) { return; }
            $(selector).spin();
            spinActive = false;
        }
    };

    utils.removeAccentedChars = function(text) {
        var translateRegx = /[öäüÖÄÜáéíóúÁÉÍÓÚ]/g;
        var translate = {
            'ä': 'a',
            'ö': 'o',
            'ü': 'u',
            'Ä': 'A',
            'Ö': 'O',
            'Ü': 'U',

            'á': 'a',
            'é': 'e',
            'í': 'i',
            'ó': 'o',
            'ú': 'u',

            'Á': 'A',
            'É': 'E',
            'Í': 'I',
            'Ó': 'O',
            'Ú': 'U'
        };

        return ( text.replace(translateRegx, function(match) {
            return translate[match];
        }) );
    };

    utils.isVisible = function(element) {
        // console.debug(element.attr('class'));
        var windowLeft = $(window).scrollLeft();
        var windowTop = $(window).scrollTop();
        var offset = element.offset();
        var left = offset.left;
        var top = offset.top;

        if (top + element.height() >= windowTop &&
        top - (element.data('appear-top-offset') || 0) <= windowTop + $(window).height() &&
        left + element.width() >= windowLeft &&
        left - (element.data('appear-left-offset') || 0) <= windowLeft + $(window).width()) {
            // console.debug('VISIBLE: ' + element.attr('class'));
            return true;
        } else {
            // console.debug('not visible!');
            return false;
        }
    };

    app.addInitializer(function() {
        app.utils = utils;
    });

    return utils;
});
