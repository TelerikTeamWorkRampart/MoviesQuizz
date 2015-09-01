import 'jquery';

//information about current player, score and game progress
var infoBoardView = (function(){
    var infoBoardViewInternal = Object.create({});

    Object.defineProperties(infoBoardViewInternal, {
        draw: {
            //Example use of
            value: function () {
                // TODO:
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

    return infoBoardViewInternal;
})();

export {infoBoardView};