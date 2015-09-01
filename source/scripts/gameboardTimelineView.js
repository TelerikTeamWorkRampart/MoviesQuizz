import 'jquery';
import _ from 'underscore';

var gameboardTimelineView = (function () {
    var gameboardTimelineViewInternal = Object.create({});

    Object.defineProperties(gameboardTimelineViewInternal, {
        draw: {
            //Example use of
            value: function (moviesArray, guessMovie) {
                var $board = $('.gameBoard');

                var $baseMovieContainer = $('<div />').addClass('row');
                var $guessMovieContainer = $('<div />').addClass('row').addClass('text-center');

                var $button = $('<button />').addClass('btn')
                    .addClass('btn-default')
                    .css('height', '250px')
                    .css('width', '10px')
                    .css('vertical-align', 'top')
                    .text('+')
                    .attr('value', 0);


                $baseMovieContainer.append($button);

                _.each(moviesArray, function(mov, key){
                    var $movieContainer = $('<div />')
                        .addClass('movie')
                        .css('display', 'inline-block')
                        .css('width', '200px')
                        .css('height', '250px');
                    var $movieTitle = $('<h3 />')
                        .text(mov.title)
                        .css('text-align', 'center');
                    var $moviePoster = $('<img />')
                        .attr('src', mov.posterURL)
                        .css('width', '100%');
                    var $movieYear = $('<h4 />')
                        .text(mov.year);
                    var $button = $('<button />').addClass('btn')
                        .addClass('btn-default')
                        .css('height', '250px')
                        .css('width', '10px')
                        .css('vertical-align', 'top')
                        .text('+')
                        .attr('value', key + 1);

                    $movieContainer
                        .append($movieTitle)
                        .append($moviePoster)
                        .append($movieYear);
                    $baseMovieContainer
                        .append($movieContainer)
                        .append($button);
                })

                var $guessMoviePoster = $('<img />').attr('src', guessMovie.posterURL);
                var $guessMovieTitle = $('<h3 />')
                        .text(guessMovie.title)
                        .css('text-align', 'center');
                $guessMovieContainer.append($guessMovieTitle);
                $guessMovieContainer.append($guessMoviePoster);


                $board.empty();
                $board.append($baseMovieContainer);
                $board.append($guessMovieContainer);
            }
        },
        registerClickCallback: {
            value: function (callback) {
                document.addEventListener('mousedown', function (ev) {
                    if (ev.buttons === 1 && ev.target.nodeName === 'BUTTON') {
                        callback($(ev.target).attr('value'));
                    }
                }, false);
            }
        },
    });

    return gameboardTimelineViewInternal;
})();

export {gameboardTimelineView};
