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
                console.log("home");
            });
            this.get('#/login', function () {
                // login
                console.log("login");
            });
            this.get('#/quizz', function () {
                // start new quizz
                console.log("quizz");
            });
            this.get('#/logout', function () {
                // logout
                console.log("logout");
            });
            this.notFound = function () {
                console.log("not found");
            };
        });

        app.run('#/');
    });
}());
