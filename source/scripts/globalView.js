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
                var $rightMenu = $('<ul />').addClass('nav navbar-nav pull-right rightMenu');

                var $homeIcon = $('<span />').addClass('glyphicon').addClass('glyphicon-home');
                $leftMenu.append(
                    $('<li />')
                        .addClass('active')
                        .append(
                        $('<a data-id="1" href="#" />')
                            .append($homeIcon)
                            .append(' Home')
                    )
                );

                var $newGameIcon = $('<span />').addClass('glyphicon').addClass('glyphicon-film');
                $leftMenu.append(
                    $('<li />').append(
                        $('<a data-id="2" href="#" />')
                            .append($newGameIcon)
                            .append(' New Game')
                    )
                );

                var $instructionsIcon = $('<span />').addClass('glyphicon').addClass('glyphicon-info-sign');
                $leftMenu.append(
                    $('<li />').append(
                        $('<a data-id="3" href="#" />')
                            .append($instructionsIcon)
                            .append(' Instructions')
                    )
                );

                $leftMenu.append($('<li />').append($('<a data-id="4" href="#" />').text('Score Board')));
                $leftMenu.append($('<li />').append($('<a data-id="5" href="#" />').text('Credits')));

                $rightMenu.append($('<li />').append($('<a data-id="6" href="#" />').text('Login')));
                $rightMenu.append($('<li />').append($('<a data-id="7" href="#" />').text('Register')));
                $container.append($('<h1 />').addClass('jumbotron').text('Movies Quizz'));
                $menuContainer.append($leftMenu);
                $menuContainer.append($rightMenu);
                $container.append($menuContainer);

                $container.append($('<div />')
                    .addClass('gameBoard')
                    .css('width', '100%'));
                $container.append($('<div />').addClass('panel-footer').text('JavaScript Applications - Team Rampart'));

            }
        },
        userUpdate: {
            value: function (player) {
                var $rightMenu = $('.rightMenu');
                if (player === 'guest') {

                    $rightMenu.empty();
                    $rightMenu.append($('<li />').append($('<a data-id="6" href="#" />').text('Login')));
                    $rightMenu.append($('<li />').append($('<a data-id="7" href="#" />').text('Register')));
                } else {
                    console.log(player);
                    $rightMenu.empty();
                    //$rightMenu.append($('<li />').append($('<a data-id="4" href="#" />').text(player)));
                    var $userIcon = $('<span />')
                        .addClass('glyphicon')
                        .addClass('glyphicon-user');
                    $rightMenu.append(
                        $('<li />').append(
                            $('<p />')
                                .addClass('navbar-text')
                                .append($userIcon)
                                .append(' ' + player)
                        )
                    );
                    $rightMenu.append($('<li />').append($('<a data-id="8" href="#" />').text('Logout')));
                }
            }
        }
    });

    return globalViewInternal;
})();

export {globalView};
