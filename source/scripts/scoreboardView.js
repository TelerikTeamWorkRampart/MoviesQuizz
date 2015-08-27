import 'jquery';


//Scoreboard - current rankings
var scoreboardView = (function(){
    var scoreboardViewInternal = Object.create({});


    Object.defineProperties(scoreboardViewInternal, {
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
    })


    return scoreboardViewInternal;
})();

export {scoreboardView};
