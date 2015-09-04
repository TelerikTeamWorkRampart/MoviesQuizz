import 'jquery';
import {view} from 'scripts/view';

// This is where the home navigation and overall appearence of the site is created
// All the other views need to attach their output to this layout
var creditsView = (function () {
    var creditsViewInternal = Object.create(view);

    Object.defineProperties(creditsViewInternal, {
        draw: {
            // Example use of
            value: function () {

                var $credits = $('<div />')
                    .css('margin-left', 'auto')
                    .css('margin-right', 'auto')
                    .css('text-align', 'left');
                var $title = $('<h3 />').text('Thanks to:');
                var $list = $('<ul />')
                    .css('list-style-type', 'none');
                var angel = $('<li />').text('Angel Angelov');
                var mitko = $('<li />').text('Dimitar Chakov');
                var nanko = $('<li />').text('Nanko Geshkov');
                var niki = $('<li />').text('Nikola Vushkov');
                var pep = $('<li />').text('Perunka Keremidchieva');

                $list
                    .append(angel)
                    .append(mitko)
                    .append(nanko)
                    .append(niki)
                    .append(pep);

                $credits
                    .append($title)
                    .append($list);

                $('.container').find('div.gameBoard').empty().append($credits);

            }
        }
    });

    return creditsViewInternal;
})();

export {creditsView};
