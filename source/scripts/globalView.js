import 'jquery';
import {view} from 'scripts/view';

// This is where the global navigation and overall appearence of the site is created
// All the other views need to attach their output to this layout
var globalView = (function () {
    var globalViewInternal = Object.create(view);

    Object.defineProperties(globalViewInternal, {
        // init: {
        //     value: function() {
        //         console.log('game view initiated!');
        //     }
        // },
        draw: {
            // Example use of
            value: function () {
                var $container = $('.container');
                var $menuContainer = $('<nav >').addClass('navbar navbar-default');
                var $leftMenu = $('<ul />').addClass('nav navbar-nav pull-left');
                var $rightMenu = $('<ul />').addClass('nav navbar-nav pull-right');

                $leftMenu.append($('<li />').addClass('active').append($('<a data-id="1" href="#" />').text('Home')));
                $leftMenu.append($('<li />').append($('<a data-id="2" href="#" />').text('New Game')));
                $leftMenu.append($('<li />').append($('<a data-id="3" href="#" />').text('Instructions')));
                $leftMenu.append($('<li />').append($('<a data-id="4" href="#" />').text('Score Board')));
                $leftMenu.append($('<li />').append($('<a data-id="5" href="#" />').text('Credits')));

                $rightMenu.append($('<li />').append($('<a data-id="6" href="#" />').text('Login / Register')));

                $container.append($('<h1 />').addClass('jumbotron').text('Movies Quizz'));
                $menuContainer.append($leftMenu);
                $menuContainer.append($rightMenu);
                $container.append($menuContainer);

                $container.append($('<div />').addClass('gameBoard'));
                $container.append($('<div />').addClass('panel-footer').text('footer goes here'));
            }
        }
    });

    return globalViewInternal;
})();

export {globalView};
