import 'jquery';


//information about current player, score and game progress
var loginView = (function(){
    var loginViewInternal = Object.create({});


    Object.defineProperties(loginViewInternal, {
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


    return loginViewInternal;
})();

export {loginView};
