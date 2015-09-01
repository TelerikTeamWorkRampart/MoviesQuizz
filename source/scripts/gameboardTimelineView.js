import 'jquery';
import 'underscore';
import {view} from 'scripts/view';

//This is where the global navigation and overall appearence of the site is created
//All the other views need to attach their output to this layout
var gameboardTimelineView = (function(){
    var gameboardTimelineViewInternal = Object.create(view);

    Object.defineProperties(gameboardTimelineViewInternal, {
        draw: {
            //Example use of
            value: function (timeline, currentMovie) {
                var $board = $('.gameBoard');
                var $timelineField = $('<div />').addClass('timeline');
                var $currentField = $('<div />').addClass('current');
 
                var $newRowDiv = $('<div />').addClass('row');

                var $newColDivBtn1 = $('<div />').addClass('btn-place');

                var $Button1 = $('<button />').addClass('btn')
                        .addClass('btn-default')
                        .css('min-height','250px')
                        .css('margin-top','60px')
                        .text('Prev');

                $newColDivBtn1.append($Button1);

                var $newColDiv = $('<div />').addClass('movie-place');

                var $newColDivBtn2 = $('<div />').addClass('btn-place');

                var $Button2 = $('<button />').addClass('btn')
                        .addClass('btn-default')
                        .css('min-height','250px')
                        .css('margin-top','60px')
                        .css('width','100%')
                        .text('Next');

                $newColDivBtn2.append($Button2);

                $timelineField.append($newRowDiv);
                $newRowDiv.append($newColDivBtn1);
                for(var i=0; i<timeline.lenght; i+=1){
                    $newRowDiv.append($newColDiv);
                    $newRowDiv.append($newColDivBtn2);

                    var $newNestedRowDiv1 = $('<div />').addClass('row');
                    var $newNestedColDiv1 = $('<div />').addClass('col-md-12');
                    var $movieNameHeader= $('<h2 />')
                            .text(timeline[i].title)
                            .css('width','100%')
                            .css('text-align','center');

                    $newColDiv.append($newNestedRowDiv1);
                    $newNestedRowDiv1.append($newNestedColDiv1);
                    $newNestedColDiv1.append($movieNameHeader);

                    var $newNestedRowDiv2 = $('<div />').addClass('row');
                    var $newNestedColDiv2 = $('<div />').addClass('col-md-12');
                    var $image = $('<img />', {src: timeline[i].posterURL});
                    $image.css('width','100%')
                            .css('height','150px');

                    $newColDiv.append($newNestedRowDiv2);
                    $newNestedRowDiv2.append($newNestedColDiv2);
                    $newNestedColDiv2.append($image);

                    var $newNestedRowDiv3 = $('<div />').addClass('row');
                    var $newNestedColDiv3 = $('<div />').addClass('col-md-12');
                    var $movieYearCreated = $('<h4 />').text(timeline[i].year)
                            .css('width','100%')
                            .css('text-align','center');
     
                    $newColDiv.append($newNestedRowDiv3);
                    $newNestedRowDiv3.append($newNestedColDiv3);
                    $newNestedColDiv3.append($movieYearCreated);
                }

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
    });

    return gameboardTimelineViewInternal;
})();

export {gameboardTimelineView};