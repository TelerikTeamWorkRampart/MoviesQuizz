import 'jquery';
import 'underscore';
import {view} from 'scripts/view';

//This is where the global navigation and overall appearence of the site is created
//All the other views need to attach their output to this layout
var gameboardTimelineView = (function () {
    var gameboardTimelineViewInternal = Object.create(view);

    Object.defineProperties(gameboardTimelineViewInternal, {
        draw: {
            //Example use of
            value: function (baseMovie, guessMovie) {
                var $board = $('.gameBoard');

                var $baseMovieContainer = $('<div />').addClass('row');
                var $guessMovieContainer = $('<div />').addClass('row').addClass('text-center');

                var $leftColumn = $('<div />').addClass('col-md-3').addClass('text-center');
                var $centerColumn = $('<div />').addClass('col-md-6').addClass('text-center');
                var $rightColumn = $('<div />').addClass('col-md-3').addClass('text-center');

                var $prevButton = $('<button />').addClass('btn')
                    .addClass('btn-default')
                    .css('height', '250px')
                    .css('width', '100px')
                    .text('Prev');
                $leftColumn.append($prevButton);

                var $nextButton = $('<button />').addClass('btn')
                    .addClass('btn-default')
                    .css('height', '250px')
                    .css('width', '100px')
                    .text('Next');
                $rightColumn.append($nextButton);

                var $baseMovieTitle = $('<h3 />')
                    .text(baseMovie.title)
                    .css('text-align', 'center');

                var $baseMoviePoster = $('<img />')
                    .attr('src', baseMovie.posterURL)
                    .css('width', '100%');

                var $baseMovieYear = $('<h4 />')
                    .text(baseMovie.year);

                $centerColumn
                    .append($baseMovieTitle)
                    .append($baseMoviePoster)
                    .append($baseMovieYear);

                $baseMovieContainer
                    .append($leftColumn)
                    .append($centerColumn)
                    .append($rightColumn);

                var $guessMoviePoster = $('<img />').attr('src', guessMovie.posterURL);
                $guessMovieContainer.append($guessMoviePoster);


                $board.empty();
                $board.append($baseMovieContainer);
                $board.append($guessMovieContainer);
            }
        },
        registerClickCallback: {
            value: function (callback) {
                document.addEventListener('mousedown', function (ev) {
                    if (ev.target.nodeName === 'BUTTON') {
                        callback(ev.target.innerHTML);
                    }
                }, false);
            }
        },
    });

    return gameboardTimelineViewInternal;
})();

export {gameboardTimelineView};