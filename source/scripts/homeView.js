import 'jquery';
import {view} from 'scripts/view';

// This is where the home navigation and overall appearence of the site is created
// All the other views need to attach their output to this layout
var homeView = (function () {
    var homeViewInternal = Object.create(view);

    Object.defineProperties(homeViewInternal, {
        draw: {
            // Example use of
            value: function () {
                var $container = $('.container');
                var homeImgURL = 'resources/images/home.png';
                var $imgContainer = $('<div />')
                    .css('margin-left', 'auto')
                    .css('margin-right', 'auto')
                    .append($('<img />').attr('src', homeImgURL));
                $container.find('div.gameBoard')
                    .empty()
                    .append($imgContainer);
            }
        }
    });

    return homeViewInternal;
})();

export {homeView};
