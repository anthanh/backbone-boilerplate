/* globals phantom, $ */
console.log('Loading a web page');
var page = require('webpage').create();

var address = 'http://localhost/webapp/test'; //system.args[1];
var t = Date.now();
page.open(address, function(status) {
    'use_strict';
    if (status !== 'success') {
        console.log('FAIL to load the address');
    } else {
        t = Date.now() - t;
        console.log('Loading time ' + t + ' msec');
    }
    phantom.exit();
});

var page = require('webpage').create();
page.open('http://localhost/webapp/app', function() {
    'use_strict';
    page.includeJs('http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js', function() {
        page.evaluate(function() {
            $('button').click();
        });
        phantom.exit();
    });
});