import 'jquery';
import _ from 'underscore';

var gameboardTimelineView = (function () {
    var gameboardTimelineViewInternal = Object.create({});

    Object.defineProperties(gameboardTimelineViewInternal, {
        draw: {
            //Example use of
            value: function (moviesArray, guessMovie, score) {
                var $board = $('.gameBoard');

                var $baseMovieContainer = $('<div />').addClass('row');
                var $guessMovieContainer = $('<div />').addClass('row').addClass('text-center');
                var $infoBoard = $('<div />')
                    .addClass('infoBoard')
                    .addClass('bg-info')
                    .css('text-align', 'center')
                    .append($('<span />')
                        .text('Score: ' + score)
                        .addClass('btn'));
                _.each(moviesArray, function(mov, key){
                    var $movieContainer = $('<div />')
                        .addClass('movie')
                        .css('display', 'inline-block')
                        //.css('width', '150px')
                        .css('height', '250px');
                    var $innerContainer = $('<div />')
                        .addClass('movie')
                        .css('display', 'inline-block')
                        .css('width', '150px')
                        .css('height', '150px');
                    var $movieTitle = $('<p />')
                        .text(mov.title)
                        .css('text-align', 'center');
                    var $moviePoster = $('<img />')
                        .attr('src', mov.posterURL)
                        .css('width', '100%');
                    var $movieYear = $('<p />')
                        .text(mov.year);
                    var $buttonPre = $('<button />').addClass('btn')
                        .addClass('btn-default')
                        .css('height', '100%')
                        .css('display', 'none')
                        .css('width', '10px')
                        .css('vertical-align', 'top')
                        .css('display', 'none')
                        .text('+')
                        .attr('value', key);
                    var $buttonAft = $('<button />').addClass('btn')
                        .addClass('btn-default')
                        .css('height', '100%')
                        .css('width', '10px')
                        .css('vertical-align', 'top')
                        .css('display', 'none')
                        .text('+')
                        .attr('value', key + 1);

                    $innerContainer
                        .append($movieTitle)
                        .append($moviePoster)
                        .append($movieYear);
                    $movieContainer
                        .append($buttonPre)
                        .append($innerContainer)
                        .append($buttonAft)
                    $baseMovieContainer
                        .append($movieContainer)
                })

                var $guessMoviePoster = $('<img />')
                    .attr('src', guessMovie.posterURL)
                    .css('max-width', '100px')
                    .css('max-height', '150');
                var $guessMovieTitle = $('<p />')
                        .text(guessMovie.title)
                        .css('text-align', 'center');
                $guessMovieContainer.append($guessMovieTitle);
                $guessMovieContainer.append($guessMoviePoster);


                $board.empty();
                $board.append($infoBoard);
                $board.append($baseMovieContainer);
                $board.append($guessMovieContainer);
                $board.on('mouseover', '.movie', function(){
                    $(this).find('button').show();
                })
                $board.on('mouseleave', '.movie', function(){
                    $(this).find('button').hide();
                })
            }
        },
        blink: {
            value: function(success){
                $('.infoBoard').removeClass('bg-info');
                if(success){
                    $('.infoBoard').addClass('bg-success')
                } else {
                    $('.infoBoard').addClass('bg-danger')
                }
                setTimeout(function(){
                    if(success){
                        $('.infoBoard').removeClass('bg-success')
                    } else {
                        $('.infoBoard').removeClass('bg-danger')
                    }
                    $('.infoBoard').addClass('bg-info');
                }, 500)
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
