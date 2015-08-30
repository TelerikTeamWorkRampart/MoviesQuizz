import 'jquery';

var view = (function () {
    var viewInternal = Object.create({});

    Object.defineProperties(viewInternal, {
        registerClickCallback: {
            value: function (callback) {
                document.addEventListener('mousedown', function (ev) {
                    // ev.buttons === 1 detects left mouse button clicks only
                    if (ev.buttons === 1 && ev.target.nodeName === 'A') {
                        var link = $(ev.target);
                        var pageIndex = $(link).attr('data-id');
                        var activeItem = $(link).parent();

                        clearActiveItem();
                        setActiveItem(activeItem);

                        callback(pageIndex);
                    }
                }, false);
            }
        }
    });

    function clearActiveItem() {
        $('li.active').removeClass('active');
    }

    function setActiveItem(item) {
        $(item).addClass('active');
    }

    return viewInternal;
})();

export {view};