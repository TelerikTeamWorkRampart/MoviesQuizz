import 'jquery';

// information about current player, score and game progress
var scoreboardView = (function () {
    var scoreboardViewInternal = Object.create({});

    Object.defineProperties(scoreboardViewInternal, {
        draw: {
            value: function (players) {
                var $container = $('.container');
                var $contentTitle = $('<h2 />').text('Score Board');

                // TODO: create high score table

                $container
                    .find('div.gameBoard')
                    .empty()
                    .append($contentTitle);
            }
        },
        registerClickCallback: {
            value: function (callback) {
                document.addEventListener('mousedown', function (ev) {
                    if (ev.buttons === 1 && ev.target.nodeName === 'A') {
                        var link = $(ev.target);
                        var pageIndex = $(link).attr('data-id');
                        var activeItem = $(link).parent();

                        clearActiveItem();
                        setActiveItem(activeItem);

                        callback(pageIndex);
                    }
                }, false);
            }
        }
    });

    return scoreboardViewInternal;
})();

export {scoreboardView};