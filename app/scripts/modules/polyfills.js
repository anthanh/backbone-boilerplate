/* globals define */
define([], function() {
    'use_strict';

    // localstorage polyfill
    if (!('localStorage' in window)) {
        window.localStorage = {
            _data: {},
            setItem: function(id, val) {
                this._data[id] = String(val);
                return this._data[id];
            },
            getItem: function(id) {
                return this._data.hasOwnProperty(id) ? this._data[id] : undefined;
            },
            removeItem: function(id) {
                return delete this._data[id];
            },
            clear: function() {
                this._data = {};
                return this._data;
            }
        };
    }

    // session storage polyfill
    if (!('sessionStorage' in window)) {
        window.sessionStorage = {
            length: 0,
            setItem: function(key, value) {
                document.cookie = key + '=' + value + '; path=/';
                this.length++;
            },
            getItem: function(key) {
                var keyEQ = key + '=';
                var ca = document.cookie.split(';');
                for (var i = 0, len = ca.length; i < len; i++) {
                    var c = ca[i];
                    while (c.charAt(0) === ' ') c = c.substring(1, c.length);
                    if (c.indexOf(keyEQ) === 0) return c.substring(keyEQ.length, c.length);
                }
                return null;
            },
            removeItem: function(key) {
                this.setItem(key, '', -1);
                this.length--;
            },
            clear: function() {
                // Caution: will clear all persistent cookies as well
                var ca = document.cookie.split(';');
                for (var i = 0, len = ca.length; i < len; i++) {
                    var c = ca[i];
                    while (c.charAt(0) === ' ') c = c.substring(1, c.length);
                    var key = c.substring(0, c.indexOf('='));
                    this.removeItem(key);
                }
                this.length = 0;
            },
            key: function(n) {
                var ca = document.cookie.split(';');
                if (n >= ca.length || isNaN(parseFloat(n)) || !isFinite(n)) return null;
                var c = ca[n];
                while (c.charAt(0) === ' ') c = c.substring(1, c.length);
                return c.substring(0, c.indexOf('='));
            }
        };
    }

    //toISOString polyfill
    if ( !Date.prototype.toISOString ) {
        ( function() {
            // thanks to @fgnass and @subzey for their awesome golf skills
            // annotation by @fgnass
            Date.prototype.toISOString = function(a){a=this;return (1e3-~a.getUTCMonth()*10+a.toUTCString()+1e3+a/1).replace(/1(..).*?(\d\d)\D+(\d+).(\S+).*(...)/,'$3-$1-$2T$4.$5Z')};
        }() );
    }

});