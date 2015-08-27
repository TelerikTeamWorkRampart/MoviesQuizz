import 'jquery';


//This is where the global navigation and overall appearence of the site is created
//All the other views need to attach their output to this layout
var globalView = (function(){
    var globalViewInternal = Object.create({});


    Object.defineProperties(globalViewInternal, {
        // init: {
        //     value: function() {
        //         console.log('game view initiated!');
        //     }
        // },
        draw: {
            //Example use of
            value: function () {
                var $container = $('.container');
                var $menu = $('<nav >').addClass('navbar navbar-default');
                var $ul = $('<ul />').addClass('nav navbar-nav');

                $ul.append($('<li />').addClass('active').append($('<a href="#" />').text('item 1')));
                $ul.append($('<li />').append($('<a href="#" />').text('item 2')));
                $ul.append($('<li />').append($('<a href="#" />').text('item 3')));
                $ul.append($('<li />').append($('<a href="#" />').text('item 4')));


                $container.append($('<h1 />').addClass('jumbotron').text('Movies Quizz'));
                $menu.append($ul);
                $container.append($menu);

                $container.append($('<div />').addClass('gameBoard'));
                $container.append($('<div />').addClass('panel-footer').text('footer goes here'));


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


    return globalViewInternal;
})();

export {globalView};
