import 'jquery';

// information about current player, score and game progress
var loginView = (function () {
    var loginViewInternal = Object.create({});


    Object.defineProperties(loginViewInternal, {
        draw: {
            value: function () {
                var $container = $('.container');

                var $formTitle = $('<h2 />').text('Login');

                var $formContainer = $('<form >').attr('role', 'form');
                var $formGroupUser = $('<div />').addClass('form-group');
                var $formGroupPassword = $('<div />').addClass('form-group');

                var $checkBoxContainer = $('<div />').addClass('checkbox');
                var $checkBoxLabel = $('<label />');
                var $checkBoxControl = $('<input />').attr('type', 'checkbox');

                var $submitButton = $('<button />').attr('type', 'submit').addClass('btn btn-default').text('Submit');

                $formGroupUser.append($('<label />').attr('for', 'username').text('Username:'));
                $formGroupUser.append($('<input />').attr('type', 'text').attr('id', 'username').addClass('form-control'));

                $formGroupPassword.append($('<label />').attr('for', 'password').text('Password:'));
                $formGroupPassword.append($('<input />').attr('type', 'password').attr('id', 'password').addClass('form-control'));

                $checkBoxLabel
                    .append($checkBoxControl)
                    .append(' Remember me');
                $checkBoxContainer.append($checkBoxLabel);

                $formContainer
                    .append($formGroupUser)
                    .append($formGroupPassword)
                    .append($checkBoxContainer)
                    .append($submitButton);

                $container
                    .find('div.gameBoard')
                    .append($formTitle)
                    .append($formContainer);
            }
        },
        registerClickCallback: {
            value: function (callback) {
                document.addEventListener('mousedown', function (ev) {
                    if (ev.buttons === 1 && ev.target.nodeName === 'BUTTON') {
                        callback(ev.target.innerHTML);
                    }
                }, false);
            }
        }
    });


    return loginViewInternal;
})();

export {loginView};
