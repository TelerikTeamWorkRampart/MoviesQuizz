import 'jquery';
import 'underscore';
import {view} from 'scripts/view';

//This is where the global navigation and overall appearence of the site is created
//All the other views need to attach their output to this layout
var gameboardTimelineView = (function(){
    var gameboardTimelineViewInternal = Object.create(view);


    Object.defineProperties(gameboardTimelineViewInternal, {
        // nit: {
        //     value: function() {
        //         console.log('game view initiated!');
        //     }
        // },i
        draw: {
            //Example use of
            value: function (timeline, currentMovie) {
                var $board = $('.gameBoard');
                var $timelineField = $('<div />').addClass('timeline');
                var $currentField = $('<div />').addClass('current');
                $board.text('GAMEBOARD STARTS HERE');


                //add here button appears here
                $timelineField.append($('<img style="height: 150px;"/>').attr('src', timeline[0].posterURL)); //should loop through all timeline images
                $timelineField.append($('<br />'));
                $timelineField.append(timeline[0].year);
                //add here button appears here

                $currentField.append($('<img style="height: 150px;"/>').attr('src', currentMovie.posterURL)); //should loop through all timeline images

                $board.append($timelineField);
                $board.append($currentField);
            }
        },
        registerClickCallback: {
            value: function (callback) {
                document.addEventListener('mousedown', function(ev){
                    if (ev.target.nodeName === 'A'){
                        callback(ev.target.innerHTML);
                    }
                }, false);
            }
        },
    })


    return gameboardTimelineViewInternal;
})();

export {gameboardTimelineView};
