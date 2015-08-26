(function () {
    'use strict';
    require.config({
        paths: {
            jquery: 'libs/jquery-2.1.1',
            sammy: 'libs/sammy',
        }
    });

    require(['sammy', 'jquery'], function (Sammy, $) {
        var app = Sammy('#main-content', function () {
            this.get('#/', function () {
                // home
            });
            this.get('#/login', function () {
                // login
            });
            this.get('#/quizz', function () {
                // start new quizz
            });
            this.get('#/logout', function () {
                // logout
            });
        });

        app.run('#/');
    });
}());
